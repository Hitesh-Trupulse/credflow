"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaX } from "react-icons/fa6";

export const SCHEDULING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0knczz5nNG_KOsbzh2qFozjRQK9FdkyYAp-tQjQNgskN_e4F2gCuAY9SQNljrA4rlTb0xbqaFa?gv=true";

/**
 * In-page Google Calendar Appointment Schedule popup (iframe).
 * Opens after a successful lead form submit — does not open a new tab.
 */
export default function SchedulingModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIframeLoaded(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close scheduling overlay"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Schedule a meeting"
        className="relative z-10 flex h-[min(90vh,820px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#454545] bg-[#0F0F17] shadow-[0_20px_100px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#454545] px-4 py-3 sm:px-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6C63FF]">
              Schedule
            </p>
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Pick a time with Credflow AI
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 p-2 text-gray-300 transition-colors hover:border-white/30 hover:text-white"
            aria-label="Close"
          >
            <FaX className="h-4 w-4" />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 bg-white">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white text-sm text-gray-500">
              Loading calendar…
            </div>
          )}
          <iframe
            title="Credflow AI scheduling"
            src={SCHEDULING_URL}
            className="h-full w-full border-0"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>

        <div className="border-t border-[#454545] px-4 py-3 text-center text-xs text-gray-400 sm:px-5">
          Your details were submitted successfully. Choose a time below, or{" "}
          <button
            type="button"
            onClick={onClose}
            className="text-[#8B84FF] underline underline-offset-2 hover:text-[#B5B0FF]"
          >
            close and we&apos;ll follow up
          </button>
          .
        </div>
      </div>
    </div>,
    document.body
  );
}
