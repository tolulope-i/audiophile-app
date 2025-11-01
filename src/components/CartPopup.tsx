'use client';
import React from 'react';
import Link from 'next/link';
import { useCart } from './CartProvider';
import QuantityInput from './QuantityInput';

export default function CartPopup() {
  const { items, subtotal, updateQty, removeItem, setShowCart } = useCart();
  const shipping = 50;
  const tax = Math.round(subtotal * 0.07);
  const grandTotal = subtotal + shipping + tax;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowCart(false)} />
      <aside className="fixed right-4 top-20 w-96 max-w-[90vw] bg-white p-6 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Cart ({items.length})</h3>
          <button 
            onClick={() => setShowCart(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Your cart is empty</p>
            <button 
              onClick={() => setShowCart(false)}
              className="mt-4 text-orange-500 hover:text-orange-600 font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="space-y-4 max-h-64 overflow-auto">
              {items.map(i => (
                <li key={i.id} className="flex items-center gap-3 pb-4 border-b">
                  <img src={i.image} alt={i.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{i.name}</div>
                    <div className="text-sm text-gray-600">${i.price}</div>
                  </div>
                  <QuantityInput value={i.quantity} onChange={q => updateQty(i.id, q)} />
                  <button 
                    onClick={() => removeItem(i.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${tax}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>${grandTotal}</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <Link href="/checkout">
                <button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold transition-colors"
                  onClick={() => setShowCart(false)}
                >
                  Checkout
                </button>
              </Link>
              <button 
                onClick={() => setShowCart(false)}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded font-semibold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}