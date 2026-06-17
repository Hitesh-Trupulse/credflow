"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getConsent,
  setConsent,
  CONSENT_VALUES,
} from "@/lib/cookieConsent";
import ConsentTrackingScripts from "./ConsentTrackingScripts";

export default function CookieConsent() {
  const [consent, setConsentState] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = getConsent();

    if (stored === CONSENT_VALUES.ACCEPTED) {
      setConsentState(CONSENT_VALUES.ACCEPTED);
      return;
    }

    if (stored === CONSENT_VALUES.REJECTED) {
      setConsentState(CONSENT_VALUES.REJECTED);
      return;
    }

    setShowBanner(true);
  }, []);

  const handleAccept = () => {
    setConsent(CONSENT_VALUES.ACCEPTED);
    setConsentState(CONSENT_VALUES.ACCEPTED);
    setShowBanner(false);
  };

  const handleReject = () => {
    setConsent(CONSENT_VALUES.REJECTED);
    setConsentState(CONSENT_VALUES.REJECTED);
    setShowBanner(false);
  };

  return (
    <>
      {consent === CONSENT_VALUES.ACCEPTED && <ConsentTrackingScripts />}

      {showBanner && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/10 bg-gray-950/95 px-4 py-4 shadow-2xl backdrop-blur-md sm:px-6 sm:py-5"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-gray-300 sm:max-w-2xl">
              We use cookies to analyze site traffic and improve your experience.
              You can accept all cookies or reject non-essential cookies. Learn
              more in our{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-emerald-400 underline underline-offset-2 transition-colors hover:text-emerald-300"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleReject}
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-400"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
