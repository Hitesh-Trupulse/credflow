import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductCardsSection from '../components/ProductCardsSection';
import VideoSection from '../components/VideoSection';
import StatsSection from '../components/StatsSection';
import ProblemSection from '../components/ProblemSection';
import AIFeaturesSection from '../components/AIFeaturesSection';
import WhyCredflowSection from '../components/WhyCredflowSection';
import TeamEmpowermentSection from '../components/TeamEmpowermentSection';
import PlatformSection from '../components/PlatformSection';
import WhoWeHelpSection from '../components/WhoWeHelpSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

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
        {/* <VideoSection /> */}
        {/* <StatsSection /> */}
        <ProblemSection />
        <AIFeaturesSection />
        <WhyCredflowSection />
        <TeamEmpowermentSection />
        <PlatformSection />
        <WhoWeHelpSection />
        <CTASection/>
        <Footer/>
    </div>
  );
}
