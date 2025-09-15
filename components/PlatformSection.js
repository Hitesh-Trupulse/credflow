import React from "react";
import PlatformCard from "./platformComponents/PlatformCard";

const PlatformSection = () => {
  return (
    <section className="py-20 bg-black text-white px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="text-sm text-gray-400 mb-4 tracking-widest">
            FEATURES
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
            <div className="text-white">Your All-in-One</div>
            <span className="bg-gradient-to-r from-[#5063C6] from-20% to-[#B71CD2] bg-clip-text text-transparent">
              AI Credentialing {""}
            </span>
            <span>Platform</span>
          </h2>
        </div>

        {/* Platform Cards Container */}
        <div className="space-y-8">
          <PlatformCard
            number="1"
            title="Real-Time Network Intelligence"
            subtitle="Always Current, Always Verified"
            description="CredFlow Works Directly With Payers To Ingest Provider Data. Decisions Are Based On Today's Real-Time Data—Not A Spreadsheet From Last Year."
          />
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
