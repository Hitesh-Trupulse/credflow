import Hero from "../components/Hero";
import ProductCardsSection from "../components/ProductCardsSection";
import ProblemSection from "../components/ProblemSection";
import WhyCredflowSection from "../components/WhyCredflowSection";
import TeamEmpowermentSection from "../components/TeamEmpowermentSection";
import WhoWeHelpSection from "../components/WhoWeHelpSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import {
  LazyAIFeaturesSection,
  LazyPlatformSection,
} from "../components/HomeLazySections";

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
      <LazyAIFeaturesSection />
      <WhyCredflowSection />
      <TeamEmpowermentSection />
      <LazyPlatformSection />
      <WhoWeHelpSection />
      <CTASection />
      <Footer />
    </div>
  );
}
