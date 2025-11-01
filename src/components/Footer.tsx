import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="wrapper py-12">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
          {/* Brand and Description */}
          <div className="flex-1 max-w-md">
            <div className="h-1 bg-orange-500 w-20 mb-8"></div>
            <h2 className="text-2xl font-bold mb-4">audiophile</h2>
            <p className="text-gray-400 leading-relaxed">
              Audiophile is an all in one stop to fulfill your audio needs.
              We're a small team of music lovers and sound specialists who
              are devoted to helping you get the most out of personal audio. Come
              and visit our demo facility - we're open 7 days a week.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex-1">
            <ul className="flex flex-col lg:flex-row lg:justify-end gap-6 lg:gap-8 text-sm font-semibold">
              <li>
                <Link href="/" className="hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/headphones" className="hover:text-orange-500 transition-colors">
                  Headphones
                </Link>
              </li>
              <li>
                <Link href="/speakers" className="hover:text-orange-500 transition-colors">
                  Speakers
                </Link>
              </li>
              <li>
                <Link href="/earphones" className="hover:text-orange-500 transition-colors">
                  Earphones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <p className="text-gray-400 text-sm">
              Copyright 2024. All Rights Reserved
            </p>
            <div className="flex gap-4">
              {/* Social Media Icons would go here */}
              <div className="text-gray-400 text-sm">
                Connect with us: 
                {/* Add social media links */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;