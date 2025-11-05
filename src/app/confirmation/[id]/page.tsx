"use client";
import Link from "next/link";
import { useCart } from "../../../components/CartProvider";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";

interface Params {
  id: string;
}

interface Props {
  params: Promise<Params>;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderData {
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  taxes: number;
  grandTotal: number;
}

export default function Confirmation({ params }: Props) {
  const { items, subtotal, clear } = useCart();
  const [orderId, setOrderId] = useState<string>("");
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  const shipping = 50;
  const tax = Math.round(subtotal * 0.07 * 100) / 100;
  const grandTotal = subtotal + shipping + tax;

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setOrderId(resolvedParams.id);

      setOrderData({
        orderId: resolvedParams.id,
        items,
        subtotal,
        shipping,
        taxes: tax,
        grandTotal,
      });

      setLoading(false);
    };
    loadParams();
  }, [params, items, subtotal, tax, grandTotal, shipping]);

  useEffect(() => {
    if (orderId && items.length > 0) {
      const timer = setTimeout(() => {
        clear();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [orderId, items.length, clear]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d87d4a] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Sorry, we could not find your order details.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#d87d4a] hover:bg-[#fbaf85] text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="text-left mb-6">
            <div
              className="w-16 h-16 bg-[#d87d4a] rounded-full flex items-center justify-center mx-auto mb-4"
              aria-hidden="true"
            >
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

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Thank you for your order!
            </h1>
            <p className="text-gray-600 mb-2">
              Order confirmed with ID:{" "}
              <strong className="text-[#d87d4a]">{orderData.orderId}</strong>
            </p>
            <p className="text-gray-500 text-sm">
              You will receive an email confirmation shortly.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {orderData.items.slice(0, 1).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ${item.price.toLocaleString()} × {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-sm">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}

              {orderData.items.length > 1 && (
                <div className="text-center text-sm text-gray-600 border-t pt-3">
                  and {orderData.items.length - 1} other item(s)
                </div>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${orderData.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${orderData.shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${orderData.taxes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span>Grand Total</span>
                <span className="text-[#d87d4a]">
                  ${orderData.grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="inline-block w-full bg-[#d87d4a] hover:bg-[#fbaf85] text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#fbaf85]"
              onClick={() => clear()}
            >
              Back to Home
            </Link>
            <p className="text-gray-500 text-sm mt-3">
              Your cart will be cleared automatically in a few seconds...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
