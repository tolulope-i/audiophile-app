// components/ConfirmationPopup.tsx
"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import Image from "next/image";

export default function ConfirmationPopup() {
  const { 
    confirmationData, 
    setShowConfirmation, 
    clear,
    setShowCart 
  } = useCart();

  useEffect(() => {
    if (confirmationData) {
      // Clear cart 5 seconds after confirmation appears
      const timer = setTimeout(() => {
        clear();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [confirmationData, clear]);

  if (!confirmationData) return null;

  const { orderId, items, subtotal, grandTotal } = confirmationData;
  const shipping = 50;
  const vat = Math.round(subtotal * 0.2);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setShowConfirmation(false)}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Success Icon */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Thank you for your order!
              </h2>
              <p className="text-gray-600 mb-4">
                Order ID: <strong className="text-orange-500">{orderId}</strong>
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="mb-4">
                {items.slice(0, 1).map((item) => (
                  <div key={item.id} className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <Image
                          src={item.image || "/placeholder.jpg"}
                          alt={item.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          ${item.price.toLocaleString()} x {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
                
                {items.length > 1 && (
                  <div className="text-center text-sm text-gray-600 border-t pt-2">
                    and {items.length - 1} other item(s)
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="bg-black rounded-lg p-4">
                <div className="flex justify-between text-white">
                  <span>GRAND TOTAL</span>
                  <span className="font-bold text-lg">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors text-center"
                onClick={() => {
                  setShowConfirmation(false);
                  setShowCart(false);
                }}
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => setShowConfirmation(false)}
                className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}