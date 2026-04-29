"use client";

import Image from "next/image";
import { CheckCircle, Database, Layers, Search, Shield, Zap } from "lucide-react";
import { FaArrowRight } from "react-icons/fa6";
import Button from "@/components/common/Button";
import Footer from "@/components/Footer";

const valueProps = [
  {
    icon: Search,
    title: "NPI-first lookup",
    description:
      "Start with just an NPI. No complex name search, no identity resolution. Minimal input, meaningful output.",
  },
  {
    icon: Layers,
    title: "Multi-payer coverage",
    description:
      "Check likely in-network status across hundreds of supported payers in a single query.",
  },
  {
    icon: Database,
    title: "Enterprise API",
    description:
      "High-volume lookups, embedded provider search, and network intelligence at scale for healthtech platforms.",
  },
];

const useCases = [
  "Physician recruiting - confirm in-network status before extending an offer",
  "Provider onboarding triage - prioritize who needs enrollment work done",
  "Revenue activation - identify providers already in-network and move them to billable status faster",
  "Scheduling readiness - verify network participation before booking patient appointments",
];

const pricingTiers = [
  {
    name: "Free",
    cta: "Try free",
    href: "https://innetwork.credflow.ai",
    features: [
      "Limited lookups per month",
      "NPI-based search",
      "Multi-payer results",
      "No credit card required",
    ],
  },
  {
    name: "Pro",
    cta: "Get Pro",
    features: [
      "Higher lookup volume",
      "Saved searches and history",
      "Team access",
      "Priority support",
    ],
  },
  {
    name: "API / Enterprise",
    cta: "Contact us",
    features: [
      "Unlimited lookups via API",
      "Embedded provider search",
      "Custom integrations",
      "Enterprise SLA",
    ],
  },
];

