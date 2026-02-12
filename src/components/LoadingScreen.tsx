"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const loadingTexts = [
  "Designing something special...",
  "Collecting our best moments...",
  "Adding extra sparkle...",
  "Almost there... ✨"
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Progress timer
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // 500ms delay after 100%
          return 100;
        }
        // Random usage to make it feel natural
        const increment = Math.random() * 3 + 1; 
        return Math.min(prev + increment, 100);
      });
    }, 100);

    // Text cycling timer
    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 1500);

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-cream-bg overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="glass-card p-8 md:p-12 text-center max-w-md w-full relative z-10 mx-4"
      >
        <div className="relative w-24 h-24 mx-auto mb-8">
            <motion.div
                 animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                 }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="absolute inset-0 flex items-center justify-center text-ruby-pop"
            >
               <Heart size={64} fill="currentColor" className="drop-shadow-lg" />
            </motion.div>
        </div>

        <div className="h-12 mb-6 flex items-center justify-center">
             <AnimatePresence mode="wait">
                <motion.p
                   key={textIndex}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="text-xl font-cormorant text-gray-700 italic"
                >
                   {loadingTexts[textIndex]}
                </motion.p>
             </AnimatePresence>
        </div>

        {/* Custom Progress Bar */}
        <div className="h-2 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
                className="h-full bg-gradient-to-r from-blush-coral to-ruby-pop shadow-[0_0_10px_rgba(234,153,117,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
            />
        </div>
        <p className="mt-2 text-sm text-gray-400 font-inter">{Math.round(progress)}%</p>
      </motion.div>
    </motion.div>
  );
}
