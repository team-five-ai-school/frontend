"use client";

import * as React from "react";

import { motion, prefersReducedMotion } from "@/lib/design-tokens";

/**
 * Animates a number from its previous value to `value`. Returns the current frame value.
 * Jumps straight to the target under prefers-reduced-motion. First render returns `value` (SSR-safe).
 */
export function useCountUp(value: number, duration = motion.duration.chaos) {
  const [display, setDisplay] = React.useState(value);
  const fromRef = React.useRef(value);

  React.useEffect(() => {
    const from = fromRef.current;
    fromRef.current = value;
    if (from === value) return;
    // Reduced motion: one frame, straight to the target.
    const total = prefersReducedMotion() ? 0 : duration;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = total === 0 ? 1 : Math.min(1, (now - start) / total);
      const eased = 1 - (1 - p) ** 3;
      setDisplay(from + (value - from) * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return display;
}
