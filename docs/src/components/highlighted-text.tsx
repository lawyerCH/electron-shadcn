"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils/styles";

type From = "left" | "right" | "top" | "bottom";

type HighlightedTextProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: From;
  inView?: boolean;
  once?: boolean;
};

const fromVariants = {
  left: {
    hidden: { x: "-100%" },
    visible: { x: "0%" },
  },
  right: {
    hidden: { x: "100%" },
    visible: { x: "0%" },
  },
  top: {
    hidden: { y: "-100%" },
    visible: { y: "0%" },
  },
  bottom: {
    hidden: { y: "100%" },
    visible: { y: "0%" },
  },
};

export function HighlightedText({
  children,
  className,
  from = "bottom",
  delay = 0,
  inView = false,
  once = true,
}: HighlightedTextProps) {
  const variants = fromVariants[from];

  return (
    <motion.span
      animate={inView ? undefined : "visible"}
      className={cn(
        "relative inline-flex overflow-hidden align-baseline",
        className
      )}
      initial="hidden"
      viewport={{ once }}
      whileInView={inView ? "visible" : undefined}
    >
      <motion.span
        className="absolute inset-0 right-[-0.18em] left-[-0.15em] z-0 bg-white dark:bg-white"
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
          delay,
        }}
        variants={variants}
      />
      <span className="relative z-10 pr-[0.18em] pl-[0.15em] text-background">
        {children}
      </span>
    </motion.span>
  );
}

export default HighlightedText;
