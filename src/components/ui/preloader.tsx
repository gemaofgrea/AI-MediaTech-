"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // snappy ~1700ms
}

export function Preloader({ onComplete, minDuration = 1750 }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const isCompletedRef = useRef(false);

  const handleFinish = () => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;
    setProgress(100);
    setTimeout(() => {
      setIsLoaded(true);
      document.body.style.overflow = "";
      if (onComplete) onComplete();
    }, 160);
  };

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    const startTime = performance.now();
    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawPct = Math.min((elapsed / minDuration) * 100, 100);
      const easedPct = Math.min(Math.floor(rawPct), 100);

      setProgress(easedPct);

      if (easedPct < 100) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        handleFinish();
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = "";
    };
  }, [minDuration]);

  // Keyboard shortcut (Escape or Space to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Space") {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Chronograph circle dimensions
  const circleRadius = 54;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <AnimatePresence mode="wait">
      {!isLoaded && (
        <motion.div
          onClick={handleFinish}
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] bg-[#040406] text-white flex flex-col justify-between p-6 sm:p-10 select-none cursor-pointer overflow-visible"
          title="Click to enter"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full bg-lime-500/[0.04] blur-[100px]" />
          </div>

          {/* =========================================================
              VIEWFINDER HUD CORNER RETICLES
             ========================================================= */}
          <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-4 h-4 border-t-2 border-l-2 border-white/20 pointer-events-none" />
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-4 h-4 border-t-2 border-r-2 border-white/20 pointer-events-none" />
          <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-4 h-4 border-b-2 border-l-2 border-white/20 pointer-events-none" />
          <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-4 h-4 border-b-2 border-r-2 border-white/20 pointer-events-none" />

          {/* =========================================================
              TOP BAR: REC TELEMETRY & SKIP CUE
             ========================================================= */}
          <motion.div
            exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
            className="relative z-10 flex items-center justify-between text-xs font-mono-code text-zinc-400 tracking-wider"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                <span className="text-white text-[11px] font-semibold tracking-widest">REC</span>
              </span>
              <span className="text-zinc-600">//</span>
              <span className="text-zinc-400 text-[11px] hidden sm:inline tracking-widest">
                AI MEDIATECH STUDIO
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFinish();
              }}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 hover:border-lime-400/40 text-[10px] uppercase text-zinc-400 hover:text-white transition-all duration-200"
            >
              <span>SKIP</span>
              <span className="text-zinc-500 group-hover:text-lime-400 text-[9px] font-mono-code">
                [ESC]
              </span>
            </button>
          </motion.div>

          {/* =========================================================
              CENTER: OPTICAL CHRONOGRAPH EMBLEM & BRAND REVEAL
             ========================================================= */}
          <motion.div
            exit={{ opacity: 0, scale: 0.96, y: -35, transition: { duration: 0.35 } }}
            className="relative z-10 self-center flex flex-col items-center my-auto"
          >
            {/* Circular Bezel with Animated Progress Stroke */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
              {/* Outer Lens Ticks SVG */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 128 128">
                {/* Background Track Circle */}
                <circle
                  cx="64"
                  cy="64"
                  r={circleRadius}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1.5"
                />

                {/* Animated Lime Progress Arc */}
                <circle
                  cx="64"
                  cy="64"
                  r={circleRadius}
                  fill="none"
                  stroke="#a3e635"
                  strokeWidth="2.2"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-[stroke-dashoffset] duration-75 ease-out"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(163, 230, 53, 0.75))",
                  }}
                />
              </svg>

              {/* Four Micro Tick Marks at cardinal points */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/20 pointer-events-none" />
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/20 pointer-events-none" />
              <div className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-white/20 pointer-events-none" />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-white/20 pointer-events-none" />

              {/* Center Icon: The Signature Swallowtail Pennant Flag Emblem */}
              <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.03] border border-white/10 shadow-[0_0_30px_rgba(163,230,53,0.12)]">
                <svg
                  viewBox="0 0 32 32"
                  className="w-9 h-9 sm:w-11 sm:h-11 drop-shadow-[0_0_12px_rgba(163,230,53,0.5)] transition-transform duration-300"
                  fill="none"
                >
                  {/* Flag Body */}
                  <path d="M6 6h20l-5.5 7 5.5 7H6V6z" fill="#ffffff" />
                  {/* Signature Inner Vertical Slit */}
                  <line
                    x1="11"
                    y1="6"
                    x2="11"
                    y2="20"
                    stroke="#a3e635"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Numeric Percentage Counter */}
            <div className="mt-7 flex items-baseline gap-1">
              <span className="font-primary text-4xl sm:text-5xl font-light text-white tracking-tight tabular-nums">
                {progress.toString().padStart(2, "0")}
              </span>
              <span className="text-lime-400 font-mono-code text-sm font-semibold">%</span>
            </div>

            {/* Brand Title */}
            <h1 className="mt-3 font-primary text-sm sm:text-base font-medium tracking-[0.35em] text-white uppercase text-center pl-[0.35em]">
              AI MEDIATECH
            </h1>

            {/* Sub-label */}
            <p className="mt-1 font-mono-code text-[10px] text-zinc-500 tracking-[0.25em] uppercase text-center pl-[0.25em]">
              AI-DIRECTED MASTER CINEMA
            </p>

            {/* Hairline Progress Gauge with Laser Sweep */}
            <div className="mt-6 w-44 sm:w-56 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-lime-500/50 via-lime-400 to-lime-300 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(163,230,53,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>

          {/* =========================================================
              BOTTOM BAR: CINEMA SPECIFICATIONS & CLICK HINT
             ========================================================= */}
          <motion.div
            exit={{ opacity: 0, y: 20, transition: { duration: 0.25 } }}
            className="relative z-10 flex items-end justify-between font-mono-code text-xs text-zinc-500"
          >
            <div className="space-y-0.5">
              <div className="text-[10px] uppercase tracking-widest text-zinc-400">
                INIT // MASTER TIMELINE
              </div>
              <div className="text-[9px] text-zinc-600 tracking-wider">
                24.000 FPS // 4K CINEMA ARCHIVE
              </div>
            </div>

            {/* Interactive hint */}
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 group-hover:text-lime-400 transition-colors">
                CLICK ANYWHERE TO ENTER
              </span>
            </div>
          </motion.div>

          {/* =========================================================
              ORGANIC CURTAIN EXIT SCOOP (SVG ARCH)
             ========================================================= */}
          <svg
            className="absolute top-[99.5%] left-0 w-full h-16 sm:h-24 fill-[#040406] pointer-events-none"
            viewBox="0 0 1440 96"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L1440,0 Q720,96 0,0 Z" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
