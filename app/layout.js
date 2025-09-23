import "./globals.css";
import AOSWrapper from "../components/AOSWrapper";
import { Toaster } from "react-hot-toast";
import { ContactFormProvider } from "../components/common/ContactFormContext";
import Script from "next/script";

export const metadata = {
  title: "CredFlow AI - Credentialing Made Easy",
  description:
    "Your Credentialing & Enrollment AI Agent That Learns Your Process, Follows Your Rules, And Accelerates Provider Onboarding—So Revenue Never Waits.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body className="antialiased">
        <ContactFormProvider>
          <AOSWrapper>{children}</AOSWrapper>
        </ContactFormProvider>
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
