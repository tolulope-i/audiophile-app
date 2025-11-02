
import React from 'react';
import ProductCard from '../../components/ProductCard';
import { products } from '../../lib/products';

export default function EarphonesPage() {
  const list = products.filter(p => p.category === 'earphones');
  return (
    <div className="container mx-auto px-4 py-8">
          <h3 className="text-center">Earphones</h3>
          <div className="grid md:grid-cols-1 gap-6">
            {list.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
  );
}
