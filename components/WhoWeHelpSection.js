import React from 'react';
import { Building2, CreditCard, UserCheck } from 'lucide-react';

const WhoWeHelpSection = () => {
  const targetAudiences = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Hospitals & Health Systems",
      description: "Streamline credentialing across multiple facilities and departments"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Payers & MCOs",
      description: "Automate provider enrollment and network management"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Providers",
      description: "Accelerate your credentialing process and get credentialed faster"
    }
  ];

  return (
    <section className="py-20 px-6 ">
      <div className="max-w-7xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
          Who We Help
        </h2>
        
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          CredFlow AI serves healthcare organizations of all sizes, from individual providers 
          to large health systems, helping them streamline credentialing and enrollment processes.
        </p>

        {/* Target Audience Cards */}
        <div className="grid md:grid-cols-3 gap-16">
          {targetAudiences.map((audience, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full border-2 border-purple-400/40 flex items-center justify-center text-white shadow-xl bg-black/20 backdrop-blur-sm">
                {audience.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {audience.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelpSection;
