"use client";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const StatsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true, // Only trigger once
  });

  const stats = [
    {
      value: 60,
      suffix: "%",
      description: "Fewer Manual Payer And PSV Follow-Ups.",
      borderColor: "border-blue-500",
      bgColor: "bg-gradient-to-b from-blue-700/10 to-black"
    },
    {
      value: 15,
      suffix: "+",
      description: "Billable Days Saved With Earlier Credentialing Issues Detection.",
      borderColor: "border-[#FF34DD]",
      bgColor: "bg-gradient-to-b from-[#FF34DD]/10 to-black"
    },
    {
      value: 75,
      suffix: "%",
      description: "Reduction In Manual Data Entry.",
      borderColor: "border-purple-500",
      bgColor: "bg-gradient-to-b from-purple-700/10 to-black"
    }
  ];

  return (
    <section ref={ref} className="py-20 px-6 bg-black min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center flex-1 max-w-sm">
              {/* Circular Stat Container */}
              <div data-aos="zoom-in-up"
                className={`w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[430px] xl:h-[430px] mx-auto mb-8 rounded-full border-2 ${stat.borderColor} border-[0.5px] bg-gray-900/50 backdrop-blur-sm shadow-2xl flex flex-col items-center justify-center relative overflow-hidden`}
              >
                {/* Subtle inner glow effect */}
                <div className={`absolute inset-0 rounded-full ${stat.bgColor}`}></div>
                
                <div className="relative z-10 text-center px-8">
                  {/* Large Value with CountUp Animation */}
                  <div data-aos="fade-up" className="text-6xl lg:text-7xl font-light text-white mb-4 tracking-tight">
                    {inView && (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        delay={index * 0.3}
                        suffix={stat.suffix}
                        separator=","
                        decimals={0}
                      />
                    )}
                  </div>
                  
                  {/* Description */}
                  <p data-aos="fade-up" className="text-gray-500 text-sm lg:text-base leading-relaxed font-light max-w-48 mx-auto">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;