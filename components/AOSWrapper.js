"use client";

import { useEffect } from "react";

/**
 * Lazy-load AOS so its CSS/JS stay off the critical render path.
 */
const AOSWrapper = ({ children }) => {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [{ default: AOS }] = await Promise.all([
        import("aos"),
        import("aos/dist/aos.css"),
      ]);
      if (cancelled) return;
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        mirror: false,
        once: true,
        disable: false,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return children;
};

export default AOSWrapper;
