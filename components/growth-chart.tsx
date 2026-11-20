"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

const LINE =
  "M 16 168 C 88 164 128 128 196 104 S 332 58 424 40 S 500 22 544 16";
const AREA = `${LINE} L 544 180 L 16 180 Z`;

export function GrowthChart({ accent = "#8ADE48" }: { accent?: string }) {
  const reduce = useReducedMotion();
  const id = useId();
  const strokeId = `${id}-stroke`;
  const fillId = `${id}-fill`;
  const glowId = `${id}-glow`;

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-card p-5 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <figcaption className="max-w-md text-sm text-muted-foreground">
          Organic TikTok growth, schematic. Unlabeled on purpose — we don’t
          publish monthly view counts we can’t stand behind.
        </figcaption>
        <span
          aria-hidden="true"
          className="hidden shrink-0 rounded-full border border-lime/30 px-2.5 py-1 text-[11px] font-semibold text-lime sm:inline-flex"
        >
          Up and to the right
        </span>
      </div>
      <motion.div
        className="mt-6"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
      >
        <svg
          viewBox="0 -10 560 200"
          className="h-auto w-full overflow-visible"
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
        >
          <title id={`${id}-title`}>Schematic organic growth</title>
          <desc id={`${id}-desc`}>
            An unlabeled upward curve. Not real monthly data.
          </desc>
          <defs>
            <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8ADE48" />
              <stop offset="55%" stopColor="#57D661" />
              <stop offset="100%" stopColor="#00C870" />
            </linearGradient>
            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8ADE48" stopOpacity="0.35" />
              <stop offset="70%" stopColor={accent} stopOpacity="0.08" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
            <filter id={glowId} x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {[36, 72, 108, 144].map((y) => (
            <line
              key={y}
              x1="16"
              x2="544"
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          ))}
          <motion.path
            d={AREA}
            fill={`url(#${fillId})`}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
          />
          <motion.path
            d={LINE}
            fill="none"
            stroke={`url(#${strokeId})`}
            strokeWidth="3"
            strokeLinecap="round"
            filter={`url(#${glowId})`}
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <motion.circle
            cx="544"
            cy="16"
            r="6"
            fill="#8ADE48"
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, type: "spring", stiffness: 260, damping: 18 }}
          />
        </svg>
      </motion.div>
    </figure>
  );
}
