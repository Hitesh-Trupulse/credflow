// "use client";

// import Image from 'next/image';
// import React from 'react';

// // Main Metric Chips Card Component
// export default function MetricChipsCard() {
//   return (
//     <div className="">
//       {/* Image Content */}
//       <div className="w-full relative h-full">
//         <Image
//         fill
//           src="/images/new2.png" 
//           alt="Metric Chips Visualization" 
//           className="w-full h-full object-cover scale-110  rounded-lg"
//         />
       
//       </div>
//     </div>
//   );
// }

import Image from 'next/image';
import React from 'react';

const MetricChipsCard = () => {
  return (
    <div className="flex items-center justify-center h-full">
       {/* Image Content */}
       <div className="w-full lg:hidden relative h-full">
        <Image
        fill
          src="/images/new2.png" 
          alt="Metric Chips Visualization" 
          className="w-full h-full object-cover scale-110  rounded-lg"
        /></div>
      <div className="w-full lg:block hidden max-w-xl h-full">
        {/* Main Card Container - Fixed 320px height */}
        <div className="relative h-[320px] backdrop-blur-lg border border-white/30 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
          {/* Title */}
          <h1 className="text-white text-2xl font-bold md:text-3xl text-center">
            Metric Chips
          </h1>
          
          {/* Main Amount */}
          <div className="flex justify-center">
            <div className="bg-purple-300/10 backdrop-blur-sm rounded-2xl px-6 py-1 border border-purple-200/30">
              <span className="text-white text-2xl sm:text-4xl font-medium">$18,000</span>
            </div>
          </div>
          
          {/* Start Date Progress Label */}
          <p className="text-gray-300 text-center text-sm">Start Date Progress</p>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-4 bg-purple-300/10 backdrop-blur-sm  p-2 border border-purple-200/30 rounded-3xl">
            {/* Provider Network Ready for Claims */}
            <div className="text-center">
              <div className="flex relative items-center justify-center mb-1">
                <span className="text-white text-3xl sm:text-5xl font-bold">76%</span>
                <Image
                width={40}
                height={40}
                  src="/images/down.gif" 
                  alt="Down arrow" 
                  className="absolute rotate-180 top-2 -right-2 ml-1 w-8 h-8 sm:w-12 sm:h-12"
                />
              </div>
              <p className="text-gray-300 text-xs leading-tight">
                Provider Network Ready for Claims
              </p>
            </div>
            
            {/* Start Date Progress */}
            <div className="text-center">
              <div className="flex relative items-center justify-center mb-1">
                <span className="text-white sm:text-5xl text-3xl font-bold">43%</span>
                <Image
                width={100}
                height={100}
                  src="/images/down.gif" 
                  alt="Down arrow" 
                  className="absolute -right-2 ml-1 w-8 h-8 sm:w-12 sm:h-12"
                />
              </div>
              <p className="text-gray-300 text-xs leading-tight">
                Start Date Progress
              </p>
            </div>
            
            {/* Timely Filing Risks */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <span className="text-white sm:text-5xl text-3xl font-bold">58%</span>
                <svg 
                  className="ml-1 w-4 h-4 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <p className="text-gray-300 text-xs leading-tight">
                Timely Filing Risks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricChipsCard;