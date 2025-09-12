import React from 'react';
import { Gauge, Target, Shield } from 'lucide-react';

const WhyCredflowSection = () => {
  const benefits = [
    {
      icon: <Gauge className="w-8 h-8" />,
      title: "Speed",
      description: "Lightning-fast credentialing processes"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Accuracy",
      description: "Precision-driven automation"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Control",
      description: "Complete oversight and management"
    }
  ];

  return (
    <section className="py-20 px-6 ">
      <div className="max-w-7xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Why{" "}
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Credflow AI
          </span>
        </h2>
        
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          The only AI-powered credentialing platform that combines speed, accuracy, and control 
          to transform your provider onboarding process.
        </p>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full border-2 border-purple-400/40 flex items-center justify-center text-white shadow-xl bg-black/20 backdrop-blur-sm">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCredflowSection;
