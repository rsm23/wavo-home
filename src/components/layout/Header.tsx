"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { WAVO_CONTENT } from "@/lib/content";
import Image from "@/components/ui/AppImage";
import ThemeToggle from "@/components/theme/ThemeToggle";
import {
  ArrowRight,
  Menu,
  X
} from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      {/* Top Announcement Banner */}
      <div className="relative z-50 bg-white/90 dark:bg-[#080b13]/90 border-b border-slate-200/80 dark:border-white/[0.06] text-xs py-2 px-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5 text-center flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#fa6e69]/15 text-[#fa6e69] font-semibold text-[10px] border border-[#fa6e69]/30 uppercase tracking-widest">
            {WAVO_CONTENT.announcement.badge}
          </span>
          <span className="text-slate-700 dark:text-slate-300 font-medium text-xs">
            {WAVO_CONTENT.announcement.text}
          </span>
          <a
            href={WAVO_CONTENT.announcement.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#e0534e] dark:text-[#ffbc7d] hover:underline font-semibold transition-colors ml-1"
          >
            <span>{WAVO_CONTENT.announcement.linkText}</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Floating Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
        <div
          className={`flex items-center justify-between h-16 px-6 rounded-2xl transition-all duration-300 ${
            scrolled
              ? "bg-white/90 dark:bg-[#10101b]/85 backdrop-blur-2xl border border-slate-200/90 dark:border-white/[0.1] shadow-xl shadow-slate-900/5 dark:shadow-black/50"
              : "bg-white/75 dark:bg-[#10101b]/55 backdrop-blur-xl border border-slate-200/70 dark:border-white/[0.06] shadow-sm"
          }`}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-28 h-8">
              <Image
                src="/assets/logo-wavo.webp"
                alt="Wavo - Financement de stock"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-300">
            <a
              href="#simulateur"
              className="h-9 px-3 rounded-xl hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors flex items-center justify-center whitespace-nowrap"
            >
              Simulateur
            </a>

            <a
              href="#piliers"
              className="h-9 px-3 rounded-xl hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors flex items-center justify-center whitespace-nowrap"
            >
              Modèle &amp; Comparatif
            </a>

            <a
              href="#etapes"
              className="h-9 px-3 rounded-xl hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors flex items-center justify-center whitespace-nowrap"
            >
              Cycle du Portage
            </a>

            <a
              href="#produits"
              className="h-9 px-3 rounded-xl hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors flex items-center justify-center whitespace-nowrap"
            >
              Actifs éligibles
            </a>

            <a
              href="#eligibilite"
              className="h-9 px-3 rounded-xl hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors flex items-center justify-center whitespace-nowrap"
            >
              Critères
            </a>

            <a
              href="#temoignages"
              className="h-9 px-3 rounded-xl hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors flex items-center justify-center whitespace-nowrap"
            >
              Cas Clients
            </a>

            <a
              href="#faq"
              className="h-9 px-3 rounded-xl hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors flex items-center justify-center whitespace-nowrap"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action CTAs + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="https://www.wavo.fr/rendez-vous/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#fa6e69] via-[#e0534e] to-[#c43834] hover:from-[#ff8a85] hover:to-[#e0534e] shadow-md shadow-[#fa6e69]/25 transition-all duration-200 active:scale-95 flex items-center justify-center border border-white/[0.15] whitespace-nowrap"
            >
              Tester mon éligibilité
            </a>

            <ThemeToggle />
          </div>

          {/* Mobile menu hamburger + Theme Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] flex items-center justify-center border border-slate-200/80 dark:border-white/[0.08]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto px-4 mt-2">
          <div className="p-5 rounded-2xl bg-white/95 dark:bg-[#10101b]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/[0.1] shadow-2xl space-y-4 transition-colors">
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <a
                href="#simulateur"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-800 dark:text-slate-200"
              >
                Simulateur de trésorerie
              </a>
              <a
                href="#piliers"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-800 dark:text-slate-200"
              >
                Les 4 Piliers Wavo
              </a>
              <a
                href="#etapes"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-800 dark:text-slate-200"
              >
                Processus en 4 étapes
              </a>
              <a
                href="#produits"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-800 dark:text-slate-200"
              >
                Produits finançables
              </a>
              <a
                href="#eligibilite"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-800 dark:text-slate-200"
              >
                Critères d&apos;éligibilité
              </a>
              <a
                href="#temoignages"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-800 dark:text-slate-200"
              >
                Cas clients &amp; Avis
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-800 dark:text-slate-200"
              >
                Questions fréquentes
              </a>
            </div>

            <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.08] flex flex-col gap-2">
              <a
                href="https://www.wavo.fr/rendez-vous/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 text-center text-xs font-bold text-white bg-[#fa6e69] rounded-xl shadow-lg"
              >
                Vérifier mon éligibilité
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
