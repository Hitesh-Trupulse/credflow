// "use client";
// import { useInView } from "react-intersection-observer";
// import CountUp from "react-countup";

// const StatsSection = () => {
//   const { ref, inView } = useInView({
//     threshold: 0.3,
//     triggerOnce: true, // Only trigger once
//   });

//   const stats = [
//     {
//       value: 60,
//       suffix: "%",
//       description: "Fewer Manual Payer And PSV Follow-Ups.",
//       borderColor: "border-blue-500",
//       bgColor: "bg-gradient-to-b from-blue-700/10 to-black"
//     },
//     {
//       value: 15,
//       suffix: "+",
//       description: "Billable Days Saved With Earlier Credentialing Issues Detection.",
//       borderColor: "border-[#FF34DD]",
//       bgColor: "bg-gradient-to-b from-[#FF34DD]/10 to-black"
//     },
//     {
//       value: 75,
//       suffix: "%",
//       description: "Reduction In Manual Data Entry.",
//       borderColor: "border-purple-500",
//       bgColor: "bg-gradient-to-b from-purple-700/10 to-black"
//     }
//   ];

//   return (
//     <section ref={ref} className="py-20 px-6 bg-black min-h-screen flex items-center">
//       <div className="max-w-7xl mx-auto w-full">
//         <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-16">
//           {stats.map((stat, index) => (
//             <div key={index} className="text-center flex-1 max-w-sm">
//               {/* Circular Stat Container */}
//               <div data-aos="zoom-in-up"
//                 className={`w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[430px] xl:h-[430px] mx-auto mb-8 rounded-full border-2 ${stat.borderColor} border-[0.5px] bg-gray-900/50 backdrop-blur-sm shadow-2xl flex flex-col items-center justify-center relative overflow-hidden`}
//               >
//                 {/* Subtle inner glow effect */}
//                 <div className={`absolute inset-0 rounded-full ${stat.bgColor}`}></div>
                
//                 <div className="relative z-10 text-center px-8">
//                   {/* Large Value with CountUp Animation */}
//                   <div data-aos="fade-up" className="text-6xl lg:text-7xl font-medium text-white mb-4 tracking-tight">
//                     {inView && (
//                       <CountUp
//                         start={0}
//                         end={stat.value}
//                         duration={2.5}
//                         delay={index * 0.3}
//                         suffix={stat.suffix}
//                         separator=","
//                         decimals={0}
//                       />
//                     )}
//                   </div>
                  
//                   {/* Description */}
//                   <p data-aos="fade-up" className="text-gray-500 text-sm lg:text-base leading-relaxed font-light max-w-48 mx-auto">
//                     {stat.description}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StatsSection;


"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import CountUp from "react-countup";
import gsap from "gsap";

const StatsSection = () => {
  const circlesRef = useRef([]);
  const textRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  const stats = [
    {
      value: 60,
      suffix: "%",
      description: "Fewer manual payer and PSV follow-ups.",
      borderColor: "border-blue-500",
      bgColor: "bg-gradient-to-b from-blue-700/20 to-black",
    },
    {
      value: 15,
      suffix: "+",
      description:
        "Billable days saved with earlier credentialing issues detection.",
      borderColor: "border-[#FF34DD]",
      bgColor: "bg-gradient-to-b from-[#FF34DD]/20 to-black",
    },
    {
      value: 75,
      suffix: "%",
      description: "Reduction in manual data entry.",
      borderColor: "border-purple-500",
      bgColor: "bg-gradient-to-b from-purple-700/20 to-black",
    },
  ];

  // Detect mobile device and set initial state
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      
      if (mobile) {
        // Simple mobile animation - all circles start visible and fade in
        gsap.set(circlesRef.current, { autoAlpha: 0, y: 50 });
      } else {
        // Desktop animation - set default zoomed-in state
        gsap.set(circlesRef.current[1], { scale: 5 });
        gsap.set(textRef.current[1], { autoAlpha: 0 });
        gsap.set(circlesRef.current[0], { x: "-200%", autoAlpha: 0, scale: 0.5 });
        gsap.set(circlesRef.current[2], { x: "200%", autoAlpha: 0, scale: 0.5 });
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const animateIn = useCallback(() => {
    if (isMobile) {
      // Simple mobile animation - fade in all circles with stagger
      gsap.to(circlesRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    } else {
      // Desktop animation - complex hover effect
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(circlesRef.current[1], {
        scale: 1,
        duration: 1.2,
      });
      tl.to(
        [circlesRef.current[0], circlesRef.current[2]],
        {
          x: "0%",
          autoAlpha: 1,
          scale: 1,
          duration: 1.2,
        },
        "<"
      );
      tl.to(
        textRef.current[1],
        {
          autoAlpha: 1,
          duration: 0.6,
        },
        "<0.5"
      );
    }
  }, [isMobile]);

  const animateOut = () => {
    if (isMobile) {
      // Mobile doesn't need animate out - animation stays visible
      return;
    }
    
    // Desktop animation out
    const tl = gsap.timeline({ defaults: { ease: "power3.in" } });

    tl.to(circlesRef.current[1], {
      scale: 5,
      duration: 0.8,
    });
    tl.to(
      [circlesRef.current[0], circlesRef.current[2]],
      {
        x: (i) => (i === 0 ? "-200%" : "200%"),
        autoAlpha: 0,
        scale: 0.5,
        duration: 0.8,
      },
      "<"
    );
    tl.to(
      textRef.current[1],
      {
        autoAlpha: 0,
        duration: 0.3,
      },
      "<"
    );
  };

  // Add mobile animation trigger on component mount
  useEffect(() => {
    if (isMobile) {
      // Trigger mobile animation after a short delay
      const timer = setTimeout(() => {
        animateIn();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile, animateIn]);

  return (
    <section
      onMouseEnter={!isMobile ? animateIn : undefined}
      onMouseLeave={!isMobile ? animateOut : undefined}
      className="py-20 px-6 bg-black min-h-screen flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-center gap-3 items-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center flex-1 max-w-sm relative flex justify-center"
          >
            <div
              ref={(el) => (circlesRef.current[index] = el)}
              className={`
                relative w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px]
                rounded-full border ${stat.borderColor} ${stat.bgColor}
                flex flex-col items-center justify-center overflow-hidden shadow-2xl
              `}
            >
              <div
                ref={(el) => (textRef.current[index] = el)}
                className="relative z-10 text-center px-8"
              >
                <div data-aos="fade-down" className="text-6xl lg:text-7xl scale-125 text-white mb-4 tracking-tight">
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                    separator=","
                    decimals={0}
                  />
                </div>
                <p data-aos="fade-up" className="text-gray-500 text-sm lg:text-base leading-relaxed font-light max-w-48 mx-auto">
                  {stat.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
