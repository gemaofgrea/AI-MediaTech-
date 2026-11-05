"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Database, Clock } from "lucide-react";

interface TopHeaderProps {
  onOpenLeadsHud: () => void;
}

export function TopHeader({ onOpenLeadsHud }: TopHeaderProps) {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-30 bg-[#09090b]/80 backdrop-blur-md border-b border-white/[0.06]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:border-lime-400/40 transition-colors">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M4 3h16l-4.5 6 4.5 6H4V3z" fill="white" />
              <line x1="8" y1="3" x2="8" y2="15" stroke="#a3e635" strokeWidth="1.8" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-sm tracking-tight text-white group-hover:text-lime-300 transition-colors">
              AI MediaTech
            </span>
            <span className="font-mono-code text-[11px] text-zinc-500 hidden sm:inline">
              / Cinema &amp; Neural Media Platform
            </span>
          </div>
        </Link>

        {/* Center Status Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-300 font-medium">Available for Q2/Q3 Commissions</span>
        </div>

        {/* Right Info */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 font-mono-code text-xs text-[#8a8a8a]">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>UTC {localTime || "12:00:00"}</span>
          </div>

          <button
            onClick={onOpenLeadsHud}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10 text-[11px] font-mono-code text-zinc-300 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
          >
            <Database className="w-3 h-3 text-emerald-400" />
            <span>Leads DB</span>
          </button>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-medium text-xs shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all cursor-pointer"
          >
            <span>Commission Brief</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

