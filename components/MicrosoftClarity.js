"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getConsent, CONSENT_VALUES } from "@/lib/cookieConsent";

const CLARITY_ID = "u8xqxiaos8";

function shouldEnableClarity(showBanner) {
  // Outside opt-in regions (US, etc.): always load Clarity
  if (!showBanner) return true;
  // Banner regions: only after Accept
  return getConsent() === CONSENT_VALUES.ACCEPTED;
}

/**
 * Clarity is outside Google Consent Mode. Load it for visitors who don't
 * need opt-in (US / most of world), or who explicitly accepted in a
 * banner region. Never load after Reject.
 */
export default function MicrosoftClarity({ showBanner = false }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(shouldEnableClarity(showBanner));

    const onConsent = (event) => {
      if (event.detail === CONSENT_VALUES.ACCEPTED) {
        setEnabled(true);
      } else if (event.detail === CONSENT_VALUES.REJECTED) {
        setEnabled(false);
      }
    };

    window.addEventListener("credflow-consent", onConsent);
    return () => window.removeEventListener("credflow-consent", onConsent);
  }, [showBanner]);

  if (!enabled) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}
