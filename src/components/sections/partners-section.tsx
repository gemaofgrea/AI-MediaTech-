"use client";

import React from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";

interface PartnerItem {
  id: string;
  name: string;
  renderLogo: () => React.ReactNode;
}

export function PartnersSection() {
  const row1: PartnerItem[] = [
    {
      id: "p-nvidia",
      name: "NVIDIA",
      renderLogo: () => (
        <div className="flex items-center gap-2.5">
          <svg className="w-6 h-6 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.9 7.4c-2.3 0-4.2 1.9-4.2 4.3 0 2.4 1.9 4.3 4.2 4.3 1.5 0 2.8-.8 3.5-2-.5 0-1.1-.1-1.6-.3-.6.7-1.4 1.1-2.3 1.1-1.7 0-3.1-1.4-3.1-3.1 0-1.7 1.4-3.1 3.1-3.1 1.2 0 2.2.7 2.7 1.7.5-.2 1.1-.3 1.6-.3-.9-1.6-2.5-2.6-4.9-2.6zm6.8 4.3c0-2.8-2.3-5-5.1-5-1.9 0-3.5 1-4.4 2.5.6.3 1.1.7 1.5 1.2.6-.9 1.7-1.5 2.9-1.5 2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6c-1.3 0-2.4-.7-3-1.7-.5.4-1 .9-1.4 1.3 1.1 1.7 3 2.7 5.1 2.7 3.5 0 6.3-2.8 6.3-6.3l.1-.4zm2.8 0c0-4.3-3.5-7.8-7.8-7.8-3.1 0-5.8 1.8-7 4.5.5.3 1 .7 1.4 1.1 1-2 3-3.4 5.3-3.4 3.3 0 6 2.7 6 6s-2.7 6-6 6c-2.3 0-4.3-1.4-5.3-3.4-.4.4-.9.8-1.4 1.1 1.2 2.7 3.9 4.5 7 4.5 4.3 0 7.8-3.5 7.8-7.8z" />
          </svg>
          <span className="font-primary text-lg sm:text-xl font-black tracking-tight text-white uppercase">
            NVIDIA
          </span>
        </div>
      ),
    },
    {
      id: "p-runway",
      name: "Runway",
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M4 19L9 5M15 19L20 5M9 12h6" strokeLinecap="round" />
          </svg>
          <span className="font-primary text-xl sm:text-2xl font-bold tracking-tight text-white lowercase">
            runway
          </span>
        </div>
      ),
    },
    {
      id: "p-unreal-engine",
      name: "Unreal Engine",
      renderLogo: () => (
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center font-black text-sm tracking-tighter text-white flex-shrink-0">
            U
          </div>
          <div className="font-primary text-[10px] sm:text-xs font-bold leading-tight uppercase tracking-[0.18em] text-white text-left">
            <span>UNREAL</span>
            <br />
            <span className="text-zinc-400">ENGINE</span>
          </div>
        </div>
      ),
    },
    {
      id: "p-blackmagic",
      name: "Blackmagic Design",
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <div className="flex items-center -space-x-1 flex-shrink-0">
            <span className="w-2.5 h-2.5 bg-white rotate-45 inline-block" />
            <span className="w-2.5 h-2.5 bg-zinc-400 rotate-45 inline-block" />
            <span className="w-2.5 h-2.5 bg-white rotate-45 inline-block" />
          </div>
          <div className="font-primary text-xs sm:text-sm font-bold tracking-tight text-white leading-tight text-left">
            <span>Blackmagic</span>
            <span className="text-zinc-400 font-light block">design</span>
          </div>
        </div>
      ),
    },
    {
      id: "p-midjourney",
      name: "Midjourney",
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 17l9 4 9-4M3 12l9 4 9-4M12 3v13" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-primary text-base sm:text-lg font-semibold tracking-wide text-white">
            Midjourney
          </span>
        </div>
      ),
    },
  ];

  const row2: PartnerItem[] = [
    {
      id: "p-arri",
      name: "ARRI",
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
          <span className="font-mono-code text-xl sm:text-2xl font-black tracking-[0.16em] text-white">
            ARRI
          </span>
        </div>
      ),
    },
    {
      id: "p-red-cinema",
      name: "RED Digital Cinema",
      renderLogo: () => (
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="font-primary text-xl sm:text-2xl font-black tracking-tight text-white">
              RED
            </span>
          </div>
          <span className="font-mono-code text-[8px] sm:text-[9px] tracking-[0.25em] text-zinc-400 uppercase mt-0.5">
            DIGITAL CINEMA
          </span>
        </div>
      ),
    },
    {
      id: "p-sony-cinealta",
      name: "Sony CineAlta",
      renderLogo: () => (
        <div className="flex flex-col items-center">
          <span className="font-serif font-bold text-base sm:text-lg tracking-[0.2em] text-white">
            SONY
          </span>
          <span className="font-secondary italic text-xs sm:text-[13px] tracking-wide text-zinc-300">
            CineAlta
          </span>
        </div>
      ),
    },
    {
      id: "p-dolby",
      name: "Dolby Vision",
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <div className="flex items-center text-white font-black text-xl leading-none flex-shrink-0">
            <span className="scale-x-[-1] inline-block">D</span>
            <span>D</span>
          </div>
          <div className="font-primary leading-tight text-left">
            <span className="block font-bold text-xs sm:text-sm tracking-wider text-white">
              DOLBY
            </span>
            <span className="block font-mono-code text-[8px] tracking-[0.2em] text-zinc-400 uppercase">
              VISION
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "p-elevenlabs",
      name: "ElevenLabs",
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="w-1 h-5 bg-white rounded-full" />
            <span className="w-1 h-5 bg-white rounded-full" />
          </div>
          <span className="font-primary text-lg sm:text-xl font-bold tracking-tight text-white">
            ElevenLabs
          </span>
        </div>
      ),
    },
  ];

  const row3: PartnerItem[] = [
    {
      id: "p-stability-ai",
      name: "Stability AI",
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <div className="grid grid-cols-2 gap-1 w-4 h-4 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <span className="font-primary text-base sm:text-lg font-bold tracking-tight text-white lowercase">
            stability.ai
          </span>
        </div>
      ),
    },
    {
      id: "p-adobe-firefly",
      name: "Adobe Firefly",
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.5 3H22v18h-4.3l-2.6-6.6h-2.2l2.9 6.6H9.7l3.8-9.4c.5-1.3 1-2.6 1-3.6 0-1.8-.7-3-2.1-3-.9 0-1.6.5-2.2 1.3L4.7 13.9 2 21h-.9V3h7.5l4.3 10.8L14.5 3z" />
          </svg>
          <div className="font-primary leading-tight text-left">
            <span className="block font-bold text-xs sm:text-sm tracking-tight text-white">
              Adobe
            </span>
            <span className="block font-mono-code text-[9px] tracking-widest text-zinc-300 uppercase">
              FIREFLY
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "p-panavision",
      name: "Panavision",
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center flex-shrink-0">
            <div className="w-2.5 h-2.5 border border-white/60 rounded-full" />
          </div>
          <span className="font-mono-code text-xs sm:text-sm font-semibold tracking-[0.2em] text-white uppercase">
            PANAVISION
          </span>
        </div>
      ),
    },
    {
      id: "p-sora",
      name: "Sora • OpenAI",
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" strokeDasharray="4 2" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
          <div className="font-primary leading-tight text-left">
            <span className="block font-black text-xs sm:text-sm tracking-[0.14em] text-white">
              SORA
            </span>
            <span className="block font-mono-code text-[8px] tracking-[0.2em] text-zinc-400 uppercase">
              OPENAI
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "p-huggingface",
      name: "Hugging Face",
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl flex-shrink-0">🤗</span>
          <span className="font-primary text-sm sm:text-base font-bold tracking-tight text-white">
            Hugging Face
          </span>
        </div>
      ),
    },
  ];

  return (
    <section
      id="partners"
      className="relative w-full bg-[#0c0c0e] text-white py-24 sm:py-32 lg:py-36 px-6 sm:px-12 md:px-16 lg:px-24 select-none overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Centered Headline with Smooth Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-14 will-change-transform"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-normal tracking-[-0.03em] leading-[1.06]">
            <span className="font-primary text-white">Valuable</span>
            <br />
            <span className="font-secondary italic font-light text-white">Partners</span>
          </h2>
        </motion.div>

        {/* Subtitle Row Aligned Above Columns 4 & 5 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-5 mb-5 sm:mb-6"
        >
          <div className="hidden lg:block lg:col-span-3" />
          <div className="lg:col-span-2 text-left px-2 sm:px-6">
            <p className="font-primary text-xs sm:text-[13px] text-[#8a8a8a] leading-snug max-w-[320px]">
              Powering global productions with premier camera guilds, AI research labs, and major entertainment studios.
            </p>
          </div>
        </motion.div>

        {/* 5-Column Grid with Precise Hairline Dividers */}
        <div className="w-full border-t border-white/[0.12]">
          {/* ROW 1: AI & Virtual Production Compute */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b border-white/[0.12]"
          >
            {row1.map((item, idx) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className={`h-32 sm:h-36 md:h-40 flex items-center justify-center p-6 hover:bg-white/[0.03] transition-colors duration-300 cursor-pointer ${
                  idx < 4 ? "border-r border-white/[0.12]" : ""
                }`}
              >
                <div className="opacity-80 hover:opacity-100 transition-opacity duration-300">
                  {item.renderLogo()}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ROW 2: Optics, Cinema Capture & Acoustics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b border-white/[0.12]"
          >
            {row2.map((item, idx) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className={`h-32 sm:h-36 md:h-40 flex items-center justify-center p-6 hover:bg-white/[0.03] transition-colors duration-300 cursor-pointer ${
                  idx < 4 ? "border-r border-white/[0.12]" : ""
                }`}
              >
                <div className="opacity-80 hover:opacity-100 transition-opacity duration-300">
                  {item.renderLogo()}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ROW 3: Generative Creative Tech & Studio Pipelines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b border-white/[0.12]"
          >
            {row3.map((item, idx) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className={`h-32 sm:h-36 md:h-40 flex items-center justify-center p-6 hover:bg-white/[0.03] transition-colors duration-300 cursor-pointer ${
                  idx < 4 ? "border-r border-white/[0.12]" : ""
                }`}
              >
                <div className="opacity-80 hover:opacity-100 transition-opacity duration-300">
                  {item.renderLogo()}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ROW 4: Studio Distribution & Prospective Partner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          >
            {/* Col 1: A24 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="h-32 sm:h-36 md:h-40 flex items-center justify-center p-6 border-r border-white/[0.12] hover:bg-white/[0.03] transition-colors duration-300 cursor-pointer"
            >
              <div className="opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="font-primary text-2xl sm:text-3xl font-black tracking-tighter text-white">
                  A24
                </span>
              </div>
            </motion.div>

            {/* Col 2: IMAX Filmmaker Program */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="h-32 sm:h-36 md:h-40 flex items-center justify-center p-6 border-r border-white/[0.12] hover:bg-white/[0.03] transition-colors duration-300 cursor-pointer"
            >
              <div className="opacity-80 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center">
                <span className="font-primary text-xl sm:text-2xl font-black tracking-[0.25em] text-white">
                  IMAX
                </span>
                <span className="font-mono-code text-[8px] tracking-[0.2em] text-zinc-400 uppercase mt-0.5">
                  FILMMAKER PROGRAM
                </span>
              </div>
            </motion.div>

            {/* Col 3: "Your company ✦" Pill Badge */}
            <div className="h-32 sm:h-36 md:h-40 flex items-center justify-center p-6 hover:bg-white/[0.03] transition-colors duration-300 cursor-pointer">
              <Magnetic strength={0.3}>
                <a
                  href="#contact"
                  className="font-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/25 bg-white/[0.04] hover:bg-white/10 hover:border-white text-white text-xs sm:text-[13px] font-medium transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <span>Your company</span>
                  <span className="text-white text-xs">✦</span>
                </a>
              </Magnetic>
            </div>

            {/* Col 4 & 5: Empty space matching screenshot */}
            <div className="hidden lg:block h-32 sm:h-36 md:h-40" />
            <div className="hidden lg:block h-32 sm:h-36 md:h-40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
