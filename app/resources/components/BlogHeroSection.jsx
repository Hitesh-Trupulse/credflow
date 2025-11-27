import Image from "next/image";

export default function BlogHeroSection() {
  return (
    <section className="bg-black min-h-[60vh] relative overflow-hidden flex items-center justify-center px-6 pt-32 md:pt-48 pb-20">
      <div className="absolute inset-0">
        <Image
          src="/images/mainbg.png"
          alt="Main Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
      
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
          <span className="block mb-2">The Future Of Provider Ops,</span>
          <span className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">
            Decoded By Credflow
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Explore field-tested strategies on provider onboarding, revenue acceleration, workflow automation, and the AI-powered tools reshaping healthcare operations.
        </p>
      </div>
    </section>
  );
}
