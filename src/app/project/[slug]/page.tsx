"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Check,
  Send,
} from "lucide-react";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { FloatingDock } from "@/components/layout/floating-dock";
import { ContactFooterSection } from "@/components/sections/contact-footer-section";
import { Magnetic } from "@/components/ui/magnetic";
import { PROJECTS_DATA, type ProjectData } from "@/data/projects-data";
import { submitInquiry } from "@/lib/firebase";
import { InquiryModal } from "@/components/modals/inquiry-modal";
import { LeadsHudModal } from "@/components/modals/leads-hud-modal";
import { ShowreelModal } from "@/components/modals/showreel-modal";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "chronos-led";

  // Find project or fallback to first
  const currentIndex = PROJECTS_DATA.findIndex((p) => p.slug === slug);
  const project: ProjectData =
    currentIndex !== -1 ? PROJECTS_DATA[currentIndex] : PROJECTS_DATA[0];
  const nextProject: ProjectData =
    PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length];

  // Video playback & audio state: Sound starts enabled by default
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play with sound, with resilient fallback for browser policies
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    setIsMuted(false);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser policy blocks sound without direct prior interaction on domain
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
    }

    // Unmute immediately upon first user click/touch anywhere on the page if policy blocked it
    const handleFirstGesture = () => {
      if (videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    };

    // Keyboard shortcut: Press 'M' to mute/unmute
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "m" || e.key === "M") {
        toggleMute();
      }
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project.videoUrl]);

  // Modals
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isLeadsHudOpen, setIsLeadsHudOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  // Clean inquiry form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formBrief, setFormBrief] = useState(
    `Inquiry regarding ${project.title}.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    id: string;
    mode: "firestore" | "local_resilience";
  } | null>(null);
  const [formError, setFormError] = useState("");

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
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSimpleSubmit = async (e: React.FormEvent) => {
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
        services: [project.surveyServiceName || project.serviceCategory],
        budget: "$25,000 - $50,000",
        timeline: "2 - 4 Weeks",
        projectBrief: formBrief,
        preferredPipeline: "Hybrid Human + AI",
      });
      setSubmissionResult({ id: res.id, mode: res.mode });
    } catch {
      setSubmissionResult({
        id: `INQ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        mode: "local_resilience",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean metrics
  const metricsList = project.metrics
    ? project.metrics.split("•").map((m) => m.trim())
    : [];

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
          1. TOP NAVIGATION: ATTRACTIVE BACK BUTTON + TAG ONLY
         ============================================================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pt-8 sm:pt-12 pb-6 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full flex items-center justify-between gap-4 will-change-transform"
      >
        <Magnetic strength={0.25}>
          <Link
            href="/#works"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 backdrop-blur-md text-xs font-mono-code text-zinc-300 hover:text-white transition-all shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-zinc-400 group-hover:text-white" />
            <span className="tracking-wide">Back</span>
          </Link>
        </Magnetic>

        <span className="inline-block px-3.5 py-1 rounded-full border border-white/20 bg-white/[0.03] text-xs font-mono-code text-zinc-300 uppercase tracking-widest">
          {project.slug === "chronos-led" ? "movie&video" : project.tag.toLowerCase()}
        </span>
      </motion.div>

      {/* ==============================================================
          3. CINEMA REEL (Distinct Project Video with Animation)
         ============================================================== */}
      <motion.section
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.05, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 sm:px-12 lg:px-20 pb-20 max-w-7xl mx-auto w-full will-change-transform"
      >
        <div className="relative w-full rounded-none overflow-hidden bg-black border border-white/[0.08] min-h-[380px] sm:min-h-[520px] lg:min-h-[640px] flex items-center justify-center group shadow-2xl">
          <video
            ref={videoRef}
            key={project.videoUrl}
            src={project.videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover object-center"
          />

          {/* Top-Right Floating Quick Audio Status & Mute Toggle */}
          <div className="absolute top-5 right-5 z-20">
            <Magnetic strength={0.3}>
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                className={`px-3.5 py-1.5 rounded-full backdrop-blur-md text-xs font-mono-code flex items-center gap-2 transition-all cursor-pointer border shadow-xl ${
                  isMuted
                    ? "bg-black/75 border-white/20 text-zinc-300 hover:text-white hover:border-white/40"
                    : "bg-[#8ee034]/20 border-[#8ee034]/50 text-[#a8f542] hover:bg-[#8ee034]/30"
                }`}
                title={isMuted ? "Audio is muted. Click to play sound" : "Sound is playing. Click to mute (Key: M)"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="tracking-wide">SOUND MUTED</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#a8f542] animate-pulse" />
                    <span className="flex items-center gap-1.5 font-semibold tracking-wide">
                      SOUND ON
                      <span className="inline-flex gap-0.5 items-end h-2.5">
                        <span className="w-0.5 h-2 bg-[#a8f542] animate-pulse" />
                        <span className="w-0.5 h-3 bg-[#a8f542] animate-pulse" />
                        <span className="w-0.5 h-1.5 bg-[#a8f542] animate-pulse" />
                      </span>
                    </span>
                  </>
                )}
              </button>
            </Magnetic>
          </div>

          {/* Minimalist Controls with Smooth Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute bottom-6 right-6 z-20 flex items-center gap-2"
          >
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause reel" : "Play reel"}
              className="px-3.5 py-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10 shadow-lg"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-white" />}
              <span>{isPlaying ? "Pause" : "Play"}</span>
            </button>

            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className={`px-3.5 py-1.5 backdrop-blur-md text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer border shadow-lg ${
                isMuted
                  ? "bg-black/60 hover:bg-black/80 text-zinc-300 border-white/15"
                  : "bg-white/10 hover:bg-white/20 text-[#a8f542] border-[#8ee034]/40"
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#a8f542]" />
                  <span>Mute</span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* ==============================================================
          4. EDITORIAL NARRATIVE (Left / Right Layout with Smooth Scroll)
         ============================================================== */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 border-t border-white/[0.08] max-w-7xl mx-auto w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column (5 cols): Large Pull Statement */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6 will-change-transform"
          >
            <span className="font-mono-code text-xs text-zinc-500 uppercase tracking-widest block">
              Overview
            </span>

            <blockquote className="font-secondary italic font-light text-2xl sm:text-3xl lg:text-4xl text-white leading-snug">
              &ldquo;{project.summary}&rdquo;
            </blockquote>
          </motion.div>

          {/* Right Column (7 cols): Editorial Prose & Deliverables */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-10 lg:pl-10 lg:border-l border-white/[0.08] will-change-transform"
          >
            <div className="space-y-4">
              <span className="font-mono-code text-xs text-zinc-500 uppercase tracking-widest block">
                The Brief &amp; Execution
              </span>
              <p className="font-primary text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                {project.challenge}
              </p>
              <p className="font-primary text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Deliverables */}
            <div className="pt-6 border-t border-white/[0.08] space-y-4">
              <span className="font-mono-code text-xs text-zinc-500 uppercase tracking-widest block">
                Scope &amp; Deliverables
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.deliverables.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 + idx * 0.05 }}
                    className="flex items-start gap-2.5 text-xs text-zinc-300"
                  >
                    <span className="text-zinc-500 font-mono-code mt-0.5">•</span>
                    <span className="leading-snug">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==============================================================
          5. MEASURABLE IMPACT (Understated Editorial Numbers)
         ============================================================== */}
      {metricsList.length > 0 && (
        <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 border-t border-white/[0.08] max-w-7xl mx-auto w-full overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 space-y-2 will-change-transform"
            >
              <span className="font-mono-code text-xs text-zinc-500 uppercase tracking-widest block">
                Impact
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-white">
                Measurable studio outcomes.
              </h2>
            </motion.div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {metricsList.map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.75,
                    delay: idx * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className="border-t border-white/[0.1] pt-4 space-y-2 cursor-pointer transition-colors hover:border-white/30 will-change-transform"
                >
                  <span className="font-mono-code text-[11px] text-zinc-500 block">
                    0{idx + 1}
                  </span>
                  <p className="font-primary text-lg sm:text-xl text-white font-normal leading-snug">
                    {metric}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==============================================================
          7. PRODUCTION CREDITS (Colophon Style Table)
         ============================================================== */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 border-t border-white/[0.08] max-w-7xl mx-auto w-full overflow-hidden"
      >
        <div className="space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono-code text-xs text-zinc-500 uppercase tracking-widest block"
          >
            Credits &amp; Technology
          </motion.span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-white/[0.08] text-xs">
            {[
              { label: "Direction & Guild", value: project.guildCredits },
              { label: "Optics & Capture", value: project.cameraOptics },
              { label: "Post & Finishing", value: project.postPipeline },
              { label: "Stack", value: project.techStack.join(" • ") },
            ].map((col, idx) => (
              <motion.div
                key={col.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono-code text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">
                  {col.label}
                </span>
                <p className="text-zinc-300 leading-relaxed">{col.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ==============================================================
          8. FOOTER
         ============================================================== */}
      <ContactFooterSection
        onOpenInquiry={() => {
          const el = document.getElementById("inquire");
          if (el) el.scrollIntoView({ behavior: "smooth" });
          else setIsInquiryOpen(true);
        }}
      />

      {/* Modals */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        onOpenLeadsHud={() => setIsLeadsHudOpen(true)}
        initialService={project.surveyServiceName}
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
