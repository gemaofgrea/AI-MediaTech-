"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Database, Menu, X, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { toggleAmbientSound, isAmbientPlaying } from "@/lib/sound";

interface NavbarProps {
  onOpenLeadsHud: () => void;
  onOpenShowreel: () => void;
}

export function Navbar({ onOpenLeadsHud, onOpenShowreel }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [parisTime, setParisTime] = useState("");
  const [nycTime, setNycTime] = useState("");
  const [tokyoTime, setTokyoTime] = useState("");

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setParisTime(
        now.toLocaleTimeString("en-GB", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" }),
      );
      setNycTime(
        now.toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit", hour12: false }),
      );
      setTokyoTime(
        now.toLocaleTimeString("en-GB", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit" }),
      );
    };

    updateTimes();
    const interval = setInterval(updateTimes, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    const active = toggleAmbientSound();
    setSoundActive(active);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#070709]/90 backdrop-blur-md border-b hairline-border">
      {/* Studio Header Strip */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Brand Mark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-sm bg-[#13131a] border hairline-border flex items-center justify-center group-hover:border-[#c5a059] transition-colors">
            <span className="font-editorial text-sm font-bold text-[#c5a059]">L</span>
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-base sm:text-lg font-bold tracking-[0.18em] text-[#f4f3ef] uppercase">
              ATELIER LUMA
            </span>
            <span className="font-mono-tech text-[9px] uppercase tracking-[0.25em] text-[#8e8d97]">
              Cinematic & Synthetic Media
            </span>
          </div>
        </Link>

        {/* Global Studio Clocks (Center desktop) */}
        <div className="hidden xl:flex items-center gap-6 font-mono-tech text-[10px] text-[#8e8d97] tracking-wider border-x hairline-border px-6 py-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
            <span className="text-zinc-300">PARIS {parisTime || "12:00"}</span>
          </div>
          <span className="text-zinc-600">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#8a8a8a]">NYC {nycTime || "06:00"}</span>
          </div>
          <span className="text-zinc-600">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#8a8a8a]">TOKYO {tokyoTime || "20:00"}</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="hidden lg:flex items-center gap-8 font-mono-tech text-xs tracking-wider uppercase text-[#8e8d97]">
          {siteConfig.mainNav.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[#f4f3ef] transition-colors relative py-1 group flex items-center gap-1"
            >
              <span className="text-[10px] text-[#c5a059]/70">{item.number}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Subtle Ambient Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-sm font-mono-tech text-[10px] uppercase tracking-wider border transition-colors cursor-pointer ${soundActive
                ? "bg-[#181822] border-[#c5a059]/50 text-[#dfc287]"
                : "bg-transparent hairline-border text-[#8e8d97] hover:text-[#f4f3ef]"
              }`}
            title="Studio Acoustic Ambience"
          >
            {soundActive ? (
              <>
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 bg-[#dfc287] bar-1" />
                  <span className="w-0.5 bg-[#dfc287] bar-2" />
                  <span className="w-0.5 bg-[#dfc287] bar-3" />
                  <span className="w-0.5 bg-[#dfc287] bar-4" />
                </div>
                <span>SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3" />
                <span>SOUND OFF</span>
              </>
            )}
          </button>

          {/* Firestore Inquiries Inspector HUD */}
          <button
            onClick={onOpenLeadsHud}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#111117] hover:bg-[#181822] hairline-border hover:border-[#c5a059]/40 font-mono-tech text-[10px] text-[#dcd8cf] tracking-wider uppercase transition-colors cursor-pointer"
            title="Inspect submitted briefs stored in Firebase Firestore"
          >
            <Database className="w-3 h-3 text-[#c5a059]" />
            <span>INQUIRIES HUD</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </button>

          {/* Primary CTA */}
          <a
            href="#commission"
            className="px-4 py-2 rounded-sm bg-[#f4f3ef] hover:bg-[#dfc287] text-[#070709] font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>COMMISSION</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenLeadsHud}
            className="p-2 rounded-sm bg-[#111117] text-[#c5a059] border hairline-border"
            aria-label="Open Inquiries HUD"
          >
            <Database className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-sm bg-[#111117] text-[#f4f3ef] border hairline-border"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a0a0f] border-b hairline-border p-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-mono-tech text-xs tracking-wider uppercase text-[#dcd8cf]">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 flex items-center justify-between border-b hairline-border"
              >
                <span>
                  <span className="text-[#c5a059] mr-2">{item.number}</span>
                  {item.title}
                </span>
                {item.badge && (
                  <span className="text-[9px] font-mono-tech text-[#c5a059] border border-[#c5a059]/30 px-1.5 py-0.5 rounded-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenShowreel();
              }}
              className="w-full py-2.5 rounded-sm bg-[#13131a] text-[#dfc287] border border-[#c5a059]/30 font-mono-tech text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <span>Play 2026 Showreel</span>
            </button>
            <a
              href="#commission"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-sm bg-[#f4f3ef] text-[#070709] font-mono-tech text-xs font-bold text-center uppercase tracking-wider"
            >
              Commission Project Brief
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
