"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// High-character variety glyphs for authentic decode sequence
const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()_+=~";

interface ScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnHover?: boolean;
}

export function ScrambleText({
  text,
  delay = 0,
  duration = 800,
  className = "",
  triggerOnHover = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const isRunning = useRef(false);
  const textRef = useRef(text);
  textRef.current = text;

  const startScramble = () => {
    if (isRunning.current) return;
    isRunning.current = true;

    const target = textRef.current;
    const length = target.length;
    const startTime = Date.now();

    const onTick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Custom GSAP exponential decel for natural snap
      const eased = gsap.parseEase("power3.out")(progress);
      const resolvedCount = Math.floor(eased * length);

      let result = "";
      for (let i = 0; i < length; i++) {
        if (target[i] === " ") {
          result += " ";
        } else if (i < resolvedCount) {
          result += target[i];
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(result);

      if (progress >= 1) {
        gsap.ticker.remove(onTick);
        setDisplayText(target);
        isRunning.current = false;
      }
    };

    gsap.ticker.add(onTick);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startScramble();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, text]);

  return (
    <span
      className={`inline-block select-none ${className}`}
      onMouseEnter={() => {
        if (triggerOnHover && !isRunning.current) {
          startScramble();
        }
      }}
    >
      {displayText}
    </span>
  );
}
