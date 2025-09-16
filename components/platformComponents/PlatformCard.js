import React from 'react';
import Image from 'next/image';
import ScrollableProviderCards from './ProviderCard';

const PlatformCard = ({ 
  number = "1", 
  title = "Real-Time Network Intelligence", 
  subtitle = "Always Current, Always Verified",
  description = "CredFlow Works Directly With Payers To Ingest Provider Data. Decisions Are Based On Today's Real-Time Data—Not A Spreadsheet From Last Year.",
  imageSrc = "/images/gif.gif",
  imageAlt = "Network Intelligence Visualization",
  showScrollingCards = false
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto backdrop-blur-sm rounded-2xl border border-gray-700/50 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-center">
        {/* Left Side - Content */}
        <div className="space-y-4 sm:space-y-6 flex flex-col justify-center lg:col-span-2 order-2 lg:order-1">
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm flex-shrink-0">
              <span className="text-xl sm:text-2xl font-bold text-white">{number}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                {title}
              </h3>
              <p className="text-gray-300 text-base sm:text-lg mb-4 font-medium">
                {subtitle}
              </p>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Background Globe with Overlay Content */}
        <div className="relative flex lg:col-span-3 order-1 lg:order-2">
          <div className="relative w-full justify-center items-center aspect-video mx-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-none">
            {/* Background Globe Image - Always present */}
            <div className="absolute w-full h-full opacity-30">
              <Image
                width={1000} 
                height={1000}
                src="/images/gif.gif"
                alt="Globe Background"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlay Content - Scrollable Cards or Feature Image */}
            <div className="relative w-full h-full z-10 flex items-center shadow-2xl justify-center p-2 sm:p-4">
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
