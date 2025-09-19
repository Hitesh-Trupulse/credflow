import React from 'react';
import Image from 'next/image';
import ScrollableProviderCards from './ProviderCard';
import EnrollmentFlowCard from './EnrollmentFlowCard';
import CredentialsCard from './CredentialsCard';
import MetricChipsCard from './MetricChipsCard';

const PlatformCard = ({ 
  number = "1", 
  title = "Real-Time Network Intelligence", 
  subtitle = "Always Current, Always Verified",
  description = "CredFlow Works Directly With Payers To Ingest Provider Data. Decisions Are Based On Today's Real-Time Data—Not A Spreadsheet From Last Year.",
  imageSrc = "/images/gif.gif",
  imageAlt = "Network Intelligence Visualization",
  showScrollingCards = false,
  showEnrollmentFlow = false,
  showCredentials = false,
  showMetricChips = false
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-black/90 backdrop-blur-sm border border-[#454545] p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-center">
        {/* Left Side - Content */}
        <div className="space-y-4 sm:px-10 min-h-[300px] sm:space-y-6 flex flex-col justify-center lg:col-span-2 order-2 lg:order-1">
          <div className="flex flex-col items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-white/20 flex items-center justify-center bg-gradient-to-b from-white/10 via-black to-white/10 backdrop-blur-sm flex-shrink-0">
              <span className="text-xl sm:text-3xl font-bold text-white">{number}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg py-2 pt-8 sm:text-xl md:text-2xl  font-bold text-white mb-2 leading-tight">
                {title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-md font-bold">
                {subtitle}
              </p>
              <p className=" leading-relaxed  text-gray-300 text-sm sm:text-md ">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Background Globe with Overlay Content */}
        <div className="relative flex lg:col-span-3 order-1 lg:order-2">
          <div className="relative w-full justify-center items-center aspect-video mx-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-none overflow-hidden">
            {/* Background Globe Image - Always present */}
            <div className="absolute w-full h-full">
              <Image
                width={1000} 
                height={1000}
                src="/images/gif.gif"
                alt="Globe Background"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlay Content - Scrollable Cards, Enrollment Flow, Credentials, Metric Chips, or Feature Image */}
            <div className="relative w-full h-full z-10 flex items-center shadow-2xl justify-center p-2 sm:p-3 md:p-4">
              {showScrollingCards ? (
                // Show scrolling provider cards for first card
                <div className="w-full h-full flex items-center justify-center">
                  <ScrollableProviderCards />
                </div>
              ) : showEnrollmentFlow ? (
                // Show enrollment flow for second card
                <div className="w-full h-full flex items-center justify-center">
                  <EnrollmentFlowCard />
                </div>
              ) : showCredentials ? (
                // Show credentials card for third card
                <div className="w-full h-full ">
                  <CredentialsCard />
                </div>
              ) : showMetricChips ? (
                // Show metric chips for fourth card
                <div className="w-full h-full ">
                  <MetricChipsCard />
                </div>
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
