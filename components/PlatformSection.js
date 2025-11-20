"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import PlatformCard from "./platformComponents/PlatformCard";

const cards = [
  {
    number: "1",
    title: "Real-Time Network Intelligence",
    subtitle: "Always Current, Always Verified",
    description:
      "CredFlow works directly with payers to ingest provider data. Decisions are based on today's real-time data—not a spreadsheet from last year.",
    imageSrc: "/images/11.png",
  },
  {
    number: "2",
    title: "Adaptive Operations",
    subtitle: "Workflows That Fit Reality",
    description:
      "Dynamic processes adapt by payer, state, provider type, and historical outcomes. Nothing slips. Be confident in new enrollments, location adds, re-credentialing, and directory attestation cycles.",
    imageSrc: "/images/22.png",
  },
  {
    number: "3",
    title: "Continous Verification",
    subtitle: "Confidence From The Start ",
    description:
      "Licenses, DEA, and sanctions checks are pulled automatically and monitored continuously. Evidence artifacts are saved for audit, turning compliance into a background process rather than a fire drill.",
    imageSrc: "/images/33.png",
  },
  {
    number: "4",
    title: "Connected Revenue",
    subtitle: "Credentialing And Claims On The Same Page",
    description:
      "The only healthcare credentialing software platform built to support revenue cycle.",
    imageSrc: "/images/p4.png",
  },
];

export default function PlatformSection() {
  const containerRef = useRef(null);
  
  // Create scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Desktop: Create smooth upward sliding animation for each card
  const card0y = useTransform(scrollYProgress, [0, 0.2], ["100vh", "0vh"]);
  const card1y = useTransform(scrollYProgress, [0.2, 0.4], ["100vh", "0vh"]);
  const card2y = useTransform(scrollYProgress, [0.4, 0.6], ["100vh", "0vh"]);
  const card3y = useTransform(scrollYProgress, [0.6, 0.8], ["100vh", "0vh"]);

  // Mobile: Create vertical scroll animation with reduced scroll distance
  const mobileCard0y = useTransform(scrollYProgress, [0, 0.2], ["100vh", "0vh"]);
  const mobileCard1y = useTransform(scrollYProgress, [0.2, 0.4], ["100vh", "0vh"]);
  const mobileCard2y = useTransform(scrollYProgress, [0.4, 0.6], ["100vh", "0vh"]);
  const mobileCard3y = useTransform(scrollYProgress, [0.6, 0.8], ["100vh", "0vh"]);

  const cardTransforms = [
    { y: card0y },
    { y: card1y },
    { y: card2y },
    { y: card3y }
  ];

  const mobileCardTransforms = [
    { y: mobileCard0y },
    { y: mobileCard1y },
    { y: mobileCard2y },
    { y: mobileCard3y }
  ];

  return (
    <section id="features" ref={containerRef} className="bg-black pt-16 sm:pt-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2">
          <div className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 tracking-widest">
            FEATURES
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            <div className="text-white">Your All-in-One</div>
            <span className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">
              AI Credentialing{" "}
              </span>
            <span>Platform</span>
            </h2>
        </div>

        {/* Mobile: Vertical scroll animation, Desktop: Animated cards */}
        <div className="relative">
          {/* Mobile Layout - Vertical scroll animation */}
          <div className="block md:hidden">
            {/* Create scroll height for mobile animation - responsive heights */}
            <div className="h-[300vh] sm:h-[350vh]">
              {/* Sticky container that holds the upward moving cards */}
              <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {cards.map((card, i) => {
                  const transforms = mobileCardTransforms[i];
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute inset-0 flex items-center justify-center w-full"
                      style={{
                        y: transforms.y,
                      }}
                    >
                      <div className="w-full max-h-[85vh] sm:max-h-[90vh] relative px-1 sm:px-2">
                        <div className="relative transform-gpu sm:rounded-xl overflow-hidden bg-black h-full w-full">
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

          {/* Desktop Layout - Animated upward sliding cards */}
          <div className="hidden md:block">
            {/* Create scroll height for animation - responsive for different desktop sizes */}
            <div className="h-[450vh] lg:h-[500vh] xl:h-[550vh]">
              {/* Sticky container that holds the upward moving cards */}
              <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {cards.map((card, i) => {
                  const transforms = cardTransforms[i];
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute inset-0 flex items-center justify-center w-full"
                      style={{
                        y: transforms.y,
                      }}
                    >
                      <div className="w-full max-h-[75vh] md:max-h-[80vh] lg:max-h-[85vh] relative px-3 md:px-4 lg:px-6">
                        <div className="relative transform-gpu rounded-xl md:rounded-2xl overflow-hidden bg-black h-full w-full">
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
        </div>
      </div>
    </section>
  );
}