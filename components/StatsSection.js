import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      value: "60%",
      description: "Faster Credentialing Process"
    },
    {
      value: "15+",
      description: "Years of Industry Experience"
    },
    {
      value: "75%",
      description: "Reduction in Manual Work"
    }
  ];

  return (
    <section className="py-20 px-6 ">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              {/* Circular Stat */}
              <div className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-8 rounded-full border-2 border-purple-400/40 flex items-center justify-center shadow-xl bg-black/20 backdrop-blur-sm">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  {stat.value}
                </span>
              </div>
              
              {/* Description */}
              <p className="text-white text-base md:text-lg max-w-40 text-center font-medium">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
