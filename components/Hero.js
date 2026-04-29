"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./common/Button";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const textOptions = useMemo(() => ["Time.", "Provider.", "Place."], []);
  
  useEffect(() => {
    const currentWord = textOptions[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing effect
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        } else {
          // Finished typing, wait a bit then start deleting
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting effect
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
        }
      }
    }, isDeleting ? 100 : 150); // Faster typing, slower deleting
    
    return () => clearTimeout(timeout);
  }, [displayedText, currentWordIndex, isDeleting, textOptions]);

  return (
    <section id="home" className="scroll-mt-32 relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
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
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-[1.05] tracking-tight">
          <span className="block mb-3">Get Providers Enrolled,</span>
          <span className="block mb-3">In-Network, And</span>
          <span className="relative inline-block font-medium">
            <span className="absolute -inset-x-4 bottom-2 h-5 rounded-full bg-gradient-to-r from-[#5063C6]/25 to-[#B71CD2]/25 blur-lg" />
            <span className="relative font-light bg-gradient-to-r from-[#5063C6] from-20% to-[#B71CD2] bg-clip-text text-transparent">
              Billing Faster.
            </span>
          </span>
        </h1>

        {/* Sub-heading */}
        <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
        Credflow gives medical groups a modern system of record,
AI-powered payer communication, and a done-for-you enrollment service —
all in one platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="md" className="rounded-full text-sm sm:text-base">
            Book a demo
          </Button>
          <Link
            href="/services#contact-form"
            className="group cursor-pointer inline-flex items-center justify-center font-medium transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-black hover:text-white hover:bg-blue-700 focus:ring-gray-500 hover:shadow-lg hover:shadow-blue-700/50 px-6 py-3 rounded-full text-sm sm:text-base"
          >
            Talk to an enrollment specialist
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
