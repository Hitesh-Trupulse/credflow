import Image from 'next/image';
import React from 'react';

const MetricChipsCard = () => {
  return (
    <div className="flex items-center justify-center h-full w-full px-2 sm:px-4 md:px-6">
      <div className="w-full max-w-xl h-full">
        {/* Main Card Container - Responsive height */}
        <div className="relative h-[160px] sm:h-[280px] md:h-[320px] backdrop-blur-lg border border-white/30 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 shadow-2xl flex flex-col justify-between">
          
          {/* Title - Responsive text size */}
          <p className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl mt-2 sm:mt-4 md:mt-6 lg:mt-10 font-bold text-center">
            Revenue Protected
          </p>
          
          {/* Metrics Grid - Responsive layout */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 mb-2 sm:mb-4 md:mb-6 lg:mb-10 bg-purple-300/10 backdrop-blur-sm p-1.5 sm:p-2 border border-purple-200/30 rounded-xl sm:rounded-2xl md:rounded-3xl">
            {/* Provider Network Ready for Claims */}
            <div className="text-center">
              <div className="flex relative items-center justify-center mb-0.5">
                <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl sm:mr-2 font-bold">76%</span>
                <Image
                  width={40}
                  height={40}
                  src="/images/down.gif" 
                  alt="Down arrow" 
                  className="absolute rotate-180 top-0.5 sm:top-1 md:top-2 -right-0.5 sm:-right-1 md:-right-2 ml-1 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                />
              </div>
              <p className="text-gray-300 text-[0.5rem] sm:text-[0.6rem] md:text-xs leading-tight px-0.5 sm:px-1">
                Provider network ready for claims
              </p>
            </div>
            
            {/* Start Date Progress */}
            <div className="text-center">
              <div className="flex relative items-center justify-center mb-0.5">
                <span className="text-white text-xl sm:text-2xl md:text-3xl sm:mr-2 lg:text-4xl xl:text-5xl font-bold">43%</span>
                <Image
                  width={40}
                  height={40}
                  src="/images/down.gif" 
                  alt="Down arrow" 
                  className="absolute -right-0.5 sm:-right-1 md:-right-2 ml-1 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                />
              </div>
              <p className="text-gray-300 text-[0.5rem] sm:text-[0.6rem] md:text-xs leading-tight px-0.5 sm:px-1">
                Start date progress
              </p>
            </div>
            
            {/* Timely Filing Risks */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-0.5 relative">
                <span className="text-white text-xl sm:text-2xl md:text-3xl sm:mr-2 lg:text-4xl xl:text-5xl font-bold">58%</span>
                <Image
                  width={40}
                  height={40}
                  src="/images/down.gif" 
                  alt="Down arrow" 
                  className="absolute -right-0.5 sm:-right-1 md:-right-2 ml-1 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                />
              </div>
              <p className="text-gray-300 text-[0.5rem] sm:text-[0.6rem] md:text-xs leading-tight px-0.5 sm:px-1">
                Timely filing risks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricChipsCard;