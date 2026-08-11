import WhyCredflowSection from "@/components/WhyCredflowSection";
import TeamEmpowermentSection from "@/components/TeamEmpowermentSection";
import WhoWeHelpSection from "@/components/WhoWeHelpSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import LeadContactForm from "@/components/LeadContactForm";
import {
  LazyAIFeaturesSection,
  LazyPlatformSection,
} from "@/components/HomeLazySections";

export const metadata = {
  title: "Credentialing Software",
  description:
    "CredFlow AI credentialing software for in-house teams managing provider enrollment, payer communication, and credentialing workflows.",
};

export default function SoftwarePage() {
  return (
    <div className="min-h-screen bg-black pt-24 text-white">
      <LazyAIFeaturesSection />
      <WhyCredflowSection />
      <TeamEmpowermentSection />
      <LazyPlatformSection />
      <WhoWeHelpSection />
      <CTASection formHref="/software#contact-form" />
      <LeadContactForm
        ctaId="software-pick-time"
        ctaLocation="software-contact-form"
      />
      <Footer />
    </div>
  );
}
