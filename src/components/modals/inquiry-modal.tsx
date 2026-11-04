"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { submitInquiry, type InquirySubmission } from "@/lib/firebase";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLeadsHud?: () => void;
  initialService?: string;
  initialBudget?: string;
  initialTimeline?: string;
}

const USER_ROLES = [
  "Brand / Company",
  "Agency / Studio",
  "Creator / Director",
  "Individual",
];

const SERVICES = [
  "Movie & Video Making",
  "Video Editing & Processing",
  "Model & Fashion Photography",
  "AI Image Generation & Processing",
  "Professional Photographers, Videographers & Artists",
];

const BUDGETS = [
  "Under $15k",
  "$15k – $35k",
  "$35k – $75k",
  "$75k+",
];

const TIMELINES = [
  "Immediate (< 2 wks)",
  "1 – 2 Months",
  "Flexible",
];

export function InquiryModal({
  isOpen,
  onClose,
  onOpenLeadsHud,
  initialService,
  initialBudget,
  initialTimeline,
}: InquiryModalProps) {
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userRole, setUserRole] = useState("Brand / Company");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Movie & Video Making",
  ]);
  const [budget, setBudget] = useState("$15k – $35k");
  const [timeline, setTimeline] = useState("1 – 2 Months");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    id: string;
    mode: "firestore" | "local_resilience";
  } | null>(null);

  // Sync initial props
  useEffect(() => {
    if (initialService) {
      const match = SERVICES.find((s) =>
        s.toLowerCase().includes(initialService.toLowerCase().slice(0, 5))
      );
      if (match) setSelectedServices([match]);
    }
  }, [initialService]);

  useEffect(() => {
    if (initialBudget) setBudget(initialBudget);
    if (initialTimeline) setTimeline(initialTimeline);
  }, [initialBudget, initialTimeline]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(service)) {
        if (prev.length === 1) return prev;
        return prev.filter((s) => s !== service);
      }
      return [...prev, service];
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!mobile.trim() || mobile.trim().length < 6) {
      errs.mobile = "Please enter your phone number";
    }
    if (!message.trim() || message.trim().length < 8) {
      errs.message = "Please share a brief note about your project";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await submitInquiry({
        name: name.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        userType: (userRole.includes("Brand")
          ? "Brand / Enterprise"
          : userRole.includes("Agency")
            ? "Fashion Label / Agency"
            : userRole.includes("Creator")
              ? "Indie Filmmaker / Creator"
              : "Individual Visionary") as InquirySubmission["userType"],
        services: selectedServices,
        budget,
        timeline,
        projectBrief: message.trim(),
        preferredPipeline: "Hybrid Human + AI",
      });

      setSubmissionResult(res);
      setIsSuccess(true);
    } catch {
      setErrors({ form: "Could not send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMobile("");
    setMessage("");
    setErrors({});
    setIsSuccess(false);
    setSubmissionResult(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Soft Dim Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
        />

        {/* Clean, Elegant Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-[#0c0c0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 my-6 text-white"
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 sm:px-8 pt-7 pb-4 border-b border-white/[0.06]">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-normal tracking-[-0.02em] text-white">
                Start a Conversation
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light">
                Tell us about your project. We typically respond within 24 hours.
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer -mr-1 -mt-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[78vh] overflow-y-auto px-6 sm:px-8 py-6">
            {isSuccess ? (
              /* Success Confirmation */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-5"
              >
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white mx-auto">
                  <Check className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-normal text-white">
                    Message Sent
                  </h3>
                  <p className="text-sm text-zinc-400 font-light max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-medium">{name}</span>. We&apos;ve received your inquiry and our team will be in touch shortly.
                  </p>

                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-white text-black text-xs font-medium rounded-full hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              </motion.div>
            ) : (
              /* The Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.form && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300">
                    {errors.form}
                  </div>
                )}

                {/* 1. Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300 block">
                      Name <span className="text-zinc-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                      }}
                      placeholder="Jane Doe"
                      className={`w-full px-3.5 py-2.5 bg-white/[0.03] border ${errors.name ? "border-red-400" : "border-white/10 focus:border-white/40"
                        } rounded-lg text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300 block">
                      Email <span className="text-zinc-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      placeholder="jane@company.com"
                      className={`w-full px-3.5 py-2.5 bg-white/[0.03] border ${errors.email ? "border-red-400" : "border-white/10 focus:border-white/40"
                        } rounded-lg text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300 block">
                      Phone <span className="text-zinc-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                        if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: "" }));
                      }}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full px-3.5 py-2.5 bg-white/[0.03] border ${errors.mobile ? "border-red-400" : "border-white/10 focus:border-white/40"
                        } rounded-lg text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors`}
                    />
                    {errors.mobile && (
                      <p className="text-[11px] text-red-400">{errors.mobile}</p>
                    )}
                  </div>
                </div>

                {/* 2. User Role */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-300 block">
                    I am representing
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {USER_ROLES.map((role) => {
                      const isSelected = userRole === role;
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setUserRole(role)}
                          className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer border ${isSelected
                            ? "bg-white text-black font-medium border-white"
                            : "bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
                            }`}
                        >
                          {role}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Services of Interest */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-300 block">
                    Services needed
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((srv) => {
                      const isSelected = selectedServices.includes(srv);
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => toggleService(srv)}
                          className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer border ${isSelected
                            ? "bg-white text-black font-medium border-white"
                            : "bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
                            }`}
                        >
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-300 block">
                      Estimated budget
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {BUDGETS.map((b) => {
                        const isSelected = budget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setBudget(b)}
                            className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer border ${isSelected
                              ? "bg-white text-black font-medium border-white"
                              : "bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
                              }`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-300 block">
                      Target launch
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {TIMELINES.map((t) => {
                        const isSelected = timeline === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTimeline(t)}
                            className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer border ${isSelected
                              ? "bg-white text-black font-medium border-white"
                              : "bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
                              }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 5. Project Details */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300 block">
                    Project details <span className="text-zinc-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
                    }}
                    placeholder="Tell us about your project, goals, key deliverables, or deadlines..."
                    className={`w-full px-3.5 py-3 bg-white/[0.03] border ${errors.message ? "border-red-400" : "border-white/10 focus:border-white/40"
                      } rounded-lg text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors leading-relaxed resize-none`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Submit Row */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06]">
                  <p className="text-[11px] text-zinc-500">
                    Your details are confidential and never shared.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 bg-white text-black hover:bg-zinc-200 text-xs font-medium rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Inquiry"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
