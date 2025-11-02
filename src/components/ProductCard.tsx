// components/ProductCard.tsx
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="p-4 rounded flex flex-col items-center lg:flex-row">
      <div className='product-box'>
      <Image src={product.image} alt={product.name} width={220} height={243} className="w-full h-48 object-containe rounded"/>
      </div>
      <div className="mt-4 flex flex-col items-center text-center gap-4 max-w-[540px]">
        <p className="category">{product.category}</p>
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p>{product.description}</p>
        <Link href={`/product/${product.slug}`}>
          <button className="btn btn-primary">See product</button>
        </Link>
      </div>
    </div>
  );
}
