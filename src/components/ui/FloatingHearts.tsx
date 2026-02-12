"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function FloatingHearts() {
    const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; delay: number; scale: number }[]>([]);

    useEffect(() => {
        const newHearts = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            duration: Math.random() * 10 + 10, // Slower float
            delay: Math.random() * 10,
            scale: Math.random() * 0.5 + 0.5,
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: "100vh", opacity: 0 }}
                    animate={{
                        y: "-10vh",
                        opacity: [0, 0.4, 0],
                        x: [0, Math.sin(heart.id) * 50, 0], // Wiggle effect
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: "linear",
                    }}
                    style={{
                        left: `${heart.left}%`,
                        scale: heart.scale
                    }}
                    className={cn(
                        "absolute text-4xl transform -translate-x-1/2",
                        heart.id % 2 === 0 ? "text-soft-pink/20" : "text-blush-coral/20"
                    )}
                >
                    ❤
                </motion.div>
            ))}
        </div>
    );
}
