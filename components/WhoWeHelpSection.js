"use client";
import { Clock } from "lucide-react";

const cards = [
  {
    title: "Hospitals & Health Systems",
    description:
      "Large Networks Needing Streamlined Operations And Compliance At Scale.",
    gradient: "from-[#454545]/10 to-[#2A154E]/40",
    animation: "fade-down",
  },
  {
    title: "Physician Groups",
    description:
      "Clinics Seeking Smoother Scheduling, Billing, And Patient Flow.",
    gradient: "from-[#454545]/10 to-gray-700/20",
    animation: "fade-up",
  },
  {
    title: "Payers",
    description:
      "We Work With Health Plans To Streamline Credentialing And Enable AI Tools In Their Workflow. Our Proprietary Data-Lake Optimizes No Surprises Act Directory Compliance.",
    gradient: "from-[#15204E]/40 to-[#454545]/10",
    animation: "fade-down",
  },
  {
    title: "RCM Organizations",
    description:
      "Billing Experts Focused On Speed, Accuracy, And Revenue Protection.",
    gradient: "from-[#454545]/40 to-black",
    animation: "fade-up",
  },
  {
    title: "Telehealth Providers",
    description:
      "Digital Care Platforms Needing Seamless, Reliable Integrations.",
    gradient: "from-[#454545]/10 to-[#114131]/40",
    animation: "fade-down",
  },
  {
    title: "Ambulatory Surgery Centers (ASCs)",
    description:
      "Same-Day Surgical Facilities Balancing Efficiency, Cost, And Compliance.",
    gradient: "from-black to-[#454545]/20",
    animation: "fade-up",
  },
];

export default function WhoWeHelpSection() {
  return (
    <section id="who-we-help" className="scroll-mt-32 bg-black py-20 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 data-aos="fade-down" className="text-5xl sm:text-6xl lg:text-7xl mb-4">
          Who We{" "}
          <span className="bg-gradient-to-r from-[#5063C6] from-20% to-[#B71CD2] bg-clip-text text-transparent">
            Help
          </span>
        </h2>
        <p
          data-aos="fade-down"
          className="text-gray-400 max-w-2xl mx-auto mb-16"
        >
          Legacy Tools Track Tasks. Credflow AI Completes Them.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div
              data-aos={card.animation}
              data-aos-delay={i * 100} // stagger animations
              key={i}
              className={`relative text-center bg-gradient-to-br ${card.gradient} p-8 text-left transition-transform cursor-pointer`}
            >
              {/* Decorative borders */}
              {i === 1 || i === 0 ? (
                <div data-aos="zoom-in" className="absolute hidden lg:block top-1/4 right-0 w-px h-1/2 bg-gradient-to-b from-purple-500/30 to-blue-500/30"></div>
              ) : null}

              {i === 4 || i === 5 ? (
                <div data-aos="zoom-in" className=" hidden lg:block absolute top-1/4 left-0 w-px h-1/2 bg-gradient-to-b from-blue-500/30 to-emerald-500/30"></div>
              ) : null}

              {/* Icon */}
              <div
                data-aos="zoom-in"
                className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${card.gradient} border border-[#454545] mb-6 mx-auto`}
              >
                <Clock className="w-7 h-7 text-gray-300" />
              </div>

              {/* Title */}
              <h3
                data-aos="zoom-in"
                className="text-lg font-semibold text-center mb-2"
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                data-aos="zoom-in"
                className="text-gray-400 text-sm text-center leading-relaxed"
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
