"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const NewsletterModal = dynamic(() => import("./NewsletterModal"), {
  ssr: false,
});
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

/**
 * Non-critical UI chrome — mount after idle so it doesn't inflate TBT.
 */
export default function DeferredChrome() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId;
    let timeoutId;

    const enable = () => setReady(true);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 4000 });
    } else {
      timeoutId = window.setTimeout(enable, 2000);
    }

    return () => {
      if (idleId != null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <NewsletterModal />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#10B981",
            color: "#fff",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "12px 16px",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#10B981",
          },
        }}
      />
    </>
  );
}
