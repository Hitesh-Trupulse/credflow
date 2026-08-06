"use client";

import { useRef, useState } from "react";
import { ClipboardCheck, FileText, Send } from "lucide-react";
import { readAttribution } from "@/components/AttributionCapture";

const pushDataLayer = (payload) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
};

/**
 * Shared lead contact form for /services and /software.
 * Fires dataLayer events and attaches attribution cookies to the Zapier payload.
 * lead_id is omitted until a backend returns one (listed as remaining work).
 */
export default function LeadContactForm({
  ctaId = "services-get-started",
  ctaLocation = "services-contact-form",
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    providerCount: "",
    targetPayers: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState("");
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [smsError, setSmsError] = useState("");
  const startedRef = useRef(false);

  const trackFormStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    pushDataLayer({
      event: "contact_form_start",
      form_id: "contact_form",
      form_location: window.location.pathname,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    trackFormStart();
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAlert("");
    setSmsError("");

    if (!smsOptIn) {
      setSmsError(
        "Please agree to receive promotional text messages to continue."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const firstTouch = readAttribution("cf_attr_first");
      const lastTouch = readAttribution("cf_attr_last");

      const payload = new FormData();
      payload.append("firstName", formData.firstName);
      payload.append("lastName", formData.lastName);
      payload.append("email", formData.email);
      payload.append("companyName", formData.organization);
      payload.append("numberOfProviders", formData.providerCount);
      payload.append("organizationType", "Credentialing services");
      payload.append("howDidYouHear", window.location.pathname);
      payload.append("formType", "Talk to a specialist");
      payload.append("smsOptIn", smsOptIn ? "true" : "false");
      payload.append(
        "query",
        `Target payers / specialty: ${formData.targetPayers || "N/A"}`
      );
      payload.append(
        "attribution",
        JSON.stringify({ first_touch: firstTouch, last_touch: lastTouch })
      );
      if (lastTouch?.gclid) payload.append("gclid", lastTouch.gclid);
      if (lastTouch?.gbraid) payload.append("gbraid", lastTouch.gbraid);
      if (lastTouch?.wbraid) payload.append("wbraid", lastTouch.wbraid);
      if (lastTouch?.utm_source) payload.append("utm_source", lastTouch.utm_source);
      if (lastTouch?.utm_medium) payload.append("utm_medium", lastTouch.utm_medium);
      if (lastTouch?.utm_campaign)
        payload.append("utm_campaign", lastTouch.utm_campaign);
      if (lastTouch?.utm_term) payload.append("utm_term", lastTouch.utm_term);
      if (lastTouch?.utm_content)
        payload.append("utm_content", lastTouch.utm_content);
      if (lastTouch?.landing_page)
        payload.append("landing_page", lastTouch.landing_page);
      if (lastTouch?.referrer) payload.append("referrer", lastTouch.referrer);
      if (firstTouch?.utm_source)
        payload.append("first_touch_source", firstTouch.utm_source);
      if (firstTouch?.utm_campaign)
        payload.append("first_touch_campaign", firstTouch.utm_campaign);
      if (firstTouch?.landing_page)
        payload.append("first_touch_landing_page", firstTouch.landing_page);

      const response = await fetch(
        "https://hooks.zapier.com/hooks/catch/27515226/4ytw9iy/",
        {
          method: "POST",
          body: payload,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      pushDataLayer({
        event: "contact_form_submit",
        form_id: "contact_form",
        form_location: window.location.pathname,
        user_email: formData.email,
        provider_count: formData.providerCount,
        target_payers: [].concat(formData.targetPayers ?? []).join(","),
        sms_opt_in: smsOptIn,
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        organization: "",
        providerCount: "",
        targetPayers: "",
      });
      setSmsOptIn(false);
      setAlert("Thanks! A specialist will reach out within 1–2 business days.");
    } catch (error) {
      console.error("Contact form submission error:", error);
      pushDataLayer({
        event: "contact_form_error",
        error_type: "submit_failed",
      });
      setAlert(
        "Something went wrong while submitting. Please try again in a moment."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-20 px-6 bg-black scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        <div data-aos="fade-down" className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-light mb-3">
            Ready to get providers enrolled faster?
          </h3>
          <p className="text-gray-400">
            Share a few details and we will help you get started.
          </p>
        </div>

        <div data-aos="fade-up" className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-[#5063C6]/15 to-[#B71CD2]/15 blur-2xl" />
          <form
            onSubmit={handleSubmit}
            className="relative grid grid-cols-1 md:grid-cols-2 gap-5 border border-[#454545] rounded-3xl p-6 md:p-8 bg-gradient-to-b from-white/[0.05] to-black"
          >
            {alert && (
              <div className="md:col-span-2">
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    alert.toLowerCase().includes("thanks")
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                      : "border-red-500/30 bg-red-500/10 text-red-200"
                  }`}
                >
                  {alert}
                </div>
              </div>
            )}
            <div className="md:col-span-2 grid md:grid-cols-3 gap-4 mb-2">
              {[
                [FileText, "Tell us the basics"],
                [ClipboardCheck, "We review your needs"],
                [Send, "Get a clear next step"],
              ].map(([Icon, label]) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-[#454545] bg-black/60 p-3"
                >
                  <Icon className="h-4 w-4 text-white" />
                  <span className="text-base text-gray-300">{label}</span>
                </div>
              ))}
            </div>

            <label className="space-y-2">
              <span className="text-base text-gray-400">First name</span>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onFocus={trackFormStart}
                placeholder="Jane"
                required
                className="w-full bg-black/70 border border-[#454545] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#5063C6]"
              />
            </label>
            <label className="space-y-2">
              <span className="text-base text-gray-400">Last name</span>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onFocus={trackFormStart}
                placeholder="Smith"
                required
                className="w-full bg-black/70 border border-[#454545] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#5063C6]"
              />
            </label>
            <label className="space-y-2">
              <span className="text-base text-gray-400">Work email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={trackFormStart}
                placeholder="jane@practice.com"
                required
                className="w-full bg-black/70 border border-[#454545] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#5063C6]"
              />
            </label>
            <label className="space-y-2">
              <span className="text-base text-gray-400">Organization name</span>
              <input
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                onFocus={trackFormStart}
                placeholder="Practice or group name"
                required
                className="w-full bg-black/70 border border-[#454545] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#5063C6]"
              />
            </label>
            <label className="space-y-2">
              <span className="text-base text-gray-400">
                Approximate provider count
              </span>
              <select
                name="providerCount"
                value={formData.providerCount}
                onChange={handleInputChange}
                onFocus={trackFormStart}
                required
                className="w-full bg-black/70 border border-[#454545] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5063C6]"
              >
                <option value="">Select range</option>
                <option value="1-5">1-5</option>
                <option value="6-20">6-20</option>
                <option value="21-100">21-100</option>
                <option value="100+">100+</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-base text-gray-400">
                Target payers or specialty
              </span>
              <input
                name="targetPayers"
                value={formData.targetPayers}
                onChange={handleInputChange}
                onFocus={trackFormStart}
                placeholder="Optional"
                className="w-full bg-black/70 border border-[#454545] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#5063C6]"
              />
            </label>
            <div className="md:col-span-2 space-y-2 rounded-xl border border-[#454545] bg-black/40 p-4">
              <label
                htmlFor="smsOptIn"
                className="flex items-start gap-3 text-sm text-gray-200"
              >
                <input
                  type="checkbox"
                  id="smsOptIn"
                  checked={smsOptIn}
                  onChange={(event) => {
                    setSmsOptIn(event.target.checked);
                    if (event.target.checked) setSmsError("");
                  }}
                  className="mt-0.5 h-4 w-4 cursor-pointer rounded border border-[#454545] bg-transparent accent-[#5063C6]"
                />
                <span>
                  I agree to receive promotional text messages from CredFlow
                  about product updates, webinars, events, and insights.
                </span>
              </label>
              {smsError && (
                <p className="text-xs text-red-400 pl-7">{smsError}</p>
              )}
            </div>
            <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#454545] pt-5">
              <p className="text-base text-gray-500 text-center sm:text-left">
                No generic handoff. A credentialing specialist will review your
                intake.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                data-cta-id={ctaId}
                data-cta-location={ctaLocation}
                className="group cursor-pointer inline-flex items-center justify-center font-medium transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-black hover:text-white hover:bg-blue-700 focus:ring-gray-500 hover:shadow-lg hover:shadow-blue-700/50 px-6 py-3 text-base rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Get started"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
