"use client";

import React, { useState } from "react";
import { ArrowUpRight, ShieldCheck, Clock, Users, FileText } from "lucide-react";

interface EstimatorProps {
  onApplyEstimate: (data: {
    service: string;
    budgetRange: string;
    timeline: string;
    pipeline: "AI-Native Generative" | "Hybrid Human + AI" | "Pure Classical Directed";
  }) => void;
}

export function CostEstimator({ onApplyEstimate }: EstimatorProps) {
  const [discipline, setDiscipline] = useState<string>("commercial");
  const [pipelineTier, setPipelineTier] = useState<"hybrid" | "ai" | "classical">("hybrid");
  const [resolution, setResolution] = useState<string>("8k");
  const [timelineSpeed, setTimelineSpeed] = useState<string>("standard");

  const disciplines = [
    { id: "narrative", label: "01 / Narrative Cinema & Virtual Stage", base: 35000, days: 21 },
    { id: "commercial", label: "02 / Luxury Commercial & Brand Anthem", base: 22000, days: 14 },
    { id: "couture", label: "03 / Haute Couture & Fashion Lookbook", base: 14000, days: 7 },
    { id: "telecine", label: "04 / Telecine, Video Editing & 8K Upscale", base: 7500, days: 4 },
    { id: "synthesis", label: "05 / Generative Synthesis & Brand LoRAs", base: 6000, days: 3 },
  ];

  const pipelineModels = [
    {
      id: "hybrid" as const,
      title: "Hybrid Human + Neural VFX (Recommended)",
      sub: "Physical ARRI/RED anamorphic camera passes with real-time neural VFX & ACES color finish.",
      mult: 1.0,
      dayMult: 1.0,
      crew: "1 Director of Photography + 1 Neural Visual Lead + 1 Master Telecine Colorist",
    },
    {
      id: "ai" as const,
      title: "AI-Native Generative Synthesis",
      sub: "Ultra-fast iterative turnaround, custom diffusion checkpoints & virtual digital twins.",
      mult: 0.75,
      dayMult: 0.5,
      crew: "1 Neural Prompt Architect + 1 CGI Virtual Artist + 1 Finisher",
    },
    {
      id: "classical" as const,
      title: "Pure Classical Optical Studio",
      sub: "Full physical studio crew, international location scouting, gaffer & lighting packages.",
      mult: 1.65,
      dayMult: 1.7,
      crew: "Full Physical Camera Crew + Gaffer + Production Manager + Traditional Colorist",
    },
  ];

  const deliverableSpecs = [
    { id: "8k", title: "8K DCI Theatrical Master (Dolby Vision)", mult: 1.25 },
    { id: "4k", title: "4K UHD Broadcast Master (HDR10+)", mult: 1.0 },
    { id: "social", title: "Omnichannel Multi-Aspect (9:16 + 16:9 + 4:5)", mult: 1.15 },
  ];

  const speeds = [
    { id: "rush", title: "Expedited Rush (Priority Concierge)", mult: 1.35 },
    { id: "standard", title: "Standard Production Schedule", mult: 1.0 },
    { id: "flexible", title: "Extended Project Retainer", mult: 0.9 },
  ];

  const selectedDiscipline = disciplines.find((d) => d.id === discipline)!;
  const selectedModel = pipelineModels.find((m) => m.id === pipelineTier)!;
  const selectedSpec = deliverableSpecs.find((s) => s.id === resolution)!;
  const selectedSpeed = speeds.find((s) => s.id === timelineSpeed)!;

  const calculatedBase =
    selectedDiscipline.base *
    selectedModel.mult *
    selectedSpec.mult *
    selectedSpeed.mult;

  const lowEstimate = Math.round((calculatedBase * 0.9) / 500) * 500;
  const highEstimate = Math.round((calculatedBase * 1.25) / 500) * 500;
  const daysEstimate = Math.max(
    2,
    Math.round(selectedDiscipline.days * selectedModel.dayMult * (timelineSpeed === "rush" ? 0.45 : 1)),
  );

  const getBudgetString = () => {
    if (highEstimate < 10000) return "< $10,000";
    if (highEstimate <= 25000) return "$10,000 - $25,000";
    if (highEstimate <= 50000) return "$25,000 - $50,000";
    if (highEstimate <= 100000) return "$50,000 - $100,000";
    return "$100,000+";
  };

  const handleApply = () => {
    const pipelineMap = {
      hybrid: "Hybrid Human + AI" as const,
      ai: "AI-Native Generative" as const,
      classical: "Pure Classical Directed" as const,
    };

    onApplyEstimate({
      service: selectedDiscipline.label.split("//")[1]?.trim() || selectedDiscipline.label,
      budgetRange: getBudgetString(),
      timeline: timelineSpeed === "rush" ? "Immediate (< 2 weeks)" : "Within 1 Month",
      pipeline: pipelineMap[pipelineTier],
    });

    const el = document.getElementById("commission");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="estimate" className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-12 border-b hairline-border">
        <div>
          <div className="font-mono-tech text-xs uppercase tracking-widest text-[#c5a059] mb-2">
            05 // COMMISSION SCOPE ESTIMATOR
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#f4f3ef]">
            Production Bid <span className="gold-shimmer">Architecture</span>
          </h2>
          <p className="text-sm text-[#8e8d97] max-w-xl mt-2 font-light">
            Interactive production estimator modeling investment brackets, crew allocation, and turnaround schedules.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-8 atelier-card rounded-sm p-6 sm:p-8 border hairline-border">
          {/* 1. Discipline */}
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-widest text-[#c5a059] mb-3">
              1. PRODUCTION DISCIPLINE
            </div>
            <div className="space-y-2">
              {disciplines.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDiscipline(d.id)}
                  className={`w-full p-3.5 rounded-xs text-left font-mono-tech text-xs uppercase tracking-wider border transition-colors flex items-center justify-between cursor-pointer ${
                    discipline === d.id
                      ? "bg-[#181822] text-[#dfc287] border-[#c5a059]"
                      : "bg-[#0d0d12] text-[#8e8d97] hairline-border hover:text-[#f4f3ef]"
                  }`}
                >
                  <span className="font-semibold">{d.label}</span>
                  <span className="text-[#8e8d97]">FROM ${d.base.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Model */}
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-widest text-[#c5a059] mb-3">
              2. PRODUCTION ARCHITECTURE MODEL
            </div>
            <div className="space-y-2.5">
              {pipelineModels.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPipelineTier(m.id)}
                  className={`w-full p-4 rounded-xs text-left border transition-colors cursor-pointer ${
                    pipelineTier === m.id
                      ? "bg-[#181822] border-[#c5a059] text-white"
                      : "bg-[#0d0d12] hairline-border text-[#8e8d97] hover:text-[#f4f3ef]"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono-tech text-xs uppercase tracking-wider mb-1">
                    <span className="font-bold text-[#f4f3ef]">{m.title}</span>
                    {m.id === "hybrid" && (
                      <span className="text-[10px] text-[#c5a059] border border-[#c5a059]/40 px-1.5 py-0.5 rounded-xs">
                        PREFERRED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#8e8d97] font-light leading-relaxed">{m.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Output Specs & Speed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="font-mono-tech text-xs uppercase tracking-widest text-[#c5a059] mb-2">
                3. EXHIBITION MASTER
              </div>
              <div className="space-y-2">
                {deliverableSpecs.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setResolution(s.id)}
                    className={`w-full p-2.5 rounded-xs text-left font-mono-tech text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
                      resolution === s.id
                        ? "bg-[#181822] text-[#dfc287] border-[#c5a059]"
                        : "bg-[#0d0d12] text-[#8e8d97] hairline-border hover:text-[#f4f3ef]"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono-tech text-xs uppercase tracking-widest text-[#c5a059] mb-2">
                4. TARGET TIMELINE
              </div>
              <div className="space-y-2">
                {speeds.map((sp) => (
                  <button
                    key={sp.id}
                    onClick={() => setTimelineSpeed(sp.id)}
                    className={`w-full p-2.5 rounded-xs text-left font-mono-tech text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
                      timelineSpeed === sp.id
                        ? "bg-[#181822] text-[#dfc287] border-[#c5a059]"
                        : "bg-[#0d0d12] text-[#8e8d97] hairline-border hover:text-[#f4f3ef]"
                    }`}
                  >
                    {sp.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Bid Sheet */}
        <div className="lg:col-span-5 atelier-card-elevated rounded-sm p-6 sm:p-8 border border-[#c5a059]/40 sticky top-28 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b hairline-border font-mono-tech text-xs">
            <span className="text-[#c5a059] font-bold uppercase tracking-widest">
              ESTIMATED PRODUCTION BID
            </span>
            <span className="text-zinc-500">REF: BID-2026</span>
          </div>

          <div>
            <div className="font-mono-tech text-[10px] text-[#8e8d97] uppercase tracking-wider">
              INVESTMENT BRACKET (USD)
            </div>
            <div className="font-editorial text-3xl sm:text-4xl font-bold text-[#f4f3ef] gold-shimmer mt-1">
              ${lowEstimate.toLocaleString()} – ${highEstimate.toLocaleString()}
            </div>
            <p className="text-xs text-[#8e8d97] font-light mt-1">
              Inclusive of director fees, neural compute clusters, and master exhibition exports.
            </p>
          </div>

          {/* Breakdown Telemetry */}
          <div className="space-y-3 pt-2 border-t hairline-border font-mono-tech text-xs">
            <div className="flex items-center justify-between p-3 bg-[#0c0c11] border hairline-border">
              <span className="text-[#8e8d97] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#c5a059]" /> Production Turnaround:
              </span>
              <span className="text-[#f4f3ef] font-bold">~{daysEstimate} Business Days</span>
            </div>

            <div className="p-3 bg-[#0c0c11] border hairline-border space-y-1">
              <span className="text-[#8e8d97] flex items-center gap-1.5 uppercase text-[10px]">
                <Users className="w-3.5 h-3.5 text-[#c5a059]" /> Assigned Creative Unit:
              </span>
              <div className="text-[#dfc287] text-xs font-semibold">{selectedModel.crew}</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#0c0c11] border hairline-border">
              <span className="text-[#8e8d97] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" /> Commercial Copyright:
              </span>
              <span className="text-emerald-400 font-semibold">100% Full Worldwide Buyout</span>
            </div>
          </div>

          {/* Transfer Button */}
          <button
            onClick={handleApply}
            className="w-full py-3.5 px-6 bg-[#f4f3ef] hover:bg-[#dfc287] text-[#070709] font-mono-tech text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>LOCK ESTIMATE & COMMISSION BRIEF</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <p className="font-mono-tech text-[10px] text-center text-[#8e8d97] uppercase tracking-wider">
            Automated NDA executed upon submission. Director response within 24h.
          </p>
        </div>
      </div>
    </section>
  );
}
