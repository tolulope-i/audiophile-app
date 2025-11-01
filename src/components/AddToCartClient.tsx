// components/AddToCartClient.tsx
'use client';
import React, { useState } from 'react';
import { useCart } from './CartProvider';

export default function AddToCartClient({ product }: any) {
  const [qty, setQty] = useState(1);
  const { addItem, setShowCart } = useCart();

  return (
    <div className="mt-4 flex items-center gap-4">
      <div className="flex items-center">
        <button onClick={() => setQty(Math.max(1, qty-1))} className="px-3">-</button>
        <div className="px-4">{qty}</div>
        <button onClick={() => setQty(qty+1)} className="px-3">+</button>
      </div>
      <button
        onClick={() => {
          addItem({ id: product.id, name: product.name, price: product.price, quantity: qty, image: product.image });
          setShowCart(true); // show cart after adding
        }}
        className="bg-orange-500 text-white py-2 px-4 rounded"
      >
        Add to cart
      </button>
    </div>
  );
}
