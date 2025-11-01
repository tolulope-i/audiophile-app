export const generateOrderConfirmationEmail = (order: any) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Order Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          color: #333;
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
        }
        table {
          width: 100%;
          margin-top: 20px;
          border-collapse: collapse;
        }
        th, td {
          border-bottom: 1px solid #eee;
          padding: 10px;
          text-align: left;
        }
        .footer {
          margin-top: 30px;
          font-size: 14px;
          color: #666;
        }
        .cta {
          display: inline-block;
          margin-top: 20px;
          background: #d87d4a;
          color: #fff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 6px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Thank you for your order, ${order.customerName}!</h1>
        <p>Your order ID is <strong>${order.id}</strong></p>
        
        <h3>Order Summary</h3>
        <table>
          <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
          ${order.items
            .map(
              (item: any) =>
                `<tr><td>${item.name}</td><td>${item.quantity}</td><td>$${item.price}</td></tr>`
            )
            .join('')}
        </table>

        <p><strong>Total:</strong> $${order.total}</p>

        <a href="https://your-website.com/orders/${order.id}" class="cta">View Your Order</a>

        <div class="footer">
          <p>We’ll send another email once your order ships.</p>
          <p>Need help? Contact our support team at support@audiophile.com</p>
        </div>
      </div>
    </body>
  </html>
  `;
};