export default function InNetworkPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative min-h-screen flex items-center pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/mainbg.png"
            alt="Main Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0">
          <Image
            src="/images/noisebg.png"
            alt="Stars Overlay"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <div className="text-center lg:text-left">
              <p data-aos="fade-down" className="text-xs sm:text-sm text-gray-400 mb-4 tracking-[0.2em] uppercase">
                InNetwork.ai
              </p>
              <h1 data-aos="fade-down" className="text-4xl md:text-5xl lg:text-7xl font-light text-white mb-6 leading-tight">
                Know where your providers are{" "}
                <span className="bg-gradient-to-r from-[#5063C6] from-20% to-[#B71CD2] bg-clip-text text-transparent">
                  in-network. Instantly.
                </span>
              </h1>
              <p data-aos="fade-down" className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                Enter an NPI. InNetwork.ai tells you where that provider likely appears
                in-network across supported payers - in seconds, without a payer call.
              </p>

              <div data-aos="fade-up" className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="https://innetwork.credflow.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center rounded-full bg-white px-8 py-3 font-medium text-black transition-all duration-500 hover:bg-blue-700 hover:text-white hover:shadow-lg hover:shadow-blue-700/50"
                >
                  Try a free lookup
                  <span className="ml-2 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
                </a>
                <Button variant="secondary" size="md" className="rounded-full">
                  Get API access
                </Button>
              </div>
            </div>

            <div data-aos="zoom-in" className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#5063C6]/20 to-[#B71CD2]/20 blur-2xl" />
              <div className="relative bg-black/85 backdrop-blur-sm border border-[#454545] rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-base text-gray-400">Lookup preview</p>
                    <h2 className="text-xl font-light">NPI network intelligence</h2>
                  </div>
                  <span className="rounded-full border border-[#454545] px-3 py-1 text-sm text-white bg-white/5">
                    Instant
                  </span>
                </div>

                <div className="rounded-2xl border border-[#454545] bg-black/70 p-4 mb-5">
                  <p className="text-sm text-gray-500 mb-2">Provider NPI</p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-lg tracking-widest text-white">1234567890</span>
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-3">
                  {["Commercial payer match", "Medicare Advantage directory", "Regional plan participation"].map(
                    (result, index) => (
                      <div
                        key={result}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        className="flex items-center justify-between rounded-2xl border border-[#454545] bg-gradient-to-r from-white/[0.05] to-transparent p-4"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-white" />
                          <span className="text-base text-gray-300">{result}</span>
                        </div>
                        <span className="text-sm text-gray-500">{index === 0 ? "Likely" : "Review"}</span>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl border border-[#454545] bg-black/60 p-3">
                    <Zap className="h-5 w-5 mx-auto mb-2 text-white" />
                    <p className="text-sm text-gray-500">Seconds</p>
                  </div>
                  <div className="rounded-2xl border border-[#454545] bg-black/60 p-3">
                    <Layers className="h-5 w-5 mx-auto mb-2 text-white" />
                    <p className="text-sm text-gray-500">Multi-payer</p>
                  </div>
                  <div className="rounded-2xl border border-[#454545] bg-black/60 p-3">
                    <Shield className="h-5 w-5 mx-auto mb-2 text-white" />
                    <p className="text-sm text-gray-500">API-ready</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <p data-aos="fade-down" className="text-center text-sm text-gray-400 tracking-[0.2em] uppercase mb-3">
            Network lookup, simplified
          </p>
          <h2 data-aos="fade-down" className="text-3xl md:text-4xl lg:text-5xl text-center font-light mb-12">
            Start with an NPI. Get meaningful network intelligence.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {valueProps.map((prop, index) => {
              const Icon = prop.icon;
              return (
                <div
                  key={prop.title}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-gradient-to-b from-white/[0.04] to-black border border-[#454545] rounded-2xl p-7 hover:border-[#5063C6] transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-full border border-[#454545] bg-gradient-to-b from-white/5 to-black flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-light mb-4">{prop.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{prop.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 border-y border-[#454545] bg-black">
        <div className="max-w-7xl mx-auto">
          <p data-aos="fade-down" className="text-center text-sm text-gray-500 tracking-[0.2em] uppercase mb-6">
            Built for real workflows
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCases.map((useCase, index) => (
              <div
                key={useCase}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="rounded-2xl border border-[#454545] bg-gradient-to-b from-white/[0.06] to-black p-5 text-base text-gray-300 leading-relaxed"
              >
                {useCase}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <p data-aos="fade-down" className="text-center text-sm text-gray-400 tracking-[0.2em] uppercase mb-3">
            Pricing
          </p>
          <h2 data-aos="fade-down" className="text-3xl md:text-4xl lg:text-5xl text-center font-light mb-12">
            Choose how your team uses InNetwork.ai.
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.name}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-gradient-to-br from-[#101010] to-black border border-[#454545] rounded-2xl p-8 flex flex-col hover:border-[#5063C6] transition-colors duration-300"
              >
                <h3 className="text-3xl font-light mb-6">{tier.name}</h3>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="text-gray-300 flex gap-3 leading-relaxed">
                      <span className="text-[#B71CD2]">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {tier.href ? (
                  <a
                    href={tier.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group cursor-pointer inline-flex w-fit items-center justify-center font-medium transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-black hover:text-white hover:bg-blue-700 focus:ring-gray-500 hover:shadow-lg hover:shadow-blue-700/50 px-6 py-3 text-base rounded-full"
                  >
                    <div className="relative flex items-center px-5 justify-center w-full">
                      <span className="transition-transform font-extralight duration-500 ease-out group-hover:-translate-x-3">
                        {tier.cta}
                      </span>
                      <FaArrowRight className="absolute right-1 font-extralight w-4 h-4 opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
                    </div>
                  </a>
                ) : (
                  <Button variant="primary" size="md" className="rounded-full w-fit">
                    {tier.cta}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-black">
        <div data-aos="zoom-in" className="max-w-5xl mx-auto border border-[#454545] rounded-2xl p-8 md:p-10 bg-gradient-to-br from-[#101010] to-black shadow-[0_0_40px_rgba(80,99,198,0.12)]">
          <p className="text-base text-gray-400 tracking-[0.2em] uppercase mb-4">
            Important disclaimer
          </p>
          <p className="text-gray-300 leading-relaxed">
            InNetwork.ai estimates likely in-network status based on payer directory and other
            available data. This does not confirm coverage or network participation. Always verify
            directly with the payer before relying on this information for billing or care decisions.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
