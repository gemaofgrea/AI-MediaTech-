"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles } from "lucide-react";

export function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll progress through this specific manifesto section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  // Calculate position for the right-side vertical ruler arrow ◄ with spring smoothing
  const rawRulerProgress = useTransform(scrollYProgress, [0, 1], ["0%", "88%"]);
  const rulerProgress = useSpring(rawRulerProgress, {
    stiffness: 90,
    damping: 22,
  });

  // Opacities for progressive text illumination on scroll
  const opacity1 = useTransform(scrollYProgress, [0, 0.25], [0.35, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.45], [0.35, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.65], [0.35, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.6, 0.85], [0.35, 1]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-[90vh] w-full bg-[#0c0c0e] text-white flex flex-col justify-center py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden select-none scroll-mt-10"
    >
      <div id="roster" className="absolute -top-24 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto w-full relative will-change-transform"
      >
        {/* Main Monumental Manifesto Text */}
        <div className="font-primary text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-normal leading-[1.38] tracking-[-0.025em]">
          <motion.span style={{ opacity: opacity1 }} className="transition-colors duration-150">
            With a holistic approach that balances aesthetics{" "}
            <motion.span
              whileHover={{ rotate: 90, scale: 1.15 }}
              className="inline-flex items-center justify-center align-middle mx-2 cursor-pointer"
            >
              <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
                <rect x="12" y="1.5" width="14.8" height="14.8" rx="3.5" transform="rotate(45 12 1.5)" fill="#a8f542" />
              </svg>
            </motion.span>
            with narrative cinema, we craft visual{" "}
            <span className="underline underline-offset-[10px] decoration-1 decoration-white/40 hover:decoration-[#a8f542] hover:text-[#a8f542] transition-colors cursor-pointer">
              productions
            </span>{" "}
            that deliver breathtaking sensory experiences.{" "}
          </motion.span>

          <motion.span style={{ opacity: opacity2 }} className="transition-colors duration-150">
            Specialising in turning visionary concepts into cinematic{" "}
            <span className="underline underline-offset-[10px] decoration-1 decoration-white/40 hover:decoration-[#a8f542] hover:text-[#a8f542] transition-colors cursor-pointer">
              reality,
            </span>{" "}
            <motion.span
              whileHover={{ rotate: 45, scale: 1.2 }}
              className="inline-flex items-center justify-center align-middle mx-2 cursor-pointer"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
                <rect x="12" y="2" width="6.5" height="6.5" rx="1.5" transform="rotate(45 12 2)" fill="#a8f542" />
                <rect x="12" y="13" width="6.5" height="6.5" rx="1.5" transform="rotate(45 12 13)" fill="#a8f542" />
                <rect x="6.5" y="7.5" width="6.5" height="6.5" rx="1.5" transform="rotate(45 6.5 7.5)" fill="#a8f542" />
                <rect x="17.5" y="7.5" width="6.5" height="6.5" rx="1.5" transform="rotate(45 17.5 7.5)" fill="#a8f542" />
              </svg>
            </motion.span>
            we offer a guild of master artists and AI pipelines that breathe life into your creative vision.{" "}
          </motion.span>

          <motion.span style={{ opacity: opacity3 }} className="transition-colors duration-150">
            Through real-time virtual sets, photorealistic neural models, and meticulous post-processing{" "}
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="inline-flex items-center justify-center align-middle mx-1.5 cursor-pointer text-zinc-300"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3.2" />
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <line
                    key={deg}
                    x1="12"
                    y1="2"
                    x2="12"
                    y2="5.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    transform={`rotate(${deg} 12 12)`}
                  />
                ))}
              </svg>
            </motion.span>
            , we ensure every frame resonates deeply,{" "}
          </motion.span>

          <motion.span style={{ opacity: opacity4 }} className="transition-colors duration-150">
            amplifying brand authority and aesthetic prestige with every release.
          </motion.span>
        </div>

        {/* Right-Side Vertical Ruler Track (Exact dash column + ◄ pointer from screenshot) */}
        <div className="absolute -right-4 sm:-right-8 lg:-right-12 top-2 bottom-2 w-6 hidden md:flex flex-col justify-between items-center pointer-events-none select-none">
          {/* Tick column */}
          <div className="relative h-full flex flex-col justify-between items-center text-[10px] text-zinc-700 font-mono">
            {Array.from({ length: 24 }).map((_, idx) => (
              <span key={idx} className="block leading-none">
                -
              </span>
            ))}

            {/* Dynamic Arrow Pointer ◄ tracking scroll */}
            <motion.div
              style={{ top: rulerProgress }}
              className="absolute -left-3 text-[#a8f542] text-xs font-bold leading-none"
            >
              ◄
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
