"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  image: string;
  date: string;
  location: string;
  caption: string;
  index: number;
}

const timelineData = [
  {
    image: "https://images.unsplash.com/photo-1516575334481-f85287c2c81d?auto=format&fit=crop&q=80&w=800",
    date: "Feb 14, 2023",
    location: "Central Park",
    caption: "The day I realized your laugh is my favorite sound."
  },
  {
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
    date: "Mar 20, 2023",
    location: "Joe's Pizza",
    caption: "You ordered pineapple and I didn't run away. True love."
  },
  {
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800",
    date: "May 15, 2023",
    location: "Kyoto, Japan",
    caption: "Getting lost with you is better than knowing the way."
  },
  {
    image: "https://images.unsplash.com/photo-1621112904887-419379ce6824?auto=format&fit=crop&q=80&w=800",
    date: "July 4, 2023",
    location: "Rooftop Party",
    caption: "Holding your hand for the first time."
  },
  {
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800",
    date: "Oct 31, 2023",
    location: "Halloween Bash",
    caption: "We looked ridiculous, and it was perfect."
  },
  {
    image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&q=80&w=800",
    date: "Dec 31, 2023",
    location: "Times Square",
    caption: "Starting the new year with my favorite person."
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    date: "Jan 1, 2024",
    location: "Home",
    caption: "Just us. The best way to be."
  }
];

function TimelineItem({ image, date, location, caption, index }: TimelineItemProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  // @ts-ignore
  const blur = useTransform(scrollYProgress, (pos) => {
      // Manual mapping: 0->10, 0.3->0, 0.7->0, 1->10
      if (pos < 0.3) return (1 - (pos / 0.3)) * 10;
      if (pos > 0.7) return ((pos - 0.7) / 0.3) * 10;
      return 0;
  });

  // Calculate blur as a string 'blur(Xpx)' for the style prop
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={cn(
        "relative flex w-full mb-32 items-center",
        index % 2 === 0 ? "justify-start md:justify-center" : "justify-end md:justify-center"
      )}
    >
      {/* Glassmorphic photo frame */}
        <motion.div 
            className={cn(
            "glass-card p-4 rounded-3xl group cursor-pointer relative max-w-sm md:max-w-md w-full transform transition-all duration-500",
            index % 2 === 0 ? "-rotate-2" : "rotate-2"
            )}
            style={{ filter }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
        >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl relative">
                <img src={image} alt={caption} className="w-full h-full object-cover" />
            
                {/* Caption reveal on hover */}
                <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6"
                >
                    <p className="text-white font-inter text-lg leading-relaxed font-medium">
                        {caption}
                    </p>
                </motion.div>
            </div>

            {/* Date stamp */}
            <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur text-gray-800 px-4 py-2 rounded-full font-nothing text-xl shadow-lg transform rotate-3">
                {date}
            </div>

            {/* Location pin */}
            <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur text-gray-600 px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-1 transform -rotate-2">
                <MapPin size={14} className="text-blush-coral" />
                {location}
            </div>
      </motion.div>
    </motion.div>
  );
}

export function Timeline() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-cream-bg to-soft-pink/10">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-playfair text-5xl md:text-7xl mb-32 text-transparent bg-clip-text bg-gradient-to-r from-blush-coral to-ruby-pop">
           Moments That Made Me Fall
        </h2>
        
        <div className="flex flex-col items-center">
            {timelineData.map((item, i) => (
                <TimelineItem
                    key={i}
                    index={i}
                    {...item}
                />
            ))}
        </div>
      </div>
      
      {/* Scroll Linked Gradient/Line */}
       <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-blush-coral/30 to-transparent -translate-x-1/2 z-0 hidden md:block" />
    </section>
  );
}
