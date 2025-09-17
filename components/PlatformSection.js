// "use client";
// import { useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import PlatformCard from "./platformComponents/PlatformCard";

// gsap.registerPlugin(ScrollTrigger);

// const cards = [
//   {
//     number: "1",
//     title: "Real-Time Network Intelligence",
//     subtitle: "Always Current, Always Verified",
//     description:
//       "CredFlow Works Directly With Payers To Ingest Provider Data. Decisions Are Based On Today's Real-Time Data—Not A Spreadsheet From Last Year.",
//     imageSrc: "/images/11.png",
//   },
//   {
//     number: "2",
//     title: "Adaptive Operations",
//     subtitle: "Workflows That Fit Reality",
//     description:
//       "Dynamic processes adapt by payer, state, provider type, and historical outcomes. Nothing slips. Be confident in new enrolments, location adds, re-credentialing, and directory attestation cycles.",
//     imageSrc: "/images/12.png",
//   },
//   {
//     number: "3",
//     title: "Continous Verification",
//     subtitle: "Confidence From The Start ",
//     description:
//       "Licenses, DEA, and sanctions checks are pulled automatically and monitored continuously. Evidence artefacts are saved for audit, turning compliance into a background process rather than a fire drill.",
//   imageSrc: "/images/11.png",
//   },
//   {
//     number: "4",
//     title: "Connected Revenue",
//     subtitle: "Credentialing And Claims On The Same Page",
//     description:
//       "The only Credentialing Platform built to support Revenue Cycle Revenue.",
//    imageSrc: "/images/13.png",
//   },
// ];

// export default function PlatformSection() {
//   useEffect(() => {
//     let ctx = gsap.context(() => {
//       const cardsEl = gsap.utils.toArray(".feature-card");
//       const totalCards = cardsEl.length;

//       // Setup initial state - all cards hidden except first
//       gsap.set(cardsEl, { 
//         opacity: 0, 
//         scale: 0.95, 
//         y: 100,
//         zIndex: 1,
//         rotationX: 15
//       });
      
//       // Show first card
//       gsap.set(cardsEl[0], { 
//         opacity: 1, 
//         scale: 1, 
//         y: 0, 
//         zIndex: 10,
//         rotationX: 0
//       });

//       ScrollTrigger.create({
//         trigger: ".features-container",
//         start: "top top",
//         end: `+=${totalCards * 200}vh`, // Increased scroll distance for slower scrolling
//         pin: true,
//         scrub: 10, // Slower scrub for smoother transitions
//         onUpdate: (self) => {
//           const progress = self.progress * (totalCards - 1);
//           const index = Math.floor(progress);
//           const nextIndex = Math.min(index + 1, totalCards - 1);
//           const transition = progress - index;

//           cardsEl.forEach((card, i) => {
//             if (i === index) {
//               // Current card - fade out as user scrolls
//               gsap.to(card, {
//                 opacity: 1 - transition,
//                 scale: 1 - transition * 0.05,
//                 y: transition * -30,
//                 rotationX: transition * 5,
//                 zIndex: 10 - Math.floor(transition * 5),
//                 duration: 0.1,
//                 overwrite: true,
//               });
//             } else if (i === nextIndex && transition > 0) {
//               // Next card - fade in
//               gsap.to(card, {
//                 opacity: transition,
//                 scale: 0.95 + transition * 0.05,
//                 y: (1 - transition) * 100,
//                 rotationX: (1 - transition) * 15,
//                 zIndex: 5 + Math.floor(transition * 5),
//                 duration: 0.1,
//                 overwrite: true,
//               });
//             } else {
//               // All other cards - completely hidden
//               gsap.to(card, {
//                 opacity: 0,
//                 scale: 0.95,
//                 y: 100,
//                 rotationX: 15,
//                 zIndex: 1,
//                 duration: 0.1,
//                 overwrite: true,
//               });
//             }
//           });
//         },
//       });
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section className="bg-black pt-16 sm:pt-20 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//           <div className="text-xs sm:text-sm text-gray-400 mb-4 tracking-widest">FEATURES</div>
//           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 leading-tight">
//             <div className="text-white">Your All-in-One</div>
//             <span className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">
//               AI Credentialing{" "}
//             </span>
//             <span>Platform</span>
//           </h2>
//         </div>

