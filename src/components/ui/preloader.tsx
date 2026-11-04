"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // snappy ~1700ms
}

const DISCIPLINES = [
  "MOVIE & VIDEO MAKING",
  "VIDEO EDITING & PROCESSING",
  "MODEL & FASHION PHOTOGRAPHY",
  "AI IMAGE GENERATION",
  "DIRECTORS & ARTISTS GUILD",
  "AI MEDIATECH",
];

export function Preloader({ onComplete, minDuration = 1750 }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / minDuration) * 100), 100);

      setProgress(pct);

      // Cycle through disciplines based on progress
      const wordIdx = Math.min(
        Math.floor((pct / 100) * DISCIPLINES.length),
        DISCIPLINES.length - 1,
      );
      setActiveWordIndex(wordIdx);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
          document.body.style.overflow = "";
          if (onComplete) onComplete();
        }, 250);
      }
    }, 24);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [minDuration, onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setIsLoaded(true);
    document.body.style.overflow = "";
    if (onComplete) onComplete();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleSkip();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isLoaded && (
        <div
          onClick={handleSkip}
          className="fixed inset-0 z-[9999] pointer-events-auto cursor-pointer select-none overflow-hidden"
          title="Click to enter"
        >
          {/* =========================================================
              1. TOP SPLIT SHUTTER (slides up on exit)
             ========================================================= */}
          <motion.div
            initial={{ y: 0 }}
            exit={{
              y: "-100%",
              transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] },
            }}
            className="absolute top-0 inset-x-0 h-1/2 bg-[#050507] border-b border-white/[0.06] flex flex-col justify-between p-6 sm:p-12 z-10"
          >
            {/* Top Bar Header */}
            <div className="flex items-center justify-between text-xs font-mono-code text-zinc-400 tracking-widest">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
                <span className="text-white font-medium tracking-tight">AI MEDIATECH</span>
                <span className="text-zinc-600">//</span>
                <span className="text-zinc-500 hidden sm:inline">STUDIO ARCHIVE</span>
              </div>
              <div className="text-[10px] uppercase text-zinc-500 tracking-widest">
                [ CLICK ANYWHERE TO ENTER ]
              </div>
            </div>

            {/* Top Half of Big Text Mask */}
            <div className="self-center translate-y-1/2 overflow-hidden pointer-events-none">
              <motion.div
                key={activeWordIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="font-primary text-3xl sm:text-5xl md:text-7xl font-light tracking-[-0.03em] text-white text-center whitespace-nowrap"
              >
                {DISCIPLINES[activeWordIndex]}
              </motion.div>
            </div>
          </motion.div>

          {/* =========================================================
              2. HORIZONTAL ANAMORPHIC FLARE LINE (middle seam)
             ========================================================= */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-1/2 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-lime-400 to-transparent z-20 pointer-events-none -translate-y-1/2 shadow-[0_0_15px_rgba(163,230,53,0.9)]"
          />

          {/* =========================================================
              3. BOTTOM SPLIT SHUTTER (slides down on exit)
             ========================================================= */}
          <motion.div
            initial={{ y: 0 }}
            exit={{
              y: "100%",
              transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] },
            }}
            className="absolute bottom-0 inset-x-0 h-1/2 bg-[#050507] border-t border-white/[0.06] flex flex-col justify-between p-6 sm:p-12 z-10"
          >
            {/* Center Spacer to mirror the top word */}
            <div className="self-center -translate-y-1/2 flex items-center gap-1.5 pt-4">
              {DISCIPLINES.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-200 ${
                    i === activeWordIndex
                      ? "w-8 bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.8)]"
                      : "w-2 bg-white/10"
                  }`}
                />
              ))}
            </div>

            {/* Bottom Bar: Counter & Specs */}
            <div className="flex items-end justify-between font-mono-code text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                  SYNCHRONIZING CINEMATIC STREAM
                </span>
                <span className="text-zinc-400 text-xs tracking-wider">
                  24.0 FPS // PRORES 4444 XQ
                </span>
              </div>

              {/* Minimal Counter */}
              <div className="flex items-baseline gap-1 text-right">
                <span className="font-primary text-4xl sm:text-5xl font-light text-white tabular-nums tracking-tight">
                  {progress}
                </span>
                <span className="text-lime-400 text-sm font-mono-code">%</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
