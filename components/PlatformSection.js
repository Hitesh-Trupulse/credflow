import React from 'react';
import Image from 'next/image';

const PlatformSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Your All-in-One{" "}
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                AI Credentialing Platform
              </span>
            </h2>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Real-Time Network Intelligence
            </h3>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Our platform provides comprehensive network intelligence that tracks credentialing 
              status across all payers in real-time. Get instant updates, automated alerts, 
              and complete visibility into your provider network's credentialing pipeline.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-white font-medium">Automated Status Tracking</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-white font-medium">Real-time Notifications</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-white font-medium">Network-wide Visibility</span>
              </div>
            </div>
          </div>

          {/* Right Side - Network Visualization */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Network Background */}
              <Image
                src="/images/globe.png"
                alt="Network Intelligence Visualization"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
