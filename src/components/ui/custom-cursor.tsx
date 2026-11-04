"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Hide native OS cursor
    document.documentElement.classList.add("cursor-none");

    // Initialize GSAP quickTo setters for X and Y coordinates
    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest("button") ||
        el.closest("a") ||
        el.closest("[role='button']") ||
        el.closest("input") ||
        el.closest("textarea") ||
        el.closest(".cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
      <motion.div
        animate={{
          scale: isClicked ? 0.82 : isHovered ? 1.3 : 1,
        }}
        transition={{ type: "spring", stiffness: 480, damping: 28 }}
        className="relative flex items-center justify-center rounded-full w-9 h-9 border border-[#8ce62f] bg-[#8ce62f]/10 backdrop-blur-[1px] shadow-[0_0_15px_rgba(140,230,47,0.25)]"
      >
        {/* Center 'x' crosshair from user image 1 & 2 */}
        <svg
          className="w-3.5 h-3.5 text-[#a8f542]"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <line x1="2.5" y1="2.5" x2="9.5" y2="9.5" />
          <line x1="9.5" y1="2.5" x2="2.5" y2="9.5" />
        </svg>
      </motion.div>
    </div>
  );
}
