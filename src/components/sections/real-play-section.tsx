"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

interface RealPlaySectionProps {
  onOpenShowreel?: () => void;
}

export function RealPlaySection({ onOpenShowreel }: RealPlaySectionProps = {}) {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const marqueeItems = Array.from({ length: 6 });

  // Scroll tracking for the zoom-in expansion animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center start"],
  });

  // Smooth physics spring for silky, organic scale
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.6,
  });

  // Scale from compact (0.45) up to full-screen 100% (1.0)
  const scale = useTransform(smoothProgress, [0.05, 0.65], [0.45, 1.0]);

  // Border radius morphs from large rounded card into full viewport
  const borderRadius = useTransform(smoothProgress, [0.05, 0.65], ["44px", "0px"]);

  // Opacity fade in as it zooms forward
  const opacity = useTransform(smoothProgress, [0.0, 0.3], [0.35, 1.0]);

  // Toggle audio and playback state
  const togglePlayState = () => {
    const v = videoRef.current;
    if (!v) return;

    if (!isPlayingSound) {
      v.muted = false;
      v.play().catch(() => { });
      setIsPlayingSound(true);
    } else {
      v.muted = true;
      setIsPlayingSound(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[190vh] bg-[#0c0c0e] select-none"
    >
      {/* Sticky Full-Viewport Stage (Covers entire 100vh height) */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Animated Zooming Card Container (Zooms smoothly from compact to 100% full screen) */}
        <motion.div
          style={{
            scale,
            borderRadius,
            opacity,
          }}
          className="relative w-full h-full  border border-[#385633]/60 overflow-hidden flex flex-col justify-between py-12 sm:py-16 shadow-[0_28px_90px_rgba(0,0,0,0.85)] will-change-transform"
        >
          {/* Continuous Autoplaying Background Video (Muted by default) */}
          <video
            ref={videoRef}
            src="/video/real-reel.webm.webm"
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-700 pointer-events-none ${isPlayingSound
              ? "opacity-95 scale-[1.02]"
              : "opacity-45 mix-blend-luminosity scale-100"
              }`}
          />

          {/* Ambient Dark Olive Tint Overlay */}
          <div
            className={`absolute inset-0 z-[1] transition-opacity duration-700 pointer-events-none ${isPlayingSound ? "bg-black/30" : ""
              }`}
          />

          {/* Background Constellation Pattern of Diamond Dots */}
          <div
            className="absolute inset-0 z-[2] pointer-events-none opacity-30"
          />

          {/* Interactive Live Multiplayer Review Card on Right */}
          <div className="absolute right-4 sm:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-10 hidden md:block max-w-[340px] lg:max-w-[420px] w-full pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: 40, rotateY: -10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl bg-[#e5e5ea]/95 text-zinc-900 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md border border-white/40"
            >
              {/* Header with Avatar Stack */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-200/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-zinc-700 font-primary">
                    In team review
                  </span>
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <div className="inline-block h-5 w-5 rounded-full ring-1 ring-white bg-zinc-800 text-[9px] text-white flex items-center justify-center font-bold">
                      N
                    </div>
                    <div className="inline-block h-5 w-5 rounded-full ring-1 ring-white bg-purple-700 text-[9px] text-white flex items-center justify-center font-bold">
                      J
                    </div>
                    <div className="inline-block h-5 w-5 rounded-full ring-1 ring-white bg-lime-600 text-[9px] text-white flex items-center justify-center font-bold">
                      E
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono-code text-zinc-500">Studio Telemetry // Cut 04</span>
              </div>

              {/* Review Progress Widget */}
              <div className="bg-white/90 rounded-xl p-3.5 shadow-sm border border-zinc-200/60 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-800 font-primary">
                    Production Progress
                  </span>
                  <span className="text-[11px] font-mono-code text-zinc-500 font-medium">
                    84% master conform
                  </span>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-purple-600 h-1.5 rounded-full w-[84%]" />
                </div>
              </div>

              {/* Mini Table Rows */}
              <div className="space-y-1.5 text-[10px] font-primary">
                <div className="grid grid-cols-3 text-[#8a8a8a] font-medium pb-1">
                  <span>Pipeline</span>
                  <span>Directorate</span>
                  <span className="text-right">Status</span>
                </div>
                <div className="grid grid-cols-3 text-zinc-700 py-1 border-t border-zinc-100">
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Virtual LED
                  </span>
                  <span>Director</span>
                  <span className="text-right text-emerald-600 font-medium">Approved</span>
                </div>
                <div className="grid grid-cols-3 text-zinc-700 py-1 border-t border-zinc-100">
                  <span className="font-semibold text-purple-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Neural VFX
                  </span>
                  <span>Lead Artist</span>
                  <span className="text-right text-amber-600 font-medium">In Sync</span>
                </div>
                <div className="grid grid-cols-3 text-zinc-700 py-1 border-t border-zinc-100">
                  <span className="font-semibold text-blue-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Fashion
                  </span>
                  <span>Photographer</span>
                  <span className="text-right text-emerald-600 font-medium">100MP Conformed</span>
                </div>
              </div>

              {/* Floating Live Collaborator Cursor 1: Norman */}
              <motion.div
                animate={{
                  x: [0, 18, -8, 0],
                  y: [0, -14, 6, 0],
                }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute -top-7 left-12 flex items-start gap-1 z-20 pointer-events-none"
              >
                <svg className="w-4 h-4 text-[#4a7c59] drop-shadow-md" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M0 0l5.5 14 2.5-5.5L14 6 0 0z" />
                </svg>
                <span className="px-2.5 py-0.5 rounded-full bg-[#2a4d3a] text-[#a8f542] text-[11px] font-medium font-primary shadow-md">
                  Norman
                </span>
              </motion.div>

              {/* Floating Live Collaborator Cursor 2: Jennifer */}
              <motion.div
                animate={{
                  x: [0, -16, 10, 0],
                  y: [0, 12, -8, 0],
                }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 right-14 flex items-start gap-1 z-20 pointer-events-none"
              >
                <svg className="w-4 h-4 text-purple-600 drop-shadow-md" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M0 0l5.5 14 2.5-5.5L14 6 0 0z" />
                </svg>
                <span className="px-2.5 py-0.5 rounded-full bg-[#3b2d54] text-[#d8b4fe] text-[11px] font-medium font-primary shadow-md">
                  Jennifer
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Monumental Kinetic Marquee Typography: "Real Play Real Play Real Play" */}
          <div className="relative z-10 w-full overflow-hidden my-auto py-6">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
              className="flex items-center gap-10 whitespace-nowrap will-change-transform"
            >
              {marqueeItems.map((_, i) => (
                <div key={i} className="flex items-center gap-10">
                  <span className="font-primary text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] font-normal tracking-[-0.035em] text-white">
                    Real
                  </span>
                  <span className="font-secondary text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] font-normal text-white">
                    Play
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Center Toggle Button: Clean Play / Pause without video controllers */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <Magnetic strength={0.45}>
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
                onClick={togglePlayState}
                className={`group relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center cursor-pointer shadow-[0_18px_60px_rgba(0,0,0,0.6)] transition-all duration-300 ${isPlayingSound
                  ? "bg-black/80 text-white border border-white/30 backdrop-blur-md hover:bg-black/90 hover:border-[#a8f542]"
                  : "bg-white text-black hover:shadow-[0_24px_80px_rgba(168,245,66,0.4)]"
                  }`}
                title={isPlayingSound ? "Pause Video / Mute" : "Play Video with Sound"}
                aria-label={isPlayingSound ? "Pause" : "Play"}
              >
                {/* Outer Ripple Ring on Hover */}
                <span className="absolute inset-0 rounded-full border border-white/60 group-hover:scale-125 group-hover:opacity-0 transition-all duration-700" />

                {/* Dynamic Icon: Play or Pause */}
                {isPlayingSound ? (
                  <Pause className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 fill-white stroke-none group-hover:scale-110 transition-transform" />
                ) : (
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 fill-black stroke-none translate-x-1 group-hover:scale-110 transition-transform" />
                )}
              </motion.button>
            </Magnetic>
          </div>

          {/* Bottom Bar Info */}
          <div className="relative z-10 w-full px-8 sm:px-14 flex items-end justify-between text-xs text-white/80 font-primary">

            <button
              onClick={togglePlayState}
              className="flex items-center gap-1.5 font-medium text-white hover:text-[#a8f542] transition-colors cursor-pointer"
            >
              <span>{isPlayingSound ? "Mute Background Reel" : "Play Reel With Sound"}</span>
              <span className="text-[#a8f542]">↗</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
