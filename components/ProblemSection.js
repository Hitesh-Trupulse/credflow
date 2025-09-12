import React from 'react';

const ProblemSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Credentialing Shouldn&apos;t
        </h2>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Be This Hard.
          </span>
        </h3>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Traditional credentialing processes are slow, error-prone, and drain your team&apos;s valuable time. 
          Manual paperwork, endless follow-ups, and complex payer requirements create bottlenecks that delay revenue and frustrate providers.
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;
