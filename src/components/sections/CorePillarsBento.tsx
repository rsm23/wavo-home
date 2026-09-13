"use client";

import React, { useState } from "react";
import { WAVO_CONTENT } from "@/lib/content";
import { 
  Coins, 
  Rocket, 
  ShieldCheck, 
  RefreshCw, 
  Check, 
  X, 
  ArrowRight,
  Sparkles,
  Scale,
  TrendingUp,
  Percent,
  Clock
} from "lucide-react";

export default function CorePillarsBento() {
  const { pillars } = WAVO_CONTENT;
  const [activeTab, setActiveTab] = useState<number>(0);

  const iconMap: Record<string, React.ElementType> = {
    Coins: Coins,
    Rocket: Rocket,
    ShieldCheck: ShieldCheck,
    RefreshCw: RefreshCw,
  };

  const comparisonRows = [
    {
      criterion: "Endettement au bilan",
      badge: "Structure financière",
      bank: "Inscrit en dette au passif (dégrade vos ratios D/E et votre cotation Banque de France)",
      bankStatus: "negative",
      wavo: "0,00 € de dette. Vente temporaire d'actif circulant hors bilan. Ratios intacts.",
      wavoStatus: "positive",
    },
    {
      criterion: "Garantie personnelle du dirigeant",
      badge: "Risque patrimonial",
      bank: "Caution solidaire ou hypothèque exigée. Votre patrimoine personnel est directement engagé.",
      bankStatus: "negative",
      wavo: "Aucune caution personnelle requise. Seul l'inventaire physique sert de collatéral.",
      wavoStatus: "positive",
    },
    {
      criterion: "Prise en charge de la TVA",
      badge: "Trésorerie immédiate",
      bank: "Exclue. Vous devez avancer 20% de TVA sur vos propres liquidités.",
      bankStatus: "negative",
      wavo: "Wavo avance 100% de la TVA. Trésorerie débloquée immédiatement sans avance de votre part.",
      wavoStatus: "positive",
    },
    {
      criterion: "Rythme de remboursement",
      badge: "Flexibilité BFR",
      bank: "Traites mensuelles fixes obligatoires, même si vos marchandises restent en stock.",
      bankStatus: "negative",
      wavo: "Rachat unitaire au fil de l'eau. Vous ne réglez que les références vendues et encaissées.",
      wavoStatus: "positive",
    },
    {
      criterion: "Vitesse d'obtention des fonds",
      badge: "Agilité business",
      bank: "6 à 12 semaines (comités de crédit rigides, formulaires lourds, passage greffe).",
      bankStatus: "negative",
      wavo: "24 à 48 heures. Analyse automatisée des flux et virement direct sur votre compte.",
      wavoStatus: "positive",
    },
  ];

  return (
    <section id="piliers" className="relative z-20 py-28 bg-slate-50/60 dark:bg-[#080b13] border-t border-slate-200/80 dark:border-white/[0.08] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full wavo-glass text-xs font-mono font-semibold text-[#fa6e69] border border-[#fa6e69]/30 shadow-xs">
            <Scale className="w-3.5 h-3.5" />
            <span>INGÉNIERIE DE PORTAGE COMPARÉE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight transition-colors">
            Pourquoi le portage Wavo{" "}
            <span className="wavo-gradient-text">surpasse le crédit bancaire</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
            Une analyse comparative point par point de l&apos;impact réel sur votre bilan, votre trésorerie d&apos;exploitation et votre patrimoine personnel.
          </p>
        </div>

        {/* Master Comparative Financial Matrix (Original Institutional Table) */}
        <div className="rounded-3xl bg-white dark:bg-[#0f131f] border border-slate-200/80 dark:border-white/[0.09] shadow-xl dark:shadow-2xl overflow-hidden transition-colors">
          
          {/* Table Header Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-100/80 dark:bg-black/50 border-b border-slate-200/80 dark:border-white/[0.08] text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 p-5 sm:px-8 items-center">
            <div className="md:col-span-4 font-bold text-slate-800 dark:text-slate-300">
              Paramètre Financier Clé
            </div>
            <div className="hidden md:block md:col-span-4 text-rose-600 dark:text-rose-400/80 font-bold">
              [✕] Crédit Bancaire &amp; Affacturage
            </div>
            <div className="hidden md:block md:col-span-4 text-[#fa6e69] font-bold">
              [✓] Portage de Stock Wavo
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-200/80 dark:divide-white/[0.06]">
            {comparisonRows.map((row, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-1 md:grid-cols-12 p-6 sm:px-8 gap-4 sm:gap-6 items-center hover:bg-slate-50/80 dark:hover:bg-white/[0.015] transition-colors"
              >
                {/* Column 1: Criterion */}
                <div className="md:col-span-4 space-y-1">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 text-[10px] font-mono block w-fit border border-slate-200/60 dark:border-transparent">
                    {row.badge}
                  </span>
                  <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {row.criterion}
                  </div>
                </div>

                {/* Column 2: Bank (Negative Model) */}
                <div className="md:col-span-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/10 border border-rose-200 dark:border-rose-500/20 text-xs text-slate-700 dark:text-rose-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400 text-[11px] font-mono">
                    <X className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 stroke-[3]" />
                    <span>BANQUE CLASSIQUE</span>
                  </div>
                  <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                    {row.bank}
                  </p>
                </div>

                {/* Column 3: Wavo (Positive Model) */}
                <div className="md:col-span-4 p-3.5 rounded-xl bg-[#fa6e69]/10 border border-[#fa6e69]/30 text-xs text-slate-800 dark:text-slate-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#fa6e69] text-[11px] font-mono">
                    <Check className="w-3.5 h-3.5 text-[#fa6e69] stroke-[3]" />
                    <span>SOLUTION WAVO</span>
                  </div>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                    {row.wavo}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Table Footer Summary Callout */}
          <div className="p-6 sm:px-8 bg-slate-50 dark:bg-black/60 border-t border-slate-200/80 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2 text-slate-800 dark:text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Impact Bilan Certifié : Capacité d&apos;emprunt long terme 100% préservée
            </span>
            <span className="text-[#fa6e69] font-bold">
              Opérations 100% confidentielles
            </span>
          </div>

        </div>

        {/* The 4 Architectural Pillars (Deep Dive Console) */}
        <div className="space-y-8">
          
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/[0.08] pb-4">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
              LES 4 LEVIERS FONDAMENTAUX DU PORTAGE WAVO
            </div>
            <div className="text-xs font-mono text-[#fa6e69] font-bold">
              0{activeTab + 1} / 04
            </div>
          </div>

          {/* Interactive Pillar Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {pillars.map((pillar, idx) => {
              const Icon = iconMap[pillar.icon] || Coins;
              const isSelected = activeTab === idx;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                    isSelected
                      ? "bg-[#fa6e69]/10 dark:bg-[#fa6e69]/15 border-[#fa6e69] text-slate-900 dark:text-white shadow-lg shadow-[#fa6e69]/15"
                      : "bg-white dark:bg-[#0f131f] border-slate-200/80 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.03] shadow-xs dark:shadow-none"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${isSelected ? "bg-[#fa6e69] text-white" : "bg-slate-100 dark:bg-white/[0.04] text-slate-500"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs sm:text-sm font-bold leading-tight">{pillar.title}</div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                      {pillar.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Full Architectural Showcase */}
          {(() => {
            const currentPillar = pillars[activeTab];
            const Icon = iconMap[currentPillar.icon] || Coins;
            return (
              <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-[#0f131f] dark:via-[#141926] dark:to-[#080b13] border border-slate-200/80 dark:border-white/[0.1] shadow-xl dark:shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-colors">
                
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fa6e69]/10 dark:bg-[#fa6e69]/15 border border-[#fa6e69]/30 text-[#fa6e69] text-xs font-mono font-bold">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{currentPillar.badge}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                    {currentPillar.title}
                  </h3>

                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                    {currentPillar.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {currentPillar.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                        <div className="w-5 h-5 rounded-full bg-[#fa6e69]/15 dark:bg-[#fa6e69]/20 border border-[#fa6e69]/40 flex items-center justify-center flex-shrink-0 text-[#fa6e69]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <a
                      href="https://www.wavo.fr/rendez-vous/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#fa6e69] hover:bg-[#e0534e] text-white font-bold text-xs shadow-lg shadow-[#fa6e69]/30 transition-all cursor-pointer"
                    >
                      <span>Vérifier l&apos;éligibilité de vos stocks</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Right Stat / Ratio Showcase */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-black/50 border border-slate-200/80 dark:border-white/[0.08] space-y-4">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between font-semibold">
                      <span>MÉCANIQUE FINANCIÈRE</span>
                      <span className="text-[#fa6e69] font-bold">WAVO PROTOCOL</span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex justify-between items-center py-2 border-b border-slate-200/80 dark:border-white/[0.06]">
                        <span className="text-slate-500 dark:text-slate-400">Valeur engagée :</span>
                        <span className="text-slate-900 dark:text-white font-bold">100% facture HT</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-200/80 dark:border-white/[0.06]">
                        <span className="text-slate-500 dark:text-slate-400">Avance de TVA :</span>
                        <span className="text-amber-600 dark:text-[#ffbc7d] font-bold">+20% pris en charge</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-200/80 dark:border-white/[0.06]">
                        <span className="text-slate-500 dark:text-slate-400">Impact Ratio D/E :</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">0.00x (Neutre)</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-500 dark:text-slate-400">Cotation Banque de France :</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Protégée</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.05] text-[11px] font-mono text-slate-600 dark:text-slate-400 flex items-center justify-between shadow-xs dark:shadow-none">
                    <span>Délai moyen de mise en place :</span>
                    <span className="text-slate-900 dark:text-white font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#fa6e69]" /> 24h ouvrées
                    </span>
                  </div>
                </div>

              </div>
            );
          })()}

        </div>

      </div>
    </section>
  );
}
