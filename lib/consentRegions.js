/** Regions where opt-in cookie consent banner is required (agency handoff). */
export const CONSENT_REQUIRED_COUNTRIES = [
  // EU-27
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  // EEA + UK + CH
  "IS",
  "LI",
  "NO",
  "GB",
  "CH",
];

/** Consent Mode v2 region array (denied defaults). */
export const CONSENT_DENIED_REGIONS = [...CONSENT_REQUIRED_COUNTRIES];

/**
 * Banner visibility per agency handoff:
 * - EEA / UK / CH → show
 * - US, Canada, rest of world → hide
 * - Country unknown / header missing → show (fail-safe)
 */
export function shouldShowConsentBanner(country) {
  if (!country) return true;

  const countryCode = String(country).toUpperCase();
  return CONSENT_REQUIRED_COUNTRIES.includes(countryCode);
}

/**
 * Resolve visitor country from request headers.
 * Amplify Hosting (CloudFront) forwards CloudFront-Viewer-Country.
 * Vercel uses x-vercel-ip-country (kept as fallback).
 */
export function getVisitorCountry(headersList) {
  if (!headersList?.get) return "";

  const raw =
    headersList.get("cloudfront-viewer-country") ||
    headersList.get("CloudFront-Viewer-Country") ||
    headersList.get("x-vercel-ip-country") ||
    headersList.get("x-country-code") ||
    "";

  const code = String(raw).trim().toUpperCase();
  // CloudFront can send "XX" for unknown
  if (!code || code === "XX" || code.length !== 2) return "";
  return code;
}
