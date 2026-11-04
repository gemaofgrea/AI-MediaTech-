"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, ArrowLeft, AlertTriangle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled client error in AI MediaTech:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#070709] text-white px-6 py-12 select-none overflow-hidden">
      {/* Background radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-500/[0.04] blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between font-mono-code text-xs text-zinc-400">
        <Link href="/" className="flex items-center gap-2.5 text-white hover:text-zinc-300 transition-colors">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
          <span className="font-medium tracking-tight">AI MEDIATECH</span>
        </Link>
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:inline">
          ENGINE EXCEPTION // INTERRUPTED
        </span>
      </header>

      {/* Centerpiece Error Stage */}
      <main className="relative z-10 my-auto flex flex-col items-center text-center max-w-xl mx-auto px-4">
        {/* Viewfinder Reticle Frame */}
        <div className="relative p-8 sm:p-12 border border-white/[0.06] bg-white/[0.01] backdrop-blur-sm">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-400" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-400" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-400" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-400" />

          {/* Status Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/10 text-[11px] font-mono-code text-red-300 uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>RENDER PIPELINE FAULT</span>
          </div>

          <h1 className="font-primary text-2xl sm:text-3xl md:text-4xl font-normal text-white tracking-tight mb-3">
            Neural Stream Interrupted
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-sm mx-auto mb-4">
            An unexpected glitch occurred while synthesizing the visual timeline. The atelier telemetry has recorded this occurrence.
          </p>

          {error.digest && (
            <div className="mb-6 px-3 py-1.5 rounded bg-white/[0.03] border border-white/[0.08] font-mono-code text-[11px] text-zinc-500">
              TRACE DIGEST: {error.digest}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-zinc-200 font-mono-code text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xl cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Recalibrate Engine</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 text-white font-mono-code text-xs uppercase tracking-wider transition-all duration-300"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Atelier</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Colophon */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between font-mono-code text-[11px] text-zinc-600 tracking-wider">
        <span>AI MEDIATECH // FAULT RECOVERY</span>
        <span>AUTOMATED TELEMETRY DISPATCH</span>
      </footer>
    </div>
  );
}
