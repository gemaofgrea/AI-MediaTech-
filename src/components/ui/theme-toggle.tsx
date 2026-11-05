"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");

    const handleThemeChange = () => {
      const current = document.documentElement.classList.contains("light")
        ? "light"
        : "dark";
      setTheme(current);
    };

    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      try {
        localStorage.setItem("theme", "light");
      } catch {}
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.setAttribute("data-theme", "dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {}
    }

    window.dispatchEvent(new Event("theme-change"));
  };

  if (!mounted) {
    return (
      <div
        className={`w-8 h-8 rounded-full border border-white/10 bg-white/[0.04] ${className}`}
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`group relative flex items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full border transition-all duration-300 cursor-pointer overflow-hidden ${
        theme === "dark"
          ? "border-white/15 bg-white/[0.04] hover:bg-white/10 hover:border-lime-400/40 text-zinc-300 hover:text-white"
          : "border-black/15 bg-black/[0.04] hover:bg-black/10 hover:border-lime-600/40 text-zinc-700 hover:text-black"
      } ${className}`}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Dark/Light Mode"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-center justify-center"
      >
        {theme === "dark" ? (
          <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime-400 group-hover:rotate-45 transition-transform" />
        ) : (
          <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime-600 group-hover:-rotate-12 transition-transform" />
        )}
      </motion.div>
    </button>
  );
}

