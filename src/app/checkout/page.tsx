// app/checkout/page.tsx
'use client';
import React from 'react';
import CheckoutForm from '../../components/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <CheckoutForm />
        <div>
          {/* Cart summary - you can map cart items here using useCart */}
          <div className="border p-4 rounded">
            <h3 className="font-semibold">Cart Summary</h3>
            <p className="mt-2 text-sm text-gray-600">Review your items before placing order.</p>
            {/* For brevity, instruct user that cart summary shows items */}
          </div>
        </div>
      </div>
    </div>
  );
}
