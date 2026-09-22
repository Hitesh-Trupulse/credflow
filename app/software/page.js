import SiteDocument from "@/components/site/SiteDocument";
import { titles } from "@/lib/site/content";

export const metadata = {
  title: { absolute: titles.software },
  description:
    "AI provider credentialing software and payer enrollment platform for in-house teams.",
  alternates: {
    canonical: "https://www.credflow.ai/software",
  },
};

export default function SoftwarePage() {
  return <SiteDocument slug="software" />;
}
