"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { WAVO_CONTENT } from "@/lib/content";
import { 
  ArrowRight, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  Layers, 
  Calculator, 
  ArrowUpRight,
  ShieldCheck
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
      <div className="relative z-50 bg-[#07080d]/90 border-b border-white/[0.06] text-xs py-2 px-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5 text-center flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-semibold text-[10px] border border-indigo-500/30 uppercase tracking-widest">
            {WAVO_CONTENT.announcement.badge}
          </span>
          <span className="text-slate-300 font-medium text-xs">
            {WAVO_CONTENT.announcement.text}
          </span>
          <a
            href={WAVO_CONTENT.announcement.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-semibold transition-colors ml-1"
          >
            <span>{WAVO_CONTENT.announcement.linkText}</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Floating Glass Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
        <div
          className={`flex items-center justify-between h-16 px-6 rounded-2xl transition-all duration-300 ${
            scrolled
              ? "bg-[#0c0e17]/85 backdrop-blur-2xl border border-white/[0.1] shadow-2xl shadow-black/50"
              : "bg-[#0c0e17]/50 backdrop-blur-xl border border-white/[0.06]"
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
            <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-white/[0.05] text-slate-400 border border-white/[0.08]">
              CREDIT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
            <a
              href="#simulateur"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-indigo-400" />
              <span>Simulateur</span>
            </a>

            <a
              href="#piliers"
              className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              Les 4 Piliers
            </a>

            <a
              href="#etapes"
              className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              Fonctionnement
            </a>

            <a
              href="#produits"
              className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              Produits éligibles
            </a>

            <a
              href="#temoignages"
              className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              Cas Clients
            </a>

            <a
              href="#faq"
              className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#eligibilite"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
            >
              Critères
            </a>

            <a
              href="https://www.wavo.fr/rendez-vous/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden px-4.5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-500 hover:to-violet-600 shadow-lg shadow-indigo-600/30 transition-all duration-200 active:scale-95 flex items-center gap-2 border border-white/[0.15]"
            >
              <span>Vérifier mon éligibilité</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Mobile menu hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08]"
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
          <div className="p-5 rounded-2xl bg-[#0e111a]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl space-y-4">
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <a
                href="#simulateur"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/[0.05] text-slate-200"
              >
                <Calculator className="w-4 h-4 text-indigo-400" />
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
                className="w-full py-3 text-center text-xs font-bold text-white bg-indigo-600 rounded-xl shadow-lg"
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
