"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TeamEmpowermentSection = () => {
  const sectionRef = useRef(null);
  // triggerOnce keeps text at full opacity after reveal — avoids Lighthouse
  // contrast failures from faded/exit states (opacity < 1).
  const isInView = useInView(sectionRef, {
    amount: 0.15,
    once: true,
  });

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: {
      opacity: 1,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const headlineVariants = {
    hidden: {
      opacity: 1,
      y: 28,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-black text-white"
    >
      <motion.div
        className="max-w-7xl mx-auto text-start"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 leading-tight text-white"
          variants={headlineVariants}
        >
          Enable Your Team.
          <motion.div variants={headlineVariants}>
            Make Them AI-Powered Superstars.
          </motion.div>
        </motion.h2>

        <motion.div
          className="max-w-7xl mx-auto space-y-8 text-xl md:text-2xl leading-relaxed text-white"
          variants={containerVariants}
        >
          <motion.p variants={lineVariants} className="text-white">
            Your admins and coordinators know the workflows, payers, and
            providers better than anyone. What they don&apos;t need? Endless
            forms and follow-ups.
          </motion.p>

          <motion.p variants={lineVariants} className="text-white">
            <strong className="text-white">CredFlow AI</strong> takes the
            manual grind off their plate while keeping their expertise at the
            center. No outsourcing. No losing control. Just{" "}
            <strong className="text-white">AI agents</strong> working behind
            the scenes so your team can shine where it matters most.
          </motion.p>

          <motion.p
            className="text-2xl md:text-3xl text-white"
            variants={lineVariants}
          >
            <strong className="text-white">Your team</strong> is your
            advantage—
            <strong className="text-white">CredFlow AI</strong> makes them{" "}
            <strong className="text-white">unstoppable</strong>.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TeamEmpowermentSection;
