import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { sendOrderConfirmationEmail } from "@/lib/nodemailer";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CheckoutBody {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shipping: {
    address: string;
    city: string;
    zip: string;
    country: string;
  };
  items: CartItem[];
}

export async function POST(req: Request) {
  try {
    const body: CheckoutBody = await req.json();

    if (
      !body.customer?.name ||
      !body.customer?.email ||
      !body.customer?.phone
    ) {
      return NextResponse.json(
        { message: "Missing required customer information" },
        { status: 400 }
      );
    }

    if (
      !body.shipping?.address ||
      !body.shipping?.city ||
      !body.shipping?.zip ||
      !body.shipping?.country
    ) {
      return NextResponse.json(
        { message: "Missing required shipping information" },
        { status: 400 }
      );
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    const orderId =
      "ORD_" +
      Date.now() +
      "_" +
      Math.random().toString(36).substr(2, 9).toUpperCase();

    const subtotal = body.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = 50;
    const taxes = Math.round(subtotal * 0.07 * 100) / 100;
    const grandTotal = Math.round((subtotal + shipping + taxes) * 100) / 100;

    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    try {
      const orderResult = await client.mutation(api.orders.addOrder, {
        customer: body.customer,
        shipping: body.shipping,
        items: body.items,
        totals: {
          subtotal,
          shipping,
          taxes,
          grandTotal,
        },
        orderId,
      });

      if (!orderResult.success) {
        throw new Error(orderResult.error || "Failed to save order");
      }

      try {
        await sendOrderConfirmationEmail({
          customer: body.customer,
          shipping: body.shipping,
          items: body.items,
          totals: {
            subtotal,
            shipping,
            taxes,
            grandTotal,
          },
          orderId,
        });
        console.log("Confirmation email sent successfully");
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }

      return NextResponse.json(
        {
          success: true,
          orderId,
          message: "Order placed successfully",
        },
        { status: 200 }
      );
    } catch (convexError) {
      console.error("Failed to save order to Convex:", convexError);
      return NextResponse.json(
        { message: "Failed to save order. Please try again." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}