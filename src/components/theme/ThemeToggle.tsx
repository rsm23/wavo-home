"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`w-9 h-9 rounded-xl border border-slate-200/90 dark:border-white/[0.1] bg-slate-100/80 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 hover:text-[#fa6e69] dark:hover:text-[#fa6e69] hover:border-[#fa6e69]/40 transition-all cursor-pointer shadow-xs flex items-center justify-center flex-shrink-0 ${className}`}
      aria-label="Changer de thème (Clair / Sombre)"
      title={theme === "light" ? "Passer en mode sombre" : "Passer en mode clair"}
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 text-slate-700" />
      ) : (
        <Sun className="w-4 h-4 text-[#ffbc7d]" />
      )}
    </button>
  );
}
