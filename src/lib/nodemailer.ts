import nodemailer from 'nodemailer';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderData {
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
  items: OrderItem[];
  totals: {
    subtotal: number;
    shipping: number;
    taxes: number;
    grandTotal: number;
  };
  orderId: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendOrderConfirmationEmail = async (order: OrderData) => {
  const emailHtml = generateOrderConfirmationEmail(order);

  try {
    const mailOptions = {
      from: `Audiophile <${process.env.GMAIL_USER}>`,
      to: order.customer.email,
      subject: `Order Confirmation - ${order.orderId}`,
      html: emailHtml,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Failed to send email' };
  }
};

const generateOrderConfirmationEmail = (order: OrderData): string => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Order Confirmation</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 0;
          padding: 20px;
          line-height: 1.6;
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
          margin-bottom: 16px;
          font-size: 24px;
        }
        h3 {
          margin: 20px 0 12px 0;
          color: #333;
        }
        table {
          width: 100%;
          margin-top: 20px;
          border-collapse: collapse;
          font-size: 14px;
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
          text-align: center;
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
        .order-id {
          background: #f8f8f8;
          padding: 10px;
          border-radius: 6px;
          margin: 10px 0;
          font-family: monospace;
        }
        @media (max-width: 600px) {
          .container {
            padding: 20px;
            margin: 10px;
          }
          table {
            font-size: 12px;
          }
          th, td {
            padding: 8px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Thank you for your order, ${order.customer.name}!</h1>
        <p>Your order has been confirmed and will be shipped soon.</p>
        
        <div class="order-id">
          <strong>Order ID:</strong> ${order.orderId}
        </div>
        
        <h3>Order Summary</h3>
        <table role="grid">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
              .map(
                (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td>$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>`
              )
              .join('')}
          </tbody>
        </table>

        <div class="totals">
          <p><strong>Subtotal:</strong> $${order.totals.subtotal.toFixed(2)}</p>
          <p><strong>Shipping:</strong> $${order.totals.shipping.toFixed(2)}</p>
          <p><strong>Tax:</strong> $${order.totals.taxes.toFixed(2)}</p>
          <p><strong>Grand Total:</strong> $${order.totals.grandTotal.toFixed(2)}</p>
        </div>

        <h3>Shipping Address</h3>
        <div class="address">
          <p>
            ${order.customer.name}<br>
            ${order.shipping.address}<br>
            ${order.shipping.city}, ${order.shipping.zip}<br>
            ${order.shipping.country}
          </p>
        </div>

        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://youraudiophilestore.com'}/confirmation/${order.orderId}" class="cta">View Your Order</a>

        <div class="footer">
          <p>We'll send another email once your order ships.</p>
          <p>Need help? Contact our support team at support@audiophile.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
    </body>
  </html>
  `;
};