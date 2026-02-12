"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  image: string;
  caption: string;
  index: number;
}

const timelineData = [
  {
    image: "/images/p1.jpeg",
    caption: "Life is better with you by my side."
  },
  {
    image: "/images/p2.jpeg",
    caption: "My favorite place is wherever you are."
  },
  {
    image: "/images/p3.jpeg",
    caption: "You make every moment magical."
  },
  {
    image: "/images/p4.jpeg",
    caption: "Loving you is the easiest thing I've ever done."
  },
  {
    image: "/images/p5.jpeg",
    caption: "Forever grateful for you."
  },
  {
    image: "/images/p6.jpeg",
    caption: "You are my greatest adventure."
  },
  {
    image: "/images/p7.jpeg",
    caption: "You complete me in every way."
  }
];

function TimelineItem({ image, caption, index }: TimelineItemProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -5 : 5, index % 2 === 0 ? 5 : -5]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, willChange: "transform, opacity" }}
      className={cn(
        "relative flex w-full mb-24 items-center justify-center"
      )}
    >
      <motion.div
        style={{ rotate }}
        className="relative group cursor-pointer p-4 bg-white shadow-2xl transition-transform duration-500 hover:scale-105 hover:z-10"
      >
        {/* Decorative Frame Border - double border effect */}
        <div className="absolute inset-0 border-2 border-dashed border-ruby-pop/30 m-2 pointer-events-none" />

        {/* Heart Decor - Top Left */}
        <div className="absolute -top-3 -left-3 text-ruby-pop/80 transform -rotate-12 drop-shadow-sm">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
        </div>

        {/* Heart Decor - Bottom Right */}
        <div className="absolute -bottom-3 -right-3 text-soft-pink/80 transform rotate-12 drop-shadow-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
        </div>

        <div className="relative aspect-[4/5] w-64 md:w-80 overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={caption}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />

          {/* Caption on Hover - Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
            <p className="text-white font-nothing text-xl md:text-2xl leading-relaxed tracking-wide shadow-black drop-shadow-md">
              {caption}
            </p>
          </div>
        </div>

        {/* Bottom "Polaroid" Style Space */}
        <div className="h-12 bg-white w-full flex items-center justify-center">
          <div className="font-great-vibes text-gray-400 text-lg opacity-60">Love you ❤️</div>
        </div>

      </motion.div>
    </motion.div>
  );
}

export function Timeline() {
  return (
    <section className="relative py-20 overflow-hidden bg-cream-bg">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-center font-playfair text-5xl md:text-7xl mb-24 text-transparent bg-clip-text bg-gradient-to-r from-blush-coral to-ruby-pop"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Moments That Made Me Fall
        </motion.h2>

        <div className="flex flex-col items-center gap-12">
          {timelineData.map((item, i) => (
            <TimelineItem key={i} index={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
