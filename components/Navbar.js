import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="relative w-full m-auto flex justify-center">
      <div className=" w-full max-w-[90vw] m-auto backdrop-blur-xl flex fixed top-10 z-20 items-center justify-between bg-black/20 border border-gray-600 text-white px-8 py-3 rounded-full shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        {/* Replace with your actual logo SVG/image */}
        <div className="flex items-center cursor-pointer space-x-3 relative z-10">
          <Image
            src="/images/wrap.png"
            alt="Credflow Logo"
            width={200}
            height={100}
          />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-10 text-sm">
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link href="/product" className="hover:text-gray-300">
          Product
        </Link>
        <Link href="/who-we-help" className="hover:text-gray-300">
          Who We Help
        </Link>
        <Link href="/about" className="hover:text-gray-300">
          About Us
        </Link>
        <Link href="/resources" className="hover:text-gray-300">
          Resources
        </Link>
      </div>

      {/* CTA Button */}
      <Link
        href="/waitlist"
        className="ml-6 bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-gray-200 transition"
      >
        Join The Waitlist
      </Link>
      </div>
    </nav>
  );
}
