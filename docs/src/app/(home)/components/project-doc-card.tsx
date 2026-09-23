"use client";

import { motion } from "motion/react";
import GitHubIcon from "@/components/icons/github";
import Link from "@/components/link";
import { SlideUpText } from "@/components/slide-up-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/styles";

type ProjectDocCardProps = {
  name: string;
  abreviatedName: string;
  description: string;
  documentationLink: string;
  repositoryLink: string;
  accentColor: string;
  index: number;
};

export default function ProjectDocCard({
  name,
  abreviatedName,
  description,
  documentationLink,
  repositoryLink,
  accentColor,
  index,
}: ProjectDocCardProps) {
  const bgVariantsLayer2 = {
    hover: {
      opacity: 0,
    },
  };
  const abreviationVariants = {
    hover: {
      color: `var(--${accentColor})`,
      opacity: 1,
    },
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative flex h-72 w-full flex-col gap-2 overflow-clip border border-border lg:size-72"
      )}
      initial={{ opacity: 0, y: 25 }}
      transition={{
        delay: 1.7 + index * 0.1,
      }}
      whileHover="hover"
    >
      <motion.h3
        className={cn(
          "absolute right-0 bottom-0 z-30 select-none font-pixel text-9xl"
        )}
        variants={abreviationVariants}
      >
        <SlideUpText delay={1.6} split="characters">
          {abreviatedName}
        </SlideUpText>
      </motion.h3>
      <motion.div
        className="absolute inset-0 z-20 size-full"
        style={{ backgroundColor: `var(--${accentColor})` }}
        variants={bgVariantsLayer2}
      />
      <div className="absolute inset-0 z-10 size-full bg-card" />
      <div className="z-40 flex flex-col gap-2 p-4">
        <h2 className="font-bold text-2xl">{name}</h2>
        <p className="text-sm">{description}</p>
        <div className="flex gap-2">
          <Link href={documentationLink}>
            <Button variant={"secondary"}>Documentation</Button>
          </Link>
          <Link href={repositoryLink} isExternal>
            <Button size={"icon"} variant={"ghost"}>
              <GitHubIcon className="fill-white" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
