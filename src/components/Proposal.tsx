"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

export function Proposal() {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [accepted, setAccepted] = useState(false);

  // Runaway logic
  const handleNoHover = () => {
    if (noCount < 4) {
      setNoCount(prev => prev + 1);
      setYesScale(prev => prev + 0.2); // Make YES bigger

      // Random position movement (constrained)
      const x = (Math.random() - 0.5) * 300;
      const y = (Math.random() - 0.5) * 300;
      setNoButtonPos({ x, y });
    }
  };

  const handleYesClick = () => {
    setAccepted(true);

    // Three quick bursts instead of continuous setInterval
    const colors = ['#EA9975', '#EEAAC0', '#FEC082'];
    confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 }, colors, ticks: 150 });
    setTimeout(() => confetti({ particleCount: 60, spread: 80, origin: { x: 0.3, y: 0.5 }, colors, ticks: 120 }), 400);
    setTimeout(() => confetti({ particleCount: 60, spread: 80, origin: { x: 0.7, y: 0.5 }, colors, ticks: 120 }), 800);
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden py-20 bg-cream-bg">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/p1.jpeg"
          alt="Us"
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-bg via-cream-bg/80 to-transparent" />
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <motion.h2
                className="font-great-vibes text-7xl md:text-9xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blush-coral to-ruby-pop drop-shadow-sm p-4"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                So... will you be my Valentine?
              </motion.h2>

              <div className="flex flex-col md:flex-row gap-8 justify-center items-center h-40">
                {/* YES Button */}
                <motion.button
                  onClick={handleYesClick}
                  animate={{ scale: yesScale }}
                  whileHover={{ scale: yesScale * 1.1 }}
                  whileTap={{ scale: yesScale * 0.95 }}
                  className="bg-ruby-pop text-white px-12 py-6 rounded-full text-3xl font-bold shadow-xl hover:shadow-2xl transition-shadow z-20"
                >
                  Obviously Yes 💕
                </motion.button>

                {/* NO Button */}
                <motion.button
                  onMouseEnter={handleNoHover}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "border-2 border-slate-300 text-slate-500 px-8 py-4 rounded-full text-xl hover:bg-slate-100 transition-colors bg-white/60 z-10",
                    noCount >= 4 && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={noCount >= 4}
                >
                  {noCount === 0 && "Let me think..."}
                  {noCount === 1 && "Wait..."}
                  {noCount === 2 && "Are you sure?"}
                  {noCount === 3 && "Really?"}
                  {noCount >= 4 && "Okay fine, click Yes 😊"}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 md:p-20 border-ruby-pop/20 shadow-2xl relative overflow-hidden"
            >
              {/* Floating hearts inside card */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                  animate={{ y: [-20, 0, -20] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute top-10 left-10 text-soft-pink/30"
                >
                  <Heart size={40} fill="currentColor" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -30, 0] }}
                  transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                  className="absolute bottom-10 right-10 text-blush-coral/30"
                >
                  <Heart size={60} fill="currentColor" />
                </motion.div>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block mb-8 text-ruby-pop"
              >
                <Heart size={100} fill="currentColor" className="filter drop-shadow-lg" />
              </motion.div>

              <h3 className="font-playfair text-5xl md:text-7xl mb-6 text-gray-800">I knew you'd say yes! ❤️</h3>

              <div className="mt-12 space-y-4">
                <p className="text-2xl font-cormorant text-gray-600">Meet me at</p>
                <p className="text-4xl md:text-5xl font-bold text-ruby-pop font-playfair">Le Petit Bistro</p>
                <p className="text-2xl font-inter text-gray-700">Tomorrow at 7:00 PM</p>
                <p className="text-lg text-gray-400 italic mt-8 font-inter">
                  (Wear that black dress I love 😊)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
