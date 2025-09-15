import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import Button from "./common/Button";

const Footer = () => {
  return (
    <footer
      className="relative w-full bg-black text-white"
    >
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Call */}
        <div>
          <p className="text-gray-400">Call us at</p>
          <p className="text-lg font-medium">+91 000 000 0000</p>
        </div>

        {/* Email */}
        <div>
          <p className="text-gray-400">Message us at</p>
          <p className="text-lg font-medium">hello@credflowai.co</p>
        </div>

        {/* Newsletter */}
        <div>
          <p className="text-gray-400 mb-2">Subscribe to our Newsletter</p>
          <div className="flex items-center py-1 border-white border rounded-full overflow-hidden max-w-96">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 text-white focus:outline-none"
            />
            <Button href="/waitlist" variant="primary" size="md" className="rounded-full mr-2 !py-1">
          Join Us
        </Button>
          </div>
        </div>
      </div>

      <hr className="border-gray-700" />

      {/* Bottom Section */}
      <div className="max-w-7xl py-10 mx-auto px-6  pb-60 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 relative">
        {/* Logo */}
        <div className="flex items-center cursor-pointer space-x-3 relative z-10">
          <Image
            src="/images/logoo.png"
            alt="Credflow Logo"
            width={200}
            height={100}
          />
        </div>

        {/* Navigation */}
        <div className="flex space-x-8 text-sm text-gray-300">
          <Link href="/product" className="hover:text-white">
            Product
          </Link>
          <Link href="/solutions" className="hover:text-white">
            Solutions
          </Link>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/resources" className="hover:text-white">
            Resources
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 text-xl">
          <Link
            href="/"
            className="p-2 border rounded-full hover:bg-white hover:text-black transition"
          >
            <FaXTwitter />
          </Link>
          <Link
            href="/"
            className="p-2 border rounded-full hover:bg-white hover:text-black transition"
          >
            <FaFacebookF />
          </Link>
          <Link
            href="/"
            className="p-2 border rounded-full hover:bg-white hover:text-black transition"
          >
            <FaInstagram />
          </Link>
          <Link
            href="/"
            className="p-2 border rounded-full hover:bg-white hover:text-black transition"
          >
            <FaLinkedinIn />
          </Link>
        </div>

        {/* Background Logo (large faint logo at bottom) */}
        <div className="absolute top-10 inset-0 flex justify-center items-center">
          <Image
            src="/images/logoshadow.png"
            alt="Background Logo"
            width={1000}
            height={1000}
            className="object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
