import React from 'react';

const TeamEmpowermentSection = () => {
  return (
    <section className="py-20 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto text-start">
        {/* Headline */}
        <h2 className="text-4xl md:text-xl lg:text-6xl font-bold mb-12 leading-tight">
          Enable Your Team. 
          <div>Make Them AI-Powered Superstars.</div>
        </h2>

        {/* Content */}
        <div className="max-w-7xl mx-auto space-y-8 text-2xl md:text-4xl leading-relaxed">
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
