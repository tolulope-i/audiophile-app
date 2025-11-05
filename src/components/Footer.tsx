import Link from "next/link";
import { FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-black text-white mt-auto relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#d87d4a] lg:left-30 lg:transform-none"></div>

      <div className="wrapper py-12 pt-16">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
          <div className="flex flex-col lg:flex-row lg:gap-32 lg:items-start">
            <div className="text-center md:text-left mb-8 lg:mb-0">
              <h6 className="text-sm font-bold mb-8">audiophile</h6>

              <div className="flex-1 text-center md:text-left">
                <p className="text-white/50 leading-relaxed max-w-xl">
                  Audiophile is an all in one stop to fulfill your audio needs.
                  We are a small team of music lovers and sound specialists who
                  are devoted to helping you get the most out of personal audio.
                  Come and visit our demo facility - we are open 7 days a week.
                </p>
              </div>
            </div>

            <ul className="flex flex-col justify-center items-center text-center md:flex-row gap-4 lg:gap-8 text-sm font-semibold uppercase tracking-widest">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#d87d4a] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/headphones"
                  className="hover:text-[#d87d4a] transition-colors"
                >
                  Headphones
                </Link>
              </li>
              <li>
                <Link
                  href="/speakers"
                  className="hover:text-[#d87d4a] transition-colors"
                >
                  Speakers
                </Link>
              </li>
              <li>
                <Link
                  href="/earphones"
                  className="hover:text-[#d87d4a] transition-colors"
                >
                  Earphones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <p className="text-white/50 text-center lg:text-left">
              Copyright 2024. All Rights Reserved
            </p>

            <div className="flex justify-center lg:justify-end">
              <ul className="flex gap-4 text-white text-lg">
                <li>
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    className="hover:text-[#d87d4a] transition-colors"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    className="hover:text-[#d87d4a] transition-colors"
                    aria-label="Twitter"
                  >
                    <FaXTwitter />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    className="hover:text-[#d87d4a] transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
