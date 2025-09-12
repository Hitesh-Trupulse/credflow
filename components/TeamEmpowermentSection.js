import React from 'react';

const TeamEmpowermentSection = () => {
  return (
    <section className="py-20 px-6 ">
      <div className="max-w-7xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
          Enable Your Team. Make Them{" "}
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            AI-Powered Superstars.
          </span>
        </h2>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
          <p>
            Your Admins And Coordinators Know The Workflows, Payers, And Providers Better Than Anyone. 
            What They Don&apos;t Need? Endless Forms And Follow-Ups.
          </p>
          
          <p>
            CredFlow AI Takes The Manual Grind Off Their Plate While Keeping Their Expertise At The Center. 
            No Outsourcing. No Losing Control, Just AI Agents Working Behind The Scenes So Your Team Can 
            Shine Where It Matters Most.
          </p>
          
          <p className="text-xl md:text-2xl font-semibold text-white">
            Your Team is Your Advantage - CredFlow AI Makes Them Unstoppable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamEmpowermentSection;
