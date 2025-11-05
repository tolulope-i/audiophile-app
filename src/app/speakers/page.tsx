import React from "react";
import { products } from "../../lib/products";
import CategorySection from "@/components/CategorySection";
import Advert from "@/components/Advert";
import Image from "next/image";

export default function HeadphonesPage() {
  const list = products.filter((p) => p.category === "speakers");

  return (
    <div className="">
      <div className="bg-black text-white py-16 text-center mb-16">
        <h1 className="text-4xl font-bold">Speakers</h1>
      </div>

      <div className="max-w-6xl mx-auto space-y-32 mb-20">
        {list.map((product, index) => (
          <div
            key={product.id}
            className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12`}
          >
            <div className="product-box flex-1 flex items-center justify-center p-8 rounded">
              <Image
                src={product.image}
                alt={product.name}
                width={220}
                height={243}
                priority
                className="w-full object-contain img"
              />
            </div>

            <div className="flex-1 text-center lg:text-left">
              {product.new && <span className="category">New Product</span>}
              <h2 className="my-4">{product.name}</h2>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <a
                href={`/product/${product.slug}`}
                className="btn btn-primary p-3"
              >
                See Product
              </a>
            </div>
          </div>
        ))}
      </div>

      <CategorySection />
      <Advert />
    </div>
  );
}
