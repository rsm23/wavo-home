"use client";

import React, { useState, useMemo } from "react";
import FloatingCard3D from "@/components/3d/FloatingCards3D";
import { 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Activity,
  Layers
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
      <div className="absolute top-1/2 -left-60 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 -right-60 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full fintech-glass text-xs font-mono font-semibold text-cyan-300 border border-cyan-500/30">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>MOTEUR DE SIMULATION FINANCIÈRE EN TEMPS RÉEL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Estimez votre déblocage de{" "}
            <span className="fintech-gradient-text">trésorerie immédiate</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            Ajustez la valeur de votre stock physique et votre vitesse d&apos;écoulement. Visualisez en direct vos liquidités libérées sans impact sur votre endettement.
          </p>
        </div>

        {/* The Private Credit Marketplace Simulator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Console (Left Column) */}
          <div className="lg:col-span-7 fintech-card p-6 sm:p-10 space-y-9">
            
            {/* Slider 1: Stock Amount */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-sm font-bold text-white tracking-wide">
                    Valeur d&apos;achat du stock à financer
                  </label>
                  <p className="text-xs text-slate-400">
                    Commande fournisseur ou inventaire déjà stocké
                  </p>
                </div>
                <div className="px-5 py-2.5 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono font-black text-2xl tracking-tight self-start sm:self-auto">
                  {stockAmount.toLocaleString("fr-FR")} €
                </div>
              </div>

              <input
                type="range"
                min="50000"
                max="500000"
                step="10000"
                value={stockAmount}
                onChange={(e) => setStockAmount(Number(e.target.value))}
                className="fintech-slider"
              />

              <div className="flex justify-between items-center text-[11px] font-mono text-slate-500">
                <span>50 000 €</span>
                <span>250 000 € (Plafond standard)</span>
                <span>500 000 €+</span>
              </div>

              {/* Preset buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[80000, 150000, 250000, 400000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setStockAmount(val)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                      stockAmount === val
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40 border border-indigo-400/40"
                        : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                    }`}
                  >
                    {val.toLocaleString("fr-FR")} €
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 2: Rotation Duration */}
            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-sm font-bold text-white tracking-wide">
                    Cycle moyen de revente de vos produits
                  </label>
                  <p className="text-xs text-slate-400">
                    Délai pour écouler 100% des unités concernées
                  </p>
                </div>
                <div className="px-5 py-2.5 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono font-black text-2xl tracking-tight self-start sm:self-auto">
                  {rotationMonths} {rotationMonths > 1 ? "mois" : "mois"}
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={rotationMonths}
                onChange={(e) => setRotationMonths(Number(e.target.value))}
                className="fintech-slider"
              />

              <div className="flex justify-between items-center text-[11px] font-mono text-slate-500">
                <span>1 mois (Express)</span>
                <span>4 mois (Standard PME)</span>
                <span>8 mois (Plafond max Wavo)</span>
              </div>
            </div>

            {/* Sector Selector */}
            <div className="space-y-3 pt-6 border-t border-white/[0.08]">
              <label className="text-sm font-bold text-white tracking-wide">
                Secteur d&apos;activité
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "hightech", label: "High-Tech / IT" },
                  { id: "mobility", label: "Mobilité / Vélos" },
                  { id: "solar", label: "Solaire & Énergie" },
                  { id: "retail", label: "Retail & B2B" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCategory(item.id)}
                    className={`p-3 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                      category === item.id
                        ? "border-indigo-500 bg-indigo-600/20 text-indigo-300 shadow-md shadow-indigo-600/20 font-bold"
                        : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Cash Flow Curve SVG */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-300 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  Courbe de Trésorerie Simulée (vs Financement Traditionnel)
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">
                  +100% de liquidité immédiate
                </span>
              </div>

              {/* Dynamic SVG Area Chart */}
              <div className="h-28 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="wavoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Wavo Cash Path (Steady high plateau) */}
                  <path
                    d="M 0,35 Q 100,28 200,30 T 400,25"
                    fill="none"
                    stroke="#00d4ff"
                    strokeWidth="3"
                  />
                  <path
                    d="M 0,35 Q 100,28 200,30 T 400,25 L 400,100 L 0,100 Z"
                    fill="url(#wavoGrad)"
                  />

                  {/* Bank Debt / Traditional Dip Path (Severe cash drain) */}
                  <path
                    d="M 0,40 Q 80,85 200,80 T 400,60"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.8"
                  />
                </svg>

                <div className="absolute top-2 left-3 text-[10px] font-mono text-cyan-300 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  Avec Wavo : Trésorerie préservée
                </div>
                <div className="absolute bottom-2 right-3 text-[10px] font-mono text-rose-400 bg-black/60 px-2 py-0.5 rounded border border-rose-500/30">
                  Crédit classique : BFR gelé
                </div>
              </div>
            </div>

          </div>

          {/* Results Financial HUD Card (Right Column) with 3D Tilt */}
          <div className="lg:col-span-5 sticky top-28">
            <FloatingCard3D className="rounded-3xl">
              <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-[#0e111a] via-[#131726] to-[#0a0c14] border border-indigo-500/30 shadow-2xl space-y-7 relative overflow-hidden">
                
                {/* Visual Top Status */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    Offre Indicative • Wavo Credit
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                    Accord sous 24h
                  </span>
                </div>

                {/* Big Metric Display */}
                <div className="space-y-1.5">
                  <div className="text-xs text-slate-400 font-medium">
                    Trésorerie immédiatement débloquée sur votre compte :
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight flex items-baseline gap-1.5">
                    {Math.round(results.totalCashReleased).toLocaleString("fr-FR")}
                    <span className="text-2xl text-cyan-400 font-bold">€</span>
                  </div>
                  <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Dont {Math.round(results.tvaAdvance).toLocaleString("fr-FR")} € de TVA avancée à 100% par Wavo</span>
                  </div>
                </div>

                {/* Cost Breakdown Matrix */}
                <div className="space-y-3 pt-4 border-t border-white/[0.08] text-xs font-mono">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Frais journaliers (0,05% / j) :</span>
                    <span className="font-bold text-white">
                      ~{Math.round(results.dailyFeeAmount).toLocaleString("fr-FR")} € ({rotationMonths * 30}j)
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-400">
                    <span>Frais de rachat dégressif ({results.repurchaseRate}%) :</span>
                    <span className="font-bold text-white">
                      {Math.round(results.repurchaseFeeAmount).toLocaleString("fr-FR")} €
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-400">
                    <span>Coût de revient mensuel :</span>
                    <span className="font-bold text-cyan-300">
                      {results.effectiveMonthlyPercent}% / mois
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-white/[0.08] text-sm">
                    <span className="font-sans font-bold text-slate-200">Impact sur votre endettement :</span>
                    <span className="font-bold text-emerald-400 uppercase">0 € (Zéro Dette)</span>
                  </div>
                </div>

                {/* Structural Comparison Pill Matrix */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-2.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Comparatif Structurel
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-center font-mono">
                    <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-white">
                      <div className="font-bold text-indigo-300">Wavo</div>
                      <div className="text-emerald-400 mt-1">✓ 0 caution</div>
                      <div className="text-emerald-400">✓ 0 dette</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-slate-400">
                      <div>Prêt Bancaire</div>
                      <div className="text-rose-400 mt-1">✗ Caution perso</div>
                      <div className="text-rose-400">✗ Bilan alourdi</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-slate-400">
                      <div>Gage Stock</div>
                      <div className="text-rose-400 mt-1">✗ Greffe lourd</div>
                      <div className="text-rose-400">✗ -50% décote</div>
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <a
                  href="https://www.wavo.fr/rendez-vous/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-sm font-bold shadow-xl shadow-indigo-600/35 border border-white/[0.15] flex items-center justify-center gap-2 group cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>Bloquer ces conditions &amp; Postuler</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="text-center text-[11px] text-slate-400 font-mono">
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
