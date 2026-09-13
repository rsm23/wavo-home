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
  FileCheck, 
  HelpCircle,
  BookOpen,
  ArrowUpRight
} from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      {/* Top Stripe Announcement Banner */}
      <div className="relative z-50 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white text-xs py-2 px-4 border-b border-indigo-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5 text-center flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 font-semibold text-[10px] border border-indigo-400/30 uppercase tracking-wider">
            {WAVO_CONTENT.announcement.badge}
          </span>
          <span className="text-slate-200 font-medium">
            {WAVO_CONTENT.announcement.text}
          </span>
          <a
            href={WAVO_CONTENT.announcement.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-cyan-300 font-semibold hover:text-cyan-200 underline underline-offset-2 transition-colors ml-1"
          >
            {WAVO_CONTENT.announcement.linkText}
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2.5">
        <div
          className={`flex items-center justify-between h-16 px-5 rounded-2xl transition-all duration-300 ${
            scrolled
              ? "bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-lg shadow-indigo-950/5"
              : "bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/50 dark:border-white/5"
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
            <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/40">
              Fintech
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
            {/* Solutions link */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("solutions")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <span>Notre Solution</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform" />
              </button>

              {activeDropdown === "solutions" && (
                <div className="absolute top-full left-0 w-80 p-3 mt-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-900/10 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <a
                    href="#piliers"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">
                        Les 4 Piliers Wavo
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Zéro dette, 100% valeur + TVA, rachat progressif.
                      </div>
                    </div>
                  </a>

                  <a
                    href="#etapes"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">
                        Processus en 4 étapes
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Du dépôt de dossier au virement sous 24 heures.
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <a
              href="#simulateur"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors"
            >
              <Calculator className="w-4 h-4 text-indigo-500" />
              <span>Simulateur</span>
            </a>

            <a
              href="#produits"
              className="px-3 py-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors"
            >
              Produits finançables
            </a>

            <a
              href="#temoignages"
              className="px-3 py-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors"
            >
              Cas Clients
            </a>

            <a
              href="#faq"
              className="px-3 py-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors"
            >
              FAQ
            </a>

            <a
              href="#blog"
              className="px-3 py-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors"
            >
              Blog
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#eligibilite"
              className="px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Éligibilité
            </a>

            <a
              href="https://www.wavo.fr/rendez-vous/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-500 hover:to-violet-600 shadow-md shadow-indigo-600/25 transition-all duration-200 active:scale-95 flex items-center gap-1.5"
            >
              <span className="relative z-10">Vérifier mon éligibilité</span>
              <ArrowUpRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto px-4 mt-2">
          <div className="p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-3">
            <div className="flex flex-col space-y-2">
              <a
                href="#simulateur"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Calculator className="w-4 h-4 text-indigo-500" />
                Simulateur de trésorerie
              </a>
              <a
                href="#piliers"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Sparkles className="w-4 h-4 text-indigo-500" />
                Les 4 Piliers
              </a>
              <a
                href="#etapes"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Layers className="w-4 h-4 text-indigo-500" />
                Processus en 4 étapes
              </a>
              <a
                href="#produits"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 block"
              >
                Produits finançables
              </a>
              <a
                href="#temoignages"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 block"
              >
                Témoignages & Cas clients
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 block"
              >
                Questions fréquentes
              </a>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <a
                href="https://www.wavo.fr/rendez-vous/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-xs font-semibold text-white bg-indigo-600 rounded-xl shadow-md"
              >
                Vérifier mon éligibilité
              </a>
              <a
                href="https://www.wavo.fr/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 text-center text-xs font-medium text-slate-600 dark:text-slate-400"
              >
                Contacter l&apos;équipe Wavo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
