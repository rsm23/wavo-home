"use client";

import React from "react";
import StripeMeshCanvas from "@/components/3d/StripeMeshCanvas";
import InventoryVault3D from "@/components/3d/InventoryVault3D";
import { WAVO_CONTENT } from "@/lib/content";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function HeroSection() {
  const { hero } = WAVO_CONTENT;

  return (
    <section className="relative min-h-screen pt-36 sm:pt-44 pb-20 overflow-hidden flex flex-col justify-center">
      {/* 3D WebGL Fluid Canvas in background */}
      <StripeMeshCanvas />

      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 fintech-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Top Overline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full fintech-glass text-xs font-semibold border border-indigo-500/30 shadow-lg">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="text-cyan-300 font-mono text-[11px] uppercase tracking-wider">
                {hero.pill}
              </span>
              <span className="text-white/20">|</span>
              <span className="text-slate-300 font-medium">
                Sans caution ni dette
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.035em] text-white leading-[1.05]">
                Votre stock finance{" "}
                <span className="fintech-gradient-text block">
                  votre ambition.
                </span>
              </h1>
            </div>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-xl">
              {hero.subheadline}
            </p>

            {/* Key Value Checks */}
            <div className="flex flex-wrap gap-y-2 gap-x-5 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% de la valeur + TVA avancée</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Rachat unitaire au fil de l&apos;eau</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Capacité d&apos;emprunt 100% intacte</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#simulateur"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-500 hover:to-violet-600 shadow-xl shadow-indigo-600/35 border border-white/[0.15] transition-all cursor-pointer group active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
                <span>{hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://www.wavo.fr/rendez-vous/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-semibold text-slate-200 fintech-glass hover:bg-white/[0.08] hover:text-white border border-white/[0.1] transition-all"
              >
                <span>{hero.ctaSecondary}</span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  &lt; 2 min
                </span>
              </a>
            </div>

            {/* 4 Quantitative Metric Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/[0.08]">
              {hero.stats.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                  <div className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-xs text-indigo-400 font-semibold ml-0.5">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Seamless Holographic 3D Asset & Telemetry */}
          <div className="lg:col-span-6 relative">
            <InventoryVault3D />
          </div>

        </div>
      </div>
    </section>
  );
}
