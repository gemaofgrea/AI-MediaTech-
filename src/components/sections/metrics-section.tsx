"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";

export interface MetricItem {
  id: string;
  value: number;
  suffix?: string;
  number: string;
  unit: string;
  description: string;
  mediaDescription?: string;
}

const METRICS: MetricItem[] = [
  {
    id: "metric-1",
    value: 12,
    suffix: "",
    number: "12",
    unit: "Years",
    description: "Directing digital cinema, virtual production & media globally",
    mediaDescription: "Directing digital cinema, virtual production & media globally",
  },
  {
    id: "metric-2",
    value: 87,
    suffix: "",
    number: "87",
    unit: "Productions",
    description: "Narrative films, virtual LED volumes & global fashion campaigns",
    mediaDescription: "Narrative films, virtual LED volumes & global fashion campaigns",
  },
  {
    id: "metric-3",
    value: 3,
    suffix: "+",
    number: "3+",
    unit: "Years",
    description: "Average multi-year studio retainers & brand partnerships",
    mediaDescription: "Average multi-year studio retainers & brand partnerships",
  },
  {
    id: "metric-4",
    value: 6,
    suffix: "k",
    number: "6k",
    unit: "Hours",
    description: "In proprietary neural synthesis, telecine & 16K pre-press pipelines",
    mediaDescription: "In proprietary neural synthesis, telecine & 16K pre-press pipelines",
  },
];

interface CountingNumberProps {
  value: number;
  suffix?: string;
  isActive: boolean;
}

function CountingNumber({ value, suffix = "", isActive }: CountingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, value, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = `${Math.round(latest)}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, motionVal, value, suffix]);

  return (
    <span
      ref={ref}
      className={`metric-number font-primary text-7xl sm:text-8xl md:text-9xl font-normal tracking-[-0.035em] block transition-colors duration-150 tabular-nums ${
        isActive ? "!text-black" : "text-black dark:text-white"
      }`}
    >
      0{suffix}
    </span>
  );
}

export function MetricsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [contextMode] = useState<"original" | "mediatech">("mediatech");

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8 }}
      className="relative w-full bg-[#0c0c0e] py-20 sm:py-28 px-4 sm:px-8 lg:px-14 select-none overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* 4 Metrics Columns Grid (Animated staggered reveal & count animation) */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 relative border-l border-r border-black/[0.08] dark:border-white/[0.08]"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {METRICS.map((item, idx) => {
            const isActive = hoveredIdx === idx;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.75,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                className={`relative min-h-[340px] sm:min-h-[380px] p-8 sm:p-9 flex flex-col justify-between transition-colors duration-200 cursor-pointer ${
                  idx !== 0 ? "border-t sm:border-t-0 sm:border-l border-black/[0.08] dark:border-white/[0.08]" : ""
                }`}
              >
                {/* Active Highlight Background: Only active when hovering */}
                {isActive && (
                  <motion.div
                    layoutId="metricHoverCardHighlight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-gradient-to-br from-[#8ee034] via-[#9eec38] to-[#bcf84a] z-0 shadow-[0_20px_60px_rgba(142,224,50,0.3)]"
                  />
                )}

                {/* Top Unit Label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  className="relative z-10 w-full flex justify-end"
                >
                  <span
                    className={`metric-unit font-primary text-xs sm:text-sm font-medium transition-colors duration-150 ${
                      isActive ? "!text-black/80 font-semibold" : "text-zinc-600 dark:text-white/60"
                    }`}
                  >
                    {item.unit}
                  </span>
                </motion.div>

                {/* Center Monumental Number with Count-Up Animation */}
                <div className="relative z-10 my-auto py-4">
                  <Magnetic strength={0.25}>
                    <CountingNumber
                      value={item.value}
                      suffix={item.suffix}
                      isActive={isActive}
                    />
                  </Magnetic>
                </div>

                {/* Bottom Narrative Description */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  className="relative z-10 pt-4"
                >
                  <p
                    className={`metric-desc font-primary text-xs sm:text-[13px] leading-relaxed max-w-[210px] transition-colors duration-150 ${
                      isActive ? "!text-black/85 font-medium" : "text-zinc-600 dark:text-white/50"
                    }`}
                  >
                    {contextMode === "original" ? item.description : item.mediaDescription}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
