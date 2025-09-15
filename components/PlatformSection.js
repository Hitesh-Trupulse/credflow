"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PlatformCard from "./platformComponents/PlatformCard";

gsap.registerPlugin(ScrollTrigger);

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
    imageSrc: "/images/12.png",
  },
  {
    number: "3",
    title: "Continous Verification",
    subtitle: "Confidence From The Start ",
    description:
      "Licenses, DEA, and sanctions checks are pulled automatically and monitored continuously. Evidence artefacts are saved for audit, turning compliance into a background process rather than a fire drill.",
  imageSrc: "/images/11.png",
  },
  {
    number: "4",
    title: "Connected Revenue",
    subtitle: "Credentialing And Claims On The Same Page",
    description:
      "The only Credentialing Platform built to support Revenue Cycle Revenue.",
   imageSrc: "/images/13.png",
  },
];

export default function PlatformSection() {
  useEffect(() => {
    let ctx = gsap.context(() => {
      const cardsEl = gsap.utils.toArray(".feature-card");
      const totalCards = cardsEl.length;

      // Setup initial state - all cards hidden except first
      gsap.set(cardsEl, { 
        opacity: 0, 
        scale: 0.95, 
        y: 100,
        zIndex: 1,
        rotationX: 15
      });
      
      // Show first card
      gsap.set(cardsEl[0], { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        zIndex: 10,
        rotationX: 0
      });

      ScrollTrigger.create({
        trigger: ".features-container",
        start: "top top",
        end: `+=${totalCards * 200}vh`, // Increased scroll distance for slower scrolling
        pin: true,
        scrub: 10, // Slower scrub for smoother transitions
        onUpdate: (self) => {
          const progress = self.progress * (totalCards - 1);
          const index = Math.floor(progress);
          const nextIndex = Math.min(index + 1, totalCards - 1);
          const transition = progress - index;

          cardsEl.forEach((card, i) => {
            if (i === index) {
              // Current card - fade out as user scrolls
              gsap.to(card, {
                opacity: 1 - transition,
                scale: 1 - transition * 0.05,
                y: transition * -30,
                rotationX: transition * 5,
                zIndex: 10 - Math.floor(transition * 5),
                duration: 0.1,
                overwrite: true,
              });
            } else if (i === nextIndex && transition > 0) {
              // Next card - fade in
              gsap.to(card, {
                opacity: transition,
                scale: 0.95 + transition * 0.05,
                y: (1 - transition) * 100,
                rotationX: (1 - transition) * 15,
                zIndex: 5 + Math.floor(transition * 5),
                duration: 0.1,
                overwrite: true,
              });
            } else {
              // All other cards - completely hidden
              gsap.to(card, {
                opacity: 0,
                scale: 0.95,
                y: 100,
                rotationX: 15,
                zIndex: 1,
                duration: 0.1,
                overwrite: true,
              });
            }
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-black pt-16 sm:pt-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="text-xs sm:text-sm text-gray-400 mb-4 tracking-widest">FEATURES</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 leading-tight">
            <div className="text-white">Your All-in-One</div>
            <span className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">
              AI Credentialing{" "}
            </span>
            <span>Platform</span>
          </h2>
        </div>

        {/* Features Container */}
        <div className="relative features-container h-[100vh] w-full max-w-7xl mx-auto overflow-hidden">
          {cards.map((card, i) => (
            <div
              key={i}
              className="feature-card absolute inset-0 flex items-center justify-center"
              style={{ zIndex: i === 0 ? 10 : 1 }}
            >
              <div className="w-full max-h-[85vh] sm:max-h-[80vh] relative px-2 sm:px-4">
                <PlatformCard
                  number={card.number}
                  title={card.title}
                  subtitle={card.subtitle}
                  description={card.description}
                  imageSrc={card.imageSrc}
                  imageAlt={card.title}
                  showScrollingCards={i === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
