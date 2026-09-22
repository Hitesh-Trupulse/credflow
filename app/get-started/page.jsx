import SiteDocument from "@/components/site/SiteDocument";

export const metadata = {
  title: { absolute: "Book a Demo | CredFlow AI" },
  robots: {
    index: false,
    follow: true,
  },
};

export default function GetStartedPage() {
  return <SiteDocument slug="demo" />;
}
