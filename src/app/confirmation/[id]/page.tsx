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
  const [showAllItems, setShowAllItems] = useState(false);

  const shipping = 50;
  const tax = Math.round(subtotal * 0.07 * 100) / 100;
  const grandTotal = subtotal + shipping + tax;

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setOrderId(resolvedParams.id);

      let order = null;
      const saved = localStorage.getItem("lastOrder");
      if (saved) {
        order = JSON.parse(saved);
      }
      setOrderData(
        order || {
          orderId: resolvedParams.id,
          items,
          subtotal,
          shipping,
          taxes: tax,
          grandTotal,
        }
      );

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

  const itemsToShow = showAllItems
    ? orderData.items
    : orderData.items.slice(0, 1);

  return (
    <div className="min-h-screen bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-[540px]">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="w-16 h-16 bg-[#d87d4a] rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-black uppercase mb-4 tracking-wide">
              Thank you
              <br />
              for your order
            </h1>

            <p className="text-gray-500 text-sm mb-8">
              You will receive an email confirmation shortly.
            </p>

            <div className="grid md:grid-cols-2 rounded-lg overflow-hidden mb-8">
              <div className="bg-[#f1f1f1] p-6">
                <div className="space-y-4">
                  {itemsToShow.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shrink-0">
                        <Image
                          src={item.image || "/placeholder.jpg"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm uppercase truncate text-black">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500 font-bold">
                          $ {item.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 font-bold">
                        x{item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {orderData.items.length > 1 && (
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <button
                      onClick={() => setShowAllItems(!showAllItems)}
                      className="text-xs text-gray-500 hover:text-gray-700 font-bold w-full text-center"
                    >
                      {showAllItems ? (
                        "View less"
                      ) : (
                        <>and {orderData.items.length - 1} other item(s)</>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-black text-white p-6 flex flex-col justify-end md:min-w-[200px]">
                <div className="text-gray-400 text-sm uppercase mb-2 font-medium tracking-wider">
                  Grand Total
                </div>
                <div className="text-white text-lg font-bold">
                  $ {orderData.grandTotal.toLocaleString()}
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="block w-full bg-[#d87d4a] hover:bg-[#fbaf85] text-white text-center py-4 px-6 font-bold text-sm uppercase tracking-wider transition-colors duration-200"
              onClick={() => clear()}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
