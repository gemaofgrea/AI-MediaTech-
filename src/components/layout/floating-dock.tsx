"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface FloatingDockProps {
  onOpenLeadsHud?: () => void;
  onOpenShowreel?: () => void;
  onOpenInquiry?: () => void;
}

export function FloatingDock({ onOpenInquiry }: FloatingDockProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("works");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Hysteresis threshold to prevent any jumpy flickering
          if (scrollY > 95) {
            setIsScrolled(true);
          } else if (scrollY < 65) {
            setIsScrolled(false);
          }

          const sections = ["works", "services", "disciplines", "about", "contact"];
          const scrollPosition = scrollY + 300;

          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                // Map disciplines to services, roster to about
                const mappedId =
                  section === "disciplines"
                    ? "services"
                    : section;
                setActiveSection(mappedId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "works", label: "Work", href: "/#works" },
    { id: "services", label: "Services", href: "/#services" },
    { id: "about", label: "About", href: "/#about" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    tabId: string
  ) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
        setActiveSection(tabId);
      }
    }
  };

  const currentTab = hoveredTab || activeSection;

  return (
    <div
      className={`fixed z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? "bottom-6 left-1/2 -translate-x-1/2 w-auto pointer-events-auto"
          : "bottom-5 sm:bottom-7 inset-x-0 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pointer-events-auto"
      }`}
      aria-label="Navigation Dock"
    >
      <motion.div
        layout
        transition={{
          layout: { type: "spring", stiffness: 220, damping: 28, mass: 0.8 },
        }}
        className={`font-primary will-change-transform ${
          isScrolled
            ? "flex items-center gap-2.5 sm:gap-3 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/15 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.7)] mx-auto w-fit"
            : "w-full bg-transparent border-none shadow-none"
        }`}
      >
        <AnimatePresence mode="wait">
          {!isScrolled ? (
            /* ==============================================================
               MODE A: WIDE HERO VIEW
               Clean links aligned under the hero section columns
               ============================================================== */
            <motion.div
              key="wide-hero-dock"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="w-full flex items-end justify-between text-xs"
            >
              {/* Navigation Grid (Work, Services+, About, Let's talk) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 items-end flex-1">
                {/* Col 1: Work */}
                <div className="col-span-1">
                  <Magnetic strength={0.25}>
                    <Link
                      href="/#works"
                      onClick={(e) => handleNavClick(e, "/#works", "works")}
                      className="font-medium text-white hover:text-[#a8f542] transition-colors inline-block cursor-pointer text-[13px]"
                    >
                      Work
                    </Link>
                  </Magnetic>
                </div>

                {/* Col 2: Services */}
                <div className="col-span-1">
                  <Magnetic strength={0.25}>
                    <Link
                      href="/#services"
                      onClick={(e) => handleNavClick(e, "/#services", "services")}
                      className="font-medium text-white hover:text-[#a8f542] transition-colors cursor-pointer inline-block text-[13px]"
                    >
                      Services
                    </Link>
                  </Magnetic>
                </div>

                {/* Col 3: About */}
                <div className="col-span-1">
                  <Magnetic strength={0.25}>
                    <Link
                      href="/#about"
                      onClick={(e) => handleNavClick(e, "/#about", "about")}
                      className="font-medium text-white hover:text-[#a8f542] transition-colors inline-block cursor-pointer text-[13px]"
                    >
                      About
                    </Link>
                  </Magnetic>
                </div>

                {/* Col 4: Let's talk ↗ & Theme Toggle */}
                <div className="col-span-1 flex items-center justify-end gap-3">
                  <Magnetic strength={0.35}>
                    <button
                      onClick={() => {
                        if (onOpenInquiry) {
                          onOpenInquiry();
                        } else {
                          const el = document.getElementById("contact");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="inline-flex items-center gap-1 font-medium text-white hover:text-[#a8f542] transition-colors cursor-pointer text-[13px]"
                    >
                      <span>Let&apos;s talk</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </Magnetic>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          ) : (
            /* ==============================================================
               MODE B: COMPACT FLOATING DOCK (Clean, Translucent & Refined)
               ============================================================== */
            <motion.div
              key="compact-box-dock"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 sm:gap-2.5 px-1 py-0.5"
            >
              {/* Navigation Items: Work, Services, About */}
              <div
                className="flex items-center gap-1 sm:gap-1.5 relative"
                onMouseLeave={() => setHoveredTab(null)}
              >
                {navItems.map((item) => {
                  const isSelected = currentTab === item.id;
                  return (
                    <Magnetic key={item.id} strength={0.25}>
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href, item.id)}
                        onMouseEnter={() => setHoveredTab(item.id)}
                        className={`font-primary relative px-3.5 py-1.5 rounded-[14px] text-[13px] font-medium transition-all duration-200 inline-block cursor-pointer ${
                          isSelected
                            ? "bg-white/[0.14] text-white shadow-sm"
                            : "text-white/80 hover:text-white hover:bg-white/[0.06]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </Magnetic>
                  );
                })}
              </div>

              {/* Hairline Divider */}
              <div className="w-[1px] h-4 bg-white/15 mx-0.5" />

              {/* Let's talk ↗ on Right */}
              <Magnetic strength={0.3}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (onOpenInquiry) {
                      onOpenInquiry();
                    } else {
                      const el = document.getElementById("contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="font-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[14px] text-[13px] font-medium text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  <span>Let&apos;s talk</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </motion.button>
              </Magnetic>

              {/* Theme Toggle Button */}
              <ThemeToggle className="ml-0.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
