"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// Enrollment flow steps data
const enrollmentSteps = [
  {
    id: "provider-data",
    title: "Provider Data Verification",
    status: "completed"
  },
  {
    id: "application-follow",
    title: "Application Follow Up",
    status: "in-progress"
  },
  {
    id: "caqh-sync",
    title: "CAQH Sync",
    status: "pending"
  },
  {
    id: "payer-portal",
    title: "Payer Portal Submit",
    status: "pending"
  }
];

// Individual Step Tab Component
function StepTab({ title, status, index }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 border-green-500/30";
      case "in-progress":
        return "bg-blue-500/20 border-blue-500/30";
      case "pending":
        return "bg-gray-500/20 border-gray-500/30";
      default:
        return "bg-gray-500/20 border-gray-500/30";
    }
  };

  return (
    <motion.div
      className={`
        backdrop-blur-sm bg-black/30 border border-[#454545] 
        text-white rounded-md sm:rounded-lg md:rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 shadow-lg flex items-center gap-1.5 sm:gap-2 md:gap-3
        ${getStatusColor(status)}
        cursor-grab active:cursor-grabbing
      `}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      drag
      dragConstraints={{ left: -50, right: 50, top: -10, bottom: 10 }}
      dragElastic={0.2}
      dragMomentum={false}
    >
      {/* Title */}
      <div className="flex-1">
        <h3 className="text-xs sm:text-sm font-medium text-white truncate">{title}</h3>
      </div>
      
      {/* Status Dot */}
      <div className={`
        w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full flex-shrink-0
        ${status === "completed" ? "bg-green-500" : 
          status === "in-progress" ? "bg-blue-500 animate-pulse" : 
          "bg-gray-500"}
      `}></div>
      
      {/* Hamburger Icon for Drag Handle */}
      <div className="flex flex-col gap-0.5 flex-shrink-0">
        <div className="w-1.5 h-0.5 sm:w-2 sm:h-0.5 md:w-3 md:h-0.5 bg-white/60 rounded"></div>
        <div className="w-1.5 h-0.5 sm:w-2 sm:h-0.5 md:w-3 md:h-0.5 bg-white/60 rounded"></div>
        <div className="w-1.5 h-0.5 sm:w-2 sm:h-0.5 md:w-3 md:h-0.5 bg-white/60 rounded"></div>
      </div>
    </motion.div>
  );
}

// Main Enrollment Flow Component
export default function EnrollmentFlowCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  return (
    <div className="backdrop-blur-xl bg-black/60 border border-[#454545] text-white rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 shadow-lg w-full md:h-[310px] md:max-w-xs lg:max-w-sm mx-auto">
      {/* Header */}
      <div className="text-center mb-2 sm:mb-3 md:mb-4">
        <h2 className="text-md sm:text-lg md:text-lg lg:text-2xl text-white mb-1 sm:mb-2">Enrollment Flow</h2>
        <div className="w-6 sm:w-8 md:w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
      </div>

      {/* Tabs Container */}
      <div ref={ref} className="space-y-1.5 sm:space-y-2 md:space-y-3">
        {enrollmentSteps.map((step, index) => (
          <motion.div
            key={step.id}
            animate={isInView ? {
              x: [0, 10, -10, 0], // Move back and forth like dragging
            } : {}}
            transition={{
              delay: index * 0.3, // Stagger the animation
              duration: 6, // 6 seconds for full cycle
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <StepTab
              title={step.title}
              icon={step.icon}
              status={step.status}
              index={index}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
