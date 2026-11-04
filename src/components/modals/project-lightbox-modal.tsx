"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, ChevronLeft, ChevronRight, ArrowUpRight, Check, Film } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

export interface ProjectDetail {
  id: string;
  tag: string;
  title: string;
  client: string;
  year: string;
  videoSrc?: string;
  heroImage: string;
  summary: string;
  metrics: string;
  director: string;
  colorist: string;
  pipeline: string;
  deliverables: string[];
  techStack: string[];
}

interface ProjectLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDetail;
  onNextProject: () => void;
  onPrevProject: () => void;
  onOpenInquiry: () => void;
}

export function ProjectLightboxModal({
  isOpen,
  onClose,
  project,
  onNextProject,
  onPrevProject,
  onOpenInquiry,
}: ProjectLightboxModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="relative w-full max-w-5xl bg-[#0c0c0e] border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden z-10 my-4 flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#111114]">
            <div className="flex items-center gap-3">
              <span className="inline-block px-3 py-0.5 rounded-full border border-white/20 bg-white/[0.05] text-[11px] font-mono-code text-lime-400">
                {project.tag}
              </span>
              <span className="font-primary text-xs text-zinc-400 hidden sm:inline">
                {project.client} • {project.year}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onPrevProject}
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Previous Project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={onNextProject}
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Next Project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-white flex items-center justify-center transition-colors cursor-pointer ml-2"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto flex-1">
            {/* 1. Cinema Player Viewport */}
            <div className="relative w-full aspect-video bg-black overflow-hidden group">
              <video
                ref={videoRef}
                src="/video/real-reel.webm.webm"
                poster={project.heroImage}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Player Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="absolute bottom-5 left-6 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white text-xs font-mono-code backdrop-blur-md transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-lime-400" /> : <Play className="w-3.5 h-3.5 text-lime-400 fill-lime-400" />}
                <span>{isPlaying ? "PAUSE PREVIEW" : "PLAY SHOWREEL"}</span>
              </button>

              <div className="absolute bottom-5 right-6 z-20 text-[11px] font-mono-code text-zinc-300 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                <span>DCI 4K • 24.000 FPS • PRORES 4444 XQ</span>
              </div>
            </div>

            {/* 2. Metadata & Story Section */}
            <div className="p-6 sm:p-10 space-y-8">
              <div>
                <h3 className="font-primary text-2xl sm:text-4xl font-normal tracking-[-0.03em] text-white">
                  {project.title}
                </h3>
                <p className="font-primary text-sm sm:text-base text-zinc-300 mt-3 leading-relaxed max-w-3xl">
                  {project.summary}
                </p>
              </div>

              {/* 3 Metrics & Architecture Callouts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-white/[0.08] py-6">
                <div>
                  <span className="block font-mono-code text-[11px] text-zinc-500 uppercase tracking-wider mb-1">
                    Key Metric
                  </span>
                  <span className="font-primary text-sm sm:text-base text-lime-400 font-medium">
                    {project.metrics}
                  </span>
                </div>
                <div>
                  <span className="block font-mono-code text-[11px] text-zinc-500 uppercase tracking-wider mb-1">
                    Production Pipeline
                  </span>
                  <span className="font-primary text-sm sm:text-base text-white">
                    {project.pipeline}
                  </span>
                </div>
                <div>
                  <span className="block font-mono-code text-[11px] text-zinc-500 uppercase tracking-wider mb-1">
                    Creative Directorate
                  </span>
                  <span className="font-primary text-sm sm:text-base text-white">
                    {project.director}
                  </span>
                </div>
              </div>

              {/* Deliverables & Hardware Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                  <h4 className="font-mono-code text-xs uppercase tracking-wider text-lime-400 mb-3">
                    Exhibition Deliverables
                  </h4>
                  <div className="space-y-2">
                    {project.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-lime-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                  <h4 className="font-mono-code text-xs uppercase tracking-wider text-zinc-400 mb-3">
                    Hardware &amp; Neural Models
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-xs text-zinc-300 font-mono-code"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA Bar */}
          <div className="px-6 sm:px-10 py-4 border-t border-white/[0.08] bg-[#111114] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-primary text-xs text-zinc-400">
              Want to deploy this exact creative pipeline for your project?
            </span>

            <Magnetic strength={0.3}>
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry();
                }}
                className="font-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-lime-400 transition-colors cursor-pointer shadow-lg"
              >
                <span>Commission Similar Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

