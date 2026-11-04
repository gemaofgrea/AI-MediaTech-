"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronUp } from "lucide-react";
import { GreenRibbedCurtain } from "@/components/canvas/green-ribbed-curtain";
import { Magnetic } from "@/components/ui/magnetic";

interface SocialChannel {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
}

const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M7 10v7" strokeWidth="2" strokeLinecap="round" />
        <circle cx="7" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
        <path d="M11 17v-4.2c0-1.6 1.1-2.6 2.6-2.6 1.5 0 2.4 1 2.4 2.6V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="11" y1="10" x2="11" y2="17" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "x",
    name: "X",
    url: "https://x.com",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: "vimeo",
    name: "Vimeo",
    url: "https://vimeo.com",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.525 3.01 7.525c-.179 0-.806.378-1.881 1.131L0 7.241c1.168-1.026 2.474-2.054 3.921-3.08 1.956-1.37 3.416-2.112 4.38-2.227 2.302-.224 3.729 1.328 4.28 4.657.587 3.587 1.009 5.82 1.268 6.699.78 2.646 1.636 3.971 2.569 3.971.728 0 1.614-.847 2.656-2.54 1.042-1.693 1.597-2.977 1.666-3.854.14-1.442-.407-2.164-1.642-2.164-.593 0-1.205.137-1.839.412 1.23-4.043 3.57-6.002 7.021-5.875 2.553.09 3.755 1.503 3.606 4.238z" />
      </svg>
    ),
  },
];

export function ContactFooterSection({ onOpenInquiry }: { onOpenInquiry?: () => void } = {}) {
  // LinkedIn is active/illuminated by default matching screenshot
  const [hoveredChannel, setHoveredChannel] = useState<string | null>("linkedin");

  const scrollToContact = () => {
    if (onOpenInquiry) {
      onOpenInquiry();
      return;
    }
    const el = document.getElementById("commission") || document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-[#0c0c0e] text-white pt-24 sm:pt-32 lg:pt-36 select-none overflow-hidden"
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        {/* 1. Header: "Get in touch" + Subtitle + Action Button with Smooth Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-12 pb-6 will-change-transform"
        >
          {/* Left Column: Monumental Headline & Narrative */}
          <div className="space-y-4">
            <h2 className="font-primary font-medium text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] tracking-tight text-white leading-[1.02]">
              Get in touch
            </h2>

            <div className="space-y-1 font-primary text-xs sm:text-[13px] md:text-sm text-[#8a8a8a]">
              <p>We direct films, neural visuals, and virtual productions that elevate brands to cinematic distinction.</p>
              <p>
                Prefer to write?{" "}
                <button
                  onClick={scrollToContact}
                  className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors cursor-pointer"
                >
                  Send a note.
                </button>
              </p>
            </div>
          </div>

          {/* Right Column: Pill Action Button */}
          <div className="flex-shrink-0">
            <Magnetic strength={0.35}>
              <button
                onClick={scrollToContact}
                className="font-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/60 hover:border-white bg-transparent hover:bg-white hover:text-black text-white text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl"
              >
                <span>Contact</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </div>
        </motion.div>

        {/* 2. 5-Column Social Channels Bento Box with Smooth Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="my-14 sm:my-20 rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#0c0c0e] overflow-hidden shadow-2xl will-change-transform"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-white/[0.08]">
            {SOCIAL_CHANNELS.map((channel) => {
              const isHovered = hoveredChannel === channel.id;

              return (
                <a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredChannel(channel.id)}
                  className={`group relative h-48 sm:h-56 md:h-60 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? "bg-gradient-to-br from-[#bbf73c] via-[#92f126] to-[#6ed815] text-[#0a1206]"
                      : "bg-[#0c0c0e] hover:bg-white/[0.02] text-white"
                  }`}
                >
                  {/* Top: Icon */}
                  <div
                    className={`transition-all duration-300 ${
                      isHovered ? "text-[#0a1206] scale-105" : "text-white group-hover:scale-105"
                    }`}
                  >
                    {channel.icon}
                  </div>

                  {/* Bottom: Platform Name */}
                  <div>
                    <span
                      className={`font-primary text-xs sm:text-sm font-medium transition-colors duration-200 ${
                        isHovered ? "text-[#0a1206] font-semibold" : "text-zinc-300 group-hover:text-white"
                      }`}
                    >
                      {channel.name}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* 3. Colophon / Footer Bar with Fade-in */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-3 items-center justify-between gap-6 pt-4 pb-14 text-xs sm:text-[13px] text-[#8a8a8a] font-primary border-t border-white/[0.08]"
        >
          {/* Left: Copyright */}
          <div className="text-left">
            <span>©2026 AMT - All rights reserved</span>
          </div>

          {/* Center: Signature KRS Swallowtail Pennant Flag Emblem */}
          <div className="flex items-center justify-center">
            <Magnetic strength={0.4}>
              <Link href="/" className="group block" aria-label="Home">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -3 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 450, damping: 20 }}
                  className="relative p-1 cursor-pointer"
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

          {/* Right: Legal Links */}
          <div className="flex items-center justify-start sm:justify-end gap-6 sm:gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </motion.div>
      </div>

      {/* 4. Bottom 3D Vertical Ribbed Green Pleated Curtain Stage (Matching Screenshot 1:1) */}
      <div className="relative w-full h-[160px] sm:h-[240px] lg:h-[320px] overflow-hidden bg-[#020602] perspective-[1200px]">
        {/* Real 3D Pleated Green Ribbed Curtain Canvas with Smooth Top Fade from Black */}
        <GreenRibbedCurtain fadeDirection="top" />

        {/* Top Smooth Fade Gradient blending seamlessly from the dark colophon bar */}
        <div className="absolute inset-x-0 top-0 h-32 sm:h-44 bg-gradient-to-b from-[#0c0c0e] via-[#0c0c0e]/85 to-transparent pointer-events-none z-10" />

        {/* Bottom Volumetric Atmospheric Glow */}
        <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-[#8ee034]/25 via-[#2a6636]/15 to-transparent blur-3xl pointer-events-none z-10" />

        {/* Subtle Back to top button in bottom right corner */}
        <div className="absolute bottom-8 sm:bottom-10 right-6 sm:right-12 z-20">
          <Magnetic strength={0.3}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 flex items-center justify-center text-[#8a8a8a] hover:text-white transition-colors cursor-pointer shadow-lg backdrop-blur-sm"
              title="Back to top"
              aria-label="Back to top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
