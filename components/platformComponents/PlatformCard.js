import React from 'react';
import Image from 'next/image';

const PlatformCard = ({ 
  number = "1", 
  title = "Real-Time Network Intelligence", 
  subtitle = "Always Current, Always Verified",
  description = "CredFlow Works Directly With Payers To Ingest Provider Data. Decisions Are Based On Today's Real-Time Data—Not A Spreadsheet From Last Year.",
  imageSrc = "/images/globe.png",
  imageAlt = "Network Intelligence Visualization"
}) => {
  return (
    <div className="backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 md:p-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Content */}
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm flex-shrink-0">
              <span className="text-2xl text-white">{number}</span>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl text-white mb-2">
                {title}
              </h3>
              <p className="text-gray-300 text-lg mb-4">
                {subtitle}
              </p>
              <p className="text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Network Visualization */}
        <div className="relative">
          <div className="relative aspect-video mx-auto">
            {/* Network Background */}
            <Image
              width={500} 
              height={500}
              src={imageSrc}
              alt={imageAlt}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;
