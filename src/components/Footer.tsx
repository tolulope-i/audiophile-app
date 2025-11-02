import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="wrapper py-12">
        <div className="flex flex-col text-center md:text-left ">
          {/* Brand and Description */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">
            <div className="">
              <div className="h-1 bg-[#d87d4a] w-20 mb-8 text-center"></div>
              <h2 className="text-2xl font-bold mb-4">audiophile</h2>
            </div>

            <ul className="flex flex-col lg:flex-row lg:justify-end gap-6 lg:gap-8 text-sm font-semibold">
              <li>
                <Link
                  href="/"
                  className="hover:text-orange-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/headphones"
                  className="hover:text-orange-500 transition-colors"
                >
                  Headphones
                </Link>
              </li>
              <li>
                <Link
                  href="/speakers"
                  className="hover:text-orange-500 transition-colors"
                >
                  Speakers
                </Link>
              </li>
              <li>
                <Link
                  href="/earphones"
                  className="hover:text-orange-500 transition-colors"
                >
                  Earphones
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="flex-1">
            <p className="text-white opacity-50 leading-relaxed lg:max-w-[540px]">
              Audiophile is an all in one stop to fulfill your audio needs.
              We're a small team of music lovers and sound specialists who are
              devoted to helping you get the most out of personal audio. Come
              and visit our demo facility - we're open 7 days a week.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col text-center md:flex-row md:justify-between md:items-center gap-4">
            <p className="text-white opacity-50">
              Copyright 2024. All Rights Reserved
            </p>
            <div className="">
              <ul className="flex justify-center gap-6 text-white text-md">
                <li>
                  <Link
                    href="https://www.facebook.com/marvelous.ilesanmi.9"
                    target="_blank"
                  >
                    <FaFacebookF />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/dev__tolu?t=Y-q7l2pvY5032cfCsZp2mA&s=08"
                    target="_blank"
                  >
                    <FaXTwitter />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/tolu__nimi?igsh=MXN6M29yeXJhN3Z3Ng=="
                    target="_blank"
                  >
                    <FaInstagram />
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="https://www.linkedin.com/in/tolulope-ilesanmi?"
                    target="_blank"
                  >
                    <FaLinkedinIn />
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
