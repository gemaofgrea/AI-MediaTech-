"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Check,
  AlertCircle,
  Database,
  Lock,
  ArrowRight,
  ArrowLeft,
  Send,
  Building,
  User,
  Mail,
  Phone,
  FileText,
} from "lucide-react";
import { submitInquiry, isFirebaseConfigured, type InquirySubmission } from "@/lib/firebase";

interface FormProps {
  initialService?: string;
  initialBudget?: string;
  initialTimeline?: string;
  initialPipeline?: "AI-Native Generative" | "Hybrid Human + AI" | "Pure Classical Directed";
  onOpenLeadsHud: () => void;
}

export function InquirySurveyForm({
  initialService,
  initialBudget,
  initialTimeline,
  initialPipeline,
  onOpenLeadsHud,
}: FormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    id: string;
    mode: "firestore" | "local_resilience";
  } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    userType: "Brand / Enterprise" as InquirySubmission["userType"],
    services: initialService ? [initialService] : ["Movie & Video Making (Virtual Production)"],
    budget: initialBudget || "$25,000 - $50,000",
    timeline: initialTimeline || "Within 1 Month",
    preferredPipeline: initialPipeline || "Hybrid Human + AI",
    projectBrief: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        services: Array.from(new Set([...prev.services, initialService])),
      }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialBudget) setFormData((prev) => ({ ...prev, budget: initialBudget }));
    if (initialTimeline) setFormData((prev) => ({ ...prev, timeline: initialTimeline }));
    if (initialPipeline) setFormData((prev) => ({ ...prev, preferredPipeline: initialPipeline }));
  }, [initialBudget, initialTimeline, initialPipeline]);

  const clientTypes: InquirySubmission["userType"][] = [
    "Brand / Enterprise",
    "Fashion Label / Agency",
    "Indie Filmmaker / Creator",
    "Creative Talent / Artist",
    "Individual Visionary",
  ];

  const serviceOptions = [
    "Movie & Video Making (Virtual Production)",
    "Video Editing & Processing (8K Neural Telecine)",
    "Model & Fashion Photography (Digital Runways)",
    "AI Image Generation & Processing (Key Art & LoRAs)",
    "Professional Photographers, Videographers & Artists (Guild)",
  ];

  const budgetTiers = [
    "< $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000+",
  ];

  const timelineTiers = [
    "Immediate (< 2 weeks)",
    "Within 1 Month",
    "2 - 3 Months",
    "Flexible / Retainer",
  ];

  const pipelineModels: InquirySubmission["preferredPipeline"][] = [
    "Hybrid Human + AI",
    "AI-Native Generative",
    "Pure Classical Directed",
  ];

  const toggleService = (srv: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(srv);
      if (exists) {
        if (prev.services.length === 1) return prev;
        return { ...prev, services: prev.services.filter((s) => s !== srv) };
      } else {
        return { ...prev, services: [...prev.services, srv] };
      }
    });
  };

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};
    if (s === 1 && !formData.userType) errs.userType = "Select an organization classification";
    if (s === 2 && formData.services.length === 0) errs.services = "Select at least one discipline";
    if (s === 3 && !formData.budget) errs.budget = "Select an investment range";
    if (s === 4) {
      if (!formData.name.trim()) errs.name = "Full name is required";
      if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = "Valid professional email required";
      if (!formData.mobile.trim() || formData.mobile.length < 7) errs.mobile = "Direct phone/mobile required";
      if (!formData.projectBrief.trim() || formData.projectBrief.length < 10) errs.projectBrief = "Please describe the project scope (min 10 characters)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => Math.min(4, s + 1));
  };

  const handlePrev = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      const res = await submitInquiry({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        userType: formData.userType,
        services: formData.services,
        budget: formData.budget,
        timeline: formData.timeline,
        projectBrief: formData.projectBrief,
        preferredPipeline: formData.preferredPipeline,
      });

      setSubmissionResult(res);

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#c5a059", "#dfc287", "#ffffff", "#f4f3ef"],
      });
    } catch (err) {
      console.error(err);
      setErrors({ form: "Transmission failed. Verify connection and retry." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmissionResult(null);
    setStep(1);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      userType: "Brand / Enterprise",
      services: ["Narrative Film & Virtual Production"],
      budget: "$25,000 - $50,000",
      timeline: "Within 1 Month",
      preferredPipeline: "Hybrid Human + AI",
      projectBrief: "",
    });
  };

  const isConnected = isFirebaseConfigured();

  return (
    <section id="commission" className="py-24 px-6 lg:px-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="ks-badge mb-3">
          <span>05 // INITIATE COMMISSION &amp; BRIEF</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-white">
          Book a Call / Project Brief
        </h2>
        <p className="text-sm text-[#8a8a8a] mt-2 leading-relaxed">
          Submit your production requirements directly to our directorate. Data is transmitted securely and stored in real-time in Firebase Firestore.
        </p>

        {/* Database Status indicator */}
        <div className="flex items-center justify-center gap-4 mt-4 font-mono-code text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-zinc-300">
            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-emerald-400"}`} />
            <span>{isConnected ? "Cloud Firestore Live" : "Client Resilience Storage Active"}</span>
          </div>

          <button
            onClick={onOpenLeadsHud}
            className="text-emerald-400 hover:underline underline-offset-4 cursor-pointer"
          >
            [INSPECT LEADS HUD]
          </button>
        </div>
      </div>

      {/* Main Intake Card */}
      <div className="atelier-card-elevated rounded-sm p-6 sm:p-12 border border-[#c5a059]/30">
        {submissionResult ? (
          /* Confirmation State */
          <div className="text-center py-6 space-y-6">
            <div className="w-14 h-14 rounded-full bg-[#181822] border border-[#c5a059] flex items-center justify-center text-[#dfc287] mx-auto">
              <Check className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold uppercase text-[#f4f3ef]">
                Commission Brief Transmitted
              </h3>
              <p className="text-xs sm:text-sm text-[#8e8d97] font-light mt-2 max-w-md mx-auto">
                Thank you, <span className="text-[#f4f3ef] font-semibold">{formData.name}</span>. Your brief has been registered into the studio production schedule.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="max-w-md mx-auto p-5 bg-[#0c0c11] border hairline-border text-left font-mono-tech text-xs space-y-2.5">
              <div className="flex justify-between border-b hairline-border pb-2">
                <span className="text-[#8e8d97]">Commission ID:</span>
                <span className="text-[#dfc287] font-bold">{submissionResult.id}</span>
              </div>
              <div className="flex justify-between border-b hairline-border pb-2">
                <span className="text-[#8e8d97]">Database Storage:</span>
                <span className="text-emerald-400">
                  {submissionResult.mode === "firestore" ? "Cloud Firestore Collection ('inquiries')" : "Local Persistent Cache"}
                </span>
              </div>
              <div className="flex justify-between border-b hairline-border pb-2">
                <span className="text-[#8e8d97]">Selected Scope:</span>
                <span className="text-[#dcd8cf] truncate max-w-[200px] text-right">{formData.services.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e8d97]">Investment:</span>
                <span className="text-[#dfc287]">{formData.budget}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={onOpenLeadsHud}
                className="px-6 py-3 bg-[#f4f3ef] hover:bg-[#dfc287] text-[#070709] font-mono-tech text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Inspect in Evaluator HUD</span>
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-[#13131a] hover:bg-[#181822] text-[#dcd8cf] font-mono-tech text-xs uppercase tracking-wider border hairline-border transition-colors cursor-pointer"
              >
                Submit Additional Brief
              </button>
            </div>
          </div>
        ) : (
          /* Guided Form Steps */
          <form onSubmit={handleSubmit} noValidate>
            {/* Step Header */}
            <div className="pb-6 mb-8 border-b hairline-border flex items-center justify-between font-mono-tech text-xs">
              <span className="text-[#c5a059] font-bold uppercase tracking-wider">
                STEP 0{step} OF 04 //{" "}
                {step === 1 && "CLIENT CLASSIFICATION"}
                {step === 2 && "REQUIRED DISCIPLINES"}
                {step === 3 && "BUDGET & PIPELINE"}
                {step === 4 && "CONTACT & SCRIPT BRIEF"}
              </span>
              <span className="text-[#8e8d97]">{step * 25}% COMPLETE</span>
            </div>

            {/* Step 1: Client Type */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-editorial text-xl font-bold uppercase text-[#f4f3ef]">
                    Organization Classification
                  </h3>
                  <p className="text-xs text-[#8e8d97] font-light mt-1">
                    Select the profile that best characterizes your commission entity.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {clientTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, userType: type }))}
                      className={`p-4 rounded-xs text-left border transition-colors cursor-pointer flex items-center justify-between font-mono-tech text-xs uppercase tracking-wider ${formData.userType === type
                          ? "bg-[#181822] text-[#dfc287] border-[#c5a059]"
                          : "bg-[#0d0d12] text-[#8e8d97] hairline-border hover:text-[#f4f3ef]"
                        }`}
                    >
                      <span className="font-semibold">{type}</span>
                      {formData.userType === type && <Check className="w-4 h-4 text-[#c5a059]" />}
                    </button>
                  ))}
                </div>
                {errors.userType && <p className="text-xs text-red-400">{errors.userType}</p>}
              </div>
            )}

            {/* Step 2: Services */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-editorial text-xl font-bold uppercase text-[#f4f3ef]">
                    Commission Disciplines
                  </h3>
                  <p className="text-xs text-[#8e8d97] font-light mt-1">
                    Select all production disciplines required for this campaign.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {serviceOptions.map((srv) => {
                    const isSelected = formData.services.includes(srv);
                    return (
                      <div
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`p-4 rounded-xs border transition-colors cursor-pointer flex items-center justify-between font-mono-tech text-xs uppercase tracking-wider ${isSelected
                            ? "bg-[#181822] text-[#dfc287] border-[#c5a059]"
                            : "bg-[#0d0d12] text-[#8e8d97] hairline-border hover:text-[#f4f3ef]"
                          }`}
                      >
                        <span className="font-medium">{srv}</span>
                        <div
                          className={`w-4 h-4 rounded-xs border flex items-center justify-center ${isSelected ? "bg-[#c5a059] border-[#c5a059] text-black" : "border-zinc-700 bg-black"
                            }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.services && <p className="text-xs text-red-400">{errors.services}</p>}
              </div>
            )}

            {/* Step 3: Budget, Timeline, Pipeline */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="font-mono-tech text-xs uppercase tracking-widest text-[#c5a059] block mb-2 font-bold">
                    Target Investment Bracket (USD)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {budgetTiers.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, budget: b }))}
                        className={`p-3 rounded-xs font-mono-tech text-xs tracking-wider uppercase border transition-colors cursor-pointer ${formData.budget === b
                            ? "bg-[#181822] text-[#dfc287] border-[#c5a059]"
                            : "bg-[#0d0d12] text-[#8e8d97] hairline-border hover:text-[#f4f3ef]"
                          }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-mono-tech text-xs uppercase tracking-widest text-[#c5a059] block mb-2 font-bold">
                    Delivery Schedule
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timelineTiers.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, timeline: t }))}
                        className={`p-3 rounded-xs font-mono-tech text-xs tracking-wider uppercase border transition-colors cursor-pointer ${formData.timeline === t
                            ? "bg-[#181822] text-[#dfc287] border-[#c5a059]"
                            : "bg-[#0d0d12] text-[#8e8d97] hairline-border hover:text-[#f4f3ef]"
                          }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-mono-tech text-xs uppercase tracking-widest text-[#c5a059] block mb-2 font-bold">
                    Production Architecture Model
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {pipelineModels.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, preferredPipeline: p }))}
                        className={`p-3 rounded-xs font-mono-tech text-xs tracking-wider uppercase border transition-colors cursor-pointer ${formData.preferredPipeline === p
                            ? "bg-[#181822] text-[#dfc287] border-[#c5a059]"
                            : "bg-[#0d0d12] text-[#8e8d97] hairline-border hover:text-[#f4f3ef]"
                          }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact & Brief */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-editorial text-xl font-bold uppercase text-[#f4f3ef]">
                    Direct Contact & Script Brief
                  </h3>
                  <p className="text-xs text-[#8e8d97] font-light mt-1">
                    Your brief remains strictly confidential under automated mutual NDA.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono-tech text-[10px] uppercase tracking-wider text-[#8e8d97] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vivienne St. Laurent"
                      className="w-full bg-[#0d0d12] border hairline-border px-3.5 py-2.5 text-xs text-[#f4f3ef] font-mono-tech placeholder-zinc-600 focus:outline-none focus:border-[#c5a059]"
                    />
                    {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="font-mono-tech text-[10px] uppercase tracking-wider text-[#8e8d97] block mb-1">
                      Corporate / Studio Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. vivienne@maison.com"
                      className="w-full bg-[#0d0d12] border hairline-border px-3.5 py-2.5 text-xs text-[#f4f3ef] font-mono-tech placeholder-zinc-600 focus:outline-none focus:border-[#c5a059]"
                    />
                    {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="font-mono-tech text-[10px] uppercase tracking-wider text-[#8e8d97] block mb-1">
                    Direct Mobile / WhatsApp (with country code) *
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="e.g. +33 6 42 90 18 22"
                    className="w-full bg-[#0d0d12] border hairline-border px-3.5 py-2.5 text-xs text-[#f4f3ef] font-mono-tech placeholder-zinc-600 focus:outline-none focus:border-[#c5a059]"
                  />
                  {errors.mobile && <p className="text-[10px] text-red-400 mt-1">{errors.mobile}</p>}
                </div>

                <div>
                  <label className="font-mono-tech text-[10px] uppercase tracking-wider text-[#8e8d97] block mb-1">
                    Executive Brief & Creative References *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.projectBrief}
                    onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                    placeholder="Provide script premise, aesthetic tone, reference films or runway lookbooks, and any specific talent requests..."
                    className="w-full bg-[#0d0d12] border hairline-border p-3 text-xs text-[#f4f3ef] font-mono-tech placeholder-zinc-600 focus:outline-none focus:border-[#c5a059]"
                  />
                  {errors.projectBrief && <p className="text-[10px] text-red-400 mt-1">{errors.projectBrief}</p>}
                </div>

                <div className="flex items-center gap-2 font-mono-tech text-[10px] text-[#8e8d97] pt-1">
                  <Lock className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>256-bit encrypted transmission direct to Cloud Firestore. Senior director assigned upon receipt.</span>
                </div>
              </div>
            )}

            {/* Stepper Buttons */}
            <div className="flex items-center justify-between pt-8 mt-6 border-t hairline-border">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2.5 bg-[#0d0d12] hover:bg-[#181822] text-[#dcd8cf] font-mono-tech text-xs uppercase tracking-wider border hairline-border transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>PREVIOUS</span>
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-[#f4f3ef] hover:bg-[#dfc287] text-[#070709] font-mono-tech text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>CONTINUE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-3 bg-[#f4f3ef] hover:bg-[#dfc287] text-[#070709] font-mono-tech text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>TRANSMITTING TO FIRESTORE...</span>
                    </>
                  ) : (
                    <>
                      <span>EXECUTE COMMISSION BRIEF</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
