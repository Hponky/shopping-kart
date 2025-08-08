"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "onDrag" | "onDragStart" | "onDragEnd"> {
  variant?: "default" | "strong" | "subtle";
  hover?: boolean;
  glow?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", hover = true, glow = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-white/10 backdrop-blur-md border border-white/20",
      strong: "bg-white/20 backdrop-blur-lg border border-white/30",
      subtle: "bg-white/5 backdrop-blur-sm border border-white/10"
    };

    const hoverClasses = hover ? "hover:bg-white/15 hover:border-white/30 hover:shadow-xl hover:shadow-primary/10" : "";
    const glowClasses = glow ? "shadow-lg shadow-primary/20" : "";

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-xl transition-all duration-300",
          variants[variant],
          hoverClasses,
          glowClasses,
          className
        )}
        whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };