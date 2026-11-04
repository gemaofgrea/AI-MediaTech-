"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

interface ProjectItem {
  slug: string;
  tag: string;
  title: string;
  layout: "1-card" | "2-card" | "5-card";
  images: {
    hero?: string;
    heroAlt: string;
    heroVideo?: string;
    right?: string;
    rightAlt?: string;
    col1?: string;
    col1Alt?: string;
    col2?: string;
    col2Alt?: string;
    col3?: string;
    col3Alt?: string;
  };
}

const FEATURED_PROJECTS: ProjectItem[] = [
  {
    slug: "chronos-led",
    tag: "Movie & Video Making",
    title: "Film Lab // Raw Athletic Cinema",
    layout: "1-card",
    images: {
      heroAlt: "Film Lab Raw Athletic Cinema production",
      heroVideo: "/video/movie&video.mp4",
    },
  },
  {
    slug: "apex-telecine",
    tag: "Video Editing & Processing",
    title: "Apex Neural Telecine & Optical Flow",
    layout: "1-card",
    images: {
      heroAlt: "Apex 8K Neural Editorial & Telecine Mastering Suite",
      heroVideo: "/video/real-reel.webm.webm",
    },
  },
];

interface ViewcaseSectionProps {
  onOpenInquiry?: () => void;
}

export function ViewcaseSection({ onOpenInquiry }: ViewcaseSectionProps = {}) {
  const ROW1_HEIGHT = "h-[220px] sm:h-[300px] lg:h-[380px]";
  const ROW2_HEIGHT = "h-[160px] sm:h-[220px] lg:h-[260px]";

  return (
    <section
      id="works"
      className="relative w-full bg-[#0c0c0e] text-white py-20 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-20 select-none overflow-hidden scroll-mt-10"
    >
      <div className="w-full max-w-7xl mx-auto space-y-24 sm:space-y-36">
        {FEATURED_PROJECTS.map((project, idx) => {
          const isFiveCard = project.layout === "5-card";
          // Alternate entry direction: even index cards glide in from left, odd index cards from right
          const isFromLeft = idx % 2 === 0;
          const initialX = isFromLeft ? -80 : 80;

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, x: initialX }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`space-y-6 sm:space-y-8 will-change-transform ${
                idx < FEATURED_PROJECTS.length - 1
                  ? "pb-24 sm:pb-36 border-b border-white/[0.08]"
                  : ""
              }`}
            >
              {/* ========================================================
                  PROJECT HEADER: Pill + Monumental Title + View Project
                 ======================================================== */}
              <div className="flex items-end justify-between gap-4">
                <div className="space-y-2.5">
                  <span className="inline-block px-3 py-0.5 rounded-full border border-white/20 bg-transparent text-[11px] sm:text-xs font-mono-code text-zinc-400 uppercase tracking-wider">
                    {project.tag}
                  </span>

                  <h3 className="font-primary text-2xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] text-white leading-tight">
                    <Link
                      href={`/project/${project.slug}`}
                      className="hover:text-zinc-300 transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h3>
                </div>

                <div className="flex-shrink-0 pb-1">
                  <Magnetic strength={0.25}>
                    <Link
                      href={`/project/${project.slug}`}
                      className="group font-primary text-xs sm:text-sm text-white hover:text-zinc-200 underline underline-offset-[5px] decoration-white/40 hover:decoration-white transition-all inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View case study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                    </Link>
                  </Magnetic>
                </div>
              </div>

              {/* ========================================================
                  MEDIA CARDS: Pure High-Res Containers with Smooth Zoom
                 ======================================================== */}
              {project.layout === "1-card" ? (
                /* 1-CARD CINEMATIC SHOWCASE (PURE VIDEO, NO STATIC IMAGE) */
                <Link
                  href={`/project/${project.slug}`}
                  className="block group relative w-full rounded-none overflow-hidden bg-[#111114] border border-white/[0.08] hover:border-white/25 h-[280px] sm:h-[420px] lg:h-[540px] transition-all duration-500 cursor-pointer shadow-2xl"
                >
                  <video
                    src={project.images.heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-out pointer-events-none"
                  />
                </Link>
              ) : isFiveCard ? (
                /* 5-CARD LAYOUT (Row 1: 2 cards; Row 2: 3 cards) */
                <div className="space-y-4">
                  {/* Row 1: Left Wide (68%) + Right Tall (32%) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                    <Link
                      href={`/project/${project.slug}`}
                      className={`lg:col-span-8 group relative rounded-none overflow-hidden bg-[#111114] border border-white/[0.08] hover:border-white/25 ${ROW1_HEIGHT} transition-all duration-500 cursor-pointer shadow-xl`}
                    >
                      {project.images.heroVideo ? (
                        <video
                          src={project.images.heroVideo}
                          autoPlay
                          loop
                          muted
                          playsInline
                          poster={project.images.hero}
                          className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out pointer-events-none"
                        />
                      ) : (
                        <img
                          src={project.images.hero}
                          alt={project.images.heroAlt}
                          className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                        />
                      )}
                    </Link>

                    {project.images.right && (
                      <Link
                        href={`/project/${project.slug}`}
                        className={`lg:col-span-4 group relative rounded-none overflow-hidden bg-[#111114] border border-white/[0.08] hover:border-white/25 ${ROW1_HEIGHT} transition-all duration-500 cursor-pointer shadow-xl`}
                      >
                        <img
                          src={project.images.right}
                          alt={project.images.rightAlt}
                          className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                        />
                      </Link>
                    )}
                  </div>

                  {/* Row 2: 3 Equal Width Cards (33% each) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
                    {project.images.col1 && (
                      <Link
                        href={`/project/${project.slug}`}
                        className={`group relative rounded-none overflow-hidden bg-[#111114] border border-white/[0.08] hover:border-white/25 ${ROW2_HEIGHT} transition-all duration-500 cursor-pointer shadow-xl`}
                      >
                        <img
                          src={project.images.col1}
                          alt={project.images.col1Alt}
                          className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                        />
                      </Link>
                    )}

                    {project.images.col2 && (
                      <Link
                        href={`/project/${project.slug}`}
                        className={`group relative rounded-none overflow-hidden bg-[#111114] border border-white/[0.08] hover:border-white/25 ${ROW2_HEIGHT} transition-all duration-500 cursor-pointer shadow-xl`}
                      >
                        <img
                          src={project.images.col2}
                          alt={project.images.col2Alt}
                          className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                        />
                      </Link>
                    )}

                    {project.images.col3 && (
                      <Link
                        href={`/project/${project.slug}`}
                        className={`group relative rounded-none overflow-hidden bg-[#111114] border border-white/[0.08] hover:border-white/25 ${ROW2_HEIGHT} transition-all duration-500 cursor-pointer shadow-xl`}
                      >
                        <img
                          src={project.images.col3}
                          alt={project.images.col3Alt}
                          className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                /* 2-CARD ASYMMETRIC LAYOUT (Row: Left 65% + Right 35%) */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <Link
                    href={`/project/${project.slug}`}
                    className={`lg:col-span-8 group relative rounded-none overflow-hidden bg-[#111114] border border-white/[0.08] hover:border-white/25 ${ROW1_HEIGHT} transition-all duration-500 cursor-pointer shadow-xl`}
                  >
                    {project.images.heroVideo ? (
                      <video
                        src={project.images.heroVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={project.images.hero}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out pointer-events-none"
                      />
                    ) : (
                      <img
                        src={project.images.hero}
                        alt={project.images.heroAlt}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                      />
                    )}
                  </Link>

                  {project.images.right && (
                    <Link
                      href={`/project/${project.slug}`}
                      className={`lg:col-span-4 group relative rounded-none overflow-hidden bg-[#111114] border border-white/[0.08] hover:border-white/25 ${ROW1_HEIGHT} transition-all duration-500 cursor-pointer shadow-xl`}
                    >
                      <img
                        src={project.images.right}
                        alt={project.images.rightAlt}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                      />
                    </Link>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
