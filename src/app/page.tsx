"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { MemoryCards } from "@/components/MemoryCards";
import { Proposal } from "@/components/Proposal";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FloatingHearts } from "@/components/ui/FloatingHearts";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleStartJourney = () => {
    // Small delay to allow exit animation of hero text if any
    setTimeout(() => {
        timelineRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <main className="relative min-h-screen bg-cream-bg text-gray-800 font-sans selection:bg-ruby-pop selection:text-white overflow-x-hidden">
       {/* Global Progress Bar */}
       <ScrollProgress />
       
       <AnimatePresence mode="wait">
          {isLoading ? (
             <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
          ) : (
             <div className="relative z-10 w-full">
                 <Hero onStartJourney={handleStartJourney} />
                 
                 <div ref={timelineRef}>
                    <Timeline />
                 </div>
                 
                 <MemoryCards />
                 
                 <Proposal />
                 
                 <footer className="py-12 text-center text-gray-400 font-inter text-sm bg-cream-bg border-t border-ruby-pop/10">
                    <p>Made with ❤️ for You</p>
                 </footer>
             </div>
          )}
       </AnimatePresence>
    </main>
  );
}
