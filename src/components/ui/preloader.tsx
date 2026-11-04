"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // default ~2000ms
}

const TELEMETRY_STEPS = [
  { threshold: 0, text: "INITIALIZING ARRI ALEXA 35 SENSOR" },
  { threshold: 22, text: "COMPILING UNREAL ENGINE 5.5 ICVFX" },
  { threshold: 48, text: "MOUNTING 100MP DIGITAL RUNWAY PLATES" },
  { threshold: 72, text: "SYNCHRONIZING FLUX.1 PRO LATENTS" },
  { threshold: 92, text: "CALIBRATING ACES 2065-1 COLOR PIPELINE" },
  { threshold: 100, text: "AI MEDIATECH // SYSTEM READY" },
];

export function Preloader({ onComplete, minDuration = 2200 }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(TELEMETRY_STEPS[0].text);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / minDuration) * 100), 100);

      setProgress(pct);

      // Update telemetry step text
      const step = [...TELEMETRY_STEPS]
        .reverse()
        .find((s) => pct >= s.threshold);
      if (step) {
        setCurrentStep(step.text);
      }

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
          document.body.style.overflow = "";
          if (onComplete) onComplete();
        }, 350);
      }
    }, 28);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [minDuration, onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSkip = () => {
    setProgress(100);
    setIsLoaded(true);
    document.body.style.overflow = "";
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence mode="wait">
      {!isLoaded && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#070709] text-white select-none px-6 sm:px-12 py-8 overflow-hidden pointer-events-auto"
        >
          {/* Subtle noise / scanline atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.08),rgba(255,255,255,0))] pointer-events-none" />

          {/* Top Bar: Studio Metadata */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono-code text-zinc-400 tracking-wider">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
              <span className="text-white font-medium">AI MEDIATECH</span>
              <span className="hidden sm:inline text-zinc-600">//</span>
              <span className="hidden sm:inline text-zinc-500">PARIS • NYC • TOKYO</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden md:inline text-zinc-500">24.000 FPS // DCI 4K</span>
              <button
                onClick={handleSkip}
                className="px-2.5 py-1 rounded border border-white/10 hover:border-white/30 text-[10px] text-zinc-400 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
              >
                Skip [Esc]
              </button>
            </div>
          </div>

          {/* Centerpiece: Viewfinder Iris & Monumental Counter */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            {/* Viewfinder Corner Framing Brackets */}
            <div className="relative w-64 sm:w-80 h-44 sm:h-52 flex flex-col items-center justify-center border border-white/[0.04]">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-lime-400/80" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-lime-400/80" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-lime-400/80" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-lime-400/80" />

              {/* Viewfinder crosshairs */}
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/[0.06] -translate-y-1/2" />
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-white/[0.06] -translate-x-1/2" />

              {/* Big Monumental Counter */}
              <div className="relative flex items-baseline">
                <span className="font-primary text-6xl sm:text-7xl md:text-8xl font-light tracking-tight text-white tabular-nums">
                  {String(progress).padStart(3, "0")}
                </span>
                <span className="font-mono-code text-lime-400 text-lg sm:text-2xl font-light ml-1">
                  %
                </span>
              </div>

              {/* Central small rotating reticle */}
              <div className="absolute -bottom-3 px-3 bg-[#070709] border border-white/10 font-mono-code text-[9px] text-zinc-400 tracking-widest uppercase">
                LATENT ENGINE
              </div>
            </div>

            {/* Cycling Telemetry Status Line */}
            <div className="mt-8 flex items-center gap-2.5 font-mono-code text-xs sm:text-sm text-zinc-300 tracking-[0.18em] uppercase text-center h-6">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
              <span>{currentStep}</span>
            </div>
          </div>

          {/* Bottom Bar: Timeline Progress & Colophon */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between text-[11px] font-mono-code text-zinc-500 uppercase tracking-widest">
              <span>CALIBRATION SEQUENCE</span>
              <span className="text-zinc-400">{progress} / 100</span>
            </div>

            {/* Hairline Progress Bar */}
            <div className="relative w-full h-[2px] bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono-code text-zinc-600 tracking-widest">
              <span>UNREAL ENGINE 5.5 + FLUX.1 PRO</span>
              <span>CONFIDENTIAL // ALL RIGHTS RESERVED</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
