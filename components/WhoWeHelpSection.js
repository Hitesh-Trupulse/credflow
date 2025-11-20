"use client";
import { Clock } from "lucide-react";

const cards = [
  {
    title: "Hospitals & Health Systems",
    description:
      "Large networks needing streamlined operations and compliance at scale.",
    gradient: "from-[#454545]/10 to-[#2A154E]/40",
    animation: "fade-down",
  },
  {
    title: "Physician Groups",
    description:
      "Clinics seeking smoother scheduling, billing, and patient flow.",
    gradient: "from-[#454545]/10 to-gray-700/20",
    animation: "fade-up",
  },
  {
    title: "Payers",
    description:
      "We work with health plans to streamline healthcare provider credentialing and enable AI tools in their workflow. Our proprietary data-lake optimizes No Surprises Act directory compliance.",
    gradient: "from-[#15204E]/40 to-[#454545]/10",
    animation: "fade-down",
  },
  {
    title: "RCM Organizations",
    description:
      "Billing experts focused on speed, accuracy, and revenue protection.",
    gradient: "from-[#454545]/40 to-black",
    animation: "fade-up",
  },
  {
    title: "Telehealth Providers",
    description:
      "Digital care platforms needing seamless, reliable integrations.",
    gradient: "from-[#454545]/10 to-[#114131]/40",
    animation: "fade-down",
  },
  {
    title: "Ambulatory Surgery Centers (ASCs)",
    description:
      "Same-day surgical facilities balancing efficiency, cost, and compliance.",
    gradient: "from-black to-[#454545]/20",
    animation: "fade-up",
  },
];

