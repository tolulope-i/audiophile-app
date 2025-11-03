"use client";
import Link from "next/link";
import { useCart } from "../../../components/CartProvider";
import { useEffect } from "react";
import Image from "next/image";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Confirmation({ params }: Props) {
  const { items, subtotal, clear } = useCart();
  const shipping = 50;
  const vat = Math.round(subtotal * 0.2);
  const grandTotal = subtotal + shipping + vat;

  // For client components, we need to handle the async params differently
  const [orderId, setOrderId] = React.useState<string>("");

  useEffect(() => {
    // Handle the async params in a useEffect
    const loadParams = async () => {
      const resolvedParams = await params;
      setOrderId(resolvedParams.id);
    };
    loadParams();
  }, [params]);

  if (!orderId) {
    return (
      <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d87d4a] mx-auto mb-4"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" />
      <div className="h-screen">
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 mt-20">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 flex flex-col justify-start items-start">
              {/* Success Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#d87d4a] rounded-full flex items-center justify-center mb-4">
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
                  You will receive an email confirmation shortly
                </p>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 flex flex-row">
                <div className="mb-4">
                  {items.slice(0, 1).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between mb-2"
                    >
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
                          <div className="font-semibold text-sm">
                            {item.name}
                          </div>
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
                  className="inline-block w-full bg-[#d87d4a] hover:bg-[#fbaf85] text-white py-3 px-6 font-semibold transition-colors text-center uppercase"
                >
                  back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
