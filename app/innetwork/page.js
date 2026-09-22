import SiteDocument from "@/components/site/SiteDocument";
import { titles } from "@/lib/site/content";

export const metadata = {
  title: { absolute: titles.innetwork },
  description:
    "Enter an NPI. InNetwork.ai tells you where that provider likely appears in-network across supported payers.",
  alternates: {
    canonical: "https://www.credflow.ai/innetwork",
  },
};

export default function InNetworkPage() {
  return <SiteDocument slug="innetwork" />;
}
