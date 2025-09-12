import React from "react";
import Image from "next/image";

const Hero = () => {
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
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="block">Credentialing Made Easy.</span>
          <span className="block bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Right Provider.
          </span>
        </h1>

        {/* Sub-heading */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
          Your Credentialing & Enrollment AI Agent That Learns Your Process,
          Follows Your Rules, And Accelerates Provider Onboarding—So Revenue
          Never Waits.
        </p>

        {/* CTA Button */}
        <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
          Join The Waitlist
        </button>
      </div>
    </section>
  );
};

export default Hero;
