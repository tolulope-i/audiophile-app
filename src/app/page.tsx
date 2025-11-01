"use client";

import CategorySection from "@/components/CategorySection";
import Header from "@/components/Header";
import ProductDisplay from "@/components/ProductDisplay";
import Advert from "@/components/Advert";

export default function Home() {
  return (
    <main className="">
      {/* <Header /> */}
      <CategorySection/>
      <ProductDisplay/>
      <Advert />
    </main>
  );
}
