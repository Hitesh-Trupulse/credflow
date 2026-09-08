"use client";

import { useCallback, useEffect, useState } from "react";
import SchedulingModal from "@/components/SchedulingModal";
import { submitLead } from "@/lib/leadSubmit";

/**
 * Tracking, forms, motion, and scheduler for the signed-off landing pages.
 * Event names match the HTML spec and must not be renamed.
 */
export default function LandingRuntime() {
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  const closeScheduler = useCallback(() => {
    setSchedulerOpen(false);
  }, []);

  useEffect(() => {
    const dl = (window.dataLayer = window.dataLayer || []);
    const push = (obj) => {
      dl.push(obj);
    };

    const GA4_ID = window.CF_GA4_ID || null;

    const setStatus = (el, msg, isError) => {
      if (!el) return;
      el.textContent = msg || "";
      el.hidden = !msg;
      el.classList.toggle("is-error", !!isError);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let counted = false;
    const countUp = (el) => {
      const target = +el.getAttribute("data-count");
      const suffix = el.getAttribute("data-suffix") || "";
      const prefix = el.getAttribute("data-prefix") || "";
      if (reduced) {
        el.textContent = prefix + target + suffix;
        return;
      }
      let start = null;
      const dur = 900;
      const frame = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        el.textContent = prefix + Math.round(target * (0.2 + 0.8 * p * p)) + suffix;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = prefix + target + suffix;
      };
      requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          if (!counted && e.target.querySelector && e.target.querySelector(".num")) {
            counted = true;
            e.target.querySelectorAll(".num").forEach(countUp);
          }
          io.unobserve(e.target);
        });
      },
      { threshold: 0.16 }
    );
    document.querySelectorAll(".lp-root .reveal").forEach((el) => {
      io.observe(el);
    });

    const gaField = (key, cb) => {
      try {
        if (typeof window.gtag !== "function" || !GA4_ID) return cb(null);
        let settled = false;
        window.gtag("get", GA4_ID, key, (v) => {
          settled = true;
          cb(v || null);
        });
        setTimeout(() => {
          if (!settled) cb(null);
        }, 1000);
      } catch {
        cb(null);
      }
    };

    const fillAttribution = (scope) => {
      if (!scope) return null;
      const a =
        (window.cfReadAttribution && window.cfReadAttribution()) || {
          first_touch: null,
          last_touch: null,
        };
      const set = (name, val) => {
        const el = scope.querySelector('[name="' + name + '"]');
        if (!el) return;
        el.value =
          val === null || val === undefined
            ? ""
            : typeof val === "string"
              ? val
              : JSON.stringify(val);
      };
      set("attribution_first_touch", a.first_touch);
      set("attribution_last_touch", a.last_touch);
      let lastCta = null;
      try {
        lastCta = sessionStorage.getItem("cf_last_cta");
      } catch {
        /* ignore */
      }
      set("source_cta", lastCta);
      gaField("client_id", (v) => set("ga_client_id", v));
      gaField("session_id", (v) => set("ga_session_id", v));
      return a;
    };

    const onCtaClick = (e) => {
      const el = e.target.closest && e.target.closest("[data-cta-id]");
      if (!el) return;
      try {
        sessionStorage.setItem("cf_last_cta", el.getAttribute("data-cta-id"));
      } catch {
        /* ignore */
      }
      if (!el.closest(".lp-root")) return;
      push({
        event: "cta_click",
        cta_id: el.getAttribute("data-cta-id"),
        cta_text: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80),
      });
    };
    document.addEventListener("click", onCtaClick);

    const trackFields = (form, formId) => {
      if (!form) return () => {};
      const done = Object.create(null);
      let n = 0;
      const onBlur = (e) => {
        const f = e.target;
        if (!f || !f.name || done[f.name]) return;
        if (!(f.value && f.value.trim())) return;
        done[f.name] = true;
        n++;
        push({
          event: "form_field_complete",
          form_id: formId,
          field_name: f.name,
          field_index: n,
        });
      };
      form.addEventListener("blur", onBlur, true);
      return () => form.removeEventListener("blur", onBlur, true);
    };

    const form = document.getElementById("leadform");
    const mainStatus = document.getElementById("form-status");
    let started = false;
    let mainPending = false;
    const onMainFocus = () => {
      if (!started) {
        started = true;
        push({ event: "contact_form_start" });
      }
    };
    const onMainSubmit = (e) => {
      e.preventDefault();
      const valid = form.reportValidity();
      push({ event: "form_submit_attempt", form_id: "main", valid });
      if (!valid || mainPending) return;
      mainPending = true;
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      setStatus(mainStatus, "", false);
      submitLead(form)
        .then(() => {
          form.reset();
          fillAttribution(form);
          mainPending = false;
          if (submitBtn) submitBtn.disabled = false;
          setStatus(
            mainStatus,
            "Thanks - your details are in. Pick a time below and a specialist will review your payer mix before the call.",
            false
          );
          push({ event: "contact_form_submit" });
          setSchedulerOpen(true);
        })
        .catch((err) => {
          mainPending = false;
          if (submitBtn) submitBtn.disabled = false;
          setStatus(
            mainStatus,
            "We could not send your details just then. Please try again.",
            true
          );
          push({
            event: "contact_form_error",
            error: String((err && err.message) || err),
          });
        });
    };
    if (form) {
      form.addEventListener("focusin", onMainFocus);
      form.addEventListener("submit", onMainSubmit);
    }
    const untrackMain = trackFields(form, "main");

    const modal = document.getElementById("quick-modal");
    const qform = document.getElementById("quickform");
    const qError = document.getElementById("qstep-error");
    let qstarted = false;
    let quickPending = false;
    let lastFocus = null;

    const openQuick = (src) => {
      if (!modal) return;
      lastFocus = document.activeElement;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      const first = modal.querySelector("input");
      if (first) first.focus();
      push({ event: "quick_lead_open", source_cta: src });
    };
    const closeQuick = () => {
      if (!modal) return;
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      const qStepForm = document.getElementById("qstep-form");
      const qStepDone = document.getElementById("qstep-done");
      if (qStepForm) qStepForm.hidden = false;
      if (qStepDone) qStepDone.hidden = true;
      if (qform) {
        qform.reset();
        fillAttribution(qform);
        const qBtn = qform.querySelector('[type="submit"]');
        if (qBtn) qBtn.disabled = false;
      }
      quickPending = false;
      if (qError) setStatus(qError, "", true);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    const quickOpenButtons = Array.from(
      document.querySelectorAll(".lp-root [data-quick-open]")
    );
    const onQuickOpen = (b) => (e) => {
      e.preventDefault();
      openQuick(b.getAttribute("data-cta-id") || "unknown");
    };
    const quickOpenHandlers = quickOpenButtons.map((b) => {
      const handler = onQuickOpen(b);
      b.addEventListener("click", handler);
      return [b, handler];
    });

    const onModalClick = (e) => {
      if (e.target.closest("[data-quick-close]")) closeQuick();
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape" && modal && modal.classList.contains("open")) {
        closeQuick();
      }
    };
    if (modal) {
      modal.addEventListener("click", onModalClick);
    }
    document.addEventListener("keydown", onKeyDown);

    const onQuickFocus = () => {
      if (!qstarted) {
        qstarted = true;
        push({ event: "quick_lead_start" });
      }
    };
    const onQuickSubmit = (e) => {
      e.preventDefault();
      const valid = qform.reportValidity();
      push({ event: "form_submit_attempt", form_id: "quick", valid });
      if (!valid || quickPending) return;
      quickPending = true;
      const submitBtn = qform.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      setStatus(qError, "", true);
      submitLead(qform)
        .then(() => {
          qform.reset();
          fillAttribution(qform);
          document.getElementById("qstep-form").hidden = true;
          document.getElementById("qstep-done").hidden = false;
          push({ event: "quick_lead_submit" });
        })
        .catch((err) => {
          quickPending = false;
          if (submitBtn) submitBtn.disabled = false;
          setStatus(qError, "We could not send that. Please try again.", true);
          push({
            event: "quick_lead_error",
            error: String((err && err.message) || err),
          });
        });
    };
    if (qform) {
      qform.addEventListener("focusin", onQuickFocus);
      qform.addEventListener("submit", onQuickSubmit);
    }
    const untrackQuick = trackFields(qform, "quick");

    fillAttribution(form);
    fillAttribution(qform);
    const onSubmitCapture = (e) => {
      if (e.target === form || e.target === qform) fillAttribution(e.target);
    };
    document.addEventListener("submit", onSubmitCapture, true);

    return () => {
      io.disconnect();
      document.removeEventListener("click", onCtaClick);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("submit", onSubmitCapture, true);
      if (form) {
        form.removeEventListener("focusin", onMainFocus);
        form.removeEventListener("submit", onMainSubmit);
      }
      untrackMain();
      untrackQuick();
      if (modal) modal.removeEventListener("click", onModalClick);
      if (qform) {
        qform.removeEventListener("focusin", onQuickFocus);
        qform.removeEventListener("submit", onQuickSubmit);
      }
      quickOpenHandlers.forEach(([b, handler]) => {
        b.removeEventListener("click", handler);
      });
      document.body.style.overflow = "";
    };
  }, []);

  return <SchedulingModal isOpen={schedulerOpen} onClose={closeScheduler} />;
}
