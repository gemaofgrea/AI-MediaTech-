import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] text-white select-none">
      {/* Background soft ambient green glow */}
      <div className="absolute w-64 h-64 rounded-full bg-lime-400/10 blur-[90px] pointer-events-none" />

      {/* Normal Green Shining Loader */}
      <div className="relative flex items-center justify-center">
        {/* Ambient glow behind spinner */}
        <div className="absolute w-12 h-12 rounded-full bg-lime-400/25 blur-md animate-pulse" />

        {/* Circular Shining Spinner Ring */}
        <div className="w-12 h-12 rounded-full border-[3px] border-white/10 border-t-lime-400 border-r-lime-400/70 animate-spin shadow-[0_0_18px_rgba(163,230,53,0.55)]" />

        {/* Center glowing dot */}
        <div className="absolute w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.9)] animate-ping" />
      </div>

      {/* Loading Text */}
      <div className="mt-6 flex flex-col items-center space-y-1.5 text-center">
        <div className="flex items-center gap-2 font-mono-code text-xs tracking-[0.25em] text-white uppercase font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse shadow-[0_0_6px_rgba(163,230,53,0.8)]" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-lime-200 to-white">
            Loading...
          </span>
        </div>
        <p className="font-mono-code text-[11px] text-zinc-500 tracking-wider">
          AI MEDIATECH
        </p>
      </div>
    </div>
  );
}
