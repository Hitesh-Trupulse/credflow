import React from 'react';
import Image from 'next/image';
import ScrollableProviderCards from './ProviderCard';

const PlatformCard = ({ 
  number = "1", 
  title = "Real-Time Network Intelligence", 
  subtitle = "Always Current, Always Verified",
  description = "CredFlow Works Directly With Payers To Ingest Provider Data. Decisions Are Based On Today's Real-Time Data—Not A Spreadsheet From Last Year.",
  imageSrc = "/images/globe.png",
  imageAlt = "Network Intelligence Visualization",
  showScrollingCards = false
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 md:p-8 lg:p-10">
      <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-center">
        {/* Left Side - Content */}
        <div className="space-y-6 flex flex-col justify-center col-span-2 ">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm flex-shrink-0">
              <span className="text-2xl font-bold text-white">{number}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                {title}
              </h3>
              <p className="text-gray-300 text-lg mb-4 font-medium">
                {subtitle}
              </p>
              <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Background Globe with Overlay Content */}
        <div className="relative flex col-span-3">
          <div className="relative w-full justify-center items-center aspect-video mx-auto">
            {/* Background Globe Image - Always present */}
            <div className="absolute w-full h-full opacity-30">
              <Image
                width={1000} 
                height={1000}
                src="/images/globe.png"
                alt="Globe Background"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlay Content - Scrollable Cards or Feature Image */}
            <div className="relative w-full h-full z-10 flex items-center justify-center">
              {showScrollingCards ? (
                // Show scrolling provider cards for first card
                <ScrollableProviderCards />
              ) : (
                // Show feature image for other cards
                <Image
                  width={400} 
                  height={400}
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;
