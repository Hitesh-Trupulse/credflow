"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./common/Button";

const Hero = () => {
  const [currentText, setCurrentText] = useState("Provider");
  
  const textOptions = ["Time", "Provider", "Place"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prevText => {
        const currentIndex = textOptions.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % textOptions.length;
        return textOptions[nextIndex];
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Main Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/mainbg.png" // replace with your main background
          alt="Main Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Secondary overlay background (stars, gradient, etc) */}
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
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl text-white mb-6 leading-tight">
          <span className="block mb-2">Credentialing Made Easy.</span>
          <span className="block bg-gradient-to-r from-[#5063C6] from-20% to-[#B71CD2] bg-clip-text text-transparent transition-all duration-500 ease-in-out">
            Right {currentText}.
          </span>
        </h1>

        {/* Sub-heading */}
        <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
          Your Credentialing & Enrollment AI Agent That Learns Your Process,
          Follows Your Rules, And Accelerates Provider Onboarding—So Revenue
          Never Waits.
        </p>

        {/* CTA Button */}
        <Button href="/waitlist" variant="primary" size="md" className="rounded-full text-sm sm:text-base">
          Join The Waitlist
        </Button>
      </div>
    </section>
  );
};

export default Hero;
