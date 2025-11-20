import React from 'react';
import { Clock, Target, Settings } from 'lucide-react';

const WhyCredflowSection = () => {
  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Speed",
      subtitle: "10x team throughput"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Accuracy",
      subtitle: "Real-time data & monitoring"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Control",
      subtitle: "Human-in-the-loop oversight"
    }
  ];

  return (
    <section  id="why-credflow"  className=" scroll-mt-24 py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div data-aos="fade-down" className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-tight">
            Why{" "}
            <span className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">
              Credflow AI
            </span>
          </h2>
          
          <p className="text-md md:text-lg  text-gray-500 max-w-4xl mx-auto leading-relaxed">
            Legacy tools track tasks. Credflow AI completes them.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div data-aos="fade-up" key={index} className="bg-black backdrop-blur-sm border border-[#454545] rounded-full p-6 flex items-center justify-center gap-4">
              <div data-aos="fade-right" className="w-12 h-12 rounded-full border border-[#454545] flex items-center justify-center text-white flex-shrink-0">
                {benefit.icon}
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white mb-1">
                  {benefit.title}
                </h3>
                <p data-aos="fade-up" className="text-gray-400 text-sm">
                  {benefit.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div data-aos="fade-up" className="text-center">
          <p className="text-gray-400 text-md md:text-lg leading-relaxed max-w-4xl mx-auto">
          Bring CredFlow <strong>Medical Credentialing Software</strong> to your existing team and 10x your team&apos;s productivity and output. Don&apos;t outsource and lose control — own your process and outcomes with real, visible AI tools.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyCredflowSection;
