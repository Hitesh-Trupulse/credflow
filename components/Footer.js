"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import Button from "./common/Button";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Show success toast
    toast.success("Successfully subscribed to our newsletter!");
    
    // Clear the input field
    setEmail("");
  };

  return (
    <footer
      className="relative w-full bg-black text-white"
    >
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col text-center gap-4 sm:flex-row justify-between items-center">
        {/* Call */}
        {/* <div>
          <p className="text-gray-400">Call us at</p>
          <p className="text-lg font-medium">+91 000 000 0000</p>
        </div> */}

        {/* Email */}
        <div>
          <p className="text-gray-400">Mail us at</p>
          <p className="text-lg font-medium">hello@credflow.ai</p>
        </div>

        {/* Newsletter */}
        <div>
          <p className="text-gray-400 mb-2">Subscribe to our Newsletter</p>
          <form onSubmit={handleNewsletterSubmit} className="flex items-center py-1 border-white border rounded-full overflow-hidden max-w-96">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 text-white bg-transparent focus:outline-none placeholder:text-gray-500"
            />
            <button 
              type="submit"
              className="rounded-full hover:bg-blue-500 hover:text-white duration-300 bg-white px-2 py-1 cursor-pointer text-black mr-2"
            >
              Join Us
            </button>
          </form>
        </div>
      </div>

      <hr className="border-[#454545] max-w-[80vw] mx-auto" />

      {/* Bottom Section */}
      <div className="max-w-7xl overflow-hidden py-10 mx-auto px-6  pb-60 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 relative">
        {/* Logo */}
        <div className="flex items-center cursor-pointer space-x-3 relative z-10">
          <Image
            src="/images/new.png"
            alt="Credflow Logo"
            width={200}
            height={100}
          />
        </div>

        {/* Navigation */}
        {/* <div className="flex space-x-8 text-sm text-gray-300">
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
        </div> */}

        {/* Social Icons */}
        <div className="flex space-x-4 text-md">
          {/* <Link
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
          </Link> */}
          <div className="cursor-pointer">Terms & Conditions</div>
          <div className="cursor-pointer">Privacy Policy</div>
        </div>

        {/* Background Logo (large faint logo at bottom) */}
        <div className="absolute top-60 inset-0 flex justify-center items-center">
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
