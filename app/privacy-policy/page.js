import SiteDocument from "@/components/site/SiteDocument";
import { titles } from "@/lib/site/content";

export const metadata = {
  title: { absolute: titles["privacy-policy"] },
  description:
    "CredFlow AI Privacy Policy - How we collect, use, and protect your information.",
  alternates: {
    canonical: "https://www.credflow.ai/privacy-policy",
  },
};

export default function PrivacyPolicy() {
  return <SiteDocument slug="privacy-policy" />;
}
