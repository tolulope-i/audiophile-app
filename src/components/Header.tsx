"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import CartPopup from "./CartPopup";
import { useState } from "react";

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
    <header className="navbar relative">
      <nav className="wrapper text-white">
        <div className="flex items-center justify-between py-4">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={toggleNav} className="p-2">
              <Image
                src="/Group.svg"
                alt="hamburger icon"
                width={16}
                height={15}
              />
            </button>
          </div>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none">
            <Image
              src="/audiophile 2.svg"
              alt="audiophile logo"
              width={143}
              height={25}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block desktop-nav">
            <ul className="flex gap-8">
              <li><Link href="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
              <li><Link href="/headphones" className="hover:text-orange-500 transition-colors">Headphones</Link></li>
              <li><Link href="/speakers" className="hover:text-orange-500 transition-colors">Speakers</Link></li>
              <li><Link href="/earphones" className="hover:text-orange-500 transition-colors">Earphones</Link></li>
            </ul>
          </div>

          {/* Cart Button */}
          <div className="lg:ml-auto">
            <button
              aria-label="Open cart"
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 hover:bg-white/10 rounded transition-colors"
            >
              <Image
                src="/Combined Shape.svg"
                alt="cart icon"
                width={20}
                height={20}
              />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={closeNav}>
          <div 
            className="bg-white text-black absolute top-0 left-0 w-4/5 h-full p-8 shadow-xl animate-in slide-in-from-left-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeNav}
              className="absolute top-6 right-6 text-2xl hover:text-orange-500 transition-colors"
            >
              ×
            </button>
            
            <div className="mt-12 space-y-6">
              <Link 
                href="/" 
                className="block text-2xl font-bold hover:text-orange-500 transition-colors"
                onClick={closeNav}
              >
                Home
              </Link>
              <Link 
                href="/headphones" 
                className="block text-2xl font-bold hover:text-orange-500 transition-colors"
                onClick={closeNav}
              >
                Headphones
              </Link>
              <Link 
                href="/speakers" 
                className="block text-2xl font-bold hover:text-orange-500 transition-colors"
                onClick={closeNav}
              >
                Speakers
              </Link>
              <Link 
                href="/earphones" 
                className="block text-2xl font-bold hover:text-orange-500 transition-colors"
                onClick={closeNav}
              >
                Earphones
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="wrapper hero-section">
        <div className="hero-content text-white">
          <p className="subtitle">New product</p>
          <h2>XX99 Mark II Headphones</h2>
          <p>
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Link href="/product/xx99-mark-two">
            <button className="btn btn-primary">see product</button>
          </Link>
        </div>
        <div className="image-container">
          <Image
            src="/image-headphones.png"
            alt="headphones image"
            width={540}
            height={560}
            priority
          />
        </div>
      </section>

      {showCart && <CartPopup />}
    </header>
  );
}