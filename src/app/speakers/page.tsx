import React from 'react';
import ProductCard from '../../components/ProductCard';
import { products } from '../../lib/products';

export default function SpeakersPage() {
  const list = products.filter(p => p.category === 'speakers');
  return (
    <div className="container mx-auto px-4 py-8">
          <h1 className="">Speakers</h1>
          <div className="grid md:grid-cols-1 gap-6">
            {list.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
  );
}
