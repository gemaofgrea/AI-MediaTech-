"use client";

import React, { useState, useEffect } from "react";
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Film } from "lucide-react";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [progress, setProgress] = useState(28);

  const chapters = [
    { title: "Narrative Cinema & Virtual Volumes", time: "00:00 – 00:15", code: "01" },
    { title: "Haute Couture & Virtual Runways", time: "00:15 – 00:30", code: "02" },
    { title: "Generative Synthesis & Brand LoRAs", time: "00:30 – 00:45", code: "03" },
    { title: "8K Telecine Finishing & ACEScc", time: "00:45 – 01:00", code: "04" },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl bg-[#09090d] border border-[#c5a059]/40 rounded-sm overflow-hidden shadow-2xl flex flex-col">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b hairline-border bg-[#070709] font-mono-tech text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <div>
              <span className="font-bold text-[#f4f3ef] uppercase tracking-wider">
                ATELIER LUMA // THEATRICAL 8K ARCHIVE SHOWREEL
              </span>
              <span className="text-[#8e8d97] text-[10px] block mt-0.5">
                DCI 8K 120FPS MASTER • ACES 2065-1 • DOLBY VISION THEATRICAL
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#8e8d97] hover:text-[#f4f3ef] transition-colors cursor-pointer"
            aria-label="Close Showreel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport Frame */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group">
          <video
            src="/video/real-reel.webm.webm"
            autoPlay
            loop
            playsInline
            muted={isMuted}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 opacity-60 pointer-events-none" />

          {/* Center Play Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="relative z-10 w-20 h-20 rounded-full bg-black/60 border border-[#c5a059] flex items-center justify-center text-[#dfc287] backdrop-blur-md hover:scale-105 transition-transform cursor-pointer shadow-2xl"
          >
            {isPlaying ? <Pause className="w-7 h-7 fill-[#dfc287]" /> : <Play className="w-7 h-7 fill-[#dfc287] ml-1" />}
          </button>

          {/* Bottom Player Bar */}
          <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
            {/* Scrubber */}
            <div
              className="relative w-full h-1 bg-white/20 rounded-xs mb-3 cursor-pointer group/scrub"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = ((e.clientX - rect.left) / rect.width) * 100;
                setProgress(Math.max(0, Math.min(100, pos)));
              }}
            >
              <div className="h-full bg-[#dfc287] relative" style={{ width: `${progress}%` }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover/scrub:scale-100 transition-transform" />
              </div>
            </div>

            <div className="flex items-center justify-between font-mono-tech text-xs text-[#8e8d97]">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-[#f4f3ef] cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-[#f4f3ef] cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#dfc287]" />}
                </button>
                <span className="text-[#dcd8cf]">00:18 / 01:00</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline border hairline-border px-2 py-0.5 text-[10px] text-[#dfc287]">
                  PRORES 4444 XQ // 12-BIT
                </span>
                <button className="hover:text-[#f4f3ef] cursor-pointer">
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters Strip */}
        <div className="p-4 bg-[#0a0a0f] border-t hairline-border font-mono-tech">
          <div className="text-[10px] uppercase tracking-widest text-[#8e8d97] mb-2">
            SELECT CHAPTER SEGMENT:
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {chapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveChapter(idx);
                  setProgress((idx + 0.3) * 25);
                }}
                className={`p-3 text-left border rounded-xs transition-colors cursor-pointer ${
                  activeChapter === idx
                    ? "bg-[#181822] border-[#c5a059] text-white"
                    : "bg-[#0d0d12] hairline-border text-[#8e8d97] hover:text-[#f4f3ef]"
                }`}
              >
                <div className="text-[10px] text-[#c5a059] mb-0.5">{ch.code} // {ch.time}</div>
                <div className="text-xs font-semibold truncate text-[#f4f3ef]">{ch.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
