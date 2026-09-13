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
  Sparkles,
  Zap
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
    <section id="piliers" className="relative z-20 py-28 bg-[#07080d] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full fintech-glass text-xs font-mono font-semibold text-indigo-400 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LES 4 PILIERS DU MODÈLE WAVO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Accélérez votre croissance{" "}
            <span className="fintech-gradient-text">sans dette ni avance</span> de trésorerie
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Une ingénierie de portage financier créée pour les distributeurs, marques et industriels qui veulent monétiser leur actif circulant sans contrainte bancaire.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = iconMap[pillar.icon] || Coins;
            return (
              <FloatingCard3D key={pillar.id} className="h-full">
                <div className="h-full p-8 sm:p-10 rounded-3xl fintech-card flex flex-col justify-between group relative overflow-hidden space-y-8">
                  
                  {/* Subtle ambient gradient spotlight */}
                  <div className={`absolute -top-32 -right-32 w-72 h-72 bg-gradient-to-br ${pillar.accent} rounded-full blur-3xl opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none`} />

                  <div className="space-y-6 relative z-10">
                    {/* Top Row: Icon & Tag */}
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-indigo-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                        {pillar.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed font-normal">
                      {pillar.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
                      {pillar.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Line */}
                  <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between relative z-10">
                    <span className="text-xs font-semibold text-indigo-400 group-hover:text-cyan-300 flex items-center gap-1.5 transition-colors">
                      Découvrir ce levier financier
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
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
