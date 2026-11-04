"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Send, Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050507] border-t hairline-border pt-20 pb-12 px-6 lg:px-10 text-[#8e8d97] font-mono-tech">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Colophon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-sm bg-[#13131a] border hairline-border flex items-center justify-center">
                <span className="font-editorial text-sm font-bold text-[#c5a059]">L</span>
              </div>
              <span className="font-editorial text-base font-bold tracking-widest text-[#f4f3ef] uppercase">
                ATELIER LUMA
              </span>
            </div>

            <p className="text-xs text-[#8e8d97] font-sans font-light max-w-sm leading-relaxed">
              An independent creative media atelier directing feature films, haute couture editorials,
              virtual LED volume production, and generative synthesis for global brands and entertainment studios.
            </p>

            <div className="pt-2 text-[10px] text-[#dfc287] uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>STUDIO ATELIERS ACTIVE IN PARIS, NYC, LONDON, TOKYO</span>
            </div>
          </div>

          {/* Studio Locations */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#f4f3ef] font-bold mb-4">
              STUDIO ATELIERS
            </h4>
            <div className="space-y-3 text-[11px] text-[#8e8d97]">
              <div>
                <span className="text-[#dfc287] block">PARIS 8E</span>
                <span className="text-[10px] text-zinc-500">18 Rue du Faubourg Saint-Honoré</span>
              </div>
              <div>
                <span className="text-[#dfc287] block">NEW YORK CITY</span>
                <span className="text-[10px] text-zinc-500">547 W 26th St, Chelsea</span>
              </div>
              <div>
                <span className="text-[#dfc287] block">LONDON SOHO</span>
                <span className="text-[10px] text-zinc-500">14 Greek Street, Soho</span>
              </div>
              <div>
                <span className="text-[#dfc287] block">TOKYO SHIBUYA</span>
                <span className="text-[10px] text-zinc-500">5-7-22 Minami-Aoyama</span>
              </div>
            </div>
          </div>

          {/* Quick Indices */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#f4f3ef] font-bold mb-4">
              DISCIPLINES
            </h4>
            <ul className="space-y-2 text-[11px] text-[#8e8d97]">
              <li>
                <a href="#disciplines" className="hover:text-[#f4f3ef] transition-colors">
                  01 / Narrative Cinema & Virtual Stage
                </a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-[#f4f3ef] transition-colors">
                  02 / Telecine & 8K Processing
                </a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-[#f4f3ef] transition-colors">
                  03 / Haute Couture & Runways
                </a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-[#f4f3ef] transition-colors">
                  04 / Generative Model Synthesis
                </a>
              </li>
              <li>
                <a href="#guild" className="hover:text-[#f4f3ef] transition-colors">
                  05 / The Directors Guild
                </a>
              </li>
            </ul>
          </div>

          {/* Dispatch */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#f4f3ef] font-bold mb-4">
              STUDIO DISPATCH
            </h4>
            <p className="text-[11px] text-[#8e8d97] font-sans font-light mb-3">
              Quarterly monographs on generative cinema, virtual production telemetry, and couture AI.
            </p>

            {subscribed ? (
              <div className="p-2.5 bg-[#111117] border border-[#c5a059]/40 text-[#dfc287] text-[10px] flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>REGISTERED FOR DISPATCH.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter corporate email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0d0d12] border hairline-border px-3 py-2 text-xs text-[#f4f3ef] placeholder-zinc-600 focus:outline-none focus:border-[#c5a059]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-[#f4f3ef] hover:bg-[#dfc287] text-[#070709] transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t hairline-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#8e8d97]">
          <div>
            © {new Date().getFullYear()} ATELIER LUMA INC. ALL RIGHTS RESERVED. ACES 2065-1 CONFORMANT • PERSISTED VIA CLOUD FIRESTORE.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#dcd8cf] hover:text-white transition-colors cursor-pointer"
          >
            <span>BACK TO APEX</span>
            <ArrowUp className="w-3 h-3 text-[#c5a059]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
