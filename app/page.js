import dynamic from "next/dynamic";
import Hero from "../components/Hero";
import ProductCardsSection from "../components/ProductCardsSection";
import ProblemSection from "../components/ProblemSection";
import WhyCredflowSection from "../components/WhyCredflowSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

// Heavy client sections load after first paint to cut mobile TBT / unused JS
const AIFeaturesSection = dynamic(
  () => import("../components/AIFeaturesSection"),
  { loading: () => null }
);
const TeamEmpowermentSection = dynamic(
  () => import("../components/TeamEmpowermentSection"),
  { loading: () => null }
);
const PlatformSection = dynamic(
  () => import("../components/PlatformSection"),
  { loading: () => null }
);
const WhoWeHelpSection = dynamic(
  () => import("../components/WhoWeHelpSection"),
  { loading: () => null }
);

export const metadata = {
  title: "CredFlow AI - Healthcare Credentialing Management Software",
  description:
    "CredFlow AI automates healthcare provider credentialing, enrollment, and onboarding so medical groups get providers in-network and billing faster.",
  alternates: {
    canonical: "https://www.credflow.ai",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductCardsSection />
      <ProblemSection />
      <AIFeaturesSection />
      <WhyCredflowSection />
      <TeamEmpowermentSection />
      <PlatformSection />
      <WhoWeHelpSection />
      <CTASection />
      <Footer />
    </div>
  );
}
