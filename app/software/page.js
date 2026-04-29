import AIFeaturesSection from "@/components/AIFeaturesSection";
import WhyCredflowSection from "@/components/WhyCredflowSection";
import TeamEmpowermentSection from "@/components/TeamEmpowermentSection";
import PlatformSection from "@/components/PlatformSection";
import WhoWeHelpSection from "@/components/WhoWeHelpSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Credentialing Software",
  description:
    "CredFlow AI credentialing software for in-house teams managing provider enrollment, payer communication, and credentialing workflows.",
};

export default function SoftwarePage() {
  return (
    <div className="min-h-screen bg-black pt-24">
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
