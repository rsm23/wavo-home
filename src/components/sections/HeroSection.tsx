"use client";

import React, { useState } from "react";
import InventoryVault3D from "@/components/3d/InventoryVault3D";
import { WAVO_CONTENT } from "@/lib/content";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  TrendingUp, 
  Sun, 
  Bike, 
  Laptop, 
  ShoppingBag
} from "lucide-react";

export default function HeroSection() {
  const { hero } = WAVO_CONTENT;

  // Interactive Live Facility Terminal Presets
  const assetScenarios = [
    {
      id: "solar",
      label: "Solaire & Énergie",
      icon: Sun,
      items: "280 panneaux bifaciaux + onduleurs",
      stockValue: 120000,
      tvaAdvance: 24000,
      turnover: "3 mois",
      repayment: "Au fil des raccordements clients",
    },
    {
      id: "mobility",
      label: "Mobilité Électrique",
      icon: Bike,
      items: "65 vélos cargos & batteries",
      stockValue: 85000,
      tvaAdvance: 17000,
      turnover: "2.5 mois",
      repayment: "À chaque sortie magasin / e-commerce",
    },
    {
      id: "it",
      label: "IT & Reconditionné",
      icon: Laptop,
      items: "420 PC portables & stations de travail",
      stockValue: 210000,
      tvaAdvance: 42000,
      turnover: "4 mois",
      repayment: "Dès facturation des flottes B2B",
    },
    {
      id: "retail",
      label: "Retail & B2B",
      icon: ShoppingBag,
      items: "6 000 références de saison",
      stockValue: 160000,
      tvaAdvance: 32000,
      turnover: "3 mois",
      repayment: "Au fil des encaissements caisse",
    },
  ];

  const [activeScenario, setActiveScenario] = useState(assetScenarios[0]);

  const totalCashReleased = activeScenario.stockValue + activeScenario.tvaAdvance;

  return (
    <section className="relative min-h-screen pt-32 sm:pt-36 pb-24 overflow-hidden flex flex-col justify-center bg-[#fafafc] dark:bg-[#080b13] transition-colors duration-200">
      
      {/* Precision Architectural Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle radial ambient spotlight centered on top */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#fa6e69]/15 via-[#ffbc7d]/10 to-transparent rounded-full blur-[140px] opacity-70 dark:opacity-100" />
        
        {/* Fine Architectural Hairline Grid */}
        <div 
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px"
          }}
        />

        {/* Decorative Coordinate Marks */}
        <div className="hidden lg:block absolute top-36 left-10 font-mono text-[10px] text-slate-400 dark:text-slate-600 tracking-widest">
          FACILITY//LYON:45.6950°N, 4.8923°E
        </div>
        <div className="hidden lg:block absolute top-36 right-10 font-mono text-[10px] text-slate-400 dark:text-slate-600 tracking-widest">
          STATUS:LIVE_MARKET
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        
        {/* Top Masterhead Section */}
        <div className="space-y-6 max-w-4xl">
          
          {/* Institutional Label */}
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#fa6e69] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#fa6e69] animate-pulse" />
            <span>FACILITÉ DE CRÉDIT ADOSSÉE AUX STOCKS • TPE &amp; PME FRANÇAISES</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-slate-900 dark:text-white leading-[1.05]">
            Votre stock physique finance{" "}
            <span className="wavo-gradient-text">votre hypercroissance.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
            {hero.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a
              href="#simulateur"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#fa6e69] via-[#e0534e] to-[#c43834] hover:from-[#ff8a85] hover:to-[#e0534e] shadow-xl shadow-[#fa6e69]/30 border border-white/[0.15] transition-all cursor-pointer group active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-[#ffbc7d]" />
              <span>Simuler ma trésorerie immédiate</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://www.wavo.fr/rendez-vous/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-[#10101b]/55 hover:border-[#fa6e69]/50 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/[0.1] shadow-sm transition-all"
            >
              <span>Vérifier mon éligibilité</span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#fa6e69]/15 text-[#fa6e69] border border-[#fa6e69]/30">
                &lt; 2 min
              </span>
            </a>
          </div>

        </div>

        {/* The Live Interactive Credit Terminal & Physical Vault Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          
          {/* Left Column: Interactive Asset Collateral Terminal */}
          <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0f131e] border border-slate-200/90 dark:border-white/[0.1] p-5 sm:p-7 flex flex-col justify-between gap-4 shadow-xl dark:shadow-2xl relative overflow-hidden">
            
            {/* Terminal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-white/[0.08] pb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#fa6e69] font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#fa6e69] animate-pulse" />
                  SIMULATEUR DE PORTAGE EN DIRECT
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  Sélectionnez un lot d&apos;actifs pour visualiser le déblocage
                </div>
              </div>
              <div className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-[11px] font-mono text-slate-600 dark:text-slate-400 self-start sm:self-auto font-medium">
                0€ dette au bilan
              </div>
            </div>

            {/* Asset Sector Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {assetScenarios.map((scenario) => {
                const Icon = scenario.icon;
                const isSelected = activeScenario.id === scenario.id;
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    onClick={() => setActiveScenario(scenario)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                      isSelected
                        ? "bg-[#fa6e69]/10 dark:bg-[#fa6e69]/15 border-[#fa6e69] text-slate-950 dark:text-white shadow-lg shadow-[#fa6e69]/10 ring-1 ring-[#fa6e69]/30"
                        : "bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={`w-4 h-4 ${isSelected ? "text-[#fa6e69]" : "text-slate-400 dark:text-slate-500"}`} />
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-[#fa6e69]" : "bg-transparent"}`} />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">{scenario.label}</div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-500 mt-0.5">
                        {(scenario.stockValue / 1000).toFixed(0)} k€ stock
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Visual Portage Execution Flow Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/[0.05] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#fa6e69]/15 text-[#fa6e69] font-mono font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                  <strong className="text-slate-900 dark:text-slate-200 block font-semibold">Audit express</strong> 2h chrono sur listing
                </span>
              </div>
              <div className="flex items-center gap-2 sm:border-x sm:border-slate-200 dark:sm:border-white/[0.06] sm:px-2">
                <span className="w-5 h-5 rounded-full bg-[#fa6e69]/15 text-[#fa6e69] font-mono font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                  <strong className="text-slate-900 dark:text-slate-200 block font-semibold">Avance 100%</strong> SEPA 24h sans délai
                </span>
              </div>
              <div className="flex items-center gap-2 sm:pl-1">
                <span className="w-5 h-5 rounded-full bg-[#fa6e69]/15 text-[#fa6e69] font-mono font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                  <strong className="text-slate-900 dark:text-slate-200 block font-semibold">Rachat unitaire</strong> Au fil de vos ventes
                </span>
              </div>
            </div>

            {/* Live Financial Breakdown Matrix */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 dark:bg-black/40 border border-slate-200/80 dark:border-white/[0.07] space-y-3.5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-white/[0.06] pb-2.5">
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Actif engagé : <strong className="text-slate-900 dark:text-slate-200">{activeScenario.items}</strong>
                </span>
                <span className="text-[11px] font-mono text-[#e0534e] dark:text-[#ffbc7d] font-semibold">
                  Rotation estimée : {activeScenario.turnover}
                </span>
              </div>

              {/* 3 Core Financial Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <div className="p-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.05] space-y-1 shadow-sm dark:shadow-none">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block uppercase">Valeur Achat Stock</span>
                  <span className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-white block">
                    {activeScenario.stockValue.toLocaleString("fr-FR")} €
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> 100% financé
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.05] space-y-1 shadow-sm dark:shadow-none">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block uppercase">Avance TVA (+20%)</span>
                  <span className="text-base sm:text-lg font-mono font-bold text-[#e0534e] dark:text-[#ffbc7d] block">
                    +{activeScenario.tvaAdvance.toLocaleString("fr-FR")} €
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                    Avancé par Wavo
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-br from-[#fa6e69]/15 to-transparent border border-[#fa6e69]/40 space-y-1 shadow-sm">
                  <span className="text-[10px] font-mono text-[#fa6e69] block font-bold uppercase">Trésorerie Débloquée</span>
                  <span className="text-lg sm:text-xl font-mono font-black text-slate-900 dark:text-white block">
                    {totalCashReleased.toLocaleString("fr-FR")} €
                  </span>
                  <span className="text-[10px] text-[#fa6e69] font-mono font-bold block">
                    Virement sous 24h
                  </span>
                </div>

              </div>

              {/* Legal & Regulatory Guarantees */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-[11px] font-mono text-slate-600 dark:text-slate-400 border-t border-slate-200/80 dark:border-white/[0.06]">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#fa6e69]" />
                  Dette bancaire : <strong className="text-slate-950 dark:text-white">0,00 €</strong>
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#fa6e69]" />
                  Caution personnelle : <strong className="text-slate-950 dark:text-white">0,00 €</strong>
                </span>
                <span className="text-[11px] text-[#fa6e69] font-medium">
                  Modalité : {activeScenario.repayment}
                </span>
              </div>

            </div>

            {/* Direct CTA Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <a
                href="https://www.wavo.fr/rendez-vous/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#fa6e69] to-[#e0534e] hover:from-[#ff8a85] hover:to-[#e0534e] shadow-md shadow-[#fa6e69]/30 transition-all cursor-pointer group"
              >
                <span>Débloquer {totalCashReleased.toLocaleString("fr-FR")} € sur mes stocks</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Sans transfert logistique • Vos stocks restent chez vous
              </span>
            </div>

          </div>

          {/* Right Column: Physical Vault Hologram with Interactive Depth */}
          <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#0b0e17] border border-slate-200/90 dark:border-white/[0.08] p-4 flex flex-col justify-between relative overflow-hidden shadow-xl dark:shadow-2xl">
            <div className="flex items-center justify-between px-3 pt-2 text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                VALORISATION D&apos;ACTIF EN TEMPS RÉEL
              </span>
              <span className="text-[#fa6e69] font-bold">100% SÉCURISÉ</span>
            </div>
            
            <div className="relative flex-1 min-h-[380px] lg:min-h-[400px] w-full flex items-center justify-center">
              <InventoryVault3D />
            </div>

            <div className="px-3 pb-2 text-[11px] font-mono text-slate-500 dark:text-slate-500 text-center">
              Vos stocks restent physiquement dans vos entrepôts habituels. Aucun transfert logistique.
            </div>
          </div>

        </div>

        {/* Institutional Market Ticker Tape (Continuous Financial Metrics) */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.08]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hero.stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-white dark:bg-[#0f131e]/80 border border-slate-200/80 dark:border-white/[0.06] shadow-sm dark:shadow-none flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-sm text-[#fa6e69] font-bold ml-0.5">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] text-[#fa6e69] border border-slate-200/60 dark:border-white/[0.08]">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
