import LandingPage from "@/components/landing/LandingPage";
import { softwareLandingHtml } from "@/lib/landing/softwareHtml";
import { softwareJsonLd, softwareMeta } from "@/lib/landing/spec";

export const metadata = {
  title: { absolute: softwareMeta.title },
  description: softwareMeta.description,
  alternates: {
    canonical: softwareMeta.canonical,
  },
  openGraph: {
    title: softwareMeta.title,
    description: softwareMeta.description,
    url: softwareMeta.canonical,
  },
};

export default function SoftwarePage() {
  return <LandingPage html={softwareLandingHtml} jsonLd={softwareJsonLd} />;
}
