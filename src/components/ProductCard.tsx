// components/ProductCard.tsx
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="p-4 border rounded">
      <Image src={product.image} alt={product.name} width={400} height={300} className="w-full h-48 object-cover rounded"/>
      <div className="mt-4">
        <div className="text-sm uppercase tracking-wider text-gray-500">{product.category}</div>
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="mt-2 text-gray-600">${product.price}</p>
        <Link href={`/product/${product.slug}`}>
          <button className="mt-4 bg-black text-white py-2 px-4 rounded">See product</button>
        </Link>
      </div>
    </div>
  );
}
