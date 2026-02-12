"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "glass" | "outline" | "danger";
}

export function MagneticButton({ children, className, variant = "primary", ...props }: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        // @ts-ignore
        const { left, top, width, height } = ref.current?.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const getVariantClasses = () => {
        switch (variant) {
            case "primary": return "bg-blush-coral text-white hover:bg-ruby-pop shadow-lg hover:shadow-xl";
            case "secondary": return "bg-soft-pink text-white hover:bg-blush-coral shadow-md";
            case "glass": return "glass-btn text-white backdrop-blur-md border border-white/30 hover:bg-white/20";
            case "outline": return "border-2 border-vintage-lace text-slate-700 hover:bg-vintage-lace/20";
            case "danger": return "bg-red-400 text-white hover:bg-red-500 shadow-md";
            default: return "bg-blush-coral text-white";
        }
    };

    const { x, y } = position;

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: x * 0.2, y: y * 0.2 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={cn(
                "relative rounded-full px-8 py-3 font-medium transition-colors duration-300",
                getVariantClasses(),
                className
            )}
            {...props as any}
        >
            {children}
        </motion.button>
    );
}
