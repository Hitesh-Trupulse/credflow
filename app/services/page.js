import LandingPage from "@/components/landing/LandingPage";
import { servicesLandingHtml } from "@/lib/landing/servicesHtml";
import { servicesJsonLd, servicesMeta } from "@/lib/landing/spec";

export const metadata = {
  title: { absolute: servicesMeta.title },
  description: servicesMeta.description,
  alternates: {
    canonical: servicesMeta.canonical,
  },
  openGraph: {
    title: servicesMeta.title,
    description: servicesMeta.description,
    url: servicesMeta.canonical,
  },
};

export default function ServicesPage() {
  return <LandingPage html={servicesLandingHtml} jsonLd={servicesJsonLd} />;
}
