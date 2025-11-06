"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Button from './common/Button';

const AIFeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Individual feature component
  const FeatureItem = ({ feature, index }) => {
    const { ref, inView } = useInView({
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px',
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
        className="border-b border-[#454545] pb-8 last:border-b-0 min-h-[120px] flex flex-col justify-center transition-all duration-300  px-4 py-3 cursor-pointer hover:bg-gray-900/20"
        onClick={() => {
          setActiveIndex(index);
          // Smooth scroll to center the item
          if (scrollContainerRef.current) {
            const itemElement = ref.current;
            if (itemElement) {
              const containerRect = scrollContainerRef.current.getBoundingClientRect();
              const itemRect = itemElement.getBoundingClientRect();
              const scrollTop = scrollContainerRef.current.scrollTop;
              const targetScrollTop = scrollTop + itemRect.top - containerRect.top - (containerRect.height / 2) + (itemRect.height / 2);
              
              scrollContainerRef.current.scrollTo({
                top: targetScrollTop,
                behavior: 'smooth'
              });
            }
          }
        }}
      >
        <h3 className={`text-2xl sm:text-4xl lg:text-5xl mb-4 transition-all duration-500 ease-out ${
          isActive ? 'text-white' : 'text-[#454545] '
        }`}>
          {feature.title}
        </h3>
        
        <div className={`transition-all duration-700 ease-out overflow-hidden ${
          isActive 
            ? 'opacity-100 max-h-[200px] translate-y-0' 
            : 'opacity-0 max-h-0 translate-y-4'
        }`}>
          <p className="text-white text-sm md:text-base leading-relaxed pt-2">
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
      description: "Our web agent completes payer applications end-to-end, with automated AI telecaller follow-ups. Single provider timelines keep real go-live dates on track. Sync provider data or new locations to CAQH with one click—driven by your credentialing agent actions."
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

  // Create infinite scroll data by duplicating features
  const infiniteFeatures = [...features, ...features, ...features];

  // Handle infinite scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      
      // Reset scroll position when reaching the end of first set
      if (scrollPercentage >= 0.95 && !isScrolling) {
        setIsScrolling(true);
        const firstSetHeight = scrollHeight / 3; // Since we have 3 sets
        container.scrollTop = firstSetHeight + (scrollTop - firstSetHeight);
        setTimeout(() => setIsScrolling(false), 100);
      }
      
      // Reset scroll position when reaching the beginning
      if (scrollPercentage <= 0.05 && !isScrolling) {
        setIsScrolling(true);
        const firstSetHeight = scrollHeight / 3;
        container.scrollTop = firstSetHeight + scrollTop;
        setTimeout(() => setIsScrolling(false), 100);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);


  return (
    <section       id="product"
    className="py-20 scroll-mt-24 px-6 bg-black ">
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
            CredFlow AI delivers automation and verification of provider and payer data ensuring your healthcare organization achieves patient safety and full-revenue capture.            </p>

            <Button variant="primary" size="md" className="rounded-full w-fit">
              Join The Waitlist
            </Button>
          </div>

          {/* Right Side - Infinite Scrollable Features List */}
          <div 
            ref={scrollContainerRef}
            data-aos="zoom-in" 
            className="h-[500px] overflow-y-auto scrollbar-hide scroll-smooth hidden lg:block"
            style={{
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <div className="space-y-6 pr-4">
              {infiniteFeatures.map((feature, index) => (
                <FeatureItem key={`${feature.title}-${index}`} feature={feature} index={index % features.length} />
              ))}
            </div>
          </div>

          {/* Mobile/Tablet - Regular Scrollable Features List */}
          <div 
            data-aos="zoom-in" 
            className="h-[500px] overflow-y-auto scrollbar-hide scroll-smooth lg:hidden"
            style={{
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <div className="space-y-6 pr-4">
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
