'use client';
import React from 'react';
import CheckoutForm from '../../components/CheckoutForm';
import { useCart } from '@/components/CartProvider';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const shipping = 50;
  const tax = Math.round(subtotal * 0.07);
  const grandTotal = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some products to your cart before checking out.</p>
        <Link href="/" className='btn btn-primary'>Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-gray-500 hover:text-[#d87d4a] mb-8 inline-block">
          ← Go back
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
<div className="flex flex-col lg:flex-row gap-12">
  <div className="bg-white p-8 rounded-lg w-full lg:w-[75%]">
            <CheckoutForm />
          </div>
          
          {/* Order Summary */}
  <div className="bg-white p-8 rounded-lg h-fit w-full lg:w-[35%]">
            <h3 className="text-lg font-bold mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="product-box w-16 h-16 rounded">
                    <Image
                      src={item.image || '/placeholder.jpg'}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h6 className="font-semibold">{item.name}</h6>
                    <p className="text-gray-600">${item.price.toLocaleString()}</p>
                  </div>
                  <div className="text-gray-600">
                    x{item.quantity}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 pt-4">
              <div className="flex justify-between">
                <p className="text-gray-600 capitalize">Total</p>
                <h6>${subtotal.toLocaleString()}</h6>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600 capitalize">Shipping</p>
                <h6>${shipping.toLocaleString()}</h6>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600 capitalize">Vat (included)</p>
                <h6>${tax.toLocaleString()}</h6>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2">
                <p className='text-gray-600 capitalize'>Grand Total</p>
                <span className="text-[#d87d4a]">${grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}