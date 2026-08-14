import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";
import LeadContactForm from "@/components/LeadContactForm";

export const metadata = {
  alternates: {
    canonical: "https://www.credflow.ai/services",
  },
};

const trustBarItems = [
  "300+ payers",
  "All 50 states",
  "2-day submission",
  "Specialist-reviewed applications",
];

const servicesCards = [
  {
    title: "Provider enrollment & credentialing",
    description:
      "We manage the full enrollment process from initial document collection through payer submission and follow-up.",
    items: [
      "New payer enrollment for providers and groups",
      "CAQH profile management and maintenance",
      "Application submission within 2 business days",
      "Ongoing re-credentialing and monitoring",
      "All major commercial and government payers",
    ],
  },
  {
    title: "Payer contracting support",
    description:
      "Navigate payer contracting with confidence. We support new practice setup, multi-state work, and contract negotiations.",
    items: [
      "New practice payer enrollment setup",
      "Contract negotiation and rate review support",
      "Multi-state licensure and enrollment support",
      "Delegated credentialing arrangements",
      "Appeals, revalidations, and rejections management",
    ],
  },
];

const steps = [
  {
    number: "01",
    title: "Tell us about your providers",
    description:
      "We learn your target payers, timelines, and current enrollment status. Then we build a tailored plan.",
  },
  {
    number: "02",
    title: "We handle submissions",
    description:
      "Our team gathers documentation and submits applications within 2 business days. No missing fields, no delays.",
  },
  {
    number: "03",
    title: "Providers go billable",
    description:
      "We track every application, follow up with payers, and confirm effective dates until your providers are fully enrolled.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative min-h-screen flex items-center pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
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
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(80,99,198,0.35), transparent 45%), radial-gradient(circle at 80% 30%, rgba(183,28,210,0.25), transparent 40%), linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55))",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div className="text-center lg:text-left">
              <p
                data-aos="fade-down"
                className="text-xs sm:text-sm text-gray-400 mb-4 tracking-[0.2em] uppercase"
              >
                Credentialing Services
              </p>
              <h1
                data-aos="fade-down"
                className="text-4xl md:text-5xl lg:text-7xl font-light text-white mb-6 leading-tight"
              >
                Stop losing revenue to enrollment delays.{" "}
                <span className="bg-gradient-to-r from-[#5063C6] from-20% to-[#B71CD2] bg-clip-text text-transparent">
                  We handle it.
                </span>
              </h1>
              <p
                data-aos="fade-down"
                className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
              >
                Credflow&apos;s enrollment specialists manage the entire process
                - documentation, payer submissions, and follow-up - so you can
                focus on running your practice.
              </p>

              <div
                data-aos="fade-up"
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Link
                  href="#contact-form"
                  data-cta-id="services-talk-to-specialist"
                  data-cta-location="services-body"
                  className="group cursor-pointer inline-flex items-center justify-center font-medium transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-black hover:text-white hover:bg-blue-700 focus:ring-gray-500 hover:shadow-lg hover:shadow-blue-700/50 px-6 py-3 text-base rounded-full"
                >
                  Talk to an enrollment specialist
                </Link>
                <a
                  href="#how-it-works"
                  data-cta-id="services-see-how-it-works"
                  data-cta-location="services-body"
                  className="group inline-flex items-center justify-center rounded-full border border-white/30 bg-black/30 px-6 py-3 text-sm sm:text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/20"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    See how it works
                  </span>
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-y-1">
                    ↓
                  </span>
                </a>
              </div>
            </div>

            <div data-aos="zoom-in" className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#5063C6]/20 to-[#B71CD2]/20 blur-2xl" />
              <div className="relative bg-black/85 backdrop-blur-sm border border-[#454545] rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-base text-gray-400">Enrollment desk</p>
                    <h2 className="text-xl font-light">
                      Specialist-managed pipeline
                    </h2>
                  </div>
                  <span className="rounded-full border border-[#454545] px-3 py-1 text-sm text-white bg-white/5">
                    Live
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    ["Docs collected", "Credentialing packet complete"],
                    [
                      "Submitted in 2 days",
                      "Applications sent without missing fields",
                    ],
                    [
                      "Payer follow-up",
                      "Status tracked until effective date",
                    ],
                  ].map(([title, description], index) => (
                    <div
                      key={title}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                      className="flex gap-4 rounded-2xl border border-[#454545] bg-gradient-to-r from-white/[0.05] to-transparent p-4"
                    >
                      <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-white" />
                      <div>
                        <p className="font-medium text-white">{title}</p>
                        <p className="text-base text-gray-400">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl border border-[#454545] bg-black/60 p-3">
                    <p className="text-2xl text-white">50</p>
                    <p className="text-sm text-gray-500">States</p>
                  </div>
                  <div className="rounded-2xl border border-[#454545] bg-black/60 p-3">
                    <p className="text-2xl text-white">300+</p>
                    <p className="text-sm text-gray-500">Payers</p>
                  </div>
                  <div className="rounded-2xl border border-[#454545] bg-black/60 p-3">
                    <p className="text-2xl text-white">2d</p>
                    <p className="text-sm text-gray-500">Submit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-6 border-y border-[#454545] bg-black">
        <div className="max-w-7xl mx-auto">
          <p
            data-aos="fade-down"
            className="text-center text-sm text-gray-500 tracking-[0.2em] uppercase mb-6"
          >
            Built for fast enrollment execution
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trustBarItems.map((item, index) => (
              <div
                key={item}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group rounded-2xl border border-[#454545] bg-gradient-to-b from-white/[0.06] to-black px-4 py-5 text-center transition-colors duration-300 hover:border-[#5063C6]"
              >
                <p className="text-base text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
          {servicesCards.map((card, index) => (
            <div
              key={card.title}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-gradient-to-br from-[#101010] to-black backdrop-blur-sm border border-[#454545] rounded-2xl p-8 hover:border-[#5063C6] transition-colors duration-300"
            >
              <h2 className="text-2xl md:text-3xl font-light mb-4">
                {card.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {card.description}
              </p>
              <ul className="space-y-3">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="text-gray-300 flex gap-3 leading-relaxed"
                  >
                    <span className="text-[#B71CD2]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <p
            data-aos="fade-down"
            className="text-center text-sm text-gray-400 tracking-[0.2em] uppercase mb-3"
          >
            How It Works
          </p>
          <h2
            data-aos="fade-down"
            className="text-3xl md:text-4xl lg:text-5xl text-center font-light mb-12"
          >
            You focus on patients. We handle payers.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-gradient-to-b from-white/[0.04] to-black border border-[#454545] rounded-2xl p-7"
              >
                <p className="text-sm bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent mb-4">
                  {step.number}
                </p>
                <h3 className="text-2xl font-light mb-4 leading-tight">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-black">
        <div
          data-aos="zoom-in"
          className="max-w-4xl mx-auto border border-[#454545] rounded-2xl p-8 md:p-10 bg-gradient-to-br from-[#101010] to-black shadow-[0_0_40px_rgba(80,99,198,0.15)]"
        >
          <h3 className="text-2xl md:text-3xl font-light mb-4">
            Credflow is not a black box
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Unlike outsourced enrollment vendors where work happens offscreen,
            every submission, status update, and payer communication is tracked
            live in the Credflow platform. Your team has full visibility into
            where every provider stands - without doing the work themselves.
          </p>
        </div>
      </section>

      <LeadContactForm
        ctaId="services-pick-time"
        ctaLocation="services-contact-form"
      />

      <Footer />
    </div>
  );
}
