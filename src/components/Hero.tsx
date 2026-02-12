"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import confetti from "canvas-confetti";


type HeroStep =
    | "init"           // Initial Question: Do you have plans?
    | "no-plans"       // She said No -> Show text + button
    | "meme-accha"     // She said Yes -> Show "Accha ji"
    | "meme-smart"     // Show "Kya mai smart ni lagta" + Yes/No buttons
    | "meme-knew-it"   // She said Yes (Smart) -> "Knew it"
    | "meme-fir-bhi"; // She said No (Not smart) -> "Fir bhi"

export function Hero({ onStartJourney }: { onStartJourney: () => void }) {
    const [step, setStep] = useState<HeroStep>("init");
    const [showFinalButton, setShowFinalButton] = useState(false);

    // Handle initial "Yes" (I have plans)
    const handleInitYes = () => {
        setStep("meme-accha");

        // Auto-advance after 2 seconds
        setTimeout(() => {
            setStep("meme-smart");
        }, 2000);
    };

    // Handle initial "No" (I don't have plans)
    const handleInitNo = () => {
        setStep("no-plans");
        fireConfetti();
        // Show button after delay within no-plans state
        setTimeout(() => {
            setShowFinalButton(true);
        }, 2000);
    };

    // Handle Smart Question "Yes"
    const handleSmartYes = () => {
        setStep("meme-knew-it");
        setTimeout(() => {
            setShowFinalButton(true);
        }, 2500);
    };

    // Handle Smart Question "No"
    const handleSmartNo = () => {
        setStep("meme-fir-bhi");
        setTimeout(() => {
            setShowFinalButton(true);
        }, 2500);
    };

    const fireConfetti = () => {
        const colors = ['#EA9975', '#EEAAC0', '#FEC082'];
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
                <GlassCard className="max-w-4xl w-full text-center py-20 px-8 md:px-20 border-white/60 shadow-2xl min-h-[500px] flex flex-col justify-center items-center">
                    <AnimatePresence mode="wait">

                        {/* 1. INITIAL QUESTION */}
                        {step === "init" && (
                            <motion.div
                                key="init"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="w-full"
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
                                        onClick={handleInitYes}
                                        className="w-64 h-16 text-xl group relative overflow-hidden"
                                    >
                                        <span className="relative z-10 font-bold tracking-wide">YES</span>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                    </MagneticButton>

                                    <MagneticButton
                                        variant="glass"
                                        onClick={handleInitNo}
                                        className="w-64 h-16 text-xl text-gray-700 hover:text-white hover:bg-ruby-pop/80 border-ruby-pop/40 font-semibold"
                                    >
                                        NO
                                    </MagneticButton>
                                </div>
                            </motion.div>
                        )}

                        {/* 2. ACCHA JI MEME */}
                        {step === "meme-accha" && (
                            <motion.div
                                key="meme-accha"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="space-y-6"
                            >
                                <img src="/images/accha.jpg" alt="Accha ji" className="rounded-xl shadow-2xl max-h-[400px]" />
                            </motion.div>
                        )}

                        {/* 3. SMART QUESTION MEME */}
                        {step === "meme-smart" && (
                            <motion.div
                                key="meme-smart"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                className="space-y-8"
                            >
                                <img src="/images/smart.jpg" alt="Smart?" className="rounded-xl shadow-2xl max-h-[400px] mx-auto" />

                                <div className="flex gap-6 justify-center">
                                    <MagneticButton variant="primary" onClick={handleSmartYes} className="px-8 py-3 text-lg">
                                        Yes Lagte Ho!
                                    </MagneticButton>
                                    <MagneticButton variant="glass" onClick={handleSmartNo} className="px-8 py-3 text-lg text-gray-600">
                                        Nahi
                                    </MagneticButton>
                                </div>
                            </motion.div>
                        )}

                        {/* 4. KNEW IT / FIR BHI MEME + FINAL BUTTON */}
                        {(step === "meme-knew-it" || step === "meme-fir-bhi") && (
                            <motion.div
                                key="meme-result"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-8 flex flex-col items-center"
                            >
                                <img
                                    src={step === "meme-fir-bhi" ? "/images/fir-bhi.jpg" : "/images/knew-it.jpg"}
                                    alt="Result Meme"
                                    className="rounded-xl shadow-2xl max-h-[400px]"
                                />

                                {showFinalButton && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <MagneticButton
                                            variant="primary"
                                            onClick={onStartJourney}
                                            className="text-2xl px-12 py-6 animate-pulse-slow shadow-xl hover:shadow-2xl hover:scale-105 transition-transform"
                                        >
                                            See what I made for you...
                                        </MagneticButton>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {/* 5. NO PLANS (Only show text for NO case) */}
                        {step === "no-plans" && (
                            <motion.div
                                key="no-plans"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-12 py-10"
                            >
                                <h2 className="font-cormorant text-5xl md:text-6xl text-gray-800 leading-tight">
                                    Perfect timing... <br /> I have something to show you ✨
                                </h2>
                                
                                {showFinalButton && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <MagneticButton
                                            variant="primary"
                                            onClick={onStartJourney}
                                            className="text-2xl px-12 py-6 animate-pulse-slow shadow-xl hover:shadow-2xl hover:scale-105 transition-transform"
                                        >
                                            See what I made for you...
                                        </MagneticButton>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                    </AnimatePresence>
                </GlassCard>
            </div>
        </section>
    );
}
