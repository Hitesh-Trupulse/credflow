"use client";

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Button from './common/Button';

const AIFeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Individual feature component
  const FeatureItem = ({ feature, index }) => {
    const { ref, inView } = useInView({
      threshold: 0.5,
      rootMargin: '-30% 0px -30% 0px',
      triggerOnce: false
    });

    // Update active index when element comes into view
    useEffect(() => {
      if (inView) {
        setActiveIndex(index);
      }
    }, [inView, index]);

    const isActive = activeIndex === index;

    return (
      <div
        ref={ref}
        className="border-b border-gray-600/30 pb-8 last:border-b-0 min-h-[100px] flex flex-col justify-center transition-colors duration-200 rounded-lg px-4 py-2"
      >
        <h3 className={`text-2xl sm:text-4xl mb-4 transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-gray-400'
        }`}>
          {feature.title}
        </h3>
        
        <div className={`transition-all duration-500 ease-out ${
          isActive 
            ? 'opacity-100 max-h-96 translate-y-0' 
            : 'opacity-0 max-h-0 -translate-y-2 overflow-hidden'
        }`}>
          <p className="text-white text-xs md:text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    );
  };

  const features = [
    {
      title: "Credentialing / PSV",
      description: "Automated credentialing workflows that streamline provider verification processes. Our AI agent handles complex PSV requirements, reducing manual errors and accelerating approval timelines."
    },
    {
      title: "Payer Enrollment",
      description: "Our Web Agent Completes Payer Applications End-To-End, With Automated AI Telecaller Follow-Ups. Single Provider Timelines Keep Real Go-Live Dates On Track. Sync Provider Data Or New Locations To CAQH With One Click—Driven By Your Credentialing Agent Actions."
    },
    {
      title: "Monitoring",
      description: "Real-time monitoring and tracking of credentialing status across all payers. Get instant notifications for status changes, expiration alerts, and compliance updates."
    },
    {
      title: "Dashboard",
      description: "Comprehensive dashboard providing complete visibility into your credentialing pipeline. Track progress, identify bottlenecks, and optimize workflows with actionable insights."
    },
    {
      title: "Roster Automation",
      description: "Automated roster management that keeps provider networks up-to-date. Seamlessly sync provider data across multiple systems and maintain accurate network directories."
    },
    {
      title: "AI Communication Center",
      description: "Centralized communication hub powered by AI to manage all credentialing-related correspondence. Automated follow-ups, status updates, and stakeholder notifications."
    },
    {
      title: "AI Telecaller",
      description: "Intelligent telecalling system that handles payer follow-ups automatically. Our AI agent makes calls, gathers information, and updates status without human intervention."
    },
    {
      title: "Revenue-At-Risk Dashboard",
      description: "Advanced analytics dashboard that identifies revenue at risk due to credentialing delays. Track financial impact and prioritize high-value provider onboarding."
    }
  ];


  return (
    <section className="py-20 px-6 bg-black ">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side - Content */}
          <div data-aos="fade-right" className="flex flex-col justify-center space-y-8 h-full">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl text-white font-light leading-tight">
              The{" "}
              <span className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">
                AI Agent
              </span>
              <div>
                That Finishes The Work.
              </div>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              We Deliver Tailored Marketing Solutions Designed To Scale Your Brand And Drive Measurable Results
            </p>

            <Button variant="primary" size="md" className="rounded-full w-fit">
              Join The Waitlist
            </Button>
          </div>

          {/* Right Side - Scrollable Features List */}
          <div data-aos="zoom-in" className="h-[500px] overflow-y-auto scrollbar-hide">
            <div className="space-y-8 pr-4">
              {features.map((feature, index) => (
                <FeatureItem key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeaturesSection;
