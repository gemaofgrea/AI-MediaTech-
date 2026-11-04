"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowUpRight, Check } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

interface ServiceItem {
  id: string;
  slug: string;
  leftTag: string;
  rightTag: string;
  title: string;
  icon: (active: boolean) => React.ReactNode;
  deliverables: string[];
}

const SERVICES_LIST: ServiceItem[] = [
  {
    id: "serv-1",
    slug: "movie-video-making",
    leftTag: "Cinema",
    rightTag: "Virtual Prod",
    title: "MOVIE & VIDEO MAKING",
    deliverables: [
      "Unreal Engine 5.5 Virtual LED Volume Production",
      "In-Camera VFX (ICVFX) Principal Photography",
      "Anamorphic RED V-Raptor 8K Camera Packages",
      "Dolby Atmos Theatrical DCI Masters",
    ],
    icon: (active) => (
      <svg
        className={`w-3.5 h-3.5 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-12 lg:h-12 inline-block mr-1.5 sm:mr-3 md:mr-4 flex-shrink-0 transition-all duration-300 ${active ? "rotate-45 scale-110 text-white" : "text-[#8a8a8a]"
          }`}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="2" fill="none" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="12"
            y1="1.8"
            x2="12"
            y2="4.8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${deg} 12 12)`}
          />
        ))}
      </svg>
    ),
  },
  {
    id: "serv-2",
    slug: "video-editing-processing",
    leftTag: "Post",
    rightTag: "Finishing",
    title: "VIDEO EDITING & PROCESSING",
    deliverables: [
      "DaVinci Resolve Neural Telecine & Optical Flow",
      "8K Micro-Detail Telecine Upscaling & Denoising",
      "ACES 2065-1 Film Color Space Grading",
      "Automated Multilingual Voice Resynthesis",
    ],
    icon: (active) => (
      <svg
        className={`w-3.5 h-3.5 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-12 lg:h-12 inline-block mr-1.5 sm:mr-3 md:mr-4 flex-shrink-0 transition-all duration-300 ${active ? "scale-110 text-white" : "text-[#8a8a8a]"
          }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L15.5 6.5L12 10.5L8.5 6.5Z" />
        <path d="M12 13.5L15.5 17.5L12 22L8.5 17.5Z" />
        <path d="M2 12L6.5 8.5L10.5 12L6.5 15.5Z" />
        <path d="M13.5 12L17.5 8.5L22 12L17.5 15.5Z" />
        <rect x="12" y="9.5" width="3.5" height="3.5" transform="rotate(45 12 9.5)" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "serv-3",
    slug: "model-fashion-photography",
    leftTag: "Haute",
    rightTag: "Runway",
    title: "MODEL & FASHION PHOTOGRAPHY",
    deliverables: [
      "Haute Couture Virtual Runway & Lookbook Production",
      "Digital Double Casting & Iridescent Cloth Physics",
      "Milan & Paris Fashion Week Campaign Deliverables",
      "Hasselblad 100MP & 32-bit Floating-Point Lighting",
    ],
    icon: (active) => (
      <svg
        className={`w-3.5 h-3.5 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-12 lg:h-12 inline-block mr-1.5 sm:mr-3 md:mr-4 flex-shrink-0 transition-all duration-300 ${active ? "rotate-90 scale-115 text-white" : "text-[#8a8a8a]"
          }`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 1.5C12 7.2 7.2 12 1.5 12C7.2 12 12 16.8 12 22.5C12 16.8 16.8 12 22.5 12C16.8 12 12 7.2 12 1.5Z" />
      </svg>
    ),
  },
  {
    id: "serv-4",
    slug: "ai-image-generation-processing",
    leftTag: "Latent",
    rightTag: "Diffusion",
    title: "AI IMAGE GENERATION & PROCESSING",
    deliverables: [
      "Custom Enterprise FLUX.1 Pro Checkpoints & LoRAs",
      "Multi-Pass Latent Inpainting & Lighting Matching",
      "ControlNet Depth, OpenPose & Composition Guidance",
      "Gigapixel CMYK Print Vector Master Packaging",
    ],
    icon: (active) => (
      <svg
        className={`w-4 h-3 sm:w-8 sm:h-5.5 md:w-11 md:h-8 lg:w-13 lg:h-9 inline-block mr-1.5 sm:mr-3 md:mr-4 flex-shrink-0 transition-all duration-300 ${active ? "scale-115 text-white" : "text-[#8a8a8a]"
          }`}
        viewBox="0 0 28 20"
        fill="currentColor"
      >
        <path d="M14 2C6.5 2 1.5 8.8 1 9.5C0.7 9.8 0.7 10.2 1 10.5C1.5 11.2 6.5 18 14 18C21.5 18 26.5 11.2 27 10.5C27.3 10.2 27.3 9.8 27 9.5C26.5 8.8 21.5 2 14 2ZM14 15.5C10.96 15.5 8.5 13.04 8.5 10C8.5 6.96 10.96 4.5 14 4.5C17.04 4.5 19.5 6.96 19.5 10C19.5 13.04 17.04 15.5 14 15.5Z" />
        <circle cx="14" cy="10" r="3.2" />
      </svg>
    ),
  },
  {
    id: "serv-5",
    slug: "professional-photographers-videographers-artists",
    leftTag: "Creator",
    rightTag: "Guild",
    title: "PROFESSIONAL PHOTOGRAPHERS, VIDEOGRAPHERS & ARTISTS",
    deliverables: [
      "Cannes-Winning Directors of Photography & Camera Crews",
      "Milan & Paris Celebrity Fashion Photographers",
      "Master AI Prompt Architects & ComfyUI Engineers",
      "Worldwide 48-Hour On-Demand Guild Deployment",
    ],
    icon: (active) => (
      <svg
        className={`w-3.5 h-3.5 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-12 lg:h-12 inline-block mr-1.5 sm:mr-3 md:mr-4 flex-shrink-0 transition-all duration-300 ${active ? "rotate-45 scale-110 text-white" : "text-[#8a8a8a]"
          }`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        {[0, 45, 90, 135].map((deg) => (
          <rect
            key={deg}
            x="10.2"
            y="2"
            width="3.6"
            height="20"
            rx="1.8"
            transform={`rotate(${deg} 12 12)`}
          />
        ))}
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
  },
];

export function ServicesMarqueeSection() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="services"
      className="relative w-full min-h-screen bg-[#0c0c0e] text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-20 select-none overflow-hidden flex flex-col justify-between scroll-mt-10"
    >
      <div id="disciplines" className="absolute -top-24 pointer-events-none" />

      {/* 1. Header Section Shifted to Center Matching User Reference Image 1:1 */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: -20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl mx-auto mb-10 sm:mb-16 lg:mb-20 will-change-transform"
      >
        <div className="flex items-start justify-between">
          {/* Left Column Spacer: Matches the left tag column width across all screens */}
          <div className="w-12 sm:w-24 md:w-28 lg:w-36 flex-shrink-0" />

          {/* Center Column: Aligns directly with title column */}
          <div className="flex-1 px-1 sm:pl-6 md:pl-10 lg:pl-16">
            {/* Headline matching screenshot 1:1 with AI MediaTech focus */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-normal leading-[1.08] tracking-[-0.03em]">
              <span className="font-secondary italic mr-2 text-white">Services+</span>
              <span className="font-primary text-white">for creative</span>
              <br />
              <span className="font-primary text-white">media production</span>
            </h2>

            {/* Sub-Header Narrative & Action Pill Button */}
            <div className="mt-5 sm:mt-8 flex flex-col md:flex-row md:items-center gap-6 sm:gap-10 lg:gap-12">
              <p className="font-primary text-[11px] sm:text-[13px] md:text-sm text-[#8a8a8a] leading-relaxed max-w-[380px] md:ml-6 lg:ml-12">
                Five core disciplines, one master creative team accountable for the master cut. We transform raw briefs into high-impact narrative cinema, virtual production, and generative art.
              </p>

              {/* Action Button */}
              <div className="flex items-center">
                <Magnetic strength={0.35}>
                  <Link
                    href={`/services/${SERVICES_LIST[0].slug}`}
                    className="font-primary inline-flex items-center justify-center px-5 sm:px-7 py-2 sm:py-3 rounded-full border border-white/80 hover:border-white bg-black/40 hover:bg-white hover:text-black text-white text-[11px] sm:text-sm font-medium backdrop-blur-sm transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl whitespace-nowrap"
                  >
                    <span>Explore disciplines ↗</span>
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Right Column Spacer: Matches the right tag column width across all screens */}
          <div className="w-12 sm:w-24 md:w-28 lg:w-36 flex-shrink-0" />
        </div>
      </motion.div>

      {/* 2. Monumental Interactive Services Typography Rows (Unified Computer Design Adjusted for All Screens) */}
      <div className="w-full max-w-7xl mx-auto my-auto space-y-2.5 sm:space-y-4 md:space-y-6">
        {SERVICES_LIST.map((item, idx) => {
          const isHovered = hoveredId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50, y: -15 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.85,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => router.push(`/services/${item.slug}`)}
              className="group relative flex items-center justify-between gap-1.5 sm:gap-4 py-2 sm:py-3 md:py-4 cursor-pointer transition-all duration-300 border-b border-white/[0.04] hover:border-white/[0.12] will-change-transform"
            >
              {/* Left Column Small Category Tag */}
              <div className="w-12 sm:w-24 md:w-28 lg:w-36 text-left flex-shrink-0">
                <span
                  className={`font-primary text-[10px] sm:text-xs md:text-sm lg:text-base font-normal tracking-tight sm:tracking-normal transition-colors duration-200 block truncate ${
                    isHovered ? "text-white" : "text-[#8a8a8a] group-hover:text-white"
                  }`}
                >
                  {item.leftTag}
                </span>
              </div>

              {/* Center Monumental Typography with Icon */}
              <div className="flex-1 flex justify-center items-center text-center px-1 sm:px-2 min-w-0">
                <Magnetic strength={0.15}>
                  <div className="inline-flex items-center justify-center max-w-full">
                    {/* Render Icon */}
                    {item.icon(isHovered)}

                    {/* Refined Uppercase Title in #8a8a8a, turning white on hover */}
                    <span
                      className={`font-primary text-[11px] min-[380px]:text-xs sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-normal tracking-[-0.02em] sm:tracking-[-0.03em] uppercase leading-[1.12] transition-all duration-200 text-center break-words ${
                        isHovered
                          ? "text-white sm:translate-x-2"
                          : "text-[#8a8a8a] group-hover:text-white"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                </Magnetic>
              </div>

              {/* Right Column Small Discipline Tag */}
              <div className="w-12 sm:w-24 md:w-28 lg:w-36 text-right flex-shrink-0">
                <span
                  className={`font-primary text-[10px] sm:text-xs md:text-sm lg:text-base font-normal tracking-tight sm:tracking-normal transition-colors duration-200 block truncate ${
                    isHovered ? "text-white" : "text-[#8a8a8a] group-hover:text-white"
                  }`}
                >
                  {item.rightTag}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Bottom Hairline Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-7xl mx-auto pt-12 sm:pt-16 border-b border-white/[0.08]"
      />

      {/* 4. Interactive Scope & Deliverables Modal Drawer */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-4xl bg-[#121214] border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden z-10 my-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#161619]">
                <div>
                  <span className="font-secondary italic text-lg sm:text-xl text-white">
                    Creative Disciplines Scope &amp; Deliverables
                  </span>
                  <p className="font-primary text-xs text-zinc-400 mt-0.5">
                    Five pillars of AI MediaTech creative production uniting physical cinema with neural pipelines.
                  </p>
                </div>

                <Magnetic strength={0.3}>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close dialog"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </Magnetic>
              </div>

              {/* Scrollable Body: All 5 Mandated Disciplines with Scope Deliverables */}
              <div className="max-h-[70vh] overflow-y-auto p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {SERVICES_LIST.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono-code text-xs text-lime-400 font-bold">
                          0{idx + 1}
                        </span>
                        <h4 className="font-primary text-sm sm:text-base font-semibold tracking-tight text-white uppercase">
                          {item.title}
                        </h4>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/5">
                        {item.deliverables.map((deliv, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-start gap-2 text-xs sm:text-[13px] text-zinc-300 font-primary"
                          >
                            <Check className="w-3.5 h-3.5 text-lime-400 mt-0.5 flex-shrink-0" />
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Bar */}
              <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-[#161619] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-primary text-xs text-zinc-400">
                  Ready to commission a cinema or neural production?
                </span>

                <Magnetic strength={0.25}>
                  <a
                    href="#contact"
                    onClick={() => setIsModalOpen(false)}
                    className="font-primary inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-lime-400 transition-colors cursor-pointer"
                  >
                    <span>Discuss commission</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
