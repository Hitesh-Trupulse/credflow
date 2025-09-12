import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

const VideoSection = () => {
  return (
    <section className='bg-[url("/images/graybg.png")] bg-cover bg-center'>
    <div className="py-20 px-6 ">
        <div className="max-w-7xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Meet Credflow AI
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Smarter Credentialing Starts Here
            </span>
          </h3>

          {/* Video Player */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            {/* Video Thumbnail */}
            <Image
              src="/images/videobg.png"
              alt="Credflow AI Demo Video"
              fill
              className="object-cover"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors duration-300">
              <button className="bg-white/90 hover:bg-white text-gray-900 rounded-full p-6 shadow-lg hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default VideoSection;
