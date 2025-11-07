import React from "react";
import { products } from "../../../lib/products";
import AddToCartClient from "../../../components/AddToCartClient";
import Image from "next/image";
import Link from "next/link";
import Advert from "@/components/Advert";
import CategorySection from "@/components/CategorySection";

type Props = { 
  params: Promise<{ slug: string }> 
};

export default async function ProductPage({ params }: Props) {
  // Await the params
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  
  if (!product)
    return <div className="container mx-auto px-4 py-8">Product not found</div>;

  return (
    <div className="wrapper px-6 sm:px-8 md:px-10 lg:px-20 py-20">
      <div className="mb-8">
        {/* <Link href={`/${product.category}`} className="text-gray-500 hover:text-orange-500">
          ← Back to {product.category}
        </Link> */}
        <Link href={`/${product.category}`} className="text-gray-500 hover:text-[#d87d4a] go-back">
          Go back
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
        <div className="product-box flex items-center justify-center p-8">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full max-w-md object-contain rounded"
          />
        </div>

        <div className="flex flex-col gap-6">
          {product.new && <span className="category">New Product</span>}
          <h2>{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <h6 className="text-2xl font-bold">${product.price.toLocaleString()}</h6>
          <AddToCartClient product={product} />
        </div>
      </div>

      {/* Features and In the Box */}
      <div className="grid lg:grid-cols-2 gap-16 mb-20">
        <div>
          <h3 className="mb-6">Features</h3>
          <div className="text-gray-600 space-y-4">
            {product.features.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between lg:flex-col">
          <h3 className="mb-6">In the Box</h3>
          <ul className="space-y-2">
            {product.includes?.map((item, index) => (
              <li key={index} className="flex items-center gap-4">
                <span className="font-bold">{item.quantity}x</span>
                <p className="text-gray-600 font-medium">{item.item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-20">
        <div className="space-y-4">
          {product.gallery[0] && (
            <div className=" rounded overflow-hidden">
              <Image
                src={product.gallery[0]}
                alt={`${product.name} gallery 1`}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
            </div>
          )}
          {product.gallery[1] && (
            <div className=" rounded overflow-hidden">
              <Image
                src={product.gallery[1]}
                alt={`${product.name} gallery 2`}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </div>
        {product.gallery[2] && (
          <div className=" rounded overflow-hidden">
            <Image
              src={product.gallery[2]}
              alt={`${product.name} gallery 3`}
              width={600}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="text-center">
        <h3 className="mb-12">You may also like</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {products
            .filter((p) => p.id !== product.id )
            .slice(0, 3)
            .map((p) => (
              <div key={p.id} className="text-center">
                <div className="cart-product mb-8 rounded overflow-hidden px-2 py-6">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-contain"
                  />
                </div>
                <h5 className="mb-6">{p.name}</h5>
                <Link
                  href={`/product/${p.slug}`}
                  className="btn btn-primary p-3"
                >
                  See product
                </Link>
              </div>
            ))}
        </div>
      </div>

      <CategorySection/>
      <Advert/>
    </div>
  );
}