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

  const [comparisonFilter, setComparisonFilter] = useState<string>("all");

  const comparisonRows = [
    {
      id: "balance-sheet",
      category: "bilan",
      criterion: "Endettement & Structure du Bilan",
      badge: "Structure Financière",
      icon: Scale,
      bank: {
        headline: "Inscrit en dette au passif",
        detail: "Dégrade vos ratios d'endettement (D/E, Gearing) et pénalise votre notation Banque de France auprès de vos partenaires financiers.",
        metric: "+Dette Passif",
      },
      wavo: {
        headline: "0,00 € de dette inscrite",
        detail: "Opération de vente temporaire d'actif circulant 100% hors bilan. Ratios d'endettement intacts et capacité d'emprunt préservée.",
        metric: "0,00 € Dette",
        delta: "Capacité d'emprunt 100% préservée",
      },
    },
    {
      id: "personal-guarantee",
      category: "garantie",
      criterion: "Garantie Personnelle du Dirigeant",
      badge: "Risque Patrimonial",
      icon: ShieldCheck,
      bank: {
        headline: "Caution solidaire exigée",
        detail: "Votre patrimoine privé (résidence, épargne personnelle) est engagé en garantie. En cas d'aléa de marché, vos biens personnels sont saisis.",
        metric: "Caution Privée",
      },
      wavo: {
        headline: "Aucune caution personnelle",
        detail: "Seul l'inventaire physique expertisé sert de collatéral via un gage sans dépossession (L527-1 Code de commerce). Votre patrimoine est sanctuarisé.",
        metric: "0 € Risque Privé",
        delta: "Patrimoine personnel 100% protégé",
      },
    },
    {
      id: "vat-advance",
      category: "tresorerie",
      criterion: "Prise en Charge de la TVA (+20%)",
      badge: "Trésorerie Immédiate",
      icon: Coins,
      bank: {
        headline: "Exclue du financement",
        detail: "La banque ne finance que le montant Hors Taxes. Vous devez mobiliser vos fonds propres pour avancer 20% de TVA à votre fournisseur.",
        metric: "0% TVA Financée",
      },
      wavo: {
        headline: "Wavo avance 100% de la TVA",
        detail: "Trésorerie débloquée sur la totalité de la facture HT + 100% du montant de la TVA. Aucune avance de trésorerie requise de votre part.",
        metric: "+20% Cash Avancé",
        delta: "+20% de trésorerie nette immédiate",
      },
    },
    {
      id: "repayment-flexibility",
      category: "tresorerie",
      criterion: "Rythme de Remboursement & BFR",
      badge: "Flexibilité BFR",
      icon: RefreshCw,
      bank: {
        headline: "Traites mensuelles fixes obligatoires",
        detail: "Échéancier fixe incompressible dès J+30, même si vos marchandises tardent à se vendre. Risque de rupture de cash en basse saison.",
        metric: "Traites Fixes",
      },
      wavo: {
        headline: "Rachat unitaire au fil de l'eau",
        detail: "Vous rachetez les références au rythme exact de vos sorties de stock et de vos encaissements clients. Zéro mensualité si le stock ne tourne pas.",
        metric: "Au Fil des Ventes",
        delta: "Zéro pression d'échéance mensuelle",
      },
    },
    {
      id: "speed-of-capital",
      category: "tresorerie",
      criterion: "Vitesse d'Obtention des Fonds",
      badge: "Agilité Commerciale",
      icon: Clock,
      bank: {
        headline: "6 à 12 semaines d'instruction",
        detail: "Comités de crédit rigides, dossiers volumineux, garanties notariales et délais rédhibitoires pour saisir des opportunités de marché.",
        metric: "6 à 12 Semaines",
      },
      wavo: {
        headline: "24h à 48h chrono",
        detail: "Audit digital express de votre inventaire sur listing ERP en 2 heures et virement SEPA direct dès contractualisation du protocole.",
        metric: "SEPA sous 24h",
        delta: "Gain de temps : +6 à +10 semaines",
      },
    },
  ];

  const filteredRows = comparisonFilter === "all" 
    ? comparisonRows 
    : comparisonRows.filter((r) => r.category === comparisonFilter);

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
            Une confrontation point par point de l&apos;impact réel sur votre bilan, votre trésorerie d&apos;exploitation et votre patrimoine personnel.
          </p>
        </div>

        {/* Master Architectural Versus Arena */}
        <div className="rounded-3xl bg-white dark:bg-[#0f131f] border border-slate-200/80 dark:border-white/[0.09] shadow-xl dark:shadow-2xl p-6 sm:p-8 space-y-8 transition-colors">
          
          {/* Top Confrontation Deck */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
            
            {/* Left Model: Banque & Affacturage */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-500/25 space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-mono font-bold">
                  <X className="w-3.5 h-3.5 stroke-[3]" />
                  CRÉDIT BANCAIRE &amp; AFFACTURAGE
                </span>
                <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold uppercase">
                  Modèle d&apos;Emprunt
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Endettement direct au bilan, caution personnelle solidaire du dirigeant et échéancier de remboursement fixe rigide.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-rose-600 dark:text-rose-400 font-semibold">
                <span>⚠️ Risque patrimonial privé</span>
                <span>•</span>
                <span>Dette au passif</span>
              </div>
            </div>

            {/* Center VS Emblem */}
            <div className="lg:col-span-1 flex items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fa6e69] to-[#e0534e] text-white font-mono font-black text-sm flex items-center justify-center shadow-lg shadow-[#fa6e69]/30 ring-4 ring-slate-100 dark:ring-white/[0.06]">
                VS
              </div>
            </div>

            {/* Right Model: Portage Wavo */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-[#fa6e69]/10 via-[#fa6e69]/5 to-transparent border-2 border-[#fa6e69]/40 space-y-2 shadow-sm relative">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fa6e69] text-white text-xs font-mono font-bold shadow-sm shadow-[#fa6e69]/30">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  PORTAGE DE STOCK WAVO
                </span>
                <span className="text-[10px] font-mono text-[#fa6e69] font-bold uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Recommandé PME
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                Vente temporaire d&apos;actif circulant 100% hors bilan, zéro caution, avance de TVA et rachat au fil des encaissements.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-[#fa6e69] font-bold">
                <span>✓ Zéro caution</span>
                <span>•</span>
                <span>0€ dette au passif</span>
                <span>•</span>
                <span>SEPA 24h</span>
              </div>
            </div>

          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200/80 dark:border-white/[0.06]">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
              Filtrer par levier d&apos;ingénierie :
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "Tous les critères (5)" },
                { id: "bilan", label: "Structure & Bilan" },
                { id: "garantie", label: "Protection Patrimoine" },
                { id: "tresorerie", label: "Trésorerie & Vitesse" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setComparisonFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium font-mono transition-all cursor-pointer ${
                    comparisonFilter === f.id
                      ? "bg-[#fa6e69] text-white shadow-sm shadow-[#fa6e69]/30"
                      : "bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.08]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Master Comparative Cards List */}
          <div className="space-y-4">
            {filteredRows.map((row) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.id}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-black/30 border border-slate-200/80 dark:border-white/[0.06] hover:border-[#fa6e69]/30 transition-all space-y-4"
                >
                  {/* Row Header Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/70 dark:border-white/[0.06] pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-200/80 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                          {row.badge}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {row.criterion}
                        </h4>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#fa6e69]/15 border border-[#fa6e69]/30 text-[#fa6e69] text-xs font-mono font-bold self-start sm:self-auto flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      {row.wavo.delta}
                    </span>
                  </div>

                  {/* Dual Comparison Chambers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Bank Chamber */}
                    <div className="p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-rose-200/60 dark:border-rose-500/20 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1.5">
                          <X className="w-3.5 h-3.5 stroke-[3]" /> Banque &amp; Affacturage
                        </span>
                        <span className="px-2 py-0.5 rounded bg-rose-100/80 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-bold text-[10px]">
                          {row.bank.metric}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-slate-200">
                        {row.bank.headline}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {row.bank.detail}
                      </p>
                    </div>

                    {/* Wavo Chamber */}
                    <div className="p-4 rounded-xl bg-white dark:bg-[#121622] border-2 border-[#fa6e69]/40 shadow-sm space-y-2 relative overflow-hidden">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#fa6e69] font-bold flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Solution Wavo
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#fa6e69]/15 text-[#fa6e69] font-bold text-[10px] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#fa6e69] animate-pulse" />
                          {row.wavo.metric}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {row.wavo.headline}
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        {row.wavo.detail}
                      </p>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

          {/* Institutional Verdict & Benchmark Telemetry */}
          <div className="p-6 rounded-2xl bg-slate-900 dark:bg-black/60 border border-slate-800 dark:border-white/[0.08] text-white space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.1] pb-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#fa6e69] font-bold">
                  VERDICT D&apos;INGÉNIERIE FINANCIÈRE
                </div>
                <div className="text-base font-bold text-white mt-0.5">
                  Synthèse d&apos;impact pour le dirigeant et le directeur financier
                </div>
              </div>
              <span className="px-3 py-1 rounded-xl bg-white/[0.06] border border-white/[0.1] text-xs font-mono text-emerald-400 font-semibold self-start sm:self-auto">
                Bilan 100% Hors Dette
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Ratio Bilan D/E</span>
                <div className="text-sm font-bold text-white">Neutre (0,00 €)</div>
                <span className="text-[10px] text-emerald-400 block">Banque : +Dette Passif</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Caution Dirigeant</span>
                <div className="text-sm font-bold text-emerald-400">0 € Caution</div>
                <span className="text-[10px] text-slate-400 block">Banque : Caution Privée</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Financement TVA</span>
                <div className="text-sm font-bold text-[#ffbc7d]">100% Avancé</div>
                <span className="text-[10px] text-slate-400 block">Banque : 0% Financé</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Délai SEPA</span>
                <div className="text-sm font-bold text-[#fa6e69]">24h à 48h</div>
                <span className="text-[10px] text-slate-400 block">Banque : 6 à 12 sem.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <span className="text-xs text-slate-400">
                Protocole conforme aux articles L527-1 et suivants du Code de commerce (Gage des stocks sans dépossession).
              </span>
              <a
                href="https://www.wavo.fr/rendez-vous/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#fa6e69] hover:bg-[#e0534e] shadow-lg shadow-[#fa6e69]/30 transition-all whitespace-nowrap cursor-pointer"
              >
                <span>Demander une étude d&apos;éligibilité confidentielle</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

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
