import SiteDocument from "@/components/site/SiteDocument";

export const metadata = {
  title: "CredFlow AI - Healthcare Credentialing Management Software",
  description:
    "CredFlow AI automates healthcare provider credentialing, enrollment, and onboarding so medical groups get providers in-network and billing faster.",
  alternates: {
    canonical: "https://www.credflow.ai",
  },
};

export default function Home() {
  return <SiteDocument slug="index" />;
}
