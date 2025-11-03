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
    let convexOrderId;
    try {
      convexOrderId = await fetchMutation(api.addOrder, {
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
        // Fallback to Resend directly if Convex email fails
        await sendEmailDirectly(body.customer.email, orderId, body);
      }
    } catch (emailError) {
      console.error('Email sending failed via Convex, trying direct:', emailError);
      // Fallback to direct Resend API
      await sendEmailDirectly(body.customer.email, orderId, body);
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

// Fallback email function
async function sendEmailDirectly(email: string, orderId: string, orderData: any) {
  try {
    const RESEND_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_KEY) {
      console.warn('No RESEND_API_KEY found for fallback email');
      return;
    }

    const subtotal = orderData.items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0);
    const shipping = 50;
    const taxes = Math.round(subtotal * 0.07);
    const grandTotal = subtotal + shipping + taxes;

    const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Order Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f5f5f5; color: #333; margin: 0; padding: 20px; }
          .container { max-width: 600px; background: #ffffff; border-radius: 10px; padding: 30px; margin: 0 auto; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          h1 { color: #d87d4a; margin-top: 0; }
          table { width: 100%; margin-top: 20px; border-collapse: collapse; }
          th, td { border-bottom: 1px solid #eee; padding: 12px; text-align: left; }
          th { background-color: #f8f8f8; font-weight: bold; }
          .footer { margin-top: 30px; font-size: 14px; color: #666; border-top: 1px solid #eee; padding-top: 20px; }
          .cta { display: inline-block; margin-top: 20px; background: #d87d4a; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; }
          .totals { background: #f8f8f8; padding: 15px; border-radius: 6px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Thank you for your order, ${orderData.customer.name}!</h1>
          <p>Your order ID is <strong>${orderId}</strong></p>
          
          <h3>Order Summary</h3>
          <table>
            <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
            ${orderData.items.map((item: any) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </table>

          <div class="totals">
            <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
            <p><strong>Shipping:</strong> $${shipping.toFixed(2)}</p>
            <p><strong>Tax:</strong> $${taxes.toFixed(2)}</p>
            <p><strong>Total:</strong> $${grandTotal.toFixed(2)}</p>
          </div>

          <a href="https://youraudiophilestore.com/confirmation/${orderId}" class="cta">View Your Order</a>

          <div class="footer">
            <p>We'll send another email once your order ships.</p>
            <p>Need help? Contact our support team at support@audiophile.com</p>
          </div>
        </div>
      </body>
    </html>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Audiophile <onboarding@resend.dev>',
        to: [email],
        subject: `Order Confirmation - ${orderId}`,
        html: emailHtml
      })
    });

    if (!response.ok) {
      throw new Error(`Resend fallback failed: ${response.statusText}`);
    }

    console.log('Fallback email sent successfully');
  } catch (error) {
    console.error('Fallback email sending failed:', error);
  }
}