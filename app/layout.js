import "./globals.css";
import AOSWrapper from "../components/AOSWrapper";
import { Toaster } from "react-hot-toast";
import { ContactFormProvider } from "../components/common/ContactFormContext";
import NewsletterModal from "../components/NewsletterModal";
import Script from "next/script";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import CookieConsent from "@/components/CookieConsent";
import AttributionCapture from "@/components/AttributionCapture";
import { headers } from "next/headers";
import {
  shouldShowConsentBanner,
  CONSENT_DENIED_REGIONS,
} from "@/lib/consentRegions";

const GTM_ID = "GTM-5WPJ7X2T";

export const metadata = {
  metadataBase: new URL("https://www.credflow.ai"),
  title: {
    default: "CredFlow AI - Healthcare Credentialing Management Software",
    template: "%s | CredFlow AI",
  },
  description:
    "CredFlow AI - Credentialing Management Software That Automates And Streamlines Healthcare Provider Credentialing, Enrollment And Onboarding. Request A Demo!",
  keywords: [
    "healthcare credentialing software",
    "medical credentialing software",
    "provider credentialing software",
    "credentialing management software",
    "healthcare provider credentialing software",
    "provider credentialing companies",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: "CredFlow AI" }],
  creator: "CredFlow AI",
  publisher: "CredFlow AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.credflow.ai",
    siteName: "CredFlow AI",
    title: "CredFlow AI - Credentialing Made Easy",
    description:
      "Your Credentialing & Enrollment AI Agent That Learns Your Process, Follows Your Rules, And Accelerates Provider Onboarding—So Revenue Never Waits.",
    images: [
      {
        url: "/images/logoo.png",
        width: 1200,
        height: 630,
        alt: "CredFlow AI - Credentialing Made Easy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CredFlow AI - Credentialing Made Easy",
    description:
      "Your Credentialing & Enrollment AI Agent That Learns Your Process, Follows Your Rules, And Accelerates Provider Onboarding—So Revenue Never Waits.",
    images: ["/images/logoo.png"],
    creator: "@credflow",
  },
  category: "Healthcare Technology",
};

const consentModeScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;

  gtag('consent', 'default', {
    'region': ${JSON.stringify(CONSENT_DENIED_REGIONS)},
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': 500
  });

  gtag('consent', 'default', {
    'ad_storage': 'granted',
    'ad_user_data': 'granted',
    'ad_personalization': 'granted',
    'analytics_storage': 'granted'
  });

  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);

  try {
    var c = document.cookie;
    if (c.indexOf('credflow_cookie_consent=accepted') !== -1) {
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    } else if (c.indexOf('credflow_cookie_consent=rejected') !== -1) {
      gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
      });
    }
    if (navigator.globalPrivacyControl === true) {
      gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
  } catch (e) {}
`;

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const country = headersList.get("x-vercel-ip-country") || "";
  const showBanner = shouldShowConsentBanner(country);

  return (
    <html lang="en">
      <head>
        <Script
          id="consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: consentModeScript }}
        />

        <meta name="msvalidate.01" content="973368DB45DAD5DDAACD83D295003142" />

        <meta name="geo.placename" content="Nashville, Tennessee" />
        <meta name="geo.region" content="US-TN" />
        <meta name="geo.position" content="36.1627;-86.7816" />
        <meta name="ICBM" content="36.1627, -86.7816" />

        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "CredFlow AI",
                url: "https://www.credflow.ai",
                logo: "https://www.credflow.ai/images/logoo.png",
                description:
                  "Your Credentialing & Enrollment AI Agent That Learns Your Process, Follows Your Rules, And Accelerates Provider Onboarding—So Revenue Never Waits.",
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "US",
                  addressRegion: "Tennessee",
                  addressLocality: "Nashville",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: "36.1627",
                  longitude: "-86.7816",
                },
                sameAs: [
                  "https://www.linkedin.com/company/credflow",
                  "https://twitter.com/credflow",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "Customer Service",
                  email: "hello@credflow.ai",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "CredFlow AI",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web",
                description:
                  "AI-powered credentialing and enrollment platform that automates provider onboarding processes for healthcare organizations.",
                featureList: [
                  "Credentialing / PSV Automation",
                  "Payer Enrollment",
                  "Real-Time Monitoring",
                  "Dashboard Analytics",
                  "Roster Automation",
                  "AI Communication Center",
                ],
              },
            ]),
          }}
        />
      </head>
      <body className="antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />

        <AttributionCapture />
        <ContactFormProvider>
          <ConditionalNavbar />
          <AOSWrapper>{children}</AOSWrapper>
        </ContactFormProvider>
        <NewsletterModal />
        <CookieConsent showBanner={showBanner} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#10B981",
              color: "#fff",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "500",
              padding: "12px 16px",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#10B981",
            },
          }}
        />
      </body>
    </html>
  );
}
