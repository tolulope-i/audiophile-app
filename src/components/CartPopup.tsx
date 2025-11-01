'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from './CartProvider';
import QuantityInput from './QuantityInput';

export default function CartPopup() {
  const { items, subtotal, updateQty, removeItem, setShowCart } = useCart();

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowCart(false)} />
      <aside className="fixed right-4 top-20 w-96 bg-white p-6 rounded shadow z-50">
        <h3 className="font-bold text-lg mb-4">Cart</h3>
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul className="space-y-4 max-h-64 overflow-auto">
              {items.map(i => (
                <li key={i.id} className="flex items-center gap-3">
                  <img src={i.image} alt={i.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{i.name}</div>
                    <div className="text-sm">${i.price}</div>
                  </div>
                  <QuantityInput value={i.quantity} onChange={q => updateQty(i.id, q)} />
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <div className="flex justify-between mb-3">
                <span>Subtotal</span>
                <span className="font-bold">${subtotal}</span>
              </div>
              <Link href="/checkout">
                <button className="w-full bg-black text-white py-3 rounded">Checkout</button>
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
