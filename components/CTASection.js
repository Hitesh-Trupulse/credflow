import React from "react";
import Link from "next/link";

const CTASection = ({ formHref = "/services#contact-form" }) => {
  const isSoftware = formHref.includes("/software");

  return (
    <section className="relative w-full py-32 text-center bg-black text-white flex flex-col items-center justify-center">
      <h2 className="text-5xl sm:text-6xl lg:text-7xl mb-4">
        Credentialing Is Now Made <br />{" "}
        <span className="leading-relaxed">Easy With Credflow AI.</span>
      </h2>

      <p className="text-gray-300 text-lg mb-8">
        Be among the first to experience AI-powered healthcare credentialing
        software.
      </p>

      <Link
        href={formHref}
        data-cta-id={isSoftware ? "software-book-demo" : "home-book-demo"}
        data-cta-location={isSoftware ? "software-cta" : "home-cta"}
        className="group cursor-pointer inline-flex items-center justify-center font-medium transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-black hover:text-white hover:bg-blue-700 focus:ring-gray-500 hover:shadow-lg hover:shadow-blue-700/50 px-6 py-3 text-base rounded-full"
      >
        Book a demo
      </Link>
    </section>
  );
};

export default CTASection;
