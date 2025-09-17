"use client";

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Main Metric Chips Card Component
export default function MetricChipsCard() {
  return (
    <div className="w-full max-w-[300px] sm:max-w-xl h-[150px] sm:h-[300px] bg-gray-800/30 backdrop-blur-md border border-gray-600 text-white rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-2 sm:mb-3">
        <h2 className="text-xl sm:text-3xl font-semibold text-white">Metric Chips</h2>
      </div>

      <div className='flex flex-col justify-between sm:gap-10'>
        {/* Primary Metric Chip */}
        <div className="mb-2 sm:mb-3 md:mb-4">
          <div className="flex justify-center mb-1 sm:mb-2">
            <div className="backdrop-blur-sm rounded-full px-3 sm:px-4 md:px-6 py-1 sm:py-2 shadow-lg">
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white">$18,000</div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-300">Start Date Progress</p>
          </div>
        </div>

        {/* Secondary Metric Chips - Three Column Layout */}
        <div className="hidden sm:grid grid-cols-3 gap-1 sm:gap-2 md:gap-3 backdrop-blur-sm rounded-2xl sm:rounded-3xl px-2 sm:px-3 md:px-6 py-1 sm:py-2 shadow-lg">
          {/* First Secondary Chip - 76% with up arrow */}
          <div className="text-center">
            <div className="mb-1">
              <div className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white flex items-center justify-center gap-1">
                76%
                <TrendingUp className="text-gray-300 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              </div>
            </div>
            <div className="text-xs text-gray-300 leading-tight">
              Provider Network Ready for Claims
            </div>
          </div>

          {/* Second Secondary Chip - 43% with down arrow */}
          <div className="text-center">
            <div className="mb-1">
              <div className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white flex items-center justify-center gap-1">
                43%
                <TrendingDown className="text-gray-300 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              </div>
            </div>
            <div className="text-xs text-gray-300">
              Start Date Progress
            </div>
          </div>

          {/* Third Secondary Chip - 58% with down arrow */}
          <div className="text-center">
            <div className="mb-1">
              <div className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white flex items-center justify-center gap-1">
                58%
                <TrendingDown className="text-gray-300 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              </div>
            </div>
            <div className="text-xs text-gray-300">
              Timely Filing Risks
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}