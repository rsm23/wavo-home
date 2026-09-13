"use client";

import React from "react";
import StripeMeshCanvas from "@/components/3d/StripeMeshCanvas";
import InventoryVault3D from "@/components/3d/InventoryVault3D";
import { WAVO_CONTENT } from "@/lib/content";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  const { hero } = WAVO_CONTENT;

  return (
    <section className="relative min-h-screen pt-32 sm:pt-40 pb-20 overflow-hidden flex flex-col justify-center">
      {/* 3D WebGL Fluid Canvas in background */}
      <StripeMeshCanvas />

      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 wavo-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs (Pill/Badge removed per user request) */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.035em] text-white leading-[1.05]">
                Votre stock finance{" "}
                <span className="wavo-gradient-text block">
                  votre ambition.
                </span>
              </h1>
            </div>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              {hero.subheadline}
            </p>

            {/* Key Value Checks */}
            <div className="flex flex-wrap gap-y-2 gap-x-5 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#fa6e69] flex-shrink-0" />
                <span>100% de la valeur + TVA avancée</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#fa6e69] flex-shrink-0" />
                <span>Rachat unitaire au fil de l&apos;eau</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#fa6e69] flex-shrink-0" />
                <span>Capacité d&apos;emprunt 100% intacte</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#simulateur"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#fa6e69] via-[#e0534e] to-[#c43834] hover:from-[#ff8a85] hover:to-[#e0534e] shadow-xl shadow-[#fa6e69]/35 border border-white/[0.15] transition-all cursor-pointer group active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-[#ffbc7d] group-hover:rotate-12 transition-transform" />
                <span>{hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://www.wavo.fr/rendez-vous/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-semibold text-slate-200 wavo-glass hover:border-[#fa6e69]/50 hover:text-white border border-white/[0.1] transition-all"
              >
                <span>{hero.ctaSecondary}</span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#fa6e69]/20 text-[#fa6e69] border border-[#fa6e69]/30">
                  &lt; 2 min
                </span>
              </a>
            </div>

            {/* 4 Quantitative Metric Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/[0.08]">
              {hero.stats.map((stat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                  <div className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-xs text-[#fa6e69] font-semibold ml-0.5">
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

          {/* Right Column: Seamless 3D Holographic Vault in Wavo Coral */}
          <div className="lg:col-span-6 relative">
            <InventoryVault3D />
          </div>

        </div>
      </div>
    </section>
  );
}
