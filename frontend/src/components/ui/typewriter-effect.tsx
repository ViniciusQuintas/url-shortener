"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect, useState } from "react";

type TypewriterWord = {
  text: string;
  className?: string;
};

type TypewriterProps = {
  words: TypewriterWord[];
  className?: string;
  cursorClassName?: string;
};

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: TypewriterProps) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        },
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    "dark:text-white text-black opacity-0 hidden",
                    word.className,
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className,
      )}
    >
      {renderWords()}

      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName,
        )}
      />
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: TypewriterProps) => {
  const text = words.map((word) => word.text).join(" ");

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    if (displayedText.length >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1));
    }, 130);

    return () => clearTimeout(timeout);
  }, [displayedText, text]);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <motion.div
        className="overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: "fit-content" }}
      >
        <span className="font-bold whitespace-nowrap">{displayedText}</span>
      </motion.div>

      <motion.span
        initial={{ opacity: 1 }}
        animate={{
          opacity: [1, 0, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "block h-4 w-[2px] rounded-sm bg-blue-500",
          cursorClassName,
        )}
      />
    </div>
  );
};
