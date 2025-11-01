// convex/functions/sendOrderEmail.ts
import { mutation } from 'convex/server';
import fetch from 'node-fetch';

export default mutation(async ({}, { order, orderId }) => {
  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) throw new Error('No RESEND_API_KEY');

  const html = /* build html template like earlier */ '';

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'orders@yourdomain.com',
      to: [order.customer.email],
      subject: `Your order ${orderId}`,
      html
    })
  });

  return { ok: true };
});
