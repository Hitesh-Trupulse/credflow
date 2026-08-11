"use client";

import dynamic from "next/dynamic";
import LazyMount from "./LazyMount";

const AIFeaturesSection = dynamic(() => import("./AIFeaturesSection"), {
  ssr: false,
  loading: () => <div className="min-h-[50vh] bg-black" />,
});

const PlatformSection = dynamic(() => import("./PlatformSection"), {
  ssr: false,
  loading: () => <div className="min-h-[60vh] bg-black" />,
});

export function LazyAIFeaturesSection() {
  return (
    <LazyMount minHeight="50vh" rootMargin="60px 0px" requireIdle>
      <AIFeaturesSection />
    </LazyMount>
  );
}

export function LazyPlatformSection() {
  return (
    <LazyMount minHeight="70vh" rootMargin="40px 0px" requireIdle idleTimeout={3000}>
      <PlatformSection />
    </LazyMount>
  );
}
