"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const memories = [
    {
        id: 1,
        front: {
            image: "/images/p5.jpeg",
            label: "First Time We..."
        },
        back: {
            text: "Sat in silence and it wasn't awkward. That's when I knew.",
        }
    },
    {
        id: 2,
        front: {
            image: "/images/p6.jpeg",
            label: "You Didn't Know..."
        },
        back: {
            text: "I kept the movie ticket from our first date. It's in my wallet.",
        }
    },
    {
        id: 3,
        front: {
            image: "/images/p7.jpeg",
            label: "My Favorite..."
        },
        back: {
            text: "The way you scrunch your nose when you laugh at my bad jokes.",
        }
    },
    {
        id: 4,
        front: {
            image: "/images/p8.jpeg",
            label: "Our Inside Joke"
        },
        back: {
            text: "Pineapple on pizza is still a crime, but I'll allow it for you.",
        }
    }
];

function MemoryCard({ front, back }: { front: any, back: any }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="perspective-1000 w-full aspect-[3/4] cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="relative w-full h-full preserve-3d transition-all duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                whileHover={{ scale: 1.02, y: -10 }}
            >
                {/* FRONT */}
                <div className="absolute inset-0 backface-hidden">
                    <div className="glass-card p-4 rounded-3xl h-full shadow-xl bg-white/40 border-white/50">
                        {/* Polaroid effect */}
                        <div className="bg-white p-4 pb-12 shadow-md rotate-1 h-full flex flex-col transform transition-transform group-hover:rotate-0">
                            <div className="flex-grow overflow-hidden relative bg-gray-100">
                                <img src={front.image} className="absolute inset-0 w-full h-full object-cover" alt="Memory" loading="lazy" decoding="async" />
                            </div>
                            <p className="font-nothing text-center mt-6 text-2xl text-gray-700">
                                {front.label}
                            </p>
                        </div>
                    </div>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <div className="glass-card p-8 rounded-3xl h-full flex flex-col items-center justify-center text-center bg-white/60 border-white/60 shadow-xl">
                        <Heart className="text-ruby-pop mb-6 drop-shadow-md" size={48} fill="currentColor" />
                        <p className="font-cormorant text-2xl md:text-3xl leading-relaxed text-gray-800 font-medium">
                            "{back.text}"
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export function MemoryCards() {
    return (
        <section className="py-32 bg-cream-bg relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-center font-playfair text-5xl md:text-7xl mb-24 text-gray-800">
                    Our Firsts & Favorites
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto">
                    {memories.map((memory) => (
                        <MemoryCard key={memory.id} {...memory} />
                    ))}
                </div>
            </div>

            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-ruby-pop/20 to-transparent transform -translate-y-1/2 z-0" />
        </section>
    );
}
