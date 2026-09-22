import SiteDocument from "@/components/site/SiteDocument";
import { titles } from "@/lib/site/content";

export const metadata = {
  title: { absolute: titles.services },
  description:
    "Done-for-you credentialing and payer enrollment services, tracked live in CredFlow.",
  alternates: {
    canonical: "https://www.credflow.ai/services",
  },
};

export default function ServicesPage() {
  return <SiteDocument slug="services" />;
}
