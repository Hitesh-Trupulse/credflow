"use client";

import Image from 'next/image';
import React from 'react';

// Main Metric Chips Card Component
export default function MetricChipsCard() {
  return (
    <div className="">
      {/* Image Content */}
      <div className="w-full h-full">
        <Image
        fill
          src="/images/new2.png" 
          alt="Metric Chips Visualization" 
          className="w-full h-full object-cover scale-110  rounded-lg"
        />
       
      </div>
    </div>
  );
}