import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import Button from "./common/Button";

export default function Navbar() {
  return (
    <nav className="relative w-full m-auto flex justify-center">
      <div className=" w-full max-w-[90vw] m-auto backdrop-blur-xl flex fixed top-10 z-20 items-center justify-between bg-black/20 border border-gray-600 text-white px-8 py-3 rounded-full shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        {/* Replace with your actual logo SVG/image */}
        <div className="flex items-center cursor-pointer space-x-3 relative z-10">
          <Image
            src="/images/fulllogo.png"
            alt="Credflow Logo"
            width={200}
            height={100}
          />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-10 text-sm">
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

      {/* CTA Button */}
      <div className="ml-6">
        <Button href="/waitlist" variant="primary" size="md" className="rounded-full">
          Join The Waitlist
        </Button>
      </div>
      </div>
    </nav>
  );
}
