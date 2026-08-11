"use client";

import { useEffect } from "react";

/**
 * AOS only on desktop, and only after the main thread is idle.
 */
const AOSWrapper = ({ children }) => {
  useEffect(() => {
    let cancelled = false;
    let idleId;
    let timeoutId;

    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) return undefined;

    const start = async () => {
      const [{ default: AOS }] = await Promise.all([
        import("aos"),
        import("aos/dist/aos.css"),
      ]);
      if (cancelled) return;
      AOS.init({
        duration: 650,
        easing: "ease-in-out",
        mirror: false,
        once: true,
        disable: "mobile",
      });
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(() => {
        start();
      }, { timeout: 5000 });
    } else {
      timeoutId = window.setTimeout(start, 2500);
    }

    return () => {
      cancelled = true;
      if (idleId != null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) window.clearTimeout(timeoutId);
    };
  }, []);

  return children;
};

export default AOSWrapper;
