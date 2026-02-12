"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function LoveLetter() {
    return (
        <section className="py-28 bg-gradient-to-b from-soft-pink/10 via-cream-bg to-cream-bg relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-3xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/50 border border-white/60 shadow-xl rounded-3xl p-10 md:p-16 text-center"
                >
                    {/* Decorative heart */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="inline-block mb-8 text-ruby-pop"
                    >
                        <Heart size={48} fill="currentColor" className="drop-shadow-md" />
                    </motion.div>

                    <h2 className="font-great-vibes text-5xl md:text-6xl text-blush-coral mb-10">
                        A Letter For You
                    </h2>

                    <div className="font-cormorant text-xl md:text-2xl leading-relaxed text-gray-700 space-y-6 text-left">
                        <p>
                            Happy Valentine's Day, my love. 🍊❤️
                        </p>

                        <p>
                            Our 3rd Valentine… yet it feels like we just started our story yesterday. Even though we're far from each other right now because of work, not a single day passes where I don't feel your presence in my life. These 2.5 years with you have been like a beautiful K-drama — full of love, warmth, silly fights, deep talks, and moments I wish I could replay forever.
                        </p>

                        <p>
                            And today, I also want to say I'm sorry… for all the times we fought, for the times I hurt you knowingly or unknowingly, and for the moments where my ego was louder than my love. If I could go back, I'd choose understanding you over winning arguments — every single time.
                        </p>

                        <p>
                            They say when life gives you tangerines, you make something sweet out of it… and that's what we've been doing — turning distance into patience, struggles into strength, fights into lessons, and moments into memories. I don't just want the happy scenes with you, I want every season — the hard days, the quiet days, and the best days — all with you by my side.
                        </p>

                        <p>
                            I want to spend every moment of my life loving you, protecting your smile, and one day… turning this love story into marriage, growing old together like the ending of our own K-drama.
                        </p>

                        <p className="font-semibold text-center text-2xl md:text-3xl text-blush-coral mt-10">
                            You're not just my Valentine.<br />
                            You're my always, my home, my forever.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
