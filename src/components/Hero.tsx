"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

export function Hero({ onStartJourney }: { onStartJourney: () => void }) {
    const [response, setResponse] = useState<"yes" | "no" | null>(null);

    const handleYes = () => {
        setResponse("yes");
    };

    const handleNo = () => {
        setResponse("no");
        const colors = ['#EA9975', '#EEAAC0', '#FEC082'];

        // Single burst — same visual, no sustained GPU load
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors,
            ticks: 120,
        });
    };

    return (
        <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream-bg via-soft-pink/20 to-cream-bg">
            <div className="absolute inset-0 z-0">
                <FloatingHearts />
            </div>

            <div className="relative z-10 p-4 md:p-8 w-full flex justify-center">
                <GlassCard className="max-w-4xl w-full text-center py-20 px-8 md:px-20 border-white/60 shadow-2xl">
                    <AnimatePresence mode="wait">
                        {!response ? (
                            <motion.div
                                key="question"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="font-playfair text-5xl md:text-8xl mb-12 text-gray-800 leading-tight">
                                    Do You Have <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush-coral to-ruby-pop drop-shadow-sm">
                                        Valentine's Plans?
                                    </span>
                                </h1>

                                <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-16">
                                    <MagneticButton
                                        variant="primary"
                                        onClick={handleYes}
                                        className="w-64 h-16 text-xl group relative overflow-hidden"
                                    >
                                        <span className="relative z-10 font-bold tracking-wide">YES</span>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                    </MagneticButton>

                                    <MagneticButton
                                        variant="glass"
                                        onClick={handleNo}
                                        className="w-64 h-16 text-xl text-gray-700 hover:text-white hover:bg-ruby-pop/80 border-ruby-pop/40 font-semibold"
                                    >
                                        NO
                                    </MagneticButton>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="response"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="space-y-12 py-10"
                            >
                                {response === "yes" ? (
                                    <div className="space-y-4">
                                        <h2 className="font-cormorant text-5xl md:text-6xl text-gray-800 leading-tight">
                                            Can I compete with that? 👀
                                        </h2>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <h2 className="font-cormorant text-5xl md:text-6xl text-gray-800 leading-tight">
                                            Perfect timing... <br /> I have something to show you ✨
                                        </h2>
                                    </div>
                                )}

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <MagneticButton
                                        variant="primary"
                                        onClick={onStartJourney}
                                        className="text-2xl px-12 py-6 animate-pulse-slow shadow-xl hover:shadow-2xl hover:scale-105 transition-transform"
                                    >
                                        See what I made for you...
                                    </MagneticButton>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </GlassCard>
            </div>
        </section>
    );
}
