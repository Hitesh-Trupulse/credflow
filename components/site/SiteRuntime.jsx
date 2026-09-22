"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SchedulingModal from "@/components/SchedulingModal";
import { submitLead } from "@/lib/leadSubmit";
import { bootSite, destroySite } from "./runtime";

function ensure(form, name, value) {
  let el = form.querySelector(`input[type="hidden"][name="${name}"]`);
  if (!el) {
    el = document.createElement("input");
    el.type = "hidden";
    el.name = name;
    form.appendChild(el);
  }
  el.value = value == null ? "" : String(value);
}

function fillAttribution(form) {
  const a =
    (window.cfReadAttribution && window.cfReadAttribution()) || {
      first_touch: null,
      last_touch: null,
    };
  ensure(
    form,
    "attribution_first_touch",
    a.first_touch ? JSON.stringify(a.first_touch) : ""
  );
  ensure(
    form,
    "attribution_last_touch",
    a.last_touch ? JSON.stringify(a.last_touch) : ""
  );
  let lastCta = "";
  try {
    lastCta = sessionStorage.getItem("cf_last_cta") || "";
  } catch {
    lastCta = "";
  }
  ensure(form, "source_cta", lastCta);
}

export default function SiteRuntime({ slug, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  useEffect(() => {
    const root = document.querySelector("main#app .route");
    bootSite(root, pathname);
    return () => {
      destroySite();
      document.documentElement.classList.remove("cf-site");
      document.body.classList.remove("cf-site");
    };
  }, [slug, pathname]);

  useEffect(() => {
    const push = (obj) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(obj);
    };

    const onClick = (e) => {
      const privacy = e.target.closest && e.target.closest("[data-privacy-choices]");
      if (privacy) {
        e.preventDefault();
        if (typeof window.credflowOpenPrivacyChoices === "function") {
          window.credflowOpenPrivacyChoices();
        }
        return;
      }
      const el = e.target.closest && e.target.closest("a, button");
      if (!el || !el.closest(".cf-site")) return;
      const label = (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
      if (!label) return;
      try {
        sessionStorage.setItem("cf_last_cta", label);
      } catch {
        /* ignore */
      }
      if (el.tagName === "A") {
        push({
          event: "cta_click",
          cta_id: el.getAttribute("href") || label,
          cta_text: label,
        });
      }
    };

    const onSubmit = (e) => {
      const form = e.target;
      if (!form || !form.closest || !form.closest(".cf-site")) return;

      if (form.classList.contains("nl-form")) {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = (input && input.value ? input.value : "").trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          toast.error("Please enter a valid email address");
          return;
        }
        push({
          event: "newsletter_signup",
          form_id: "footer_newsletter",
          form_location: window.location.pathname,
          user_email: email,
        });
        toast.success("Successfully subscribed to our newsletter!");
        form.reset();
        return;
      }

      if (!form.classList.contains("cf-form")) return;
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        push({ event: "form_submit_attempt", form_id: slug, valid: false });
        return;
      }
      if (form.dataset.pending === "1") return;
      push({ event: "form_submit_attempt", form_id: slug, valid: true });

      const button = form.querySelector('[type="submit"]');
      const leadProfile = pathname === "/get-started" ? "get-started" : "contact";
      ensure(form, "leadProfile", leadProfile);
      fillAttribution(form);

      form.dataset.pending = "1";
      if (button) button.disabled = true;
      push({ event: "contact_form_start", form_id: slug });

      submitLead(form)
        .then(() => {
          push({ event: "contact_form_submit", form_id: slug });
          form.reset();
          form.dataset.pending = "";
          if (button) button.disabled = false;
          if (leadProfile === "get-started" || slug === "modules") {
            router.push("/thank-you");
            return;
          }
          setSchedulerOpen(true);
        })
        .catch(() => {
          form.dataset.pending = "";
          if (button) button.disabled = false;
          const ok = form.querySelector(".ok");
          if (ok) {
            const h = ok.querySelector("h3");
            const p = ok.querySelector("p");
            if (h) h.textContent = "We could not send that";
            if (p) p.textContent = "Please try again in a moment. Your details are still in the form.";
            ok.classList.add("on");
          }
          push({ event: "contact_form_error", form_id: slug });
        });
    };

    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
    };
  }, [pathname, router, slug]);

  return (
    <>
      {children}
      <SchedulingModal isOpen={schedulerOpen} onClose={() => setSchedulerOpen(false)} />
    </>
  );
}
