"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Background Images - Same as Hero */}
      <div className="absolute inset-0">
        <Image
          src="/images/mainbg.png"
          alt="Main Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Secondary overlay background */}
      <div className="absolute inset-0">
        <Image
          src="/images/noisebg.png"
          alt="Stars Overlay"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-opacity duration-1000 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* 404 Number */}
          <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-light mb-4 leading-none">
            <span className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">
              404
            </span>
          </h1>

          {/* Error Message */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="group cursor-pointer inline-flex items-center justify-center font-medium transition-all duration-500 ease-out bg-white text-black hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:shadow-lg hover:shadow-blue-700/50 px-8 py-3 text-base rounded-full"
            >
              <div className="relative flex items-center px-5 justify-center w-full">
                <span className="transition-transform font-extralight duration-500 ease-out group-hover:-translate-x-3">
                  Go Home
                </span>
                <svg
                  className="absolute right-1 font-extralight w-4 h-4 opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

