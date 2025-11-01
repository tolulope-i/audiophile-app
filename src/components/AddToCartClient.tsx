'use client';
import React, { useState } from 'react';
import { useCart } from './CartProvider';

export default function AddToCartClient({ product }: any) {
  const [qty, setQty] = useState(1);
  const { addItem, setShowCart } = useCart();

  return (
    <div className="mt-4 flex items-center gap-4">
      <div className="flex items-center border rounded">
        <button 
          onClick={() => setQty(Math.max(1, qty-1))} 
          className="px-3 py-2 hover:bg-gray-100 transition-colors"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <div className="px-4 py-2 min-w-12 text-center">{qty}</div>
        <button 
          onClick={() => setQty(qty+1)} 
          className="px-3 py-2 hover:bg-gray-100 transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        onClick={() => {
          addItem({ 
            id: product.id, 
            name: product.name, 
            price: product.price, 
            quantity: qty, 
            image: product.image 
          });
          setShowCart(true);
        }}
        className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded font-semibold transition-colors"
      >
        Add to cart
      </button>
    </div>
  );
}