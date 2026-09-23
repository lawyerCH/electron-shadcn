"use client";

import { type AnimationOptions, motion } from "motion/react";
import { type ComponentProps, useCallback, useMemo } from "react";

import { cn } from "@/lib/utils/styles";

type SlideUpTextBaseProps = {
  autoStart?: boolean;
  charClass?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "first" | "last" | "center";
  inView?: boolean;
  once?: boolean;
  split?: "words" | "characters" | "lines";
  stagger?: number;
  transition?: AnimationOptions;
  wordClass?: string;
};

type WordObject = {
  characters: string[];
  needsSpace: boolean;
};

type SlideUpTextProps = Omit<
  ComponentProps<"span">,
  "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
> &
  SlideUpTextBaseProps;

function SlideUpText({
  children,
  split = "words",
  delay = 0,
  stagger = 0.1,
  from = "first",
  transition = {
    type: "tween",
    ease: [0.625, 0.05, 0, 1],
    duration: 0.5,
  },
  className,
  wordClass,
  charClass,
  autoStart = true,
  inView = false,
  once = true,
  ref,
  ...props
}: SlideUpTextProps) {
  const text =
    typeof children === "string" ? children : children?.toString() || "";

  const splitIntoCharacters = useCallback((text: string) => {
    if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), ({ segment }) => segment);
    }
    return Array.from(text);
  }, []);

  const elements = useMemo(() => {
    const words = text.split(" ");
    if (split === "characters") {
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    return split === "words" ? text.split(" ") : text.split("\n");
  }, [text, split, splitIntoCharacters]);

  const getStaggerDelay = useCallback(
    (index: number) => {
      const total =
        split === "characters"
          ? elements.reduce(
              (acc, word) =>
                acc +
                (typeof word === "string"
                  ? 1
                  : word.characters.length + (word.needsSpace ? 1 : 0)),
              0
            )
          : elements.length;

      if (from === "first") {
        return index * stagger;
      }
      if (from === "last") {
        return (total - 1 - index) * stagger;
      }
      if (from === "center") {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * stagger;
      }
      return index * stagger;
    },
    [elements, from, stagger, split]
  );

  const variants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
      y: 0,
      transition: {
        ...transition,
        delay:
          delay + ((transition?.delay as number) || 0) + getStaggerDelay(i),
      },
    }),
  };

  return (
    <motion.span
      animate="visible"
      className={cn(
        className,
        "flex flex-wrap whitespace-pre-wrap",
        split === "lines" && "flex-col"
      )}
      initial="hidden"
      {...props}
    >
      <span className="sr-only">{text}</span>

      {(split === "characters"
        ? (elements as WordObject[])
        : (elements as string[]).map((el, i, arr) => ({
            characters: [el],
            needsSpace: split === "words" && i !== arr.length - 1,
          }))
      ).map((wordObj, wordIndex, array) => {
        const wordSpanKey = `word-${wordIndex}`;
        const previousCharsCount = array
          .slice(0, wordIndex)
          .reduce((sum, word) => sum + word.characters.length, 0);

        return (
          <span
            aria-hidden="true"
            className={cn("inline-flex overflow-hidden", wordClass)}
            key={wordSpanKey}
          >
            {wordObj.characters.map((char, charIndex) => {
              const spanKey = `char-${previousCharsCount + charIndex}`;

              return (
                <span
                  className={cn(
                    charClass,
                    "relative overflow-hidden whitespace-pre-wrap"
                  )}
                  key={spanKey}
                >
                  <motion.span
                    animate={"visible"}
                    className="inline-block"
                    custom={previousCharsCount + charIndex}
                    initial="hidden"
                    variants={variants}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
            {wordObj.needsSpace && (
              <span className="relative overflow-hidden">
                <motion.span
                  animate={"visible"}
                  className="inline-block"
                  custom={previousCharsCount + wordObj.characters.length}
                  initial="hidden"
                  variants={variants}
                >
                  {" "}
                </motion.span>
              </span>
            )}
          </span>
        );
      })}
    </motion.span>
  );
}

SlideUpText.displayName = "SlideUpText";

export type { SlideUpTextBaseProps as SlideUpTextProps };
export { SlideUpText };
