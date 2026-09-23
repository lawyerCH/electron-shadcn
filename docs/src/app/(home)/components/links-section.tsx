"use client";

import { motion } from "motion/react";
import Link from "@/components/link";

export function LinksSection() {
  return (
    <motion.div
      animate={{
        y: 0,
      }}
      className="absolute right-0 bottom-0 flex gap-2 border border-border bg-card p-2 font-mono text-card-foreground text-sm"
      initial={{
        y: 40,
      }}
      transition={{
        delay: 2.3,
      }}
    >
      <Link href="https://github.com/lawyerch" isExternal>
        [ GitHub ]
      </Link>
      /
      <Link href="https://lawyerch.dev/" isExternal>
        [ Portfolio ]
      </Link>
    </motion.div>
  );
}
