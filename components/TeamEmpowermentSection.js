"use client";
import React, { useEffect, useRef, useState } from 'react';

const TeamEmpowermentSection = () => {
  const sectionRef = useRef(null);
  const [opacity, setOpacity] = useState(0.3);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate distance from center of screen
      const sectionCenter = rect.top + rect.height / 2;
      const screenCenter = windowHeight / 2;
      const distanceFromCenter = Math.abs(sectionCenter - screenCenter);
      
      // Calculate opacity based on distance from center
      // When in center (distance = 0), opacity = 1
      // When far from center, opacity approaches 0.3
      const maxDistance = windowHeight / 2; // Maximum distance for calculation
      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
      const newOpacity = 1 - (normalizedDistance * 0.7); // 0.7 = difference between 1 and 0.3
      
      setOpacity(Math.max(newOpacity, 0.3)); // Minimum opacity of 0.3
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto text-start">
        {/* Headline */}
        <h2 className="text-4xl md:text-xl lg:text-6xl font-bold mb-12 leading-tight">
          Enable Your Team. 
          <div>Make Them AI-Powered Superstars.</div>
        </h2>

        {/* Content */}
        <div 
          className="max-w-7xl mx-auto space-y-8 text-2xl md:text-4xl leading-relaxed transition-opacity duration-300 ease-out"
          style={{ opacity }}
        >
          <p>
            Your Admins And Coordinators Know The Workflows, Payers, And Providers Better Than Anyone. 
            What They Don&apos;t Need? Endless Forms And Follow-Ups.
          </p>
          
          <p>
            <strong>CredFlow AI</strong> Takes The Manual Grind Off Their Plate While Keeping Their Expertise At The Center. 
            No Outsourcing. No Losing Control. Just <strong>AI Agents</strong> Working Behind The Scenes So Your Team Can 
            Shine Where It Matters Most.
          </p>
          
          <p className="text-2xl md:text-4xl">
            <strong>Your Team</strong> Is Your Advantage—<strong>CredFlow AI</strong> Makes Them <strong>Unstoppable</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamEmpowermentSection;
