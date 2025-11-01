import { mutation } from '../_generated/server';
import { v } from 'convex/values';

// Inline the email template function since we can't import from outside convex
const generateOrderConfirmationEmail = (order: any) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Order Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          background: #ffffff;
          border-radius: 10px;
          padding: 30px;
          margin: 0 auto;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 {
          color: #d87d4a;
          margin-top: 0;
        }
        table {
          width: 100%;
          margin-top: 20px;
          border-collapse: collapse;
        }
        th, td {
          border-bottom: 1px solid #eee;
          padding: 12px;
          text-align: left;
        }
        th {
          background-color: #f8f8f8;
          font-weight: bold;
        }
        .footer {
          margin-top: 30px;
          font-size: 14px;
          color: #666;
          border-top: 1px solid #eee;
          padding-top: 20px;
        }
        .cta {
          display: inline-block;
          margin-top: 20px;
          background: #d87d4a;
          color: #fff;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: bold;
        }
        .totals {
          background: #f8f8f8;
          padding: 15px;
          border-radius: 6px;
          margin-top: 20px;
        }
        .address {
          background: #f8f8f8;
          padding: 15px;
          border-radius: 6px;
          margin: 15px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Thank you for your order, ${order.customerName}!</h1>
        <p>Your order ID is <strong>${order.id}</strong></p>
        
        <h3>Order Summary</h3>
        <table>
          <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
          ${order.items
            .map(
              (item: any) =>
                `<tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price}</td>
                  <td>$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>`
            )
            .join('')}
        </table>

        <div class="totals">
          <p><strong>Subtotal:</strong> $${order.totals?.subtotal || order.total}</p>
          <p><strong>Shipping:</strong> $${order.totals?.shipping || '0.00'}</p>
          <p><strong>Tax:</strong> $${order.totals?.taxes || '0.00'}</p>
          <p><strong>Total:</strong> $${order.totals?.grandTotal || order.total}</p>
        </div>

        ${order.shipping ? `
        <h3>Shipping Address</h3>
        <div class="address">
          <p>
            ${order.shipping.address}<br>
            ${order.shipping.city}, ${order.shipping.zip}
          </p>
        </div>
        ` : ''}

        <a href="https://your-website.com/orders/${order.id}" class="cta">View Your Order</a>

        <div class="footer">
          <p>We'll send another email once your order ships.</p>
          <p>Need help? Contact our support team at support@audiophile.com</p>
        </div>
      </div>
    </body>
  </html>
  `;
};

export const sendOrderEmail = mutation({
  args: {
    order: v.object({
      customer: v.object({
        name: v.string(),
        email: v.string(),
      }),
      items: v.array(v.object({
        name: v.string(),
        quantity: v.number(),
        price: v.number(),
      })),
      totals: v.object({
        subtotal: v.number(),
        shipping: v.number(),
        taxes: v.number(),
        grandTotal: v.number(),
      }),
      shipping: v.object({
        address: v.string(),
        city: v.string(),
        zip: v.string(),
      }),
    }),
    orderId: v.string(),
  },
  handler: async (ctx, { order, orderId }) => {
    const RESEND_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_KEY) {
      console.warn('No RESEND_API_KEY found');
      return { ok: false, error: 'No API key' };
    }

    const html = generateOrderConfirmationEmail({ 
      ...order, 
      id: orderId, 
      customerName: order.customer.name 
    });

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Audiophile <marvellousilesanmi25@gmail.com>',
          to: [order.customer.email],
          subject: `Order Confirmation - ${orderId}`,
          html
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Resend API error:', errorText);
        throw new Error(`Failed to send email: ${response.statusText}`);
      }

      return { ok: true };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { ok: false, error: String(error) };
    }
  },
});