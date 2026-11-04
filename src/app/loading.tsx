import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] text-white select-none">
      {/* Background ambient glow */}
      <div className="absolute w-72 h-72 rounded-full bg-lime-400/5 blur-[100px] pointer-events-none" />

      {/* Optical Reticle Spinner */}
      <div className="relative flex items-center justify-center w-28 h-28">
        {/* Outer dashed compass/aperture ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-[spin_10s_linear_infinite]" />

        {/* Middle counter-rotating gradient iris */}
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-lime-400 border-r-white/40 animate-[spin_1.4s_cubic-bezier(0.4,0,0.2,1)_infinite]" />

        {/* Inner reverse ring */}
        <div className="absolute inset-5 rounded-full border border-white/10 border-b-lime-400/80 animate-[spin_2s_linear_infinite_reverse]" />

        {/* Viewfinder crosshairs */}
        <div className="absolute w-6 h-[1px] bg-white/30" />
        <div className="absolute h-6 w-[1px] bg-white/30" />

        {/* Central neural sensor dot */}
        <div className="relative w-2.5 h-2.5 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.8)] animate-pulse" />
      </div>

      {/* Monospace Telemetry Readout */}
      <div className="mt-8 flex flex-col items-center space-y-2 text-center">
        <div className="flex items-center gap-2 font-mono-code text-[11px] tracking-[0.25em] text-zinc-400 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" />
          <span>BUFFERING STREAM // 24 FPS</span>
        </div>
        <p className="font-mono-code text-[10px] text-zinc-600 tracking-widest uppercase">
          ACES 2065-1 COLOR PIPELINE
        </p>
      </div>
    </div>
  );
}