//         {/* Features Container */}
//         <div className="relative features-container h-[100vh] w-full max-w-7xl mx-auto overflow-hidden">
//           {cards.map((card, i) => (
//             <div
//               key={i}
//               className="feature-card absolute inset-0 flex items-center justify-center"
//               style={{ zIndex: i === 0 ? 10 : 1 }}
//             >
//               <div className="w-full max-h-[85vh] sm:max-h-[80vh] relative px-2 sm:px-4">
//                 <PlatformCard
//                   number={card.number}
//                   title={card.title}
//                   subtitle={card.subtitle}
//                   description={card.description}
//                   imageSrc={card.imageSrc}
//                   imageAlt={card.title}
//                   showScrollingCards={i === 0}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import PlatformCard from "./platformComponents/PlatformCard";

const cards = [
  {
    number: "1",
    title: "Real-Time Network Intelligence",
    subtitle: "Always Current, Always Verified",
    description:
      "CredFlow Works Directly With Payers To Ingest Provider Data. Decisions Are Based On Today's Real-Time Data—Not A Spreadsheet From Last Year.",
    imageSrc: "/images/11.png",
  },
  {
    number: "2",
    title: "Adaptive Operations",
    subtitle: "Workflows That Fit Reality",
    description:
      "Dynamic processes adapt by payer, state, provider type, and historical outcomes. Nothing slips. Be confident in new enrolments, location adds, re-credentialing, and directory attestation cycles.",
    imageSrc: "/images/22.png",
  },
  {
    number: "3",
    title: "Continous Verification",
    subtitle: "Confidence From The Start ",
    description:
      "Licenses, DEA, and sanctions checks are pulled automatically and monitored continuously. Evidence artefacts are saved for audit, turning compliance into a background process rather than a fire drill.",
    imageSrc: "/images/33.png",
  },
  {
    number: "4",
    title: "Connected Revenue",
    subtitle: "Credentialing And Claims On The Same Page",
    description:
      "The only Credentialing Platform built to support Revenue Cycle Revenue.",
    imageSrc: "/images/p4.png",
  },
];

