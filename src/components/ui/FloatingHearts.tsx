"use client";

import { useMemo } from "react";

/**
 * FloatingHearts — Pure CSS animation, zero JS animation overhead.
 * Uses CSS @keyframes instead of Framer Motion to avoid
 * 20 concurrent requestAnimationFrame loops.
 */
export function FloatingHearts() {
    const hearts = useMemo(
        () =>
            Array.from({ length: 12 }).map((_, i) => ({
                id: i,
                left: `${(i / 12) * 100 + Math.random() * 8}%`,
                animDuration: `${14 + Math.random() * 10}s`,
                animDelay: `${Math.random() * 12}s`,
                size: `${14 + Math.random() * 14}px`,
                opacity: 0.08 + Math.random() * 0.12,
            })),
        []
    );

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
            {hearts.map((h) => (
                <span
                    key={h.id}
                    className="absolute will-change-transform"
                    style={{
                        left: h.left,
                        bottom: "-40px",
                        fontSize: h.size,
                        opacity: h.opacity,
                        color: h.id % 2 === 0 ? "#EEAAC0" : "#EA9975",
                        animation: `floatUp ${h.animDuration} ${h.animDelay} linear infinite`,
                    }}
                >
                    ❤
                </span>
            ))}

            {/* Single stylesheet injected once — no React re-renders */}
            <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.15;
          }
          50% {
            transform: translateY(-50vh) translateX(20px) scale(1.05);
          }
          90% {
            opacity: 0.1;
          }
          100% {
            transform: translateY(-110vh) translateX(-15px) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
}
