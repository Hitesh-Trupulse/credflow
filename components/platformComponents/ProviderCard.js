// components/ProviderCard.js
"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

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
    <div className="backdrop-blur-xl bg-blur border bg-purple-500/5  border-[#454545] text-white rounded-2xl p-4 sm:px-6 md:px-8 shadow-lg w-full max-w-sm sm:max-w-md mx-auto mb-4 sm:mb-6">
      {/* Top Section */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">

        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold truncate">{name}</h3>
          <p className="text-white text-xs sm:text-sm">
            <span className="font-semibold text-white">NPI:</span> {npi}
          </p>
        </div>
      </div>

      {/* Payer Chips */}
      <div>
        <ul className="space-y-1 sm:space-y-2  text-xs sm:text-sm">
          {payers.map((payer, i) => (
            <li
              key={i}
              className={
                payer.type === "alert"
                  ? "text-red-500 font-medium"
                  : "text-white"
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

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (isInView) {
      controls.start({
        y: -1000,
        transition: {
          duration: providerData.length * 3,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
      <motion.div 
        animate={controls}
        className="relative"
      >
        {/* Duplicate the cards for seamless infinite loop */}
        {[...providerData, ...providerData].map((provider, index) => (
          <ProviderCard
            key={index}
            name={provider.name}
            npi={provider.npi}
            icon={provider.icon}
            payers={provider.payers}
          />
        ))}
      </motion.div>
    </div>
  );
}
