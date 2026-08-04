"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getConsent,
  setConsent,
  CONSENT_VALUES,
  CONSENT_GRANTED,
  updateGtagConsent,
} from "@/lib/cookieConsent";

/**
 * Geo-aware cookie banner. Only rendered when showBanner is true
 * (EEA / UK / CH / Quebec). GTM always loads; Consent Mode controls tags.
 */
export default function CookieConsent({ showBanner = false }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getConsent();

    // Returning user who already accepted — restore granted (regional defaults are denied)
    if (stored === CONSENT_VALUES.ACCEPTED) {
      updateGtagConsent(CONSENT_GRANTED);
      setVisible(false);
    } else if (stored === CONSENT_VALUES.REJECTED) {
      // Returning reject — keep denied, stay hidden
      setVisible(false);
    } else if (showBanner) {
      // First visit in a banner-required region
      setVisible(true);
    }

    // GPC (California / Colorado): limit ads, keep analytics — applied after restore so it wins
    if (
      typeof navigator !== "undefined" &&
      navigator.globalPrivacyControl === true
    ) {
      updateGtagConsent({
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "granted",
      });
    }
  }, [showBanner]);

  const handleAccept = () => {
    setConsent(CONSENT_VALUES.ACCEPTED);
    updateGtagConsent(CONSENT_GRANTED);
    setVisible(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("credflow-consent", { detail: CONSENT_VALUES.ACCEPTED })
      );
    }
  };

  const handleReject = () => {
    setConsent(CONSENT_VALUES.REJECTED);
    // Regional defaults already denied — do not grant or load extra tracking
    setVisible(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("credflow-consent", { detail: CONSENT_VALUES.REJECTED })
      );
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-[#454545] bg-gradient-to-r from-[#0F0F17] to-[#1B1B27] px-4 py-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md sm:px-6 sm:py-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="sm:max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[#6C63FF] mb-1">
            Cookies
          </p>
          <p className="text-sm leading-relaxed text-gray-300">
            We use cookies to analyze site traffic and improve your experience.
            You can accept or reject non-essential cookies. Learn more in our{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-[#6C63FF] underline underline-offset-2 transition-colors hover:text-[#8B84FF]"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleReject}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/10"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-full bg-gradient-to-r from-[#6C63FF] to-[#B721FF] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
