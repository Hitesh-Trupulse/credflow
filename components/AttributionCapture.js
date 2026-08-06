"use client";

import { useEffect } from "react";

const CAPTURE = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

const NINETY_DAYS = 7776000;

const cookieBase = () => {
  const secure = process.env.NODE_ENV === "production" ? "; secure" : "";
  const domain =
    typeof window !== "undefined" &&
    window.location.hostname.endsWith("credflow.ai")
      ? "; domain=.credflow.ai"
      : "";
  return `path=/; max-age=${NINETY_DAYS}; samesite=lax${secure}${domain}`;
};

const write = (name, value) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; ${cookieBase()}`;
};

export const readAttribution = (name) => {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${name}=`))
    ?.split("=")
    .slice(1)
    .join("=");

  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
};

/**
 * Captures paid-click / UTM params into first-touch and last-touch cookies.
 * Mount once in the root layout. Must run before any query-stripping navigation.
 */
export default function AttributionCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const found = Object.fromEntries(
      CAPTURE.filter((k) => params.get(k)).map((k) => [k, params.get(k)])
    );

    if (!Object.keys(found).length) return;

    const payload = JSON.stringify({
      ...found,
      landing_page: window.location.pathname,
      referrer: document.referrer || null,
    });

    write("cf_attr_last", payload);
    if (!readAttribution("cf_attr_first")) {
      write("cf_attr_first", payload);
    }
  }, []);

  return null;
}
