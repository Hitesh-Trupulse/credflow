import Cookies from "js-cookie";

export const COOKIE_CONSENT_KEY = "credflow_cookie_consent";
export const COOKIE_CONSENT_EXPIRY_DAYS = 365;

export const CONSENT_VALUES = {
  ACCEPTED: "accepted",
  REJECTED: "rejected",
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
