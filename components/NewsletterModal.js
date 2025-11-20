"use client";

import { useEffect, useState } from "react";
import { FaX, FaCircleCheck } from "react-icons/fa6";

const STORAGE_KEYS = {
  dismissed: "newsletterDismissed",
  subscribed: "newsletterSubscribed",
};

const getInitialVisibility = () => {
  if (typeof window === "undefined") return false;
  const dismissed = window.localStorage.getItem(STORAGE_KEYS.dismissed) === "true";
  const subscribed = window.localStorage.getItem(STORAGE_KEYS.subscribed) === "true";
  return !(dismissed || subscribed);
};

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success

  useEffect(() => {
    setIsOpen(getInitialVisibility());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event) => {
      if (!event.key || !Object.values(STORAGE_KEYS).includes(event.key)) return;
      setIsOpen(getInitialVisibility());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const closeModal = () => {
    setIsOpen(false);
    setEmail("");
    setPhone("");
    setError("");
    setConsentError("");
    setConsentChecked(false);
    setStatus("idle");
  };

  const persistChoice = (key, value = "true") => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
  };

  const handleDismiss = () => {
    persistChoice(STORAGE_KEYS.dismissed);
    closeModal();
  };

  const handleSubscribe = () => {
    setError("");
    setConsentError("");
    if (!validateEmail(email)) {
      setError("Enter a valid email address to continue.");
      return;
    }
    if (!consentChecked) {
      setConsentError("Please agree to receive promotional updates.");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      persistChoice(STORAGE_KEYS.subscribed);
      persistChoice(STORAGE_KEYS.dismissed);
      setStatus("success");
      setTimeout(() => {
        closeModal();
      }, 1500);
    }, 900);
  };

  if (!isOpen) return null;

  const isProcessing = status === "loading";
  const isSuccess = status === "success";

  return (
    <div className="fixed inset-0 z-[5000] pointer-events-none">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div className="absolute inset-0 flex justify-end items-end p-4 sm:p-6 pointer-events-none">
        <section
          className={`pointer-events-auto max-w-md w-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#0F0F17] to-[#1B1B27] text-white shadow-[0_20px_100px_rgba(0,0,0,0.5)] p-6 sm:p-7 transition-all duration-300 transform ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#6C63FF]">
                Newsletter
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold mt-1">
                Join the CredFlow Insider list
              </h3>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-400 hover:text-white cursor-pointer transition-colors"
              aria-label="Dismiss newsletter modal"
            >
              <FaX className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-gray-300 mt-3">
            Be the first to hear about AI credentialing updates, exclusive webinars,
            and product drops crafted for modern revenue teams.
          </p>

          <div className="mt-5 space-y-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              disabled={isProcessing || isSuccess}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm focus:border-[#6C63FF] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/60 disabled:opacity-60"
            />
            <label htmlFor="newsletter-phone" className="sr-only">
              Phone number
            </label>
            <input
              id="newsletter-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Phone number (optional)"
              disabled={isProcessing || isSuccess}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm focus:border-[#6C63FF] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/60 disabled:opacity-60"
            />
            {error && (
              <p className="text-xs text-red-400">
                {error}
              </p>
            )}
            <label className="flex items-start gap-3 text-xs text-gray-300">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(event) => setConsentChecked(event.target.checked)}
                className="mt-0.5 h-4 w-4 cursor-pointer rounded border border-white/30 bg-transparent accent-[#6C63FF]"
              />
              <span>
                I agree to receive promotional emails and texts from CredFlow about product updates, webinars, events, and insights.
              </span>
            </label>
            {consentError && (
              <p className="text-xs text-red-400">{consentError}</p>
            )}
            {isSuccess && (
              <p className="flex items-center text-sm text-emerald-300">
                <FaCircleCheck className="mr-2" />
                You&apos;re on the list! Watch your inbox for CredFlow intel.
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleSubscribe}
              disabled={isProcessing || isSuccess}
              className="flex-1 inline-flex items-center cursor-pointer justify-center rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#B721FF] px-5 py-3 text-sm font-medium transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isProcessing ? "Subscribing..." : isSuccess ? "Subscribed" : "Subscribe"}
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors"
            >
              Don&apos;t show again
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewsletterModal;

