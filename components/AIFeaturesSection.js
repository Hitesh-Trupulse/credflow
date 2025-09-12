import React from 'react';
import { CheckCircle, FileText, CreditCard, Monitor } from 'lucide-react';

const AIFeaturesSection = () => {
  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Credentialing / PSV"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Payor Enrolment"
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Monitoring"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Compliance Tracking"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Document Management"
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Real-time Updates"
    }
  ];

  return (
    <section className="py-20 px-6 ">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              The{" "}
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                AI Agent
              </span>{" "}
              That Finishes The Work.
            </h2>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Our intelligent AI agent automates every aspect of credentialing and enrollment. 
              It learns your specific processes, adapts to your workflows, and handles the tedious 
              tasks so your team can focus on what matters most.
            </p>

            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Learn More
            </button>
          </div>

          {/* Right Side - Features List */}
          <div className="grid grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center text-white bg-black/20 backdrop-blur-sm">
                  {feature.icon}
                </div>
                <span className="text-white text-lg font-medium">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeaturesSection;
