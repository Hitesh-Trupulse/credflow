import SiteDocument from "@/components/site/SiteDocument";
import { titles } from "@/lib/site/content";
import ResourcesLibrary from "./components/ResourcesLibrary";

export const metadata = {
  title: { absolute: titles.resources },
  description:
    "Practical guides on credentialing, payer enrollment, and the operations behind getting providers billable.",
  alternates: {
    canonical: "https://www.credflow.ai/resources",
  },
};

export default function ResourcesPage() {
  return (
    <SiteDocument slug="resources">
      <ResourcesLibrary />
    </SiteDocument>
  );
}
