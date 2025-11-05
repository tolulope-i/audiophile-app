"use client";
import React from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import QuantityInput from "./QuantityInput";
import Image from "next/image";

export default function CartPopup() {
  const { items, subtotal, updateQty, removeItem, setShowCart, clear } =
    useCart();
  const shipping = 50;
  const tax = Math.round(subtotal * 0.07);
  const grandTotal = subtotal + shipping + tax;

  const handleRemoveAll = () => {
    clear();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setShowCart(false)}
      />
      <aside className="fixed right-4 top-20 w-96 max-w-[90vw] bg-white p-6 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-bold">Cart ({items.length})</h4>
          {items.length > 0 && (
            <button
              onClick={handleRemoveAll}
              className="text-gray-500 hover:text-[#d87d4a] text-sm transition-colors"
            >
              Remove all
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🛒</div>
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <button
              onClick={() => setShowCart(false)}
              className="bg-[#d87d4a] hover:bg-[#fbaf85] text-white py-2 px-6 rounded font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="space-y-4 max-h-64 overflow-auto mb-6">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 pb-4">
                  <div className="cart-product w-16 h-16 rounded flex items-center justify-center">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      ${item.price.toLocaleString()}
                    </div>
                  </div>
                  <QuantityInput
                    value={item.quantity}
                    onChange={(q) => updateQty(item.id, q)}
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 ml-2 transition-colors"
                    aria-label="Remove item"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>

            <div className="space-y-3 mb-6">
              {/* <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">${shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (7%)</span>
                <span className="font-semibold">${tax.toLocaleString()}</span>
              </div> */}
              <div className="flex justify-between text-lg font-bold  pt-3">
                <p>Total</p>
                <h6 className="font-bold">${grandTotal.toLocaleString()}</h6>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/checkout">
                <button
                  className="cursor-pointer w-full bg-[#d87d4a] hover:bg-[#fbaf85] text-white py-3 font-semibold transition-colors"
                  onClick={() => setShowCart(false)}
                >
                  Checkout
                </button>
              </Link>
              {/* <button 
                onClick={() => setShowCart(false)}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </button> */}
            </div>
          </>
        )}
      </aside>
    </>
  );
}
