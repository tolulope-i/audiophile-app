"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import CartPopup from "./CartPopup";
import { useState } from "react";
import CategorySectionCard from "./CategorySectionCard";

export default function Header() {
  const { showCart, setShowCart } = useCart();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const totalCount = useCart().items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <header className="navbar relative bg-black">
      

      {/* Hero Section */}
      <section className="wrapper hero-section">
        <div className="hero-content">
          <p className="title text-white/50">New product</p>
          <h1 className="text-white">XX99 Mark II Headphones</h1>
          <p className="text-white/75">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Link href="/product/xx99-mark-II">
            <button className="btn btn-primary mt-4">see product</button>
          </Link>
        </div>
        <div className="image-container">
          <Image
            src="/image-headphones.png"
            alt="headphones image"
            width={540}
            height={560}
            priority
            className="object-contain"
          />
        </div>
      </section>

      {showCart && <CartPopup />}
    </header>
  );
}