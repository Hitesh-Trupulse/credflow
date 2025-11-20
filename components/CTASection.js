import React from "react";
import Button from "./common/Button";

const CTASection = () => {
  return (
    <section
      className="relative w-full py-32 text-center bg-black text-white flex flex-col items-center justify-center"
    >
      <h2 className="text-5xl sm:text-6xl lg:text-7xl mb-4">
        Credentialing Is Now Made <br /> {" "}
        <span className="leading-relaxed">Easy With Credflow AI.</span>
      </h2>

      <p className="text-gray-300 text-lg mb-8">
        Be among the first to experience AI-powered healthcare credentialing software.
      </p>

        <Button variant="primary" size="md" className="rounded-full">
          Join The Waitlist
        </Button>
    </section>
  );
};

export default CTASection;
