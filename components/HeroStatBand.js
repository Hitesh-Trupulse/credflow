"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, FileCheck, PhoneCall } from "lucide-react";

/** First day the counters start accumulating (UTC). */
const COUNTER_START = { year: 2026, month: 0, day: 1 };

const STATS = [
  {
    key: "payer-calls",
    label: "Payer calls completed",
    perDay: 52,
    Icon: PhoneCall,
  },
  {
    key: "applications",
    label: "Applications automated",
    perDay: 37,
    Icon: FileCheck,
  },
  {
    key: "hours-saved",
    label: "Hours of manual work saved",
    perDay: 24,
    Icon: Clock,
  },
];

const ANIMATION_MS = 1400;

function calendarDaysSinceStart() {
  const start = Date.UTC(COUNTER_START.year, COUNTER_START.month, COUNTER_START.day);
  const now = new Date();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.max(0, Math.floor((today - start) / 86_400_000));
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function formatNumber(value) {
  return Math.round(value).toLocaleString("en-US");
}

function StatCard({ label, end, Icon, inView }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || end <= 0) {
      setDisplay(0);
      return undefined;
    }

    setDisplay(0);
    let frame = 0;
    const startedAt = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - startedAt) / ANIMATION_MS);
      setDisplay(progress >= 1 ? end : end * easeOutCubic(progress));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, end]);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[#454545] bg-gradient-to-br from-[#0F0F0F] to-black p-7 sm:p-8 transition-colors duration-300 hover:border-[#5063C6]">
      <div
        className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[#5063C6]/15 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-8 h-32 w-32 rounded-full bg-[#B71CD2]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-4">
        <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-gray-400 pt-1">
          {label}
        </p>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#454545] bg-black/60 text-white">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      <p className="relative mt-8 text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
        <span className="inline-block min-w-[6ch] bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent tabular-nums">
          {formatNumber(display)}
        </span>
      </p>
    </article>
  );
}

export default function HeroStatBand() {
  const bandRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [days, setDays] = useState(null);

  useEffect(() => {
    setDays(calendarDaysSinceStart());
  }, []);

  useEffect(() => {
    const node = bandRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={bandRef}
      aria-label="CredFlow operating stats"
      className="relative overflow-hidden bg-black px-6 py-16 sm:py-20"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5063C6]/50 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-56 w-[42rem] -translate-x-1/2 rounded-full bg-[#5063C6]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {STATS.map((stat) => (
            <StatCard
              key={stat.key}
              label={stat.label}
              Icon={stat.Icon}
              end={days == null ? 0 : stat.perDay * days}
              inView={inView && days != null}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
