"use client";

import React from "react";
import Image from "next/image";
import StripeMeshCanvas from "@/components/3d/StripeMeshCanvas";
import InventoryVault3D from "@/components/3d/InventoryVault3D";
import { WAVO_CONTENT } from "@/lib/content";
import { ArrowRight, ShieldCheck, Zap, Sparkles, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  const { hero } = WAVO_CONTENT;

  return (
    <section className="relative min-h-screen pt-36 pb-20 overflow-hidden flex flex-col justify-center">
      {/* 3D WebGL Stripe Fluid Gradient Mesh */}
      <StripeMeshCanvas />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Prop, Headline, CTAs, Live Stats */}
          <div className="lg:col-span-6 space-y-7 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-indigo-200/80 dark:border-indigo-500/30 backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
              </span>
              <span className="text-xs font-semibold text-indigo-950 dark:text-indigo-200">
                {hero.pill}
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Sans caution ni gage
              </span>
            </div>

            {/* Main Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.08]">
              Votre stock finance{" "}
              <span className="stripe-gradient-text">votre ambition.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl">
              {hero.subheadline}
            </p>

            {/* Micro Highlights */}
            <div className="flex flex-wrap gap-y-2 gap-x-5 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>100% de la valeur + TVA avancée</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Rachat unitaire au fil de l&apos;eau</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Bilan &amp; capacité d&apos;emprunt intacts</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#simulateur"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] shadow-lg shadow-indigo-600/30 transition-all cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-indigo-300 group-hover:rotate-12 transition-transform" />
                <span>{hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://www.wavo.fr/rendez-vous/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-white bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-white/15 shadow-sm hover:shadow transition-all"
              >
                <span>{hero.ctaSecondary}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">
                  2 min
                </span>
              </a>
            </div>

            {/* 4 Quantitative Live Metric Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-200/80 dark:border-white/10">
              {hero.stats.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-xs text-indigo-500 font-semibold ml-0.5">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Complex Interactive 3D Canvas */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Subtle Ambient Backing Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
              
              {/* The 3D Inventory Vault Canvas */}
              <InventoryVault3D />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
