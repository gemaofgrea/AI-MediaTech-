"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // fast & snappy ~1100ms
}

export function Preloader({ onComplete, minDuration = 1100 }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / minDuration) * 100), 100);

      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
          document.body.style.overflow = "";
          if (onComplete) onComplete();
        }, 140);
      }
    }, 16);

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
      if (e.key === "Escape" || e.code === "Space") handleSkip();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isLoaded && (
        <motion.div
          onClick={handleSkip}
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] bg-[#050507] text-white flex flex-col items-center justify-between p-6 sm:p-10 select-none cursor-pointer overflow-hidden"
          title="Click to enter"
        >
          {/* Top Bar: Minimal Studio Tag & Skip cue */}
          <div className="w-full flex items-center justify-between text-xs font-mono-code text-zinc-500">
            <span className="tracking-widest uppercase text-[11px] text-zinc-400">
              AI MEDIATECH
            </span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 hover:text-white transition-colors">
              [ ESC TO SKIP ]
            </span>
          </div>

          {/* Center: Iconic Flag Emblem + Brand + Hairline Progress */}
          <div className="flex flex-col items-center space-y-6 my-auto">
            {/* Swallowtail Flag Emblem */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative p-2"
            >
              <svg
                className="w-11 h-11 sm:w-14 sm:h-14 drop-shadow-[0_0_24px_rgba(163,230,53,0.35)]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M4 3h16l-4.5 6 4.5 6H4V3z" fill="white" />
                <line
                  x1="8"
                  y1="3"
                  x2="8"
                  y2="15"
                  stroke="#a3e635"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>

            {/* Brand Title */}
            <div className="text-center space-y-1">
              <h2 className="font-primary text-sm sm:text-base font-light tracking-[0.35em] text-white uppercase pl-[0.35em]">
                AI MEDIATECH
              </h2>
              <p className="font-mono-code text-[10px] sm:text-[11px] tracking-[0.25em] text-zinc-500 uppercase pl-[0.25em]">
                STUDIO // 2026
              </p>
            </div>

            {/* Minimal Hairline Progress Gauge */}
            <div className="w-44 sm:w-56 h-[1.5px] bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.85)] transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Bottom Bar: Tabular Counter */}
          <div className="w-full flex items-baseline justify-between font-mono-code text-xs text-zinc-500">
            <span className="text-[10px] uppercase tracking-wider text-zinc-600">
              INITIALIZING
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-primary text-2xl sm:text-3xl font-light text-white tabular-nums tracking-tight">
                {progress}
              </span>
              <span className="text-lime-400 text-xs font-mono-code">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
