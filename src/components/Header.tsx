"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import CartPopup from "./CartPopup";

export default function Header() {
  const { showCart, setShowCart } = useCart();
  const totalCount = useCart().items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="navbar">
      <nav className="wrapper text-white">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/Group.svg"
              alt="hamburger icon"
              width={16}
              height={15}
            />
          </Link>
          <div>
            <Image
              src="/audiophile 2.svg"
              alt="audiophile logo"
              width={143}
              height={25}
            />
          </div>
          <div className="hidden">
            <ul className="">
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">Headphones</a>
              </li>
              <li>
                <a href="">Speakers</a>
              </li>
              <li>
                <a href="">Earphones</a>
              </li>
            </ul>
          </div>
          <div>
            <button
              aria-label="Open cart"
              onClick={() => setShowCart(!showCart)}
              className="relative"
            >
              <Image
                src="Combined Shape.svg"
                alt="cart icon"
                width={20}
                height={20}
              />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalCount}
                </span>
              )}
            </button>
            {showCart && <CartPopup />}
          </div>
        </div>
      </nav>

      <section className="wrapper hero-section">
        <div className="hero-content text-white">
          <p className="subtitle">New product</p>
          <h2>XX99 Mark II Headphones</h2>
          <p>
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <button className="btn btn-primary">see product</button>
        </div>
        {/* Image container that only shows on desktop */}
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
    </header>
  );
}
