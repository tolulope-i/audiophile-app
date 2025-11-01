import { NextResponse } from 'next/server';
import { fetchMutation } from 'convex/nextjs';
import { api } from '../../../../convex/_generated/api';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Generate order ID
    const orderId = 'ORD_' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Calculate totals
    const subtotal = body.items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0);
    const shipping = 50;
    const taxes = Math.round(subtotal * 0.07);
    const grandTotal = subtotal + shipping + taxes;

    // Save order to Convex
    try {
      const convexOrderId = await fetchMutation(api.addOrder, {
        customer: body.customer,
        shipping: body.shipping,
        items: body.items,
        totals: {
          subtotal,
          shipping,
          taxes,
          grandTotal,
        },
      });

      console.log('Order saved to Convex with ID:', convexOrderId);
    } catch (convexError) {
      console.error('Failed to save order to Convex:', convexError);
      // Continue with email even if Convex save fails
    }

    // Send email using Convex mutation
    try {
      const emailResult = await fetchMutation(api.sendOrderEmail, {
        order: {
          customer: body.customer,
          items: body.items,
          totals: {
            subtotal,
            shipping,
            taxes,
            grandTotal,
          },
          shipping: body.shipping,
        },
        orderId,
      });

      if (emailResult.ok) {
        console.log('Email sent successfully via Convex');
      } else {
        console.error('Failed to send email via Convex:', emailResult.error);
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue with order creation even if email fails
    }

    return NextResponse.json({ 
      orderId,
      message: 'Order placed successfully' 
    }, { status: 200 });
    
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ 
      message: err.message || 'Internal server error' 
    }, { status: 500 });
  }
}