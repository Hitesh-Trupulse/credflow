"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// Credentials verification data
const credentialsData = [
  {
    id: "physician-license",
    title: "Physician License (Michigan)",
    status: "verified",
    icon: "blue-check",
    action: "View PDF"
  },
  {
    id: "dea-license",
    title: "DEA License",
    status: "verified", 
    icon: "blue-check",
    action: "View PDF"
  },
  {
    id: "transcript-call",
    title: "Transcript of Call",
    status: "verified",
    icon: "phone",
    action: "Transcript of Call"
  },
  {
    id: "hospital-credentialing",
    title: "Hospital Credentialing",
    status: "pending",
    icon: "pending",
    action: "View Status"
  },
  {
    id: "malpractice-insurance",
    title: "Malpractice Insurance",
    status: "verified",
    icon: "blue-check", 
    action: "View PDF"
  }
];

// Individual Credential Tab Component
function CredentialTab({ title, status, action, index }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-500/20 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 border-yellow-500/30";
      case "expired":
        return "bg-red-500/20 border-red-500/30";
      default:
        return "bg-gray-500/20 border-gray-500/30";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500 animate-pulse";
      case "expired":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      className={`
        backdrop-blur-sm bg-black/30 border border-gray-600/50 
        text-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-3
        ${getStatusColor(status)}
        cursor-pointer hover:bg-black/40 transition-all duration-300
      `}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Title */}
      <div className="flex-1">
        <h3 className="text-xs font-medium text-white truncate">{title}</h3>
      </div>
      
      {/* Status Dot */}
      <div className={`
        w-2 h-2 rounded-full ${getStatusDot(status)}
      `}></div>
      
      {/* Action Button */}
      <div className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded-lg transition-colors duration-200 cursor-pointer">
        {action}
      </div>
    </motion.div>
  );
}

// Main Credentials Card Component
export default function CredentialsCard() {
  return (
    <div className="backdrop-blur-xl bg-black/60 border border-gray-600 text-white rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 shadow-lg w-full max-w-[200px] sm:max-w-sm mx-auto">
      {/* Header */}
      <div className="text-center mb-2 sm:mb-3 md:mb-4">
        <h2 className="text-start text-base sm:text-lg lg:text-xl font-bold text-white">Amanda Johnson, MD</h2>
        <h2 className="text-sm sm:text-lg text-start  text-gray-500 mb-1 sm:mb-2">Verify Credentials/PSV</h2>

      </div>

      {/* Image Container */}
      <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 flex items-center justify-center">
        <Image
          src="/images/1111.png"
          alt="Credentials"
          width={450}
          height={400}
          className="w-full h-full object-cover rounded-md sm:rounded-lg md:rounded-xl"
        />
      </div>
    </div>
  );
}
