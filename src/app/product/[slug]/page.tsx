// app/product/[slug]/page.tsx
import React from "react";
import { products } from "../../../lib/products";
import AddToCartClient from "../../../components/AddToCartClient";
import Image from "next/image";

type Props = { params: { slug: string } };

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product)
    return <div className="container mx-auto px-4 py-8">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="product-box">
            <Image
              src={product.image}
              alt={product.name}
              width={148}
              height={207}
              className="w-full rounded"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="category">
            {product.category}
          </div>
          <h2 className="">{product.name}</h2>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <div className="mt-6">
            <h6 className="text-2xl font-bold">${product.price}</h6>
            <AddToCartClient product={product} />
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h5 className="font-bold">Features</h5>
        <p className="mt-2 text-gray-700">{product.features}</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          {product.gallery.map((g, idx) => (
            <img
              key={idx}
              src={g}
              className="w-full h-24 rounded"
            />
          ))}
        </div>
        <div className="mt-8">
          <h4 className="font-semibold">You may also like</h4>
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((p) => (
                <div key={p.id} className=" p-4 rounded">
                  {/* <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded"/> */}
                  <div className="product-box">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={200}
                      height={200}
                      className="w-full h-36 rounded"
                    />
                  </div>
                  <div className="mt-3">
                    <h5 className="font-semibold">{p.name}</h5>
                    <a
                      href={`/product/${p.slug}`}
                      className="btn btn-primary p-2 mt-2"
                    >
                      See product
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
