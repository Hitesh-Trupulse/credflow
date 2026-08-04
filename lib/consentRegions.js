/** Regions where opt-in cookie consent is required. */
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
  "NO",
  "IS",
  "LI",
  "GB",
  "CH",
];

/** ISO region codes for Consent Mode v2 defaults (includes Quebec). */
export const CONSENT_DENIED_REGIONS = [
  ...CONSENT_REQUIRED_COUNTRIES,
  "CA-QC",
];

/**
 * Whether to show the opt-in cookie banner for this visitor.
 * Localhost / missing Vercel geo headers → no banner.
 */
export function shouldShowConsentBanner(country, region) {
  if (!country) return false;

  const countryCode = String(country).toUpperCase();
  const regionCode = String(region || "").toUpperCase();

  if (countryCode === "CA" && regionCode === "QC") {
    return true;
  }

  return CONSENT_REQUIRED_COUNTRIES.includes(countryCode);
}
