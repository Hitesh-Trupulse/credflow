import Image from "next/image";
import Link from "next/link";
import Button from "./common/Button";

/**
 * Above-the-fold hero — kept as a Server Component (no client JS).
 * Single optimized background image; decorative noise is CSS-only to protect LCP.
 */
const Hero = () => {
  return (
    <section
      id="home"
      className="scroll-mt-32 relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/mainbg.webp"
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover"
          priority
          fetchPriority="high"
        />
      </div>

      {/* Lightweight CSS texture instead of a second full-bleed image */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(80,99,198,0.35), transparent 45%), radial-gradient(circle at 80% 30%, rgba(183,28,210,0.25), transparent 40%), linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55))",
        }}
      />

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-[1.05] tracking-tight">
          <span className="block mb-3">Get Providers Enrolled,</span>
          <span className="block mb-3">In-Network, And</span>
          <span className="relative inline-block font-medium">
            <span className="absolute -inset-x-4 bottom-2 h-5 rounded-full bg-gradient-to-r from-[#5063C6]/25 to-[#B71CD2]/25 blur-lg" />
            <span className="relative font-light bg-gradient-to-r from-[#5063C6] from-20% to-[#B71CD2] bg-clip-text text-transparent">
              Billing Faster.
            </span>
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
          Credflow gives medical groups a modern system of record, AI-powered
          payer communication, and a done-for-you enrollment service — all in
          one platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href="/services#contact-form"
            variant="primary"
            size="md"
            className="rounded-full text-sm sm:text-base"
            data-cta-id="home-book-demo"
            data-cta-location="home-body"
          >
            Book a demo
          </Button>
          <Link
            href="/services#contact-form"
            data-cta-id="home-talk-to-specialist"
            data-cta-location="home-body"
            className="group cursor-pointer inline-flex items-center justify-center font-medium transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-black hover:text-white hover:bg-blue-700 focus:ring-gray-500 hover:shadow-lg hover:shadow-blue-700/50 px-6 py-3 rounded-full text-sm sm:text-base min-h-12"
          >
            Talk to an enrollment specialist
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