export default function WhoWeHelpSection() {
  return (
    <section id="who-we-help" className="scroll-mt-32 bg-black py-20 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 data-aos="fade-down" className="text-5xl sm:text-6xl lg:text-7xl mb-4">
          Who We{" "}
          <span className="bg-gradient-to-r from-[#5063C6] from-20% to-[#B71CD2] bg-clip-text text-transparent">
            Help
          </span>
        </h2>
        <p
          data-aos="fade-down"
          className="text-gray-400 max-w-2xl mx-auto mb-16"
        >
          Legacy tools track tasks. Credflow AI completes them.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div
              data-aos={card.animation}
              data-aos-delay={i * 100} // stagger animations
              key={i}
              className={`relative text-center bg-gradient-to-br ${card.gradient} p-8 text-left transition-transform cursor-pointer`}
            >
              {/* Decorative borders */}
              {i === 1 || i === 0 ? (
                <div data-aos="zoom-in" className="absolute hidden lg:block top-1/4 right-0 w-px h-1/2 bg-gradient-to-b from-purple-500/30 to-blue-500/30"></div>
              ) : null}

              {i === 4 || i === 5 ? (
                <div data-aos="zoom-in" className=" hidden lg:block absolute top-1/4 left-0 w-px h-1/2 bg-gradient-to-b from-blue-500/30 to-emerald-500/30"></div>
              ) : null}

              {/* Icon */}
              <div
                data-aos="zoom-in"
                className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${card.gradient} border border-[#454545] mb-6 mx-auto`}
              >
                <Clock className="w-7 h-7 text-gray-300" />
              </div>

              {/* Title */}
              <h3
                data-aos="zoom-in"
                className="text-lg font-semibold text-center mb-2"
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                data-aos="zoom-in"
                className="text-gray-400 text-sm text-center leading-relaxed"
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// "use client";
// import { Clock } from "lucide-react";
// import { useRef, useEffect } from "react";
// import gsap from "gsap";

// const cards = [
//   {
//     title: "Hospitals & Health Systems",
//     description:
//       "Large Networks Needing Streamlined Operations And Compliance At Scale.",
//     gradient: "from-[#454545]/10 to-[#2A154E]/40",
//     animation: "fade-down",
//   },
//   {
//     title: "Physician Groups",
//     description:
//       "Clinics Seeking Smoother Scheduling, Billing, And Patient Flow.",
//     gradient: "from-[#454545]/10 to-gray-700/20",
//     animation: "fade-up",
//   },
//   {
//     title: "Payers",
//     description:
//       "We Work With Health Plans To Streamline Credentialing And Enable AI Tools In Their Workflow. Our Proprietary Data-Lake Optimizes No Surprises Act Directory Compliance.",
//     gradient: "from-[#15204E]/40 to-[#454545]/10",
//     animation: "fade-down",
//   },
//   {
//     title: "RCM Organizations",
//     description:
//       "Billing Experts Focused On Speed, Accuracy, And Revenue Protection.",
//     gradient: "from-[#454545]/40 to-black",
//     animation: "fade-up",
//   },
//   {
//     title: "Telehealth Providers",
//     description:
//       "Digital Care Platforms Needing Seamless, Reliable Integrations.",
//     gradient: "from-[#454545]/10 to-[#114131]/40",
//     animation: "fade-down",
//   },
//   {
//     title: "Ambulatory Surgery Centers (ASCs)",
//     description:
//       "Same-Day Surgical Facilities Balancing Efficiency, Cost, And Compliance.",
//     gradient: "from-black to-[#454545]/20",
//     animation: "fade-up",
//   },
// ];

// export default function WhoWeHelpSection() {
//   const cardsRef = useRef([]);
//   const textRef = useRef([]);

//   // Set default zoomed-in state for desktop only
//   useEffect(() => {
//     // Only apply on desktop (lg breakpoint and above)
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         // Desktop: Zoom in the 5th card and hide content
//         gsap.set(cardsRef.current[4], { scale: 4 });
//         gsap.set(textRef.current[4], { autoAlpha: 0 });
        
//         // Hide other cards
//         gsap.set(cardsRef.current[0], { x: "-200%", autoAlpha: 0, scale: 0.5 });
//         gsap.set(cardsRef.current[1], { x: "-200%", autoAlpha: 0, scale: 0.5 });
//         gsap.set(cardsRef.current[2], { x: "-200%", autoAlpha: 0, scale: 0.5 });
//         gsap.set(cardsRef.current[3], { x: "-200%", autoAlpha: 0, scale: 0.5 });
//         gsap.set(cardsRef.current[5], { x: "200%", autoAlpha: 0, scale: 0.5 });
//       } else {
//         // Mobile/Tablet: Reset all animations
//         cardsRef.current.forEach((card) => {
//           if (card) gsap.set(card, { scale: 1, x: "0%", autoAlpha: 1 });
//         });
//         textRef.current.forEach((text) => {
//           if (text) gsap.set(text, { autoAlpha: 1 });
//         });
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const animateIn = () => {
//     if (window.innerWidth < 1024) return; // Only animate on desktop

//     const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

//     // Scale down the 5th card
//     tl.to(cardsRef.current[4], {
//       scale: 1,
//       duration: 1.2,
//     });
    
//     // Bring in all other cards
//     tl.to(
//       [cardsRef.current[0], cardsRef.current[1], cardsRef.current[2], cardsRef.current[3], cardsRef.current[5]],
//       {
//         x: "0%",
//         autoAlpha: 1,
//         scale: 1,
//         duration: 1.2,
//       },
//       "<"
//     );

//     // Show content of 5th card
//     tl.to(
//       textRef.current[4],
//       {
//         autoAlpha: 1,
//         duration: 0.6,
//       },
//       "<0.5"
//     );
//   };

//   const animateOut = () => {
//     if (window.innerWidth < 1024) return; // Only animate on desktop

//     const tl = gsap.timeline({ defaults: { ease: "power3.in" } });

//     // Zoom back the 5th card
//     tl.to(cardsRef.current[4], {
//       scale: 4,
//       duration: 0.8,
//     });
    
//     // Push out other cards
//     tl.to(
//       [cardsRef.current[0], cardsRef.current[1], cardsRef.current[2], cardsRef.current[3]],
//       {
//         x: "-200%",
//         autoAlpha: 0,
//         scale: 0.5,
//         duration: 0.8,
//       },
//       "<"
//     );
//     tl.to(
//       cardsRef.current[5],
//       {
//         x: "200%",
//         autoAlpha: 0,
//         scale: 0.5,
//         duration: 0.8,
//       },
//       "<"
//     );

//     // Hide content of 5th card
//     tl.to(
//       textRef.current[4],
//       {
//         autoAlpha: 0,
//         duration: 0.3,
//       },
//       "<"
//     );
//   };

//   return (
//     <section 
//       id="who-we-help" 
//       className="scroll-mt-32 bg-black py-20 text-white overflow-hidden"
//       onMouseEnter={animateIn}
//       onMouseLeave={animateOut}
//     >
//       <div className="max-w-6xl mx-auto px-6 text-center">
//         <h2 data-aos="fade-down" className="text-5xl sm:text-6xl lg:text-7xl mb-4">
//           Who We{" "}
//           <span className="bg-gradient-to-r from-[#5063C6] from-20% to-[#B71CD2] bg-clip-text text-transparent">
//             Help
//           </span>
//         </h2>
//         <p
//           data-aos="fade-down"
//           className="text-gray-400 max-w-2xl mx-auto mb-16"
//         >
//           Legacy Tools Track Tasks. Credflow AI Completes Them.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {cards.map((card, i) => (
//             <div
//               key={i}
//               ref={(el) => (cardsRef.current[i] = el)}
//               data-aos={card.animation}
//               data-aos-delay={i * 100} // stagger animations
//               className={`relative text-center bg-gradient-to-br ${card.gradient} p-8 text-left transition-transform cursor-pointer`}
//             >
//               {/* Decorative borders */}
//               {i === 1 || i === 0 ? (
//                 <div data-aos="zoom-in" className="absolute hidden lg:block top-1/4 right-0 w-px h-1/2 bg-gradient-to-b from-purple-500/30 to-blue-500/30"></div>
//               ) : null}

//               {i === 4 || i === 5 ? (
//                 <div data-aos="zoom-in" className=" hidden lg:block absolute top-1/4 left-0 w-px h-1/2 bg-gradient-to-b from-blue-500/30 to-emerald-500/30"></div>
//               ) : null}

//               <div ref={(el) => (textRef.current[i] = el)}>
//                 {/* Icon */}
//                 <div
//                   data-aos="zoom-in"
//                   className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${card.gradient} border border-[#454545] mb-6 mx-auto`}
//                 >
//                   <Clock className="w-7 h-7 text-gray-300" />
//                 </div>

//                 {/* Title */}
//                 <h3
//                   data-aos="zoom-in"
//                   className="text-lg font-semibold text-center mb-2"
//                 >
//                   {card.title}
//                 </h3>

//                 {/* Description */}
//                 <p
//                   data-aos="zoom-in"
//                   className="text-gray-400 text-sm text-center leading-relaxed"
//                 >
//                   {card.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


