"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { SlidersHorizontal, Eye, Film, Sparkles, Camera, Layers } from "lucide-react";

interface ComparisonPreset {
  id: string;
  discipline: string;
  title: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  specs: { label: string; value: string }[];
}

const PRESETS: ComparisonPreset[] = [
  {
    id: "cinema-vfx",
    discipline: "01 // NARRATIVE FILM & VIRTUAL PRODUCTION",
    title: "35mm S-Log3 Negative vs. ACES Film Print Emulation",
    description:
      "Witness how flat optical camera passes are transformed into Academy-grade anamorphic cinema through neural relighting, volumetric atmospheric density, and tailored Kodak 5219 halation.",
    beforeLabel: "RAW OPTICAL LOG NEGATIVE",
    afterLabel: "ACEScc COLOR MASTER & NEURAL VFX",
    beforeImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
    afterImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
    specs: [
      { label: "SENSOR RECOVERY", value: "+4.4 Stops In Shadows" },
      { label: "COLOR SCIENCE", value: "ACES 2065-1 / DaVinci Engine" },
      { label: "MASTER RESOLUTION", value: "8K DCI Theatrical Deliverable" },
    ],
  },
  {
    id: "fashion-editorial",
    discipline: "02 // HAUTE COUTURE & DIGITAL RUNWAYS",
    title: "Studio Cyclorama vs. Virtual Paris Haute Couture Runway",
    description:
      "Minimal raw strobe capture transmuted into avant-garde fashion editorials featuring zero-gravity silk simulations, holographic digital textiles, and 32-bit floating point raytraced stage lighting.",
    beforeLabel: "MINIMAL STUDIO FLASH",
    afterLabel: "VIRTUAL RUNWAY & CLO3D COUTURE",
    beforeImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=80",
    afterImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80",
    specs: [
      { label: "LIGHTING PROFILE", value: "32-bit Raytraced Studio HDRI" },
      { label: "FABRIC SIMULATION", value: "Subsurface Scattering Silk" },
      { label: "EDITORIAL READINESS", value: "Vogue & Harper's Print Grade" },
    ],
  },
  {
    id: "restoration",
    discipline: "03 // TELECINE & 8K NEURAL RESTORATION",
    title: "Compressed Archival vs. 8K Neural Reconstruction (120fps)",
    description:
      "Sub-pixel neural hallucination, optical-flow motion estimation, and artifact scrubbing designed to upscale heritage cinema into ultra-high frame rate archival exhibition prints.",
    beforeLabel: "480P COMPRESSED ARCHIVE",
    afterLabel: "8K NEURAL RESTORATION (120FPS)",
    beforeImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80",
    afterImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    specs: [
      { label: "FRAME INTERPOLATION", value: "24fps → 120fps Optical Flow" },
      { label: "GRAIN SYNTHESIS", value: "Physical 35mm Emulsion Match" },
      { label: "PROCESSING LATENCY", value: "Realtime Tensor Acceleration" },
    ],
  },
];

export function TransformationSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const current = PRESETS[activeIdx];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = () => setIsDragging(true);

  useEffect(() => {
    const onMouseUp = () => setIsDragging(false);
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };

    if (isDragging) {
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mousemove", onMouseMove);
    }
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDragging, handleMove]);

  return (
    <section id="optical-neural" className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-12 border-b hairline-border">
        <div>
          <div className="font-mono-tech text-xs uppercase tracking-widest text-[#c5a059] mb-2">
            02 // OPTICAL CALIBRATION SUITE
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#f4f3ef]">
            Optical Camera <span className="gold-shimmer">Vs. Neural Master</span>
          </h2>
          <p className="text-sm text-[#8e8d97] max-w-xl mt-2 font-light">
            Interactive split inspection comparing raw camera negatives with final ACES color science and neural VFX passes.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                setActiveIdx(i);
                setSliderPos(50);
              }}
              className={`px-3.5 py-2 rounded-xs font-mono-tech text-xs tracking-wider uppercase transition-colors cursor-pointer border ${activeIdx === i
                  ? "bg-[#161622] text-[#dfc287] border-[#c5a059]"
                  : "bg-transparent text-[#8e8d97] hairline-border hover:text-[#f4f3ef]"
                }`}
            >
              <span>{p.discipline.split("//")[1]?.trim() || `CASE 0${i + 1}`}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Monitor Outer Shell */}
      <div className="atelier-card-elevated rounded-sm p-4 sm:p-6 border hairline-border">
        {/* Monitor Title Bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b hairline-border font-mono-tech text-[10px] text-[#8e8d97] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            <span className="text-[#f4f3ef] font-semibold">{current.title}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-zinc-500">SCRUB HORIZONTALLY TO COMPARE</span>
            <span className="text-[#dfc287]">SPLIT RATIO: {Math.round(sliderPos)}%</span>
          </div>
        </div>

        {/* Draggable Viewport */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchMove={handleTouchMove}
          onClick={(e) => handleMove(e.clientX)}
          className="relative w-full aspect-[16/10] sm:aspect-[2.2/1] rounded-xs overflow-hidden cursor-ew-resize select-none border hairline-border bg-black group"
        >
          {/* After Pass (Background full width) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={current.afterImage}
              alt={current.afterLabel}
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              priority
              className="object-cover"
            />
            {/* Tag */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/80 border border-[#c5a059]/50 font-mono-tech text-[10px] font-semibold text-[#dfc287] uppercase tracking-wider">
              {current.afterLabel}
            </div>
          </div>

          {/* Before Pass (Clipped layer) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div
              className="relative w-full h-full"
              style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%" }}
            >
              <Image
                src={current.beforeImage}
                alt={current.beforeLabel}
                fill
                sizes="(max-width: 1400px) 100vw, 1400px"
                priority
                className="object-cover filter grayscale contrast-125 opacity-85"
              />
            </div>
            {/* Tag */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/80 border hairline-border font-mono-tech text-[10px] font-semibold text-[#8a8a8a] uppercase tracking-wider">
              {current.beforeLabel}
            </div>
          </div>

          {/* Divider Line */}
          <div
            className="absolute top-0 bottom-0 z-20 w-[1.5px] bg-[#dfc287] shadow-[0_0_12px_rgba(223,194,135,0.7)] pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Tactile Handle Center */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#070709] border border-[#dfc287] flex items-center justify-center text-[#dfc287] shadow-xl group-hover:scale-110 transition-transform">
              <SlidersHorizontal className="w-3.5 h-3.5 rotate-90" />
            </div>
          </div>
        </div>

        {/* Technical Specs Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 mt-4 border hairline-border">
          {current.specs.map((item, i) => (
            <div key={i} className="bg-[#0c0c11] p-3 flex items-center justify-between font-mono-tech text-xs">
              <span className="text-[#8e8d97] text-[10px] uppercase">{item.label}</span>
              <span className="text-[#f4f3ef] font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
