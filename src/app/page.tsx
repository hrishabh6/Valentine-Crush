"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { LoveLetter } from "@/components/LoveLetter";
import { MemoryCards } from "@/components/MemoryCards";
import { Proposal } from "@/components/Proposal";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Lock body scroll until the journey begins
  useEffect(() => {
    if (!journeyStarted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [journeyStarted]);

  const handleStartJourney = () => {
    setJourneyStarted(true);
    setTimeout(() => {
      timelineRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <main className="relative min-h-screen bg-cream-bg text-gray-800 font-sans selection:bg-ruby-pop selection:text-white overflow-x-hidden">
      {journeyStarted && <ScrollProgress />}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <div className="relative z-10 w-full">
            <Hero onStartJourney={handleStartJourney} />

            {journeyStarted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div ref={timelineRef}>
                  <Timeline />
                </div>
                <LoveLetter />
                <MemoryCards />
                <Proposal />
                <footer className="py-12 text-center text-gray-400 font-inter text-sm bg-cream-bg border-t border-ruby-pop/10">
                  <p>Made with ❤️ for You</p>
                </footer>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
