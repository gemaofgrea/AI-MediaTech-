"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function KineticStatementSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth out scroll with spring physics for luxurious momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Parallax horizontal shifts driven by vertical scrolling
  // Line 1: glides left-to-right as you scroll down
  const xLine1 = useTransform(smoothProgress, [0, 1], [-120, 120]);
  // Line 2: opposing or complementary glide
  const xLine2 = useTransform(smoothProgress, [0, 1], [80, -100]);
  // Line 3: glides left-to-right
  const xLine3 = useTransform(smoothProgress, [0, 1], [-160, 140]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0c0c0e] text-white py-24 sm:py-36 md:py-48 lg:py-56 overflow-hidden select-none flex flex-col justify-center"
      aria-label="Manifesto Statement"
    >
      {/* Background ambient lighting with subtle breathing animation */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.12, 0.25, 0.12] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#8ee034]/15 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.18, 0.08] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-white/8 rounded-full blur-[140px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0 }}
        className="w-full flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
      >
        {/* ==============================================================
            LINE 1: "Design to scale" + Sunburst + Sparkle Diamond
            ============================================================== */}
        <motion.div
          style={{ x: xLine1 }}
          className="flex items-center whitespace-nowrap will-change-transform pl-4 sm:pl-10"
        >
          {/* Main Text in Lausanne */}
          <span className="font-primary text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9.25rem] 2xl:text-[10.5rem] font-normal leading-[1.02] tracking-[-0.035em] text-white">
            Create to scale
          </span>

          {/* Glyph 1: Dense 24-spoke Sunburst Cogwheel (Matching screenshot) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="inline-flex items-center justify-center align-middle mx-3 sm:mx-6 md:mx-8 lg:mx-10"
          >
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 text-white flex-shrink-0"
              viewBox="0 0 40 40"
              fill="none"
            >
              <circle cx="20" cy="20" r="7.5" stroke="currentColor" strokeWidth="2.5" />
              {[...Array(24)].map((_, i) => (
                <line
                  key={i}
                  x1="20"
                  y1="2.5"
                  x2="20"
                  y2="7.5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  transform={`rotate(${i * 15} 20 20)`}
                />
              ))}
            </svg>
          </motion.div>

          {/* Glyph 2: Sharp 4-point Sparkle Diamond (Matching screenshot) */}
          <motion.div
            whileHover={{ scale: 1.25, rotate: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center justify-center align-middle mx-2 sm:mx-4 md:mx-6 cursor-pointer"
          >
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 text-[#a1a1aa] flex-shrink-0"
              viewBox="0 0 40 40"
              fill="currentColor"
            >
              <path d="M20 2 C20 12, 12 20, 2 20 C12 20, 20 28, 20 38 C20 28, 28 20, 38 20 C28 20, 20 12, 20 2 Z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* ==============================================================
            LINE 2: Arrowhead Wedge + "& drive experiences" in Manier Italic
            ============================================================== */}
        <motion.div
          style={{ x: xLine2 }}
          className="flex items-center whitespace-nowrap will-change-transform pl-8 sm:pl-20 md:pl-28"
        >
          {/* Glyph 0: Far-left Arrowhead / Wedge */}
          <div className="inline-flex items-center justify-center align-middle mr-3 sm:mr-6 md:mr-8 opacity-60">
            <svg
              className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-20 lg:h-20 text-[#71717a] flex-shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 3L18 12L4 21V3Z" />
            </svg>
          </div>

          {/* Small Ampersand */}
          <span className="font-primary text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-light text-white mr-3 sm:mr-6 align-middle">
            &amp;
          </span>

          {/* Main Text in Manier Slanted Italic Serif (Matching screenshot) */}
          <span className="font-secondary italic font-light text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9.25rem] 2xl:text-[10.5rem] leading-[1.02] text-white">
            ignite screens
          </span>
        </motion.div>

        {/* ==============================================================
            LINE 3: Compass Star + "with data" + Sphere + Clover + Checkerboard + Asterisk
            ============================================================== */}
        <motion.div
          style={{ x: xLine3 }}
          className="flex items-center whitespace-nowrap will-change-transform pl-4 sm:pl-12 md:pl-16"
        >
          {/* Glyph 0: Far-left Chevron Fragment */}
          <div className="inline-flex items-center justify-center align-middle mr-2 sm:mr-4 opacity-50">
            <svg
              className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-[#52525b] flex-shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14 2L4 12L14 22H6L0 12L6 2H14Z" />
            </svg>
          </div>

          {/* Glyph 1: 8-Point Compass Star / Emblem */}
          <motion.div
            whileHover={{ rotate: 45, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center justify-center align-middle mr-3 sm:mr-6 md:mr-8 cursor-pointer"
          >
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-26 lg:h-26 text-white flex-shrink-0"
              viewBox="0 0 36 36"
              fill="currentColor"
            >
              <path d="M18 2L21.5 11L30.5 11L23.5 17L27 26L18 20.5L9 26L12.5 17L5.5 11L14.5 11Z" />
              <rect x="15.5" y="15.5" width="5" height="5" fill="#0c0c0e" />
            </svg>
          </motion.div>

          {/* Main Text in Lausanne */}
          <span className="font-primary text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9.25rem] 2xl:text-[10.5rem] font-normal leading-[1.02] tracking-[-0.035em] text-white">
            with neural cinema
          </span>

          {/* Glyph 2: Wireframe Globe with Center Dot */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
            className="inline-flex items-center justify-center align-middle mx-3 sm:mx-6 md:mx-8 lg:mx-10"
          >
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-26 lg:h-26 text-[#71717a] flex-shrink-0"
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="20" cy="20" r="17" strokeWidth="2.2" />
              <ellipse cx="20" cy="20" rx="8" ry="17" strokeWidth="2.2" />
              <line x1="20" y1="3" x2="20" y2="37" strokeWidth="2" />
              <circle cx="20" cy="20" r="2.8" fill="currentColor" stroke="none" />
            </svg>
          </motion.div>

          {/* Glyph 3: 4-Leaf Clover / Propeller */}
          <motion.div
            whileHover={{ scale: 1.2, rotate: 90 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="inline-flex items-center justify-center align-middle mx-3 sm:mx-6 md:mx-8 cursor-pointer"
          >
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-26 lg:h-26 text-[#a1a1aa] flex-shrink-0"
              viewBox="0 0 40 40"
              fill="currentColor"
            >
              <circle cx="20" cy="11" r="7.2" />
              <circle cx="20" cy="29" r="7.2" />
              <circle cx="11" cy="20" r="7.2" />
              <circle cx="29" cy="20" r="7.2" />
              <circle cx="20" cy="20" r="3.5" fill="#0c0c0e" />
            </svg>
          </motion.div>

          {/* Glyph 4: 3x3 Checkerboard Square */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="inline-flex items-center justify-center align-middle mx-3 sm:mx-6 md:mx-8 cursor-pointer"
          >
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-26 lg:h-26 flex-shrink-0 drop-shadow-md"
              viewBox="0 0 36 36"
            >
              <rect width="36" height="36" fill="#18181b" rx="4" />
              <rect x="0" y="0" width="12" height="12" fill="white" />
              <rect x="24" y="0" width="12" height="12" fill="white" />
              <rect x="12" y="12" width="12" height="12" fill="white" />
              <rect x="0" y="24" width="12" height="12" fill="white" />
              <rect x="24" y="24" width="12" height="12" fill="white" />
            </svg>
          </motion.div>

          {/* Glyph 5: 8-Point Asterism Flower */}
          <motion.div
            whileHover={{ rotate: 45, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="inline-flex items-center justify-center align-middle ml-3 sm:ml-6 md:ml-8 cursor-pointer"
          >
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-26 lg:h-26 text-[#8e8e93] flex-shrink-0"
              viewBox="0 0 40 40"
              fill="currentColor"
            >
              {[0, 45, 90, 135].map((deg) => (
                <rect
                  key={deg}
                  x="17"
                  y="3"
                  width="6"
                  height="34"
                  rx="3"
                  transform={`rotate(${deg} 20 20)`}
                />
              ))}
              <circle cx="20" cy="20" r="5" fill="#8e8e93" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

