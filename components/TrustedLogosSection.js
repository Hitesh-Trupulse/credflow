import Image from "next/image";

const LOGOS = [
  {
    src: "/images/trusted-logos/nourish.png",
    alt: "Nourish",
    width: 117,
    height: 22,
  },
  {
    src: "/images/trusted-logos/aetna.png",
    alt: "Aetna",
    width: 108,
    height: 23,
  },
  {
    src: "/images/trusted-logos/medico.png",
    alt: "Medico.cx",
    width: 137,
    height: 15,
  },
  {
    src: "/images/trusted-logos/blue-shield-california.png",
    alt: "Blue Shield of California",
    width: 71,
    height: 26,
    compact: true,
  },
  {
    src: "/images/trusted-logos/providence-health-plan.png",
    alt: "Providence Health Plan",
    width: 88,
    height: 26,
    compact: true,
  },
];

export default function TrustedLogosSection() {
  return (
    <section
      aria-label="Trusted by credentialing teams and health plans"
      className="relative bg-black px-6 py-10 sm:pt-14 sm:pb-14"
    >
      <div className="mx-auto max-w-7xl text-center">
        <p className="mb-8 text-xs uppercase tracking-[0.18em] text-gray-400 sm:text-sm">
          Trusted by credentialing teams and health plans
        </p>
       

        <div className="flex flex-wrap items-center justify-center gap-3">
          {LOGOS.map((logo) => (
            <div
              key={logo.alt}
              className={`group flex h-[46px] min-w-[206px] items-center justify-center rounded-xl border border-white/5 bg-white/[0.04] transition-colors duration-200 hover:border-white/15 hover:bg-white/10 ${
                logo.compact ? "px-5 py-2" : "px-5"
              }`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-auto max-h-[34px] w-auto object-contain opacity-60 invert grayscale transition duration-200 group-hover:opacity-100 group-hover:invert-0 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
