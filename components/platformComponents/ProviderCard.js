// components/ProviderCard.js
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Dummy data for provider cards
const providerData = [
  {
    name: "Dr. Morgan Smith, MD",
    npi: "1234567890",
    icon: "M",
    payers: [
      { label: "Aetna • In-Network (HMO, PPO)", type: "normal" },
      { label: "Cigna • In-Network", type: "normal" },
      { label: "Alert: Missing TIN @ Main Clinic", type: "alert" },
      { label: "Humana • Out of Network @ Midtown Location", type: "normal" }
    ]
  },
  {
    name: "Dr. Alvarez Rivera, DO",
    npi: "0987654321",
    icon: "A",
    payers: [
      { label: "Blue Cross • In-Network", type: "normal" },
      { label: "UnitedHealth • In-Network", type: "normal" },
      { label: "Alert: License Expires Soon", type: "alert" },
      { label: "Kaiser • Pending Review", type: "normal" }
    ]
  },
  {
    name: "Dr. Sarah Johnson, MD",
    npi: "1122334455",
    icon: "S",
    payers: [
      { label: "Medicare • In-Network", type: "normal" },
      { label: "Medicaid • In-Network", type: "normal" },
      { label: "Aetna • Out of Network", type: "normal" },
      { label: "Alert: Missing Malpractice Insurance", type: "alert" }
    ]
  },
  {
    name: "Dr. Michael Chen, MD",
    npi: "5566778899",
    icon: "M",
    payers: [
      { label: "Cigna • In-Network", type: "normal" },
      { label: "Humana • In-Network", type: "normal" },
      { label: "Blue Cross • Pending", type: "normal" },
      { label: "UnitedHealth • In-Network", type: "normal" }
    ]
  },
  {
    name: "Dr. Emily Davis, DO",
    npi: "9988776655",
    icon: "E",
    payers: [
      { label: "Kaiser • In-Network", type: "normal" },
      { label: "Alert: DEA License Expired", type: "alert" },
      { label: "Medicare • In-Network", type: "normal" },
      { label: "Aetna • In-Network", type: "normal" }
    ]
  },
  {
    name: "Dr. Robert Wilson, MD",
    npi: "4433221100",
    icon: "R",
    payers: [
      { label: "Medicaid • In-Network", type: "normal" },
      { label: "Cigna • Out of Network", type: "normal" },
      { label: "Blue Cross • In-Network", type: "normal" },
      { label: "Alert: Board Certification Expiring", type: "alert" }
    ]
  }
];

// Individual Provider Card Component
function ProviderCard({ name, npi, icon, payers = [] }) {
  return (
    <div className="bg-gradient-to-r from-[#5063C6]/10 from-20% to-[#B71CD2]/10 text-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg w-full max-w-sm sm:max-w-md mx-auto mb-4 sm:mb-6">
      {/* Top Section */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* Icon */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-[#292437] text-white text-lg sm:text-xl font-bold flex-shrink-0">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold truncate">{name}</h3>
          <p className="text-gray-400 text-xs sm:text-sm">
            <span className="font-semibold text-white">NPI:</span> {npi}
          </p>
        </div>
      </div>

      {/* Payer Chips */}
      <div>
        <h4 className="text-xs sm:text-sm font-semibold text-white mb-2 sm:mb-3">Payer Chips</h4>
        <ul className="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
          {payers.map((payer, i) => (
            <li
              key={i}
              className={
                payer.type === "alert"
                  ? "text-red-400 font-medium"
                  : "text-gray-400"
              }
            >
              {payer.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Scrollable Provider Cards Container
export default function ScrollableProviderCards() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create duplicate cards for seamless infinite loop
    const cards = Array.from(container.children);
    const totalCards = cards.length;
    
    // Duplicate cards for infinite scroll
    cards.forEach((card, index) => {
      const clone = card.cloneNode(true);
      clone.style.marginTop = '0';
      container.appendChild(clone);
    });

    // Create infinite upward scrolling animation
    const allCards = Array.from(container.children);
    const cardHeight = cards[0].offsetHeight + 24; // Height + margin
    
    gsap.set(allCards, { y: 0 });
    
    const tl = gsap.timeline({ repeat: -1 });
    
    // Animate all cards upward
    tl.to(allCards, {
      y: -cardHeight * totalCards,
      duration: totalCards * 3, // 3 seconds per card
      ease: "none",
      stagger: 0.2
    });

    // Reset position for seamless loop
    tl.set(allCards, { y: cardHeight * totalCards });
    tl.to(allCards, {
      y: 0,
      duration: 0
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
      <div ref={containerRef} className="relative">
        {providerData.map((provider, index) => (
          <ProviderCard
            key={index}
            name={provider.name}
            npi={provider.npi}
            icon={provider.icon}
            payers={provider.payers}
          />
        ))}
      </div>
    </div>
  );
}
