import SiteDocument from "@/components/site/SiteDocument";
import { titles } from "@/lib/site/content";

export const metadata = {
  title: { absolute: titles.payers },
  description:
    "Payer directory auditing for health plans. CredFlow compares enrollment records against payer-side data.",
  alternates: {
    canonical: "https://www.credflow.ai/payers",
  },
};

export default function PayersPage() {
  return <SiteDocument slug="payers" />;
}
