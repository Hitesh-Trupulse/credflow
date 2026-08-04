import Cookies from "js-cookie";

export const COOKIE_CONSENT_KEY = "credflow_cookie_consent";
export const COOKIE_CONSENT_EXPIRY_DAYS = 365;

export const CONSENT_VALUES = {
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

export const CONSENT_GRANTED = {
  analytics_storage: "granted",
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
};

export const CONSENT_DENIED = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

export function getConsent() {
  return Cookies.get(COOKIE_CONSENT_KEY);
}

export function setConsent(value) {
  Cookies.set(COOKIE_CONSENT_KEY, value, {
    expires: COOKIE_CONSENT_EXPIRY_DAYS,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function hasAcceptedCookies() {
  return getConsent() === CONSENT_VALUES.ACCEPTED;
}

/** Safely call gtag consent update when available. */
export function updateGtagConsent(signals) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };
  window.gtag("consent", "update", signals);
}
