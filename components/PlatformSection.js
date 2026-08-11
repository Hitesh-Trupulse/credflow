"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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

function SectionHeader() {
  return (
    <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2">
      <div className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 tracking-widest">
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
  );
}

/** Mobile: static stacked cards — no scroll-linked animation / no duplicate trees */
function MobilePlatformCards() {
  return (
    <div className="space-y-6">
      {cards.map((card) => (
        <article
          key={card.number}
          className="rounded-2xl border border-[#454545] bg-black/80 p-5"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-gradient-to-b from-white/10 to-black text-xl font-bold">
              {card.number}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white leading-tight">
                {card.title}
              </h3>
              <p className="text-sm font-medium text-gray-300">{card.subtitle}</p>
            </div>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-gray-300">
            {card.description}
          </p>
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[#454545]">
            <Image
              src={card.imageSrc}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </article>
      ))}
    </div>
  );
}

function DesktopPlatformCards() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const card0y = useTransform(scrollYProgress, [0, 0.2], ["100vh", "0vh"]);
  const card1y = useTransform(scrollYProgress, [0.2, 0.4], ["100vh", "0vh"]);
  const card2y = useTransform(scrollYProgress, [0.4, 0.6], ["100vh", "0vh"]);
  const card3y = useTransform(scrollYProgress, [0.6, 0.8], ["100vh", "0vh"]);
  const cardTransforms = [{ y: card0y }, { y: card1y }, { y: card2y }, { y: card3y }];

  return (
    <div ref={containerRef} className="relative">
      <div className="h-[450vh] lg:h-[500vh] xl:h-[550vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {cards.map((card, i) => (
            <motion.div
              key={card.number}
              className="absolute inset-0 flex items-center justify-center w-full"
              style={{ y: cardTransforms[i].y }}
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PlatformSection() {
  const [layout, setLayout] = useState("pending");

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => setLayout(media.matches ? "desktop" : "mobile");
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <section id="features" className="bg-black pt-16 sm:pt-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />
        {layout === "pending" && <div className="min-h-[50vh]" aria-hidden="true" />}
        {layout === "mobile" && <MobilePlatformCards />}
        {layout === "desktop" && <DesktopPlatformCards />}
      </div>
    </section>
  );
}
