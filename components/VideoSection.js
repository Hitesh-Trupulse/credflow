import React from "react";
import Image from "next/image";


const VideoSection = () => {
  return (
    <section className='bg-[url("/images/graybg.png")] bg-cover bg-center'>
      <div className="py-20 px-6 ">
        <div className="max-w-7xl mx-auto text-center">
          {/* Headline */}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight text-white"
            data-aos="fade-down"
          >
            Meet Credflow AI
          </h2>
          <h3 
            className="text-3xl md:text-4xl text-white lg:text-5xl mb-16 leading-tight"
            data-aos="fade-down"
          >
            <span className="">
              Smarter Credentialing Starts Here
            </span>
          </h3>

          {/* Video Player */}
          <div className="relative max-w-6xl mx-auto">
            <div 
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
              data-aos="fade-up"
            >
              {/* Video Thumbnail */}
              <Image
                src="/images/videobg.png"
                alt="Credflow AI Demo Video"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Images with AOS animations */}
            <Image
              data-aos="fade-down"
              height={100}
              width={100}
              src="/images/v2.png"
              alt="Decorative element"
              className="absolute hidden lg:block -top-24 left-32"
            />
            
            <Image
              data-aos="fade-left"
              height={150}
              width={150}
              src="/images/v3.png"
              alt="Decorative element"
              className="absolute hidden lg:block bottom-[50%] -left-40"
            />
            
            <Image
              data-aos="fade-down"
              height={120}
              width={120}
              src="/images/v4.png"
              alt="Decorative element"
              className="absolute hidden lg:block -bottom-40 right-60"
            />
            
            <Image
              data-aos="fade-left"
              height={200}
              width={300}
              src="/images/v1.png"
              alt="Decorative element"
              className="absolute hidden lg:block -top-18 -right-40"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
