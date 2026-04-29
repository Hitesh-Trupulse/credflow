import Link from "next/link";

const cards = [
  {
    eyebrow: "For in-house teams",
    title: "Credentialing Software",
    description:
      "Run enrollment in-house with AI-powered workflows, agentic payer communication, and portal automation.",
    href: "/software",
  },
  {
    eyebrow: "Done for you",
    title: "Credentialing Services",
    description:
      "We handle submissions, follow-ups, and payer communication so you don't have to.",
    href: "/services",
  },
  {
    eyebrow: "Network intelligence",
    title: "InNetwork.ai",
    description:
      "Instant provider network lookup from an NPI. Free tier available. API access for enterprise.",
    href: "/innetwork",
  },
  {
    eyebrow: "For payers",
    title: "Payer Directory Auditor",
    description:
      "Audit, benchmark, and remediate provider directory accuracy for health plans.",
    href: "/payers",
  },
];

export default function ProductCardsSection() {
  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-2xl sm:text-3xl md:text-4xl font-light mb-10">
          Everything your practice needs to get providers in-network fast.
        </p>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group min-w-[260px] sm:min-w-[280px] lg:min-w-0 lg:flex-1 bg-gradient-to-br from-[#0F0F0F] to-black border border-[#454545] rounded-2xl p-6 hover:border-[#5063C6] hover:shadow-lg hover:shadow-[#5063C6]/20 transition-all duration-300"
            >
              <p className="text-sm text-gray-400 mb-3 tracking-wide uppercase">{card.eyebrow}</p>
              <h3 className="text-2xl font-medium leading-tight mb-4">{card.title}</h3>
              <p className="text-gray-300 leading-relaxed mb-6">{card.description}</p>
              <span className="inline-flex items-center font-medium bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">
                Learn more --&gt;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
