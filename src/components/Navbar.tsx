"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import CartPopup from "./CartPopup";
import { useState, useEffect } from "react";
import CategorySectionCard from "./CategorySectionCard";

function Navbar() {
  const { showCart, setShowCart } = useCart();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const totalCount = useCart().items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isNavOpen]);

  return (
    <div className="bg-black">
      <nav className="wrapper">
        <div className="flex items-center justify-between py-4 border-b border-white/20">
          <div className="lg:hidden">
            <button onClick={toggleNav} className="p-2" aria-label="Open menu">
              <Image
                src="/Group.svg"
                alt="hamburger icon"
                width={16}
                height={15}
              />
            </button>
          </div>

          <Link
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none lg:mr-auto"
          >
            <Image
              src="/audiophile 2.svg"
              alt="audiophile logo"
              width={143}
              height={25}
              className="logo"
            />
          </Link>

          <div className="hidden lg:flex flex-1 justify-center">
            <ul className="flex gap-8">
              {["Home", "Headphones", "Speakers", "Earphones"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-white hover:text-[#D87D4A] transition-colors text-sm font-bold uppercase tracking-widest"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

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
                <p className="absolute -top-1 -right-1 bg-[#d87d4a] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalCount}
                </p>
              )}
            </button>
          </div>
        </div>
      </nav>

      {isNavOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50 flex justify-center"
          onClick={closeNav}
        >
          <div
            className="bg-white mt-20 rounded-b-2xl p-8 max-h-[70vh] overflow-y-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { imageSrc: "/headphone1.png", categoryName: "Headphones", linkUrl: "/headphones" },
                { imageSrc: "/speakers.png", categoryName: "Speakers", linkUrl: "/speakers" },
                { imageSrc: "/earphones.png", categoryName: "Earphones", linkUrl: "/earphones" },
              ].map(({ imageSrc, categoryName, linkUrl }) => (
                <div key={categoryName} onClick={closeNav}>
                  <CategorySectionCard
                    imageSrc={imageSrc}
                    categoryName={categoryName}
                    linkUrl={linkUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showCart && <CartPopup />}
    </div>
  );
}

export default Navbar;
