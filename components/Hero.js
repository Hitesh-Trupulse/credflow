"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./common/Button";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const textOptions = ["Time.", "Provider.", "Place."];
  
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
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
          <span className="block mb-2">Credentialing Made Easy.</span>
          <span className="block bg-gradient-to-r from-[#5063C6] from-20% to-[#B71CD2] bg-clip-text text-transparent flex items-center justify-center">
            <span className="inline-block min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[450px] xl:min-w-[500px] text-center">
              Right <span className="inline-block">
                {displayedText}
                <span className="animate-pulse text-white">|</span>
              </span>
            </span>
          </span>
        </h1>

        {/* Sub-heading */}
        <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
          Your Credentialing & Enrollment AI Agent That Learns Your Process,
          Follows Your Rules, And Accelerates Provider Onboarding—So Revenue
          Never Waits.
        </p>

        {/* CTA Button */}
        <Button variant="primary" size="md" className="rounded-full text-sm sm:text-base">
          Join The Waitlist
        </Button>
      </div>
    </section>
  );
};

export default Hero;
