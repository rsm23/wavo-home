"use client";

import React from "react";
import FloatingCard3D from "@/components/3d/FloatingCards3D";
import { WAVO_CONTENT } from "@/lib/content";
import { 
  Coins, 
  Rocket, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Lock,
  Layers,
  Sparkles
} from "lucide-react";

export default function CorePillarsBento() {
  const { pillars } = WAVO_CONTENT;

  const iconMap: Record<string, React.ElementType> = {
    Coins: Coins,
    Rocket: Rocket,
    ShieldCheck: ShieldCheck,
    RefreshCw: RefreshCw,
  };

  return (
    <section id="piliers" className="relative z-20 py-24 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Les 4 Piliers Fondateurs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Accélérez votre croissance{" "}
            <span className="stripe-gradient-text">sans dette ni avance</span> de trésorerie
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Une architecture financière repensée pour valoriser votre stock physique sans dégrader votre structure de bilan.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = iconMap[pillar.icon] || Coins;
            return (
              <FloatingCard3D key={pillar.id} className="h-full">
                <div className="h-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/10 shadow-lg shadow-slate-900/5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                  
                  {/* Ambient accent splash */}
                  <div className={`absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br ${pillar.accent} rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none`} />

                  <div className="space-y-5 relative z-10">
                    {/* Top Tag & Icon */}
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                        {pillar.badge}
                      </span>
                    </div>

                    {/* Pillar Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {pillar.description}
                    </p>

                    {/* Highlights bullet points */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      {pillar.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Link */}
                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between relative z-10">
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 flex items-center gap-1.5 transition-colors">
                      En savoir plus sur ce mécanisme
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-xs text-slate-400 font-mono">0{idx + 1}</span>
                  </div>

                </div>
              </FloatingCard3D>
            );
          })}
        </div>

      </div>
    </section>
  );
}
