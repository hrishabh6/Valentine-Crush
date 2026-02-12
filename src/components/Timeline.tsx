"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

/**
 * TimelineItem — Performance-optimized parallax card.
 *
 * Removed:
 *  - `filter: blur(Npx)` driven by useTransform — blur() forces full-layer
 *    repaint on every scroll frame. Replaced with opacity fade which is
 *    GPU-composited (cheap).
 *  - `backdrop-filter: blur()` on date/location badges — these are inside
 *    a scrolling container and cause compositing overhead. Replaced with
 *    solid semi-transparent backgrounds.
 *
 * Kept:
 *  - translateY parallax via `useTransform` → only triggers GPU compositing
 *  - opacity fade via `useTransform` → GPU compositing, zero layout cost
 *  - scale via `useTransform` → GPU compositing
 */
function TimelineItem({ image, date, location, caption, index }: TimelineItemProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // All three are GPU-compositable transforms — no layout or paint cost
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.92, 1, 1, 0.92]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale, willChange: "transform, opacity" }}
      className={cn(
        "relative flex w-full mb-24 items-center",
        index % 2 === 0 ? "justify-start md:justify-center" : "justify-end md:justify-center"
      )}
    >
      <div
        className={cn(
          "p-4 rounded-3xl group cursor-pointer relative max-w-sm md:max-w-md w-full",
          "bg-white/30 border border-white/40 shadow-xl",
          "transition-transform duration-300 hover:scale-[1.03] hover:rotate-0",
          index % 2 === 0 ? "-rotate-2" : "rotate-2"
        )}
      >
        <div className="aspect-[4/5] overflow-hidden rounded-2xl relative">
          <img
            src={image}
            alt={caption}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />

          {/* Caption reveal — CSS transition, no Framer overhead */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white font-inter text-lg leading-relaxed font-medium">
              {caption}
            </p>
          </div>
        </div>

        {/* Date stamp — solid bg, NO backdrop-filter */}
        <div className="absolute -top-4 -right-4 bg-white text-gray-800 px-4 py-2 rounded-full font-nothing text-xl shadow-lg transform rotate-3">
          {date}
        </div>

        {/* Location pin — solid bg, NO backdrop-filter */}
        <div className="absolute -bottom-4 -left-4 bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-1 transform -rotate-2">
          <MapPin size={14} className="text-blush-coral" />
          {location}
        </div>
      </div>
    </motion.div>
  );
}

export function Timeline() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-cream-bg to-soft-pink/10">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-center font-playfair text-5xl md:text-7xl mb-32 text-transparent bg-clip-text bg-gradient-to-r from-blush-coral to-ruby-pop"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Moments That Made Me Fall
        </motion.h2>

        <div className="flex flex-col items-center">
          {timelineData.map((item, i) => (
            <TimelineItem key={i} index={i} {...item} />
          ))}
        </div>
      </div>

      {/* Center line — static, no animation cost */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-blush-coral/30 to-transparent -translate-x-1/2 z-0 hidden md:block" />
    </section>
  );
}
