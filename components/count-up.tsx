"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type CountUpProps = {
  value: number;
  suffix: string;
  className?: string;
};

const DURATION = 1400;

export function CountUp({ value, suffix, className }: CountUpProps) {
  const reduce = useReducedMotion();
  // `null` means "not animating — render the real value". The server and the
  // first client render both take that branch, so the HTML ships the actual
  // number (it used to ship a hardcoded 0) and hydration still matches.
  const [animated, setAnimated] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduce) return;

    const el = ref.current;
    if (!el) return;

    let primed = false;
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        // First callback, fired just after observe() and before any scroll.
        // Decide whether this number is eligible to animate at all, and zero
        // it while it is still out of sight. Priming here rather than in a
        // separate requestAnimationFrame keeps it on the same clock as the
        // trigger below; in a background tab neither fires, so nothing is
        // zeroed and the real value stays on screen, which is the right
        // fallback anyway.
        if (!primed) {
          // Geometry, not `isIntersecting`: with a 0.4 threshold a number
          // that is 30% visible reports false, and zeroing it then would
          // visibly rewind the real figure the server rendered.
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            observer.disconnect();
            return;
          }
          primed = true;
          setAnimated(0);
          return;
        }

        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          const eased = 1 - (1 - t) ** 3;
          if (t < 1) {
            setAnimated(Math.round(value * eased));
            frame = requestAnimationFrame(tick);
          } else {
            // Settle back onto the prop rather than a rounded copy of it, so
            // the rendered text and `value` can never drift apart.
            setAnimated(null);
          }
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, reduce]);

  // With reduced motion on, the real value wins regardless of whatever state
  // a previously running animation left behind.
  const display = reduce ? value : (animated ?? value);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
