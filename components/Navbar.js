"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import Button from "./common/Button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative w-full m-auto flex justify-center">
      <div className="w-full max-w-[90vw] xl:max-w-[90vw] m-auto backdrop-blur-xl flex fixed top-4 xl:top-10 z-20 items-center justify-between bg-black/20 border border-gray-600 text-white px-4 sm:px-6 lg:px-8 py-3 rounded-full shadow-md">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center cursor-pointer space-x-3 relative z-10">
            <Image
              src="/images/logoo.png"
              alt="Credflow Logo"
              width={120}
              height={60}
              className="w-24 sm:w-32 lg:w-40 xl:w-[200px] h-auto"
            />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex space-x-10 text-sm">
          <Link 
            href="/" 
            className="nav-link group flex items-center space-x-2 hover:text-blue-700 transition-all duration-500 ease-out"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-500 ease-out">Home</span>
            <FaArrowRight className="w-4 h-4 text-blue-700 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
          </Link>
          <Link 
            href="/product" 
            className="nav-link group flex items-center space-x-2 hover:text-blue-700 transition-all duration-500 ease-out"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-500 ease-out">Product</span>
            <FaArrowRight className="w-4 h-4 text-blue-700 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
          </Link>
          <Link 
            href="/who-we-help" 
            className="nav-link group flex items-center space-x-2 hover:text-blue-700 transition-all duration-500 ease-out"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-500 ease-out">Who We Help</span>
            <FaArrowRight className="w-4 h-4 text-blue-700 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
          </Link>
          <Link 
            href="/about" 
            className="nav-link group flex items-center space-x-2 hover:text-blue-700 transition-all duration-500 ease-out"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-500 ease-out">About Us</span>
            <FaArrowRight className="w-4 h-4 text-blue-700 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
          </Link>
          <Link 
            href="/resources" 
            className="nav-link group flex items-center space-x-2 hover:text-blue-700 transition-all duration-500 ease-out"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-500 ease-out">Resources</span>
            <FaArrowRight className="w-4 h-4 text-blue-700 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
          </Link>
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block ml-6">
          <Button href="/waitlist" variant="primary" size="md" className="rounded-full">
            Join The Waitlist
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="xl:hidden flex items-center justify-center w-10 h-10 rounded-full bg-black/20 border border-gray-600 hover:bg-black/30 transition-colors duration-300"
        >
          {isMenuOpen ? (
            <FaTimes className="w-5 h-5 text-white" />
          ) : (
            <FaBars className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 xl:hidden" onClick={toggleMenu}>
            <div className="absolute top-20 left-4 right-4 bg-black/90 border border-gray-600 rounded-2xl p-6 shadow-xl">
              {/* Mobile Navigation Links */}
              <div className="space-y-4 mb-6">
                <Link 
                  href="/" 
                  className="block text-white hover:text-blue-700 transition-colors duration-300 py-2"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <Link 
                  href="/product" 
                  className="block text-white hover:text-blue-700 transition-colors duration-300 py-2"
                  onClick={toggleMenu}
                >
                  Product
                </Link>
                <Link 
                  href="/who-we-help" 
                  className="block text-white hover:text-blue-700 transition-colors duration-300 py-2"
                  onClick={toggleMenu}
                >
                  Who We Help
                </Link>
                <Link 
                  href="/about" 
                  className="block text-white hover:text-blue-700 transition-colors duration-300 py-2"
                  onClick={toggleMenu}
                >
                  About Us
                </Link>
                <Link 
                  href="/resources" 
                  className="block text-white hover:text-blue-700 transition-colors duration-300 py-2"
                  onClick={toggleMenu}
                >
                  Resources
                </Link>
              </div>

              {/* Mobile CTA Button */}
              <Button href="/waitlist" variant="primary" size="md" className="rounded-full w-full">
                Join The Waitlist
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
