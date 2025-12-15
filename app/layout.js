import "./globals.css";
import AOSWrapper from "../components/AOSWrapper";
import { Toaster } from "react-hot-toast";
import { ContactFormProvider } from "../components/common/ContactFormContext";
import NewsletterModal from "../components/NewsletterModal";
import Script from "next/script";
import ConditionalNavbar from "@/components/ConditionalNavbar";

export const metadata = {
  metadataBase: new URL("https://www.credflow.ai"),
  title: {
    default: "CredFlow AI - Healthcare Credentialing Management Software",
    template: "%s | CredFlow AI",
  },
  description:
    "CredFlow AI - Credentialing Management Software That Automates And Streamlines Healthcare Provider Credentialing, Enrollment And Onboarding. Request A Demo!",
  // Keywords meta tag - Google ignores this, but some search engines still use it
  keywords: [
    "healthcare credentialing software",
    "medical credentialing software",
    "provider credentialing software",
    "credentialing management software",
    "healthcare provider credentialing software",
    "provider credentialing companies",
  ],
  // Robots meta - tells search engines how to crawl your site
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
  // Author and publisher info
  authors: [{ name: "CredFlow AI" }],
  creator: "CredFlow AI",
  publisher: "CredFlow AI",
  // Open Graph for social media sharing (Facebook, LinkedIn, etc.)
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
  // Twitter Card for Twitter sharing
  twitter: {
    card: "summary_large_image",
    title: "CredFlow AI - Credentialing Made Easy",
    description:
      "Your Credentialing & Enrollment AI Agent That Learns Your Process, Follows Your Rules, And Accelerates Provider Onboarding—So Revenue Never Waits.",
    images: ["/images/logoo.png"],
    creator: "@credflow",
  },
  // Category and classification
  category: "Healthcare Technology",
  // Viewport and other technical meta tags are handled by Next.js automatically
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5WPJ7X2T');`,
          }}
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1MSBXJCHJ7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-1MSBXJCHJ7');
          `}
        </Script>

        {/* Bing Webmaster Verification */}
        <meta name="msvalidate.01" content="973368DB45DAD5DDAACD83D295003142" />

        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "u8xqxiaos8");
          `}
        </Script>

        {/* Geo Location Meta Tags */}
        <meta name="geo.region" content="IN-HR" />
        <meta name="geo.placename" content="Gurugram, India" />
        <meta name="geo.position" content="28.438111;77.105060" />
        <meta name="ICBM" content="28.438111, 77.105060" />

        {/* Structured Data - Organization & SoftwareApplication (Essential for SEO) */}
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
                  addressCountry: "IN",
                  addressRegion: "Haryana",
                  addressLocality: "Gurugram",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: "28.438111",
                  longitude: "77.105060",
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
        {/* Google Tag Manager (noscript) – must be right after <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5WPJ7X2T"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ContactFormProvider>
          <ConditionalNavbar />
          <AOSWrapper>{children}</AOSWrapper>
        </ContactFormProvider>
        <NewsletterModal />
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
