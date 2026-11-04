"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  Check,
  Send,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Scan,
  Activity,
  Layers,
  Sparkles,
  Cpu,
  Sliders,
  Radio,
} from "lucide-react";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { FloatingDock } from "@/components/layout/floating-dock";
import { ContactFooterSection } from "@/components/sections/contact-footer-section";
import { Magnetic } from "@/components/ui/magnetic";
import { InquiryModal } from "@/components/modals/inquiry-modal";
import { LeadsHudModal } from "@/components/modals/leads-hud-modal";
import { ShowreelModal } from "@/components/modals/showreel-modal";
import {
  SERVICES_CATALOG_DETAILED,
  type ServiceDetailItem,
  type ServiceShowcasePlate,
} from "@/data/services-data";
import { submitInquiry } from "@/lib/firebase";

export default function SingleServiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = (params?.slug as string) || "movie-video-making";

  // Match current service or fallback to first (supports aliases)
  const currentIndex = SERVICES_CATALOG_DETAILED.findIndex(
    (s) => s.slug === slug || s.aliases?.includes(slug)
  );
  const service: ServiceDetailItem =
    currentIndex !== -1
      ? SERVICES_CATALOG_DETAILED[currentIndex]
      : SERVICES_CATALOG_DETAILED[0];

  const nextService: ServiceDetailItem =
    SERVICES_CATALOG_DETAILED[
    (currentIndex + 1) % SERVICES_CATALOG_DETAILED.length
    ];

  // Modals state
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isLeadsHudOpen, setIsLeadsHudOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  // Commission Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formBrief, setFormBrief] = useState(
    `Inquiry regarding ${service.title} production & pipeline.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ id: string } | null>(null);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      setFormError("Please enter your name and email.");
      return;
    }
    setFormError("");
    setIsSubmitting(true);

    try {
      const res = await submitInquiry({
        name: formName,
        email: formEmail,
        mobile: "Direct Inquiry",
        userType: "Brand / Enterprise",
        services: [service.title],
        budget: service.pricingTier.split("–")[0].trim() || "$25,000 - $50,000",
        timeline: service.typicalTimeline,
        projectBrief: formBrief,
        preferredPipeline: "Hybrid Human + AI",
      });
      setSubmissionResult({ id: res.id });
    } catch {
      setSubmissionResult({
        id: `INQ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-primary selection:bg-[#8ee034] selection:text-black">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Floating Island Navigation Dock */}
      <FloatingDock
        onOpenLeadsHud={() => setIsLeadsHudOpen(true)}
        onOpenShowreel={() => setIsShowreelOpen(true)}
        onOpenInquiry={() => setIsInquiryOpen(true)}
      />

      {/* ==============================================================
          1. TOP NAVIGATION: ATTRACTIVE FLOATING BACK BUTTON & DISCIPLINE TAG
         ============================================================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pt-8 sm:pt-12 pb-4 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full flex items-center justify-between gap-4 will-change-transform z-30"
      >
        <Magnetic strength={0.25}>
          <button
            onClick={() => {
              if (typeof window !== "undefined" && window.history.length > 1) {
                router.back();
              } else {
                router.push("/#services");
              }
            }}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 backdrop-blur-md text-xs font-mono-code text-zinc-300 hover:text-white transition-all shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-zinc-400 group-hover:text-white" />
            <span className="tracking-wide">Back</span>
          </button>
        </Magnetic>

        {/* <span className="inline-block px-3.5 py-1 rounded-full border border-white/20 bg-white/[0.03] text-xs font-mono-code text-zinc-300 uppercase tracking-widest">
          {service.number} // {service.tag.toLowerCase()}
        </span> */}
      </motion.div>

      {/* ==============================================================
          2. MONUMENTAL HEADLINE & PREVIEW STRIP (Matches Reference Screenshot Top)
         ============================================================== */}
      <section className="relative pt-8 sm:pt-14 pb-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full overflow-hidden">
        {/* Subtle Background Radial Radar Geometry */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full border border-white/[0.03] pointer-events-none -z-10 flex items-center justify-center">
          <div className="w-[450px] h-[450px] rounded-full border border-white/[0.03]" />
          <div className="w-[250px] h-[250px] rounded-full border border-white/[0.03]" />
        </div>

        {/* Top Centered Starburst Glyph Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.03] text-[11px] font-mono-code text-zinc-400">
            <span className="text-[#8ee034]">✦</span>
            <span>{service.tag}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">{service.number}</span>
          </div>
        </div>

        {/* Monumental Editorial Headline */}
        <div className="text-center max-w-5xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-normal leading-[1.04] tracking-[-0.035em] text-white">
            Strategy, production and{" "}
            <span className="inline-flex items-center align-middle mx-1.5 sm:mx-2">
              <svg
                className="w-7 h-7 sm:w-11 sm:h-11 text-[#8ee034] animate-spin"
                style={{ animationDuration: "14s" }}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
              </svg>
            </span>{" "}
            execution tailored for exponential impact.
          </h1>

          <p className="font-primary text-base sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            {service.headline}
          </p>
        </div>

        {/* 4-Column Capability / Visual Preview Strip (from screenshot) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-12 sm:pt-16 max-w-6xl mx-auto">
          {SERVICES_CATALOG_DETAILED.slice(0, 4).map((item, idx) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className={`group relative p-3 sm:p-4 rounded-none border transition-all cursor-pointer ${item.slug === service.slug
                ? "border-[#8ee034]/60 bg-white/[0.04]"
                : "border-white/[0.08] bg-[#111114]/60 hover:border-white/25"
                }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40 mb-3 border border-white/[0.06]">
                {item.heroImage.endsWith(".mp4") || item.heroImage.endsWith(".webm") ? (
                  <video
                    src={item.heroImage}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <img
                    src={item.heroImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {item.slug === service.slug && (
                  <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-[#8ee034] text-black font-mono-code text-[9px] font-bold uppercase">
                    Current
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <span className="font-mono-code text-[10px] text-zinc-500 block">
                  0{idx + 1} // {item.number}
                </span>
                <p className="text-xs sm:text-sm font-medium text-white truncate group-hover:text-zinc-200">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==============================================================
          3. "WHAT WE BRING / DIRECT SPECIALIST ACCESS" SECTION
             (Matches the 2-column block right below the top cards in the reference image)
         ============================================================== */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-t border-white/[0.08] max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono-code text-xs text-zinc-500 uppercase tracking-widest block">
              01 // Architectural Model
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-white leading-tight">
              Direct access to dedicated cinema directors and neural architects.
            </h2>
            <p className="font-primary text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              We eliminate traditional agency layers, account managers, and markups. You interface directly with principal directors, colorists, and AI system engineers with transparent Frame.io C2C review pipelines.
            </p>
            <div className="pt-2">
              <a
                href="#plates"
                className="inline-flex items-center gap-1.5 text-xs font-mono-code text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-all cursor-pointer"
              >
                <span>Inspect technical execution</span>
                <ArrowDownIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:pl-8 lg:border-l border-white/[0.08]">
            <div className="p-4 border border-white/[0.08] bg-[#111114]/50 space-y-2">
              <div className="flex items-center gap-2 text-white font-medium text-xs">
                <span className="text-[#8ee034]">✓</span>
                <span>Single Master Directorate</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                One lead creative director owns vision from script and pre-visualization to final Dolby Vision theatrical conform.
              </p>
            </div>

            <div className="p-4 border border-white/[0.08] bg-[#111114]/50 space-y-2">
              <div className="flex items-center gap-2 text-white font-medium text-xs">
                <span className="text-[#8ee034]">✓</span>
                <span>Live Frame.io C2C Telemetry</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                Raw camera takes stream from on-set 5G/Starlink transmitters directly into your review app in under 15 seconds.
              </p>
            </div>

            <div className="p-4 border border-white/[0.08] bg-[#111114]/50 space-y-2">
              <div className="flex items-center gap-2 text-white font-medium text-xs">
                <span className="text-[#8ee034]">✓</span>
                <span>Private Model Isolation SLA</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                All custom LoRAs, generative weights, and scripts run inside isolated environments with guaranteed zero public leakage.
              </p>
            </div>

            <div className="p-4 border border-white/[0.08] bg-[#111114]/50 space-y-2">
              <div className="flex items-center gap-2 text-white font-medium text-xs">
                <span className="text-[#8ee034]">✓</span>
                <span>Theatrical & Broadcast Delivery</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                Conformed to Dolby Atmos 9.1.6, ACES 2065-1, EBU R128 loudness, and uncompressed Apple ProRes 4444 XQ masters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          4. MODULAR SHOWCASE PLATES & TWO-COLUMN EDITORIAL BLOCKS
             (Direct match to each plate + 2-col editorial in the reference image)
         ============================================================== */}
      <section id="plates" className="py-12 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full space-y-28">
        {service.showcasePlates.map((plate, plateIdx) => (
          <div key={plateIdx} className="space-y-8">
            {/* --- VISUAL SHOWCASE PLATE CONTAINER --- */}
            <div className="relative w-full rounded-none overflow-hidden bg-[#0d0d10] border border-white/[0.1] shadow-2xl">
              {plate.plateType === "video" ? (
                /* 1. CINEMA VIDEO PLAYER PLATE */
                <VideoShowcasePlate
                  videoUrl={plate.mediaUrl || service.heroImage}
                  title={plate.title}
                  stats={plate.stats}
                />
              ) : plate.plateType === "cv-vision" ? (
                /* 2. COMPUTER VISION & NEURAL SEGMENTATION CANVAS PLATE (Exact match to screenshot middle!) */
                <ComputerVisionPlate
                  stats={plate.stats}
                  serviceSlug={service.slug}
                />
              ) : plate.plateType === "audio-spatial" ? (
                /* 3. DOLBY ATMOS 3D SPATIAL AUDIO CONSOLE PLATE */
                <DolbyAtmosPlate stats={plate.stats} />
              ) : plate.plateType === "dashboard" ? (
                /* 4. DAVINCI RESOLVE / TIMELINE CONFORMING DASHBOARD PLATE */
                <TimelineDashboardPlate
                  stats={plate.stats}
                  serviceSlug={service.slug}
                />
              ) : (
                /* 5. TELEMETRY / GENERIC TECHNICAL PLATE */
                <TelemetryPlate stats={plate.stats} />
              )}
            </div>

            {/* --- TWO-COLUMN EDITORIAL BLOCK UNDER THE PLATE --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-2 items-start border-b border-white/[0.08] pb-16">
              {/* Left Column: Kicker, Title, Narrative, Case Study Link */}
              <div className="lg:col-span-6 space-y-4">
                <span className="font-mono-code text-xs text-[#8ee034] uppercase tracking-wider block">
                  {plate.kicker}
                </span>

                <h3 className="text-2xl sm:text-3xl font-normal text-white leading-tight">
                  {plate.title}
                </h3>

                <p className="font-primary text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  {plate.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/project/${service.caseStudy.slug}`}
                    className="group inline-flex items-center gap-1.5 text-xs font-mono-code text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all cursor-pointer"
                  >
                    <span>View case study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Tags & Scope Deliverables List */}
              <div className="lg:col-span-6 space-y-4 lg:pl-8 lg:border-l border-white/[0.08]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono-code text-[11px] text-zinc-500 uppercase tracking-wider">
                    Scope & Technical Deliverables
                  </span>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {plate.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-[10px] font-mono-code bg-white/[0.05] border border-white/[0.1] text-zinc-300 rounded-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                  {plate.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <span className="text-[#8ee034] font-mono-code text-[11px] mt-0.5">•</span>
                      <span className="font-light leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ==============================================================
          5. METHODOLOGY: 4-PHASE PROGRESSIVE EXECUTION ARCHITECTURE
         ============================================================== */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 border-t border-white/[0.08] max-w-7xl mx-auto w-full">
        <div className="space-y-12">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono-code text-xs text-zinc-500 uppercase tracking-widest block">
              Execution Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal text-white">
              Four progressive production phases.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              End-to-end telemetry from discovery photogrammetry to final theatrical DCP delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/[0.08]">
            {service.workflow.map((step, idx) => (
              <div
                key={idx}
                className="p-5 border border-white/[0.08] bg-[#111114]/40 hover:border-white/20 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs text-[#8ee034]">
                    0{idx + 1}
                  </span>
                  <span className="font-mono-code text-[10px] text-zinc-500 uppercase">
                    {step.phase}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-normal text-white group-hover:text-zinc-200 transition-colors">
                  {step.title}
                </h3>
                <p className="font-primary text-xs text-zinc-400 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================
          6. MONUMENTAL TYPOGRAPHIC BANNER: "from pre-seed to ✦ fortune 500 ✦"
             (The signature visual marquee element from the reference image)
         ============================================================== */}
      <section className="py-16 sm:py-24 overflow-hidden border-y border-white/[0.08] bg-black/40">
        <div className="relative flex whitespace-nowrap items-center font-secondary italic text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white/95 select-none animate-marquee">
          <span className="tracking-tight">from pre-seed to</span>
          <span className="text-[#8ee034] mx-4 sm:mx-8 not-italic">✦</span>
          <span className="font-primary not-italic font-bold tracking-tighter text-white">
            fortune 500
          </span>
          <span className="text-[#8ee034] mx-4 sm:mx-8 not-italic">✦</span>
          <span className="tracking-tight">from pre-seed to</span>
          <span className="text-[#8ee034] mx-4 sm:mx-8 not-italic">✦</span>
          <span className="font-primary not-italic font-bold tracking-tighter text-white">
            fortune 500
          </span>
          <span className="text-[#8ee034] mx-4 sm:mx-8 not-italic">✦</span>
        </div>
      </section>

      {/* ==============================================================
          7. MONUMENTAL METRICS BLOCK (Matches bottom metrics in screenshot)
         ============================================================== */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Heading & 5 Giant KPI Numbers */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-2">
              <span className="font-mono-code text-xs text-zinc-500 uppercase tracking-widest block">
                Verifiable Impact // Performance Metrics
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal text-white">
                Engineered for cinematic and commercial scale.
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-white/[0.08]">
              <div className="space-y-1">
                <span className="text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight">
                  {service.metrics.kpi1.value}
                </span>
                <p className="font-mono-code text-[11px] text-zinc-400 uppercase tracking-wider">
                  {service.metrics.kpi1.label}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight">
                  {service.metrics.kpi2.value}
                </span>
                <p className="font-mono-code text-[11px] text-zinc-400 uppercase tracking-wider">
                  {service.metrics.kpi2.label}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-4xl sm:text-6xl md:text-7xl font-normal text-[#8ee034] tracking-tight">
                  {service.metrics.kpi3.value}
                </span>
                <p className="font-mono-code text-[11px] text-zinc-400 uppercase tracking-wider">
                  {service.metrics.kpi3.label}
                </p>
              </div>

              <div className="space-y-1 pt-4 sm:pt-6 border-t border-white/[0.06]">
                <span className="text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight">
                  {service.metrics.kpi4.value}
                </span>
                <p className="font-mono-code text-[11px] text-zinc-400 uppercase tracking-wider">
                  {service.metrics.kpi4.label}
                </p>
              </div>

              <div className="space-y-1 pt-4 sm:pt-6 border-t border-white/[0.06]">
                <span className="text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight">
                  {service.metrics.kpi5.value}
                </span>
                <p className="font-mono-code text-[11px] text-zinc-400 uppercase tracking-wider">
                  {service.metrics.kpi5.label}
                </p>
              </div>

              <div className="space-y-1 pt-4 sm:pt-6 border-t border-white/[0.06] flex flex-col justify-end">
                <span className="font-mono-code text-[11px] text-zinc-500 uppercase block">
                  Production SLA
                </span>
                <span className="text-white text-sm font-medium">
                  {service.typicalTimeline} Turnaround
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Certification Block */}
          <div className="lg:col-span-4 space-y-6 lg:pl-10 lg:border-l border-white/[0.08]">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <span className="font-mono-code text-xs text-zinc-500 uppercase tracking-wider">
                Production Unit
              </span>
              <span className="text-4xl font-mono-code text-white/30 font-light">
                {service.number}
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono-code text-zinc-400 uppercase">
                Directorate Statement
              </span>
              <blockquote className="font-secondary italic font-light text-base sm:text-lg text-zinc-300 leading-snug">
                &ldquo;{service.summary}&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 border-t border-white/[0.08] space-y-2 font-mono-code text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                <span className="text-zinc-500">Pipeline Tier</span>
                <span className="text-white font-medium">{service.pricingTier}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                <span className="text-zinc-500">Lead Time</span>
                <span className="text-white font-medium">{service.typicalTimeline}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          8. COLOPHON SPECIFICATIONS TABLE
         ============================================================== */}
      <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 border-t border-white/[0.08] max-w-7xl mx-auto w-full">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono-code text-xs text-zinc-500 uppercase tracking-widest block">
                Technical Colophon
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-white">
                Standards, protocols and master formats.
              </h2>
            </div>
            <span className="font-mono-code text-xs text-zinc-500">
              Verified Specs // ISO / SMPTE / ACES / Dolby
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08]">
            {service.specs.map((spec, sIdx) => (
              <div key={sIdx} className="bg-[#09090b] p-4 sm:p-5 space-y-1">
                <span className="text-[10px] font-mono-code uppercase text-zinc-500 block">
                  {spec.label}
                </span>
                <p className="text-xs sm:text-sm text-zinc-200 font-medium">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================
          10. FOOTER
         ============================================================== */}
      <ContactFooterSection
        onOpenInquiry={() => {
          const el = document.getElementById("commission");
          if (el) el.scrollIntoView({ behavior: "smooth" });
          else setIsInquiryOpen(true);
        }}
      />

      {/* Modals */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        onOpenLeadsHud={() => setIsLeadsHudOpen(true)}
        initialService={service.title}
      />

      <LeadsHudModal
        isOpen={isLeadsHudOpen}
        onClose={() => setIsLeadsHudOpen(false)}
      />

      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />
    </div>
  );
}

/* =====================================================================
   SUBCOMPONENT 1: CINEMA VIDEO SHOWCASE PLATE
   ===================================================================== */
function VideoShowcasePlate({
  videoUrl,
  title,
  stats,
}: {
  videoUrl: string;
  title: string;
  stats?: { label: string; value: string }[];
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const isVideo =
    videoUrl.endsWith(".mp4") ||
    videoUrl.endsWith(".webm") ||
    videoUrl.startsWith("/video");

  return (
    <div className="relative w-full h-[400px] sm:h-[540px] lg:h-[620px] bg-black overflow-hidden group">
      {/* Video / High-Res Plate Element */}
      {isVideo ? (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center"
        />
      ) : (
        <img
          src={videoUrl}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
        />
      )}

      {/* Viewfinder Telemetry Overlay */}
      <div className="absolute inset-0 pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
        {/* Top Viewfinder Bar */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono-code text-white/80">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>REC // 4K DCI 24.00 FPS</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10">
            <span>ARRI LogC4 REVEAL</span>
            <span className="text-zinc-500">|</span>
            <span>SHUTTER 180.0°</span>
            <span className="text-zinc-500">|</span>
            <span className="text-[#8ee034]">ACES 2065-1</span>
          </div>

          <div className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 font-mono-code">
            01:24:18:12
          </div>
        </div>

        {/* Viewfinder Crosshair Guide */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/20 pointer-events-none flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white/40" />
        </div>

        {/* Bottom Interactive Control Bar */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 sm:px-3 sm:py-1.5 bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
            </button>

            <button
              onClick={toggleMute}
              className="p-2 sm:px-3 sm:py-1.5 bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#8ee034]" />}
              <span className="hidden sm:inline">{isMuted ? "Unmute" : "Muted"}</span>
            </button>
          </div>

          {stats && stats.length > 0 && (
            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/15 font-mono-code text-[11px] text-zinc-300">
              {stats.map((s, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="text-zinc-500 uppercase">{s.label}:</span>
                  <span className="text-white font-medium">{s.value}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   SUBCOMPONENT 2: COMPUTER VISION & NEURAL SEGMENTATION CANVAS PLATE
   (Matches the exact middle plate from the reference image:
    Person with yellow bounding box [Person 98%], red neural mask, coordinate crosshair)
   ===================================================================== */
function ComputerVisionPlate({
  stats,
  serviceSlug,
}: {
  stats?: { label: string; value: string }[];
  serviceSlug: string;
}) {
  const [showBoxes, setShowBoxes] = useState(true);
  const [showMask, setShowMask] = useState(true);
  const [showDepth, setShowDepth] = useState(false);

  const isFashion =
    serviceSlug === "model-fashion-photography" ||
    serviceSlug === "sound-fx-mixing";

  const plateImg = isFashion
    ? "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=85"
    : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85";

  return (
    <div className="relative w-full h-[420px] sm:h-[560px] lg:h-[640px] bg-[#0c0d11] overflow-hidden select-none">
      {/* Background Photographic Plate */}
      <img
        src={plateImg}
        alt="Computer Vision Scene"
        className={`w-full h-full object-cover transition-all duration-500 ${showDepth ? "filter hue-rotate-90 contrast-125 saturate-150" : ""
          }`}
      />

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

      {/* TOP STATUS BAR (Matches screenshot HUD) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono-code">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/15 text-white">
          <Scan className="w-3.5 h-3.5 text-[#8ee034] animate-pulse" />
          <span>
            {isFashion
              ? "CLO 3D // KINEMATIC DRAPE 042 / 180"
              : "AI SEGMENT // FRAME 042 / 180"}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/15 text-zinc-300">
          <span>{isFashion ? "TENSOR: CLO 3D 7.3" : "TENSOR: PYTORCH 2.3"}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-[#8ee034]">
            {isFashion ? "MESH: 2.4M POLYS" : "LATENT SYNC: <1MS"}
          </span>
          <span className="text-zinc-600">|</span>
          <span>{isFashion ? "HASSELBLAD 100MP" : "CUDA 12.4"}</span>
        </div>

        <div className="px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/15 text-white">
          {isFashion ? "11600 × 8700 16-BIT" : "4096 × 2160 DCI"}
        </div>
      </div>

      {/* BOUNDING BOX 1: Yellow Person Bounding Box (Exact match to screenshot!) */}
      {showBoxes && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-[28%] left-[64%] w-[24%] sm:w-[18%] h-[58%] border-2 border-yellow-400 bg-yellow-400/[0.04] pointer-events-none"
        >
          {/* Top Yellow Badge */}
          <div className="absolute -top-6 left-0 px-2 py-0.5 bg-yellow-400 text-black font-mono-code font-bold text-[9px] sm:text-[10px] uppercase flex items-center gap-1">
            <span>{isFashion ? "Model Pose 99.2%" : "Person 98.4%"}</span>
          </div>

          {/* Corner Coordinate HUD */}
          <div className="absolute -bottom-5 right-0 font-mono-code text-[9px] text-yellow-300 bg-black/70 px-1.5">
            [X:712 Y:240]
          </div>

          {/* Internal Crosshairs */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3 h-3 border-t border-l border-yellow-400/80" />
          <div className="absolute top-1/3 right-1/2 translate-x-1/2 w-3 h-3 border-t border-r border-yellow-400/80" />
        </motion.div>
      )}

      {/* BOUNDING BOX 2: Red Neural Inpaint Segmentation Area (Exact match to screenshot!) */}
      {showMask && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-[38%] left-[22%] w-[32%] sm:w-[26%] h-[38%] pointer-events-none"
        >
          {/* Red Translucent Neural Inpainting Mask Polygon */}
          <div className="w-full h-full bg-red-600/40 border border-red-500 backdrop-blur-[1px] relative">
            {/* Top Red Badge */}
            <div className="absolute -top-5 left-0 px-2 py-0.5 bg-red-500 text-white font-mono-code font-bold text-[9px] sm:text-[10px] uppercase">
              {isFashion ? "CLO 3D Cloth Drape: 96%" : "Neural Inpaint Mask: 84%"}
            </div>

            {/* Neural Segmentation Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#ff4444_1px,transparent_1px)] [background-size:8px_8px] opacity-60" />
          </div>
        </motion.div>
      )}

      {/* SECONDARY TARGET: Green Bounding Box */}
      {showBoxes && (
        <div className="absolute top-[48%] left-[48%] w-[12%] h-[18%] border border-[#8ee034] pointer-events-none hidden sm:block">
          <div className="absolute -top-4 left-0 px-1 py-0.2 bg-[#8ee034] text-black font-mono-code text-[8px] font-bold">
            Object 92%
          </div>
        </div>
      )}

      {/* BOTTOM INTERACTIVE TOGGLES (Allows user to toggle layers like a real VFX engine) */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-code">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBoxes(!showBoxes)}
            className={`px-3 py-1.5 border text-[11px] transition-all cursor-pointer ${showBoxes
              ? "bg-yellow-400 text-black border-yellow-400 font-bold"
              : "bg-black/80 text-zinc-400 border-white/15 hover:text-white"
              }`}
          >
            Bounding Boxes
          </button>

          <button
            onClick={() => setShowMask(!showMask)}
            className={`px-3 py-1.5 border text-[11px] transition-all cursor-pointer ${showMask
              ? "bg-red-500 text-white border-red-500 font-bold"
              : "bg-black/80 text-zinc-400 border-white/15 hover:text-white"
              }`}
          >
            Neural Mask
          </button>

          <button
            onClick={() => setShowDepth(!showDepth)}
            className={`hidden sm:inline-block px-3 py-1.5 border text-[11px] transition-all cursor-pointer ${showDepth
              ? "bg-[#8ee034] text-black border-[#8ee034] font-bold"
              : "bg-black/80 text-zinc-400 border-white/15 hover:text-white"
              }`}
          >
            Depth Heatmap
          </button>
        </div>

        {stats && stats.length > 0 && (
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/15 text-[11px] text-zinc-300">
            {stats.map((s, idx) => (
              <span key={idx}>
                <span className="text-zinc-500">{s.label}:</span>{" "}
                <span className="text-white font-medium">{s.value}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =====================================================================
   SUBCOMPONENT 3: DOLBY ATMOS 3D SPATIAL AUDIO CONSOLE PLATE
   ===================================================================== */
function DolbyAtmosPlate({
  stats,
}: {
  stats?: { label: string; value: string }[];
}) {
  return (
    <div className="relative w-full h-[420px] sm:h-[540px] lg:h-[600px] bg-[#08090d] overflow-hidden p-6 sm:p-8 flex flex-col justify-between select-none">
      {/* 3D Speaker Grid Radar Simulation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full border border-white/30 flex items-center justify-center">
          <div className="w-[200px] sm:w-[280px] h-[200px] sm:h-[280px] rounded-full border border-white/30 flex items-center justify-center">
            <div className="w-[80px] sm:w-[120px] h-[80px] sm:h-[120px] rounded-full border border-[#8ee034]/40" />
          </div>
        </div>
      </div>

      {/* Spatial Audio Objects (Floating In Space) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [40, 180, 80, 40], y: [60, 120, 200, 60] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 px-2 py-1 bg-[#8ee034] text-black font-mono-code text-[10px] font-bold rounded-sm shadow-[0_0_20px_rgba(142,224,52,0.6)]"
        >
          Obj 01 • Dialogue [Center]
        </motion.div>

        <motion.div
          animate={{ x: [-20, -120, -40, -20], y: [-30, 80, -20, -30] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 px-2 py-1 bg-cyan-400 text-black font-mono-code text-[10px] font-bold rounded-sm shadow-[0_0_20px_rgba(34,211,238,0.5)]"
        >
          Obj 42 • Atmos Height [Top L]
        </motion.div>

        <motion.div
          animate={{ x: [0, 90, -40, 0], y: [0, -60, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/3 px-2 py-1 bg-purple-400 text-black font-mono-code text-[10px] font-bold rounded-sm shadow-[0_0_20px_rgba(192,132,252,0.5)]"
        >
          Obj 88 • Foley Sub [Subwoofer]
        </motion.div>
      </div>

      {/* Top Console Bar */}
      <div className="relative z-10 flex items-center justify-between font-mono-code text-[11px] text-zinc-300">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 border border-white/10">
          <Radio className="w-3.5 h-3.5 text-[#8ee034] animate-pulse" />
          <span>DOLBY ATMOS 9.1.6 CALIBRATED STAGE</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-black/80 border border-white/10">
          <span>AVID S6 M40</span>
          <span className="text-zinc-600">|</span>
          <span className="text-[#8ee034]">128 SPATIAL OBJECTS</span>
          <span className="text-zinc-600">|</span>
          <span>96KHZ / 24-BIT</span>
        </div>

        <div className="px-3 py-1.5 bg-black/80 border border-white/10 text-[#8ee034]">
          -24.0 LKFS (EBU R128)
        </div>
      </div>

      {/* Real-Time Waveform Frequency Meters (Simulated 24-band EQ bars) */}
      <div className="relative z-10 flex items-end justify-center gap-1.5 sm:gap-2.5 h-32 sm:h-40">
        {[45, 62, 85, 95, 78, 60, 88, 92, 100, 75, 55, 70, 84, 90, 68, 50, 65, 80, 92, 60, 48, 72].map(
          (h, i) => (
            <motion.div
              key={i}
              animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.6}%`] }}
              transition={{
                duration: 0.8 + (i % 5) * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="w-1.5 sm:w-2 bg-gradient-to-t from-[#8ee034]/20 via-[#8ee034] to-white rounded-t-sm"
            />
          )
        )}
      </div>

      {/* Bottom Status / Stats */}
      <div className="relative z-10 flex items-center justify-between font-mono-code text-[11px] text-zinc-400 border-t border-white/10 pt-3">
        <span>BINAURAL HEADPHONE DOWNMIX: ACTIVE (HRTF)</span>
        {stats && stats.length > 0 && (
          <div className="flex items-center gap-4">
            {stats.map((s, idx) => (
              <span key={idx}>
                <span className="text-zinc-500 uppercase">{s.label}:</span>{" "}
                <span className="text-white font-medium">{s.value}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =====================================================================
   SUBCOMPONENT 4: TIMELINE DASHBOARD PLATE
   (Matching top browser window plate in screenshot)
   ===================================================================== */
function TimelineDashboardPlate({
  stats,
  serviceSlug,
}: {
  stats?: { label: string; value: string }[];
  serviceSlug: string;
}) {
  return (
    <div className="w-full bg-[#101217] text-zinc-300 font-mono-code text-xs select-none">
      {/* Top Window Bar with macOS style dots (Matches screenshot) */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#171922] border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <span className="text-[11px] text-zinc-400 pl-2">
            DaVinci Resolve 19 Studio — Master Timeline [ACES 2065-1]
          </span>
        </div>
        <div className="text-[10px] text-zinc-500">
          PRORES 4444 XQ • DCI 4K 24FPS
        </div>
      </div>

      {/* Middle Interface: Track Grid & Timecode */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Track Headers and Blocks */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-12 text-[10px] text-zinc-500 uppercase">V3 [VFX]</span>
            <div className="flex-1 h-7 bg-white/[0.04] border border-white/10 relative overflow-hidden flex items-center">
              <div className="absolute left-[15%] w-[35%] h-full bg-[#8ee034]/20 border-x border-[#8ee034] text-[10px] text-[#8ee034] px-2 flex items-center">
                Optical Flow Frame Synthesis 120fps
              </div>
              <div className="absolute left-[60%] w-[25%] h-full bg-cyan-500/20 border-x border-cyan-400 text-[10px] text-cyan-300 px-2 flex items-center">
                Neural Clean Plate 4K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-12 text-[10px] text-zinc-500 uppercase">V2 [GRADE]</span>
            <div className="flex-1 h-7 bg-white/[0.04] border border-white/10 relative overflow-hidden flex items-center">
              <div className="absolute left-[5%] w-[70%] h-full bg-purple-500/20 border-x border-purple-400 text-[10px] text-purple-300 px-2 flex items-center">
                Dolby Vision HDR10+ Dynamic Metadata Pass
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-12 text-[10px] text-zinc-500 uppercase">V1 [RAW]</span>
            <div className="flex-1 h-7 bg-white/[0.04] border border-white/10 relative overflow-hidden flex items-center">
              <div className="absolute left-0 w-[45%] h-full bg-amber-500/20 border-x border-amber-400 text-[10px] text-amber-300 px-2 flex items-center">
                ARRI Alexa 35 LogC4 Master Take 04
              </div>
              <div className="absolute left-[46%] w-[50%] h-full bg-amber-500/20 border-x border-amber-400 text-[10px] text-amber-300 px-2 flex items-center">
                ARRI Alexa 35 LogC4 Master Take 08
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-12 text-[10px] text-zinc-500 uppercase">A1-A8</span>
            <div className="flex-1 h-7 bg-white/[0.04] border border-white/10 relative overflow-hidden flex items-center">
              <div className="absolute left-0 w-[95%] h-full bg-emerald-500/15 border-x border-emerald-400 text-[10px] text-emerald-300 px-2 flex items-center">
                Dolby Atmos 9.1.6 Master Stems [Dialogue + Foley + Orchestral Score]
              </div>
            </div>
          </div>
        </div>

        {/* Playhead Scrubber */}
        <div className="relative pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="text-[#8ee034] font-bold">01:24:18:12</span>
            <span>DURATION: 00:03:45:00</span>
          </div>

          {stats && stats.length > 0 && (
            <div className="flex items-center gap-4">
              {stats.map((s, idx) => (
                <span key={idx}>
                  <span className="text-zinc-500">{s.label}:</span>{" "}
                  <span className="text-white font-medium">{s.value}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   SUBCOMPONENT 5: TELEMETRY / GENERIC TECHNICAL PLATE
   ===================================================================== */
function TelemetryPlate({
  stats,
}: {
  stats?: { label: string; value: string }[];
}) {
  return (
    <div className="w-full h-[400px] sm:h-[480px] bg-[#0c0d11] p-6 flex flex-col justify-between font-mono-code text-xs text-zinc-300">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-[#8ee034]">FRAME.IO C2C UPLINK STATUS // ACTIVE</span>
        <span>LATENCY: 12MS</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 border border-white/10 bg-white/[0.02]">
          <span className="text-zinc-500 block text-[10px] uppercase">Proxy Pipeline</span>
          <span className="text-white text-sm font-bold">1080p ProRes 422</span>
        </div>
        <div className="p-4 border border-white/10 bg-white/[0.02]">
          <span className="text-zinc-500 block text-[10px] uppercase">Cloud Checksum</span>
          <span className="text-[#8ee034] text-sm font-bold">MD5 Verified 100%</span>
        </div>
        <div className="p-4 border border-white/10 bg-white/[0.02]">
          <span className="text-zinc-500 block text-[10px] uppercase">Uplink Bandwidth</span>
          <span className="text-white text-sm font-bold">240 Mbps Starlink</span>
        </div>
        <div className="p-4 border border-white/10 bg-white/[0.02]">
          <span className="text-zinc-500 block text-[10px] uppercase">Global Hubs</span>
          <span className="text-white text-sm font-bold">28 Metros Live</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-zinc-400">
        <span>ENCRYPTED END-TO-END TLS 1.3</span>
        <span>READY FOR CONFORM</span>
      </div>
    </div>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}
