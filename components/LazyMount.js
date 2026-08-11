"use client";

import { useEffect, useState } from "react";

/**
 * Mount children when near viewport, optionally after main-thread idle.
 * Cuts Total Blocking Time during initial load / Lighthouse TTI window.
 */
export default function LazyMount({
  children,
  rootMargin = "80px 0px",
  minHeight = "60vh",
  className = "",
  requireIdle = true,
  idleTimeout = 2500,
}) {
  const [ready, setReady] = useState(false);
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (!node || ready) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setReady(true);
      return undefined;
    }

    let idleId;
    let timeoutId;

    const activate = () => {
      if (requireIdle && typeof window !== "undefined") {
        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(() => setReady(true), {
            timeout: idleTimeout,
          });
        } else {
          timeoutId = window.setTimeout(() => setReady(true), 1200);
        }
      } else {
        setReady(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activate();
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (idleId != null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) window.clearTimeout(timeoutId);
    };
  }, [node, ready, rootMargin, requireIdle, idleTimeout]);

  return (
    <div
      ref={setNode}
      className={className}
      style={ready ? undefined : { minHeight }}
    >
      {ready ? children : null}
    </div>
  );
}
