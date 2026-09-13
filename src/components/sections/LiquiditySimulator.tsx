"use client";

import React, { useState, useMemo } from "react";
import FloatingCard3D from "@/components/3d/FloatingCards3D";
import { 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Activity,
  Laptop,
  Bike,
  Sun,
  ShoppingBag
} from "lucide-react";

export default function LiquiditySimulator() {
  const [stockAmount, setStockAmount] = useState<number>(150000);
  const [rotationMonths, setRotationMonths] = useState<number>(3);
  const [category, setCategory] = useState<string>("hightech");

  const results = useMemo(() => {
    const tvaAdvance = stockAmount * 0.20;
    const totalCashReleased = stockAmount + tvaAdvance;
    
    // Daily fee: 0.05% per day
    const days = rotationMonths * 30;
    const dailyFeeAmount = stockAmount * 0.0005 * days;
    
    // Degressive repurchase rate up to 5%
    const repurchaseRate = Math.min(0.05, 0.012 + (rotationMonths / 8) * 0.038);
    const repurchaseFeeAmount = stockAmount * repurchaseRate;
    
    const totalCost = dailyFeeAmount + repurchaseFeeAmount;
    const effectiveMonthlyPercent = ((totalCost / stockAmount) / rotationMonths) * 100;

    return {
      tvaAdvance,
      totalCashReleased,
      dailyFeeAmount,
      repurchaseRate: (repurchaseRate * 100).toFixed(1),
      repurchaseFeeAmount,
      totalCost,
      effectiveMonthlyPercent: effectiveMonthlyPercent.toFixed(2),
    };
  }, [stockAmount, rotationMonths]);

  return (
    <section id="simulateur" className="relative z-20 py-28 sm:py-36 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-60 w-[600px] h-[600px] bg-[#fa6e69]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/4 -right-60 w-[600px] h-[600px] bg-[#ffbc7d]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full wavo-glass text-xs font-mono font-semibold text-[#fa6e69] border border-[#fa6e69]/30 shadow-xs">
            <Calculator className="w-3.5 h-3.5" />
            <span>CALCULATEUR DE FINANCEMENT EN TEMPS RÉEL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight transition-colors">
            Estimez votre déblocage de{" "}
            <span className="wavo-gradient-text">trésorerie immédiate</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed transition-colors">
            Ajustez la valeur de votre stock physique et votre vitesse d&apos;écoulement. Visualisez en direct vos liquidités libérées sans impact sur votre endettement.
          </p>
        </div>

        {/* The Simulator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Console (Left Column) */}
          <div className="lg:col-span-7 wavo-card p-6 sm:p-10 space-y-9">
            
            {/* Slider 1: Stock Amount */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-sm font-bold text-slate-900 dark:text-white tracking-wide flex items-center gap-2">
                    <span>Valeur d&apos;achat du stock à financer</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 text-[10px] font-mono border border-slate-200/60 dark:border-transparent">
                      Min 50k€ • Max 500k€
                    </span>
                  </label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Commande fournisseur ou inventaire déjà stocké
                  </p>
                </div>
                <div className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#fa6e69]/15 to-[#ffbc7d]/10 dark:from-[#fa6e69]/20 dark:to-[#ffbc7d]/10 border border-[#fa6e69]/40 text-[#fa6e69] font-mono font-black text-2xl tracking-tight self-start sm:self-auto shadow-lg shadow-[#fa6e69]/10">
                  {stockAmount.toLocaleString("fr-FR")} €
                </div>
              </div>

              {/* Bespoke Tactile Controller */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/[0.07] space-y-3 shadow-inner dark:shadow-none">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStockAmount((prev) => Math.max(50000, prev - 10000))}
                    disabled={stockAmount <= 50000}
                    className="w-9 h-9 rounded-xl bg-white dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/[0.1] active:scale-95 disabled:opacity-30 disabled:pointer-events-none text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] shadow-xs flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
                    title="- 10 000 €"
                  >
                    <span className="text-base font-bold">−</span>
                  </button>

                  <div className="relative flex-1 flex items-center h-6">
                    {/* Glowing Track Fill */}
                    <div className="absolute inset-x-0 h-2 rounded-full bg-slate-200 dark:bg-white/[0.08] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#fa6e69] via-[#ff8a85] to-[#ffbc7d] rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(250,110,105,0.6)]"
                        style={{
                          width: `${((stockAmount - 50000) / (500000 - 50000)) * 100}%`,
                        }}
                      />
                    </div>
                    {/* Range Input on Top */}
                    <input
                      type="range"
                      min="50000"
                      max="500000"
                      step="10000"
                      value={stockAmount}
                      onChange={(e) => setStockAmount(Number(e.target.value))}
                      className="wavo-slider relative z-10 opacity-90 cursor-pointer"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setStockAmount((prev) => Math.min(500000, prev + 10000))}
                    disabled={stockAmount >= 500000}
                    className="w-9 h-9 rounded-xl bg-white dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/[0.1] active:scale-95 disabled:opacity-30 disabled:pointer-events-none text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] shadow-xs flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
                    title="+ 10 000 €"
                  >
                    <span className="text-base font-bold">+</span>
                  </button>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 px-1">
                  <span>50 000 €</span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">250 000 € (Plafond initial)</span>
                  <span>500 000 €+</span>
                </div>
              </div>

              {/* Bespoke Preset Chips */}
              <div className="flex flex-wrap gap-2 pt-0.5">
                {[
                  { val: 80000, label: "80 k€" },
                  { val: 150000, label: "150 k€ (Moyen)" },
                  { val: 250000, label: "250 k€ (Standard)" },
                  { val: 400000, label: "400 k€ (Scale-up)" },
                ].map(({ val, label }) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setStockAmount(val)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      stockAmount === val
                        ? "bg-[#fa6e69] text-white shadow-md shadow-[#fa6e69]/40 border border-[#fa6e69]"
                        : "bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.06]"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        stockAmount === val ? "bg-white animate-pulse" : "bg-slate-400 dark:bg-slate-600"
                      }`}
                    />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 2: Rotation Duration */}
            <div className="space-y-4 pt-6 border-t border-slate-200/80 dark:border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-sm font-bold text-slate-900 dark:text-white tracking-wide flex items-center gap-2">
                    <span>Cycle moyen d&apos;écoulement</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 text-[10px] font-mono border border-slate-200/60 dark:border-transparent">
                      Max 8 mois
                    </span>
                  </label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Délai estimé pour écouler 100% des unités financées
                  </p>
                </div>
                <div className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#ffbc7d]/20 to-[#fa6e69]/10 border border-[#ffbc7d]/40 text-[#ffbc7d] font-mono font-black text-2xl tracking-tight self-start sm:self-auto shadow-lg shadow-[#ffbc7d]/10">
                  {rotationMonths} {rotationMonths > 1 ? "mois" : "mois"}
                </div>
              </div>

              {/* Bespoke Tactile Controller for Months */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/[0.07] space-y-3 shadow-inner dark:shadow-none">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRotationMonths((prev) => Math.max(1, prev - 1))}
                    disabled={rotationMonths <= 1}
                    className="w-9 h-9 rounded-xl bg-white dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/[0.1] active:scale-95 disabled:opacity-30 disabled:pointer-events-none text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] shadow-xs flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
                    title="- 1 mois"
                  >
                    <span className="text-base font-bold">−</span>
                  </button>

                  <div className="relative flex-1 flex items-center h-6">
                    {/* Glowing Track Fill */}
                    <div className="absolute inset-x-0 h-2 rounded-full bg-slate-200 dark:bg-white/[0.08] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#ffbc7d] via-[#fa6e69] to-[#fa6e69] rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(255,188,125,0.6)]"
                        style={{
                          width: `${((rotationMonths - 1) / (8 - 1)) * 100}%`,
                        }}
                      />
                    </div>
                    {/* Range Input on Top */}
                    <input
                      type="range"
                      min="1"
                      max="8"
                      step="1"
                      value={rotationMonths}
                      onChange={(e) => setRotationMonths(Number(e.target.value))}
                      className="wavo-slider relative z-10 opacity-90 cursor-pointer"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setRotationMonths((prev) => Math.min(8, prev + 1))}
                    disabled={rotationMonths >= 8}
                    className="w-9 h-9 rounded-xl bg-white dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/[0.1] active:scale-95 disabled:opacity-30 disabled:pointer-events-none text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] shadow-xs flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
                    title="+ 1 mois"
                  >
                    <span className="text-base font-bold">+</span>
                  </button>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 px-1">
                  <span>1 mois (Express)</span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">4 mois (Moyenne PME)</span>
                  <span>8 mois (Plafond max)</span>
                </div>
              </div>

              {/* Segmented Duration Quick-Pills */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-0.5">
                {[1, 2, 3, 4, 6, 8].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setRotationMonths(m)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-mono font-semibold text-center transition-all cursor-pointer ${
                      rotationMonths === m
                        ? "bg-[#ffbc7d] text-[#10101b] font-bold shadow-md shadow-[#ffbc7d]/30 border border-[#ffbc7d]"
                        : "bg-slate-100 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/[0.06]"
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            {/* Sector Selector */}
            <div className="space-y-3 pt-6 border-t border-slate-200/80 dark:border-white/[0.08]">
              <label className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">
                Secteur d&apos;activité
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "hightech", label: "High-Tech / IT", icon: Laptop },
                  { id: "mobility", label: "Mobilité / Vélos", icon: Bike },
                  { id: "solar", label: "Solaire & Énergie", icon: Sun },
                  { id: "retail", label: "Retail & B2B", icon: ShoppingBag },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCategory(item.id)}
                      className={`p-3 text-xs font-semibold rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                        category === item.id
                          ? "border-[#fa6e69] bg-[#fa6e69]/10 dark:bg-[#fa6e69]/15 text-[#fa6e69] dark:text-white shadow-md shadow-[#fa6e69]/10 font-bold"
                          : "border-slate-200/80 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.02] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          category === item.id ? "text-[#fa6e69]" : "text-slate-500"
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Cash Flow Curve SVG */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#fa6e69]" />
                  Courbe de Trésorerie Simulée (vs Financement Bancaire)
                </span>
                <span className="text-[10px] text-[#fa6e69] font-mono font-bold">
                  +100% de liquidité immédiate
                </span>
              </div>

              {/* Dynamic SVG Area Chart with Wavo Coral Palette */}
              <div className="h-28 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="wavoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fa6e69" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#fa6e69" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Wavo Cash Path */}
                  <path
                    d="M 0,35 Q 100,28 200,30 T 400,25"
                    fill="none"
                    stroke="#fa6e69"
                    strokeWidth="3"
                  />
                  <path
                    d="M 0,35 Q 100,28 200,30 T 400,25 L 400,100 L 0,100 Z"
                    fill="url(#wavoGrad)"
                  />

                  {/* Bank Debt Path */}
                  <path
                    d="M 0,40 Q 80,85 200,80 T 400,60"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.8"
                  />
                </svg>

                <div className="absolute top-2 left-3 text-[10px] font-mono text-[#fa6e69] bg-white dark:bg-black/60 px-2 py-0.5 rounded border border-[#fa6e69]/30 shadow-xs">
                  Avec Wavo : Trésorerie préservée
                </div>
                <div className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-black/60 px-2 py-0.5 rounded border border-slate-200 dark:border-white/10 shadow-xs">
                  Crédit classique : BFR gelé
                </div>
              </div>
            </div>

          </div>

          {/* Results Financial HUD Card (Right Column) with 3D Tilt */}
          <div className="lg:col-span-5 sticky top-28">
            <FloatingCard3D className="rounded-3xl">
              <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-[#10101b] dark:via-[#1c2639] dark:to-[#0a0c14] border border-[#fa6e69]/30 shadow-xl dark:shadow-2xl space-y-7 relative overflow-hidden">
                
                {/* Visual Top Status */}
                <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/[0.08] pb-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#fa6e69] font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#fa6e69] animate-ping" />
                    Offre Indicative • Wavo
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#fa6e69]/10 dark:bg-[#fa6e69]/15 text-[#fa6e69] border border-[#fa6e69]/30 text-[10px] font-mono font-bold">
                    Accord sous 24h
                  </span>
                </div>

                {/* Big Metric Display */}
                <div className="space-y-1.5">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Trésorerie immédiatement débloquée sur votre compte :
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono tracking-tight flex items-baseline gap-1.5">
                    {Math.round(results.totalCashReleased).toLocaleString("fr-FR")}
                    <span className="text-2xl text-[#fa6e69] font-bold">€</span>
                  </div>
                  <div className="text-xs text-[#fa6e69] font-medium flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Dont {Math.round(results.tvaAdvance).toLocaleString("fr-FR")} € de TVA avancée à 100% par Wavo</span>
                  </div>
                </div>

                {/* Cost Breakdown Matrix */}
                <div className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-white/[0.08] text-xs font-mono">
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                    <span>Frais journaliers (0,05% / j) :</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      ~{Math.round(results.dailyFeeAmount).toLocaleString("fr-FR")} € ({rotationMonths * 30}j)
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                    <span>Frais de rachat dégressif ({results.repurchaseRate}%) :</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {Math.round(results.repurchaseFeeAmount).toLocaleString("fr-FR")} €
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                    <span>Coût de revient mensuel :</span>
                    <span className="font-bold text-amber-600 dark:text-[#ffbc7d]">
                      {results.effectiveMonthlyPercent}% / mois
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-200/80 dark:border-white/[0.08] text-sm">
                    <span className="font-sans font-bold text-slate-800 dark:text-slate-200">Impact sur votre endettement :</span>
                    <span className="font-bold text-[#fa6e69] uppercase">0 € (Zéro Dette)</span>
                  </div>
                </div>

                {/* Structural Comparison Pill Matrix */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/[0.08] space-y-2.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    Comparatif Structurel
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-center font-mono">
                    <div className="p-2.5 rounded-xl bg-[#fa6e69]/10 dark:bg-[#fa6e69]/20 border border-[#fa6e69]/40 text-slate-900 dark:text-white">
                      <div className="font-bold text-[#fa6e69]">Wavo</div>
                      <div className="text-[#fa6e69] font-medium mt-1">✓ 0 caution</div>
                      <div className="text-[#fa6e69] font-medium">✓ 0 dette</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.05] text-slate-500 dark:text-slate-400">
                      <div>Prêt Bancaire</div>
                      <div className="text-rose-600 dark:text-rose-400 mt-1">✗ Caution perso</div>
                      <div className="text-rose-600 dark:text-rose-400">✗ Bilan alourdi</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.05] text-slate-500 dark:text-slate-400">
                      <div>Gage Stock</div>
                      <div className="text-rose-600 dark:text-rose-400 mt-1">✗ Greffe lourd</div>
                      <div className="text-rose-600 dark:text-rose-400">✗ -50% décote</div>
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <a
                  href="https://www.wavo.fr/rendez-vous/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#fa6e69] via-[#e0534e] to-[#c43834] hover:from-[#ff8a85] hover:to-[#e0534e] text-white text-sm font-bold shadow-xl shadow-[#fa6e69]/35 border border-white/[0.15] flex items-center justify-center gap-2 group cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>Bloquer ces conditions &amp; Postuler</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="text-center text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  ⚡ Décision d&apos;éligibilité garantie en moins de 2 heures
                </div>

              </div>
            </FloatingCard3D>
          </div>

        </div>

      </div>
    </section>
  );
}
