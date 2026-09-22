import SiteDocument from "@/components/site/SiteDocument";
import { titles } from "@/lib/site/content";

export const metadata = {
  title: { absolute: titles["terms-and-conditions"] },
  description:
    "CredFlow AI Terms and Conditions - Read our terms of service for using our credentialing platform.",
  alternates: {
    canonical: "https://www.credflow.ai/terms-and-conditions",
  },
};

export default function TermsAndConditions() {
  return <SiteDocument slug="terms-and-conditions" />;
}
