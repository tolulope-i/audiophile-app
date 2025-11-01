// app/headphones/page.tsx
import React from 'react';
import ProductCard from '../../components/ProductCard';
import { products } from '../../lib/products';

export default function HeadphonesPage() {
  const list = products.filter(p => p.category === 'headphones');
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Headphones</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {list.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
