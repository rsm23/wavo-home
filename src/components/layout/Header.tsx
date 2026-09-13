"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { WAVO_CONTENT } from "@/lib/content";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { 
  ArrowRight, 
  Menu, 
  X, 
  Calculator, 
  ArrowUpRight
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
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            <a
              href="#simulateur"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-[#fa6e69]" />
              <span>Simulateur</span>
            </a>

            <a
              href="#piliers"
              className="px-3 py-2 rounded-xl hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            >
              Modèle &amp; Comparatif
            </a>

            <a
              href="#etapes"
              className="px-3 py-2 rounded-xl hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            >
              Cycle du Portage
            </a>

            <a
              href="#produits"
              className="px-3 py-2 rounded-xl hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            >
              Actifs éligibles
            </a>

            <a
              href="#temoignages"
              className="px-3 py-2 rounded-xl hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            >
              Cas Clients
            </a>

            <a
              href="#faq"
              className="px-3 py-2 rounded-xl hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action CTAs + Theme Toggle */}
          <div className="hidden sm:flex items-center gap-2.5">
            <ThemeToggle />

            <a
              href="#eligibilite"
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-2 transition-colors"
            >
              Critères
            </a>

            <a
              href="https://www.wavo.fr/rendez-vous/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#fa6e69] via-[#e0534e] to-[#c43834] hover:from-[#ff8a85] hover:to-[#e0534e] shadow-lg shadow-[#fa6e69]/30 transition-all duration-200 active:scale-95 flex items-center gap-2 border border-white/[0.15]"
            >
              <span>Tester mon éligibilité</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile menu hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto px-4 mt-2">
          <div className="p-5 rounded-2xl bg-[#10101b]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl space-y-4">
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <a
                href="#simulateur"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/[0.05] text-slate-200"
              >
                <Calculator className="w-4 h-4 text-[#fa6e69]" />
                Simulateur de trésorerie
              </a>
              <a
                href="#piliers"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-white/[0.05] text-slate-200"
              >
                Les 4 Piliers Wavo
              </a>
              <a
                href="#etapes"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-white/[0.05] text-slate-200"
              >
                Processus en 4 étapes
              </a>
              <a
                href="#produits"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-white/[0.05] text-slate-200"
              >
                Produits finançables
              </a>
              <a
                href="#temoignages"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-white/[0.05] text-slate-200"
              >
                Cas clients &amp; Avis
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-white/[0.05] text-slate-200"
              >
                Questions fréquentes
              </a>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
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
