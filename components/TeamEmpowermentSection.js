"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TeamEmpowermentSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    threshold: 0.1,
    triggerOnce: false 
  });

  // Animation variants for line-by-line reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0.3,
      transition: {
        staggerChildren: 0.3,
        staggerDirection: -1
      }
    }
  };

  const lineVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      filter: "blur(6px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0.3,
      y: -30,
      filter: "blur(3px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const headlineVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.92
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0.3,
      y: -25,
      scale: 0.95,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-black text-white">
      <motion.div 
        className="max-w-7xl mx-auto text-start"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "exit"}
      >
        {/* Headline */}
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 leading-tight"
          variants={headlineVariants}
        >
          Enable Your Team. 
          <motion.div variants={headlineVariants}>
            Make Them AI-Powered Superstars.
          </motion.div>
        </motion.h2>

        {/* Content */}
        <motion.div 
          className="max-w-7xl mx-auto space-y-8 text-xl md:text-2xl leading-relaxed"
          variants={containerVariants}
        >
          <motion.p variants={lineVariants}>
            Your Admins And Coordinators Know The Workflows, Payers, And Providers Better Than Anyone. 
            What They Don&apos;t Need? Endless Forms And Follow-Ups.
          </motion.p>
          
          <motion.p variants={lineVariants}>
            <strong>CredFlow AI</strong> Takes The Manual Grind Off Their Plate While Keeping Their Expertise At The Center. 
            No Outsourcing. No Losing Control. Just <strong>AI Agents</strong> Working Behind The Scenes So Your Team Can 
            Shine Where It Matters Most.
          </motion.p>
          
          <motion.p 
            className="text-2xl md:text-3xl"
            variants={lineVariants}
          >
            <strong>Your Team</strong> Is Your Advantage—<strong>CredFlow AI</strong> Makes Them <strong>Unstoppable</strong>.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TeamEmpowermentSection;