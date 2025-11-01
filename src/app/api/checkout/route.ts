// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser'; // lightweight usage example
// Note: in real deployment, call Convex server-side functions via server SDK or Convex HTTP client with key
// For illustration, I'll show a server-side pseudocode to save order and call Resend.

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // --- Store order in Convex ---
    // Replace with your Convex server-side SDK code.
    // PSEUDOCODE:
    // const convex = await import('convex/server'); // server-side convext
    // const client = convex.getClient();
    // const inserted = await client.db.table('orders').insert({...body, status:'pending'})

    // For this example (since environment varies), generate a simple ID and pretend we saved.
    const orderId = 'ord_' + Math.random().toString(36).slice(2, 9);

    // --- Send email using Resend (server-side) ---
    // Replace RESEND_API_KEY with environment variable (process.env.RESEND_API_KEY)
    const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
    if (!RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not set - skipping email send in dev');
    } else {
      // Build HTML email body
      const html = buildEmailHtml(body, orderId);
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'orders@yourdomain.com',
          to: [body.customer.email],
          subject: `Order confirmation — ${orderId}`,
          html
        })
      });
    }

    // Return order id
    return NextResponse.json({ orderId }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Error' }, { status: 500 });
  }
}

function buildEmailHtml(order: any, orderId: string) {
  const itemsHtml = order.items.map((it: any) =>
    `<tr><td style="padding:8px;border:1px solid #eee">${it.name}</td><td style="padding:8px;border:1px solid #eee">${it.quantity}</td><td style="padding:8px;border:1px solid #eee">$${it.price}</td></tr>`
  ).join('');

  return `
    <div style="font-family:Inter, Arial, sans-serif; max-width:600px; margin:0 auto;">
      <h2>Thanks for your order, ${order.customer.name}</h2>
      <p>Your order <strong>${orderId}</strong> has been received.</p>
      <h3>Order summary</h3>
      <table style="border-collapse:collapse; width:100%"><thead><tr><th style="text-align:left;padding:8px">Item</th><th style="padding:8px">Qty</th><th style="padding:8px">Price</th></tr></thead>
      <tbody>${itemsHtml}</tbody></table>
      <p>Subtotal: $${order.totals.subtotal}</p>
      <p>Shipping: $${order.totals.shipping}</p>
      <p>Taxes: $${order.totals.taxes}</p>
      <h4>Total: $${order.totals.grandTotal}</h4>

      <h4>Shipping to</h4>
      <p>${order.shipping.address}, ${order.shipping.city} — ${order.shipping.zip}</p>

      <p>If you need help, reply to this email or contact support@yourdomain.com</p>
      <p><a href="https://yourdomain.com/orders/${orderId}">View your order</a></p>
    </div>
  `;
}
