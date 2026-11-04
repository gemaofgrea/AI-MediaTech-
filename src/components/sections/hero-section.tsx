"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { GreenRibbedCurtain } from "@/components/canvas/green-ribbed-curtain";
import { Magnetic } from "@/components/ui/magnetic";

interface HeroSectionProps {
  onOpenShowreel?: () => void;
  onOpenLeadsHud?: () => void;
  onOpenInquiry?: () => void;
}

export function HeroSection({ onOpenInquiry }: HeroSectionProps) {
  const headlineRef = useRef<HTMLDivElement | null>(null);

  // 3D Spatial Mouse Parallax for Headline using GSAP quickTo (desktop only)
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    // Skip mousemove attachment on touch/small devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTiltTo = gsap.quickTo(el, "rotateY", { duration: 0.9, ease: "power3.out" });
    const yTiltTo = gsap.quickTo(el, "rotateX", { duration: 0.9, ease: "power3.out" });
    const xTransTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" });
    const yTransTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / innerHeight - 0.5) * 2;

      xTiltTo(normalizedX * 3.5);
      yTiltTo(-normalizedY * 3.5);
      xTransTo(normalizedX * 10);
      yTransTo(normalizedY * 6);
    };

    const handleMouseLeave = () => {
      xTiltTo(0);
      yTiltTo(0);
      xTransTo(0);
      yTransTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-between pt-5 sm:pt-7 pb-6 sm:pb-8 px-4 sm:px-10 lg:px-14 overflow-x-hidden select-none bg-[#020602] perspective-[1200px]">
      {/* 1. 3D Pleated Green Ribbed Curtain Canvas with Bottom Pitch Black Fade */}
      <GreenRibbedCurtain />

      {/* 2. Top Bar: Balanced Studio Header Across All Screen Sizes */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full flex items-center justify-between pt-1"
      >
        {/* Left Corner: AI MediaTech Brand Colophon */}
        <div className="flex items-center justify-start flex-shrink-0">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-zinc-300 font-mono-code text-[10px] sm:text-[11px] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
            <span className="font-medium text-white tracking-widest">AI MEDIATECH</span>
            <span className="text-zinc-600 hidden md:inline text-[10px]">LAB</span>
          </div>
        </div>

        {/* Center Iconic Swallowtail Pennant Flag */}
        <div className="flex items-center justify-center">
          <Magnetic strength={0.4}>
            <Link href="/" className="group block" aria-label="Home">
              <motion.div
                whileHover={{ scale: 1.15, rotate: -3 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 450, damping: 20 }}
                className="relative p-1"
              >
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Swallowtail Flag body with inward notch on right */}
                  <path d="M4 3h16l-4.5 6 4.5 6H4V3z" fill="white" />
                  {/* Inner vertical slit */}
                  <line x1="8" y1="3" x2="8" y2="15" stroke="#a3e635" strokeWidth="1.8" />
                </svg>
              </motion.div>
            </Link>
          </Magnetic>
        </div>

        {/* Right Corner: Studio Worldwide Availability Badge */}
        <div className="flex justify-end items-center flex-shrink-0">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-zinc-400 font-mono-code text-[10px] sm:text-[11px] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden min-[420px]:inline">Worldwide</span>
            <span className="min-[420px]:hidden">Live</span>
          </div>
        </div>
      </motion.div>

      {/* 3. Monumental Headline: Fluid Typography Tailored for Mobile & Desktop */}
      <div
        ref={headlineRef}
        style={{ transformStyle: "preserve-3d" }}
        className="relative z-10 max-w-5xl mx-auto w-full my-auto py-6 sm:py-12 will-change-transform"
      >
        <div className="flex flex-col text-white tracking-[-0.03em] sm:tracking-[-0.035em] leading-[1.08] sm:leading-[1.02]">
          {/* Line 1: Primary Font - Lausanne (Grotesque Sans-Serif) */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              className="font-primary text-[1.85rem] min-[360px]:text-[2.15rem] min-[400px]:text-[2.45rem] min-[480px]:text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] font-normal text-white"
            >
              <span>From Neural Concept</span>
            </motion.div>
          </div>

          {/* Line 2: Secondary Font - Manier (High-Contrast Slanted Italic Serif) */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              className="font-secondary text-[2rem] min-[360px]:text-[2.3rem] min-[400px]:text-[2.6rem] min-[480px]:text-[2.9rem] sm:text-6xl md:text-7xl lg:text-[5.9rem] xl:text-[6.6rem] font-normal text-white pl-3 min-[400px]:pl-6 sm:pl-28 md:pl-44 lg:pl-56 xl:pl-64 py-0.5 sm:py-1"
            >
              <span>to Master Cinema</span>
            </motion.div>
          </div>

          {/* Line 3: Primary Font - Lausanne (Grotesque Sans-Serif, Aligned to Line 1) */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
              className="font-primary text-[1.85rem] min-[360px]:text-[2.15rem] min-[400px]:text-[2.45rem] min-[480px]:text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] font-normal text-white"
            >
              <span>elevating media to the</span>
            </motion.div>
          </div>

          {/* Line 4: Secondary Font - Manier (Italic Serif) + [ Commission shoot ] Pill Button */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-6 md:gap-8 pl-3 min-[400px]:pl-6 sm:pl-28 md:pl-44 lg:pl-56 xl:pl-64 pt-1 sm:pt-1.5"
            >
              <span className="font-secondary text-[2rem] min-[360px]:text-[2.3rem] min-[400px]:text-[2.6rem] min-[480px]:text-[2.9rem] sm:text-6xl md:text-7xl lg:text-[5.9rem] xl:text-[6.6rem] font-normal text-white">
                remarkable
              </span>

              {/* Exact [ Commission shoot ] Pill Button */}
              <Magnetic strength={0.45}>
                <motion.button
                  whileHover={{
                    scale: 1.06,
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    color: "#000000",
                    boxShadow: "0 10px 30px -5px rgba(255, 255, 255, 0.45)",
                  }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 450, damping: 24 }}
                  onClick={() => {
                    if (onOpenInquiry) {
                      onOpenInquiry();
                    } else {
                      const el = document.getElementById("commission");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="font-primary inline-flex items-center justify-center px-4 py-2 min-[400px]:px-5 min-[400px]:py-2.5 sm:px-7 sm:py-3 rounded-full border border-white/70 bg-black/25 text-white text-[11px] min-[400px]:text-xs sm:text-sm font-normal backdrop-blur-md cursor-pointer shadow-lg hover:border-white transition-colors"
                >
                  <span>Commission shoot</span>
                </motion.button>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4. Page Subtitles: Optimized for both Desktop Grids and Mobile Viewports */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-7xl mx-auto pb-4 sm:pb-6 pointer-events-none"
      >
        {/* Desktop 5-Column Grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 text-[12px] leading-snug text-white/70 font-primary">
          <div className="col-span-1 hidden md:block">
            <p>Virtual production, cinema &amp; neural art,</p>
            <p>directed by masters you actually talk to</p>
          </div>

          <div className="hidden md:block col-span-1" />
          <div className="hidden md:block col-span-1" />

          <div className="col-span-1">
            <p>For studios &amp; brands who need it</p>
            <p>mastered, not workshopped</p>
          </div>

          <div className="hidden md:block col-span-1" />
        </div>

        {/* Mobile Viewport Studio Badge & Statement */}
        <div className="flex sm:hidden flex-col items-center justify-center text-center space-y-2 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono-code text-zinc-300 uppercase tracking-widest backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
            <span>Virtual Production // AI Lab</span>
          </div>
          <p className="text-[11px] text-white/60 font-primary font-light tracking-wide max-w-xs">
            Directed by masters you actually talk to. Mastered, not workshopped.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