export default function PlatformSection() {
  const containerRef = useRef(null);
  
  // Create scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0%", "end 70%"]
  });

  // Create individual transform hooks for each card - must be at component level
  const card0Progress = useTransform(scrollYProgress, [0.05 / cards.length, 0.95 / cards.length], [0, 1]);
  const card1Progress = useTransform(scrollYProgress, [1.05 / cards.length, 1.95 / cards.length], [0, 1]);
  const card2Progress = useTransform(scrollYProgress, [2.05 / cards.length, 2.95 / cards.length], [0, 1]);
  const card3Progress = useTransform(scrollYProgress, [3.05 / cards.length, 3.95 / cards.length], [0, 1]);

  // Card 0 transforms
  const card0isActive = useTransform(card0Progress, (value) => value > 0.1);
  const card0x = useTransform(card0Progress, [0, 0.5, 1], [0, 0, 0]);
  const card0y = useTransform(card0Progress, [0, 0.5, 1], [0, 0, -100]);
  const card0rotateZ = useTransform(card0Progress, [0, 0.5, 1], [0, 0, -15]);
  const card0rotateX = useTransform(card0Progress, [0, 0.5, 1], [0, 0, 30]);
  const card0scale = useTransform(card0Progress, [0, 0.5, 1], [0.95, 1, 0.9]);
  const card0opacity = useTransform(card0Progress, [0, 0.3, 0.6, 1], [1, 1, 1, 0]);
  const card0zIndex = useTransform(card0Progress, (value) => {
    if (value < 0.3) return cards.length - 0;
    if (value > 0.6) return 1000 + 0;
    return 100;
  });

  // Card 1 transforms
  const card1isActive = useTransform(card1Progress, (value) => value > 0.1);
  const card1x = useTransform(card1Progress, [0, 0.5, 1], [0, 0, 0]);
  const card1y = useTransform(card1Progress, [0, 0.5, 1], [8, 0, -100]);
  const card1rotateZ = useTransform(card1Progress, [0, 0.5, 1], [2, 0, -15]);
  const card1rotateX = useTransform(card1Progress, [0, 0.5, 1], [0, 0, 30]);
  const card1scale = useTransform(card1Progress, [0, 0.5, 1], [0.95, 1, 0.9]);
  const card1opacity = useTransform(card1Progress, [0, 0.3, 0.6, 1], [1, 1, 1, 0]);
  const card1zIndex = useTransform(card1Progress, (value) => {
    if (value < 0.3) return cards.length - 1;
    if (value > 0.6) return 1000 + 1;
    return 100;
  });

  // Card 2 transforms
  const card2isActive = useTransform(card2Progress, (value) => value > 0.1);
  const card2x = useTransform(card2Progress, [0, 0.5, 1], [0, 0, 0]);
  const card2y = useTransform(card2Progress, [0, 0.5, 1], [16, 0, -100]);
  const card2rotateZ = useTransform(card2Progress, [0, 0.5, 1], [4, 0, -15]);
  const card2rotateX = useTransform(card2Progress, [0, 0.5, 1], [0, 0, 30]);
  const card2scale = useTransform(card2Progress, [0, 0.5, 1], [0.95, 1, 0.9]);
  const card2opacity = useTransform(card2Progress, [0, 0.3, 0.6, 1], [1, 1, 1, 0]);
  const card2zIndex = useTransform(card2Progress, (value) => {
    if (value < 0.3) return cards.length - 2;
    if (value > 0.6) return 1000 + 2;
    return 100;
  });

  // Card 3 transforms
  const card3isActive = useTransform(card3Progress, (value) => value > 0.1);
  const card3x = useTransform(card3Progress, [0, 0.5, 1], [0, 0, 0]);
  const card3y = useTransform(card3Progress, [0, 0.5, 1], [24, 0, -100]);
  const card3rotateZ = useTransform(card3Progress, [0, 0.5, 1], [6, 0, -15]);
  const card3rotateX = useTransform(card3Progress, [0, 0.5, 1], [0, 0, 30]);
  const card3scale = useTransform(card3Progress, [0, 0.5, 1], [0.95, 1, 0.9]);
  const card3opacity = useTransform(card3Progress, [0, 0.3, 0.6, 1], [1, 1, 1, 0]);
  const card3zIndex = useTransform(card3Progress, (value) => {
    if (value < 0.3) return cards.length - 3;
    if (value > 0.6) return 1000 + 3;
    return 100;
  });

  const cardTransforms = [
    { x: card0x, y: card0y, rotateZ: card0rotateZ, rotateX: card0rotateX, scale: card0scale, opacity: card0opacity, zIndex: card0zIndex },
    { x: card1x, y: card1y, rotateZ: card1rotateZ, rotateX: card1rotateX, scale: card1scale, opacity: card1opacity, zIndex: card1zIndex },
    { x: card2x, y: card2y, rotateZ: card2rotateZ, rotateX: card2rotateX, scale: card2scale, opacity: card2opacity, zIndex: card2zIndex },
    { x: card3x, y: card3y, rotateZ: card3rotateZ, rotateX: card3rotateX, scale: card3scale, opacity: card3opacity, zIndex: card3zIndex }
  ];

  return (
    <section ref={containerRef} className="bg-black pt-16 sm:pt-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="text-xs sm:text-sm text-gray-400 mb-4 tracking-widest">
            FEATURES
          </div>
          <h2 className="text-5xl sm:text-6xl  lg:text-7xl leading-tight">
            <div className="text-white">Your All-in-One</div>
            <span className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">
              AI Credentialing{" "}
              </span>
            <span>Platform</span>
            </h2>
        </div>

        {/* Features Container - Contained within section */}
        <div className="relative features-container h-[400vh] w-full max-w-7xl mx-auto">
          {/* Sticky cards container - stays in viewport during scroll */}
          <div 
            className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {cards.map((card, i) => {
              const transforms = cardTransforms[i];
              
              return (
                <motion.div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center pointer-events-auto"
                  style={{
                    x: transforms.x,
                    y: transforms.y,
                    rotateZ: transforms.rotateZ,
                    rotateX: transforms.rotateX,
                    scale: transforms.scale,
                    opacity: transforms.opacity,
                    zIndex: transforms.zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="w-full max-h-[85vh] sm:max-h-[80vh] relative px-2 sm:px-4">
                    {/* Card with solid background to prevent text bleeding */}
                    <div 
                      className="relative transform-gpu rounded-2xl overflow-hidden bg-black"
                    
                    >
                      <PlatformCard
                        number={card.number}
                        title={card.title}
                        subtitle={card.subtitle}
                        description={card.description}
                        imageSrc={card.imageSrc}
                        imageAlt={card.title}
                        showScrollingCards={i === 0}
                        showEnrollmentFlow={i === 1}
                        showCredentials={i === 2}
                        showMetricChips={i === 3}
                      />
            </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
