import { NextResponse } from 'next/server';
import { fetchMutation } from 'convex/nextjs';
import { api } from '../../../../convex/_generated/api';
import { sendOrderConfirmationEmail } from '@/lib/nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.customer?.name || !body.customer?.email || !body.customer?.phone) {
      return NextResponse.json(
        { message: 'Missing required customer information' },
        { status: 400 }
      );
    }

    if (!body.shipping?.address || !body.shipping?.city || !body.shipping?.zip || !body.shipping?.country) {
      return NextResponse.json(
        { message: 'Missing required shipping information' },
        { status: 400 }
      );
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { message: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Generate order ID
    const orderId = 'ORD_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Calculate totals
    const subtotal = body.items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0);
    const shipping = 50;
    const taxes = Math.round(subtotal * 0.07 * 100) / 100; // Round to 2 decimal places
    const grandTotal = Math.round((subtotal + shipping + taxes) * 100) / 100;

    // Save order to Convex
    let convexOrderId;
    try {
      const orderResult = await fetchMutation(api.addOrder, {
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
        throw new Error(orderResult.error || 'Failed to save order');
      }

      convexOrderId = orderResult.id;
      console.log('Order saved to Convex with ID:', convexOrderId);
    } catch (convexError) {
      console.error('Failed to save order to Convex:', convexError);
      return NextResponse.json(
        { message: 'Failed to save order. Please try again.' },
        { status: 500 }
      );
    }

    // Send confirmation email
    try {
      const emailResult = await sendOrderConfirmationEmail({
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

      if (!emailResult.success) {
        console.error('Failed to send confirmation email:', emailResult.error);
        // Don't fail the order if email fails, just log it
      } else {
        console.log('Confirmation email sent successfully');
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue with order even if email fails
    }

    return NextResponse.json({ 
      success: true,
      orderId,
      convexOrderId,
      message: 'Order placed successfully' 
    }, { status: 200 });
    
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ 
      success: false,
      message: err.message || 'Internal server error' 
    }, { status: 500 });
  }
}