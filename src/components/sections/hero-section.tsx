"use client";

import React, { useState, useRef, useEffect } from "react";
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

export function HeroSection({ onOpenShowreel, onOpenLeadsHud, onOpenInquiry }: HeroSectionProps) {
  const headlineRef = useRef<HTMLDivElement | null>(null);

  // 3D Spatial Mouse Parallax for Headline using GSAP quickTo
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

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
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-7 pb-6 px-6 sm:px-10 lg:px-14 overflow-hidden select-none bg-[#020602] perspective-[1200px]">
      {/* 1. 3D Pleated Green Ribbed Curtain Canvas with Bottom Pitch Black Fade */}
      <GreenRibbedCurtain />

      {/* 2. Top Bar: Pennant Swallowtail Flag Emblem (Balanced Studio Header) */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full flex items-center justify-between pt-1"
      >
        {/* Left Corner: AI MediaTech Brand Colophon */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-36 sm:w-48 flex items-center justify-start flex-shrink-0"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-zinc-300 font-mono-code text-[11px] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" />
            <span className="font-medium text-white tracking-widest">AI MEDIATECH</span>
            <span className="text-zinc-600 hidden md:inline text-[10px]">24 FPS</span>
          </div>
        </motion.div>

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
                  className="w-8 h-8 text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Swallowtail Flag body with inward notch on right */}
                  <path d="M4 3h16l-4.5 6 4.5 6H4V3z" fill="white" />
                  {/* Inner vertical slit */}
                  <line x1="8" y1="3" x2="8" y2="15" stroke="#0a240c" strokeWidth="1.8" />
                </svg>
              </motion.div>
            </Link>
          </Magnetic>
        </div>

        {/* Right Corner: Minimal Studio Worldwide Availability Badge */}
        <motion.div
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-36 sm:w-48 flex justify-end items-center flex-shrink-0"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-zinc-400 font-mono-code text-[11px] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Worldwide</span>
            <span className="sm:hidden">Live</span>
          </div>
        </motion.div>
      </motion.div>

      {/* 4. Monumental Headline: Primary (Lausanne) + Secondary (Manier) Typography */}
      <div
        ref={headlineRef}
        style={{ transformStyle: "preserve-3d" }}
        className="relative z-10 max-w-5xl mx-auto w-full my-auto py-10 sm:py-14 will-change-transform"
      >
        {/* Subtle Viewfinder Framing Marks */}
        <div className="absolute top-2 left-0 w-3 h-3 border-t border-l border-white/20 hidden sm:block pointer-events-none" />
        <div className="absolute top-2 right-0 w-3 h-3 border-t border-r border-white/20 hidden sm:block pointer-events-none" />
        <div className="absolute bottom-2 left-0 w-3 h-3 border-b border-l border-white/20 hidden sm:block pointer-events-none" />
        <div className="absolute bottom-2 right-0 w-3 h-3 border-b border-r border-white/20 hidden sm:block pointer-events-none" />

        <div className="flex flex-col text-white tracking-[-0.035em] leading-[1.02]">
          {/* Line 1: Primary Font - Lausanne (Grotesque Sans-Serif) */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "115%", opacity: 0, rotateX: 18 }}
              animate={{ y: "0%", opacity: 1, rotateX: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              className="font-primary text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] font-normal text-white"
            >
              <span>From Neural Concept</span>
            </motion.div>
          </div>

          {/* Line 2: Secondary Font - Manier (High-Contrast Slanted Italic Serif) */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "115%", opacity: 0, rotateX: 18 }}
              animate={{ y: "0%", opacity: 1, rotateX: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              className="font-secondary text-[2.9rem] sm:text-6xl md:text-7xl lg:text-[5.9rem] xl:text-[6.6rem] font-normal text-white pl-8 sm:pl-28 md:pl-44 lg:pl-56 xl:pl-64 py-0.5 sm:py-1"
            >
              <span className="bg-gradient-to-r from-white via-zinc-100 to-lime-200 bg-clip-text">
                to Master Cinema
              </span>
            </motion.div>
          </div>

          {/* Line 3: Primary Font - Lausanne (Grotesque Sans-Serif, Aligned to Line 1) */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "115%", opacity: 0, rotateX: 18 }}
              animate={{ y: "0%", opacity: 1, rotateX: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
              className="font-primary text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] font-normal text-white"
            >
              <span>elevating media to the</span>
            </motion.div>
          </div>

          {/* Line 4: Secondary Font - Manier (Italic Serif) + [ Commission shoot ] Pill Button */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "115%", opacity: 0, rotateX: 18 }}
              animate={{ y: "0%", opacity: 1, rotateX: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="flex flex-wrap items-baseline sm:items-center gap-3 sm:gap-6 md:gap-8 pl-8 sm:pl-28 md:pl-44 lg:pl-56 xl:pl-64 pt-0.5 sm:pt-1"
            >
              <span className="font-secondary text-[2.9rem] sm:text-6xl md:text-7xl lg:text-[5.9rem] xl:text-[6.6rem] font-normal text-white drop-shadow-[0_0_35px_rgba(163,230,53,0.22)]">
                remarkable
              </span>

              {/* Exact [ Commission shoot ] Pill Button with Animated Breathing Aura */}
              <Magnetic strength={0.45}>
                <div className="relative group">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-lime-400/30 via-emerald-400/20 to-lime-400/30 opacity-0 group-hover:opacity-100 blur-md transition duration-500" />
                  <motion.button
                    whileHover={{
                      scale: 1.07,
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
                    className="relative font-primary inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-white/70 bg-black/25 text-white text-xs sm:text-sm font-normal backdrop-blur-sm cursor-pointer shadow-lg"
                  >
                    <span>Commission shoot</span>
                  </motion.button>
                </div>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 5. Page Subtitle Texts & Scroll Down Cue */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 text-[12px] leading-snug text-white/70 font-primary items-end">
          {/* Left Text (aligned above Work column) */}
          <div className="col-span-1 hidden md:block">
            <p>Virtual production, cinema &amp; neural art,</p>
            <p>directed by masters you actually talk to</p>
          </div>

          {/* Spacer column */}
          <div className="hidden md:block col-span-1" />

          {/* Center Column: Animated Scroll Cue */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center pb-1">
            <button
              onClick={() => {
                const el = document.getElementById("about") || document.getElementById("services");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex flex-col items-center gap-2 cursor-pointer text-zinc-500 hover:text-white transition-colors"
            >
              <span className="font-mono-code text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-lime-400 transition-colors">
                Explore
              </span>
              <div className="w-[1px] h-7 bg-white/15 relative overflow-hidden">
                <motion.div
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-1/2 bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.8)]"
                />
              </div>
            </button>
          </div>

          {/* Right Text (aligned above About column) */}
          <div className="col-span-1 hidden sm:block">
            <p>For studios &amp; brands who need it</p>
            <p>mastered, not workshopped</p>
          </div>

          {/* Far Right spacer */}
          <div className="hidden md:block col-span-1" />
        </div>
      </motion.div>
    </section>
  );
}
