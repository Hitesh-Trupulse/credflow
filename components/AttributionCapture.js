"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const CAPTURE = [
  "gclid",
  "gbraid",
  "wbraid",
  "li_fat_id",
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
];

const NINETY_DAYS = 7776000;

const cookieScope = () => {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  const onBrand = host === "credflow.ai" || host.endsWith(".credflow.ai");
  if (onBrand) return "; domain=.credflow.ai; samesite=lax; secure";
  return `; samesite=lax${window.location.protocol === "https:" ? "; secure" : ""}`;
};

const read = (name) => {
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

const write = (name, obj) => {
  document.cookie =
    name +
    "=" +
    encodeURIComponent(JSON.stringify(obj)) +
    "; path=/; max-age=" +
    NINETY_DAYS +
    cookieScope();
};

export const readAttribution = (name) => read(name);

function captureFromLocation() {
  if (typeof window === "undefined") return;

  if (!window.cfReadAttribution) {
    window.cfReadAttribution = () => ({
      first_touch: read("cf_attr_first"),
      last_touch: read("cf_attr_last"),
    });
  }

  const params = new URLSearchParams(window.location.search);
  const found = {};
  CAPTURE.forEach((k) => {
    if (params.get(k)) found[k] = params.get(k);
  });
  if (!Object.keys(found).length) return;

  found.landing_page = window.location.pathname;
  found.referrer = document.referrer || null;
  found.ts = new Date().toISOString();

  write("cf_attr_last", found);
  if (!read("cf_attr_first")) write("cf_attr_first", found);
}

function AttributionCaptureInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureFromLocation();
  }, [pathname, searchParams]);

  return null;
}

/**
 * Captures paid-click / UTM params into first-touch and last-touch cookies.
 * Mount once in the root layout. Complements the head script for client navigations.
 */
export default function AttributionCapture() {
  return (
    <Suspense fallback={null}>
      <AttributionCaptureInner />
    </Suspense>
  );
}
