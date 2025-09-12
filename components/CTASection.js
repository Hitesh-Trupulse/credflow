import React from "react";

const CTASection = () => {
  return (
    <section
      className="relative w-full py-32 text-center text-white flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/images/blackbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-4xl md:text-6xl font-light mb-4">
        Credentialing Is Now Made <br /> Easy With{" "}
        <span className="font-semibold">Credflow AI.</span>
      </h2>

      <p className="text-gray-300 text-lg mb-8">
        Be Among The First To Experience AI-Powered Credentialing.
      </p>

      <button className="border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition">
        Join the Waitlist
      </button>
    </section>
  );
};

export default CTASection;
