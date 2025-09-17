import React from 'react';
import { Workflow, FileQuestion, Users, Clock } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: Workflow,
      title: "Manual Workflows",
      description: "Slow & Error-Prone"
    },
    {
      icon: FileQuestion,
      title: "Compliance Complexity",
      description: "Missed Deadlines - revenue risk"
    },
    {
      icon: Users,
      title: "Administrative Overhead",
      description: "Endless Busywork"
    },
    {
      icon: Clock,
      title: "Delayed Onboarding",
      description: "Revenue Stalls"
    }
  ];

  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto text-center">
        {/* Headline */}
        <h2 data-aos="fade-down" className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-4 leading-tight">
          <span className="bg-gradient-to-r from-[#5063C6] from-20% to-[#B71CD2]  bg-clip-text text-transparent">
            Credentialing 
          </span>
          <span className="text-white"> Shouldn&apos;t</span>
          <div className="text-white"> Be This Hard.</div>
        </h2>

        {/* Sub-headline */}
        <p data-aos="fade-down" className="text-md md:text-lg text-gray-500 mb-16 leading-relaxed">
          Work Waits. People Wait. Revenue Waits.
        </p>

        {/* Problem Cards */}
        <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <div key={index} className="text-start border border-gray-400/30 py-6 px-12  bg-gray-900/20 backdrop-blur-sm">
                {/* Icon Container */}
                <div data-aos="fade-up"  className="w-28 h-28 mb-6 rounded-full border border-white/20 flex items-center justify-center bg-gradient-to-b from-white/5 to-black backdrop-blur-sm">
                  <IconComponent className="w-12 h-12 text-white" />
                </div>
                
                {/* Title */}
                <h3 data-aos="fade-up"  className="text-xl max-w-48 text-white mb-3">
                  {problem.title}
                </h3>
                
                {/* Description */}
                <p data-aos="fade-up"  className="text-gray-500 text-sm font-medium">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
