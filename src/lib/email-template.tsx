export function generateOrderEmailTemplate(order: any) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #000; color: #fff; padding: 20px; text-align: center; }
    .content { background: #f9f9f9; padding: 30px; }
    .order-summary { background: #fff; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .total { border-top: 2px solid #ddd; padding-top: 10px; margin-top: 10px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AUDIOPHILE</h1>
    </div>
    
    <div class="content">
      <h2>Hi ${order.customer.name},</h2>
      <p>Thank you for your order! We're getting it ready to be shipped.</p>
      
      <div class="order-summary">
        <h3>Order #${order.orderId}</h3>
        ${order.items.map((item: any) => `
          <div style="display: flex; justify-content: space-between; margin: 10px 0;">
            <span>${item.name} x${item.quantity}</span>
            <span>$${item.price * item.quantity}</span>
          </div>
        `).join('')}
        
        <div class="total">
          <div style="display: flex; justify-content: space-between;">
            <strong>Grand Total</strong>
            <strong>$${order.totals.grandTotal}</strong>
          </div>
        </div>
      </div>
      
      <h3>Shipping Address</h3>
      <p>
        ${order.customer.name}<br>
        ${order.shipping.address}<br>
        ${order.shipping.city}, ${order.shipping.zipCode}<br>
        ${order.shipping.country}
      </p>
    </div>
    
    <div class="footer">
      <p>Need help? Contact us at support@audiophile.com</p>
      <p>&copy; 2024 Audiophile. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `
}