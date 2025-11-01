// app/product/[slug]/page.tsx
import React from 'react';
import { products } from '../../../lib/products';
import AddToCartClient from '../../../components/AddToCartClient';
import Image from 'next/image';

type Props = { params: { slug: string } };

export default function ProductPage({ params }: Props) {
  const product = products.find(p => p.slug === params.slug);
  if (!product) return <div className="container mx-auto px-4 py-8">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image src={product.image} alt={product.name} width={400} height={400} className="w-full rounded" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {product.gallery.map((g, idx) => <img key={idx} src={g} className="w-full h-24 object-cover rounded" />)}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 uppercase">{product.category}</div>
          <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <div className="mt-6">
            <p className="text-2xl font-bold">${product.price}</p>
            <AddToCartClient product={product} />
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h3 className="text-xl font-bold">Features</h3>
        <p className="mt-2 text-gray-700">{product.features}</p>

        <div className="mt-8">
          <h4 className="font-semibold">You may also like</h4>
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {products.filter(p => p.id !== product.id).slice(0,3).map(p => (
              <div key={p.id} className="border p-4 rounded">
                {/* <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded"/> */}
                <Image src={p.image} alt={p.name} width={200} height={200} className="w-full h-36 object-cover rounded" />
                <div className="mt-3">
                  <h5 className="font-semibold">{p.name}</h5>
                  <a href={`/product/${p.slug}`} className="mt-3 inline-block bg-black text-white py-2 px-4 rounded">See product</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
