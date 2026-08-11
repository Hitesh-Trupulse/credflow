/**
 * Lightweight static section — no framer-motion / no client JS.
 */
export default function TeamEmpowermentSection() {
  return (
    <section className="py-20 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto text-start">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 leading-tight text-white">
          Enable Your Team.
          <span className="block">Make Them AI-Powered Superstars.</span>
        </h2>

        <div className="max-w-7xl mx-auto space-y-8 text-xl md:text-2xl leading-relaxed text-white">
          <p className="text-white">
            Your admins and coordinators know the workflows, payers, and
            providers better than anyone. What they don&apos;t need? Endless
            forms and follow-ups.
          </p>

          <p className="text-white">
            <strong className="text-white">CredFlow AI</strong> takes the
            manual grind off their plate while keeping their expertise at the
            center. No outsourcing. No losing control. Just{" "}
            <strong className="text-white">AI agents</strong> working behind
            the scenes so your team can shine where it matters most.
          </p>

          <p className="text-2xl md:text-3xl text-white">
            <strong className="text-white">Your team</strong> is your
            advantage—
            <strong className="text-white">CredFlow AI</strong> makes them{" "}
            <strong className="text-white">unstoppable</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
