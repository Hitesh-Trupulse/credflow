import { notFound } from "next/navigation";
import SiteDocument from "@/components/site/SiteDocument";
import { pages, titles } from "@/lib/site/content";

const DEDICATED = new Set([
  "software",
  "services",
  "innetwork",
  "payers",
  "resources",
  "get-started",
  "terms-and-conditions",
  "privacy-policy",
  "thank-you",
]);

export function generateStaticParams() {
  return Object.keys(pages)
    .filter((slug) => slug !== "index" && !DEDICATED.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!pages[slug] || DEDICATED.has(slug)) return {};
  return {
    title: { absolute: titles[slug] || "CredFlow AI" },
    alternates: {
      canonical: `https://www.credflow.ai/${slug}`,
    },
  };
}

export default async function MarketingSlugPage({ params }) {
  const { slug } = await params;
  if (!pages[slug] || DEDICATED.has(slug)) notFound();
  return <SiteDocument slug={slug} />;
}
