"use client";

import { motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";

type RevealProps = {
  children: ReactNode;
  delayMs?: number;
  className?: string;
};

export default function Reveal({ children, delayMs, className }: RevealProps) {
  const [render, setRender] = useState(false);

  function startDelayCounter() {
    setTimeout(() => {
      setRender(true);
    }, delayMs);
  }

  useEffect(startDelayCounter, [delayMs]);

  if (!render) {
    return null;
  }

  return (
    <motion.div
      animate={{
        opacity: 1,
      }}
      className={className}
      initial={{
        opacity: 0,
      }}
      transition={{
        duration: 1,
        delay: 1,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
