"use client";

import React, { useState, useMemo } from "react";
import FloatingCard3D from "@/components/3d/FloatingCards3D";
import { 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Euro
} from "lucide-react";

export default function LiquiditySimulator() {
  const [stockAmount, setStockAmount] = useState<number>(150000);
  const [rotationMonths, setRotationMonths] = useState<number>(3);
  const [category, setCategory] = useState<string>("hightech");

  // Calculations based on Wavo's pricing:
  // - 0.05% daily rate
  // - Repurchase fee up to 5% degressive based on rotation speed
  // - 100% stock financing + TVA (20%) advance
  const results = useMemo(() => {
    const tvaAdvance = stockAmount * 0.20;
    const totalCashReleased = stockAmount + tvaAdvance;
    
    // Daily fee 0.05% per day
    const days = rotationMonths * 30;
    const dailyFeeAmount = stockAmount * 0.0005 * days;
    
    // Degressive repurchase fee: 1 month = 1.5%, 3 months = 2.8%, 6 months = 4.2%, 8 months = 5.0%
    const repurchaseRate = Math.min(0.05, 0.01 + (rotationMonths / 8) * 0.04);
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
    <section id="simulateur" className="relative z-20 py-24 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulateur Instantané & Transparent</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Estimez votre déblocage de{" "}
            <span className="stripe-gradient-text">trésorerie immédiate</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Ajustez la valeur de vos produits et votre durée moyenne de rotation. Calculez les liquidités débloquées sans dette ni engagement rigide.
          </p>
        </div>

        {/* Main Simulator Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (Left Column) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-8">
            
            {/* Slider 1: Stock Amount */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-bold text-slate-900 dark:text-white">
                    Valeur d&apos;achat du stock à financer
                  </label>
                  <p className="text-xs text-slate-500">
                    Montant de votre commande fournisseur ou stock entreposé
                  </p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-300 font-extrabold text-xl sm:text-2xl">
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
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />

              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>50 000 €</span>
                <span>250 000 €</span>
                <span>500 000 €+</span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[80000, 150000, 250000, 400000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setStockAmount(val)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      stockAmount === val
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    {val.toLocaleString("fr-FR")} €
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 2: Rotation Duration */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-bold text-slate-900 dark:text-white">
                    Cycle moyen de revente de vos références
                  </label>
                  <p className="text-xs text-slate-500">
                    Délai estimé pour écouler l&apos;intégralité du lot auprès de vos clients
                  </p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/50 text-cyan-600 dark:text-cyan-300 font-extrabold text-xl sm:text-2xl">
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
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />

              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>1 mois (Rotation express)</span>
                <span>4 mois (Standard)</span>
                <span>8 mois (Plafond max)</span>
              </div>
            </div>

            {/* Sector Selector */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <label className="text-sm font-bold text-slate-900 dark:text-white">
                Typologie de produit
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "hightech", label: "High-Tech / IT" },
                  { id: "mobility", label: "Mobilité / Vélos" },
                  { id: "solar", label: "Solaire & Industrie" },
                  { id: "retail", label: "Retail & B2B" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCategory(item.id)}
                    className={`p-2.5 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                      category === item.id
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold shadow-sm"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Micro FAQ reminder */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Tarification transparente :</strong> 0,05 % de frais journaliers sur le montant financé + frais de rachat dégressif jusqu&apos;à 5 % maximum. Remboursement anticipé libre sans pénalité.
              </span>
            </div>

          </div>

          {/* Results Summary Card (Right Column) with 3D Tilt */}
          <div className="lg:col-span-5">
            <FloatingCard3D className="rounded-3xl">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-2xl relative overflow-hidden space-y-6">
                
                {/* Visual Top Ribbon */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
                    Offre Indicative Wavo
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Éligible sous 24h
                  </span>
                </div>

                {/* Big Number: Total Cash Released */}
                <div className="space-y-1">
                  <div className="text-xs text-slate-300">
                    Trésorerie immédiatement débloquée sur votre compte :
                  </div>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight text-white flex items-baseline gap-1">
                    {Math.round(results.totalCashReleased).toLocaleString("fr-FR")}
                    <span className="text-2xl text-cyan-400 font-bold">€</span>
                  </div>
                  <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Dont {Math.round(results.tvaAdvance).toLocaleString("fr-FR")} € de TVA entièrement avancée par Wavo
                  </div>
                </div>

                {/* Breakdown List */}
                <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Frais journaliers (0,05% / jour) :</span>
                    <span className="font-semibold text-white">
                      ~{Math.round(results.dailyFeeAmount).toLocaleString("fr-FR")} € ({rotationMonths * 30}j)
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span>Frais de rachat dégressif ({results.repurchaseRate}%) :</span>
                    <span className="font-semibold text-white">
                      {Math.round(results.repurchaseFeeAmount).toLocaleString("fr-FR")} €
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span>Coût de revient mensuel estimé :</span>
                    <span className="font-semibold text-cyan-300">
                      {results.effectiveMonthlyPercent}% / mois
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/10 text-sm font-bold">
                    <span className="text-slate-200">Impact sur votre endettement :</span>
                    <span className="text-emerald-400 uppercase tracking-wide">0 € (Zéro Dette)</span>
                  </div>
                </div>

                {/* Comparison Mini Matrix */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    Comparatif rapide
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-[10px] text-center">
                    <div className="p-2 rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-white font-bold">
                      Wavo
                      <div className="text-emerald-400 mt-1">✓ Sans caution</div>
                      <div className="text-emerald-400">✓ Bilan préservé</div>
                    </div>
                    <div className="p-2 rounded-lg bg-black/30 border border-white/5 text-slate-400">
                      Prêt Bancaire
                      <div className="text-rose-400 mt-1">✗ Dette + caution</div>
                      <div className="text-rose-400">✗ Bilan alourdi</div>
                    </div>
                    <div className="p-2 rounded-lg bg-black/30 border border-white/5 text-slate-400">
                      Gage sur stock
                      <div className="text-rose-400 mt-1">✗ Greffe &amp; notaire</div>
                      <div className="text-rose-400">✗ Décote de 50%</div>
                    </div>
                  </div>
                </div>

                {/* Direct Action Button */}
                <a
                  href="https://www.wavo.fr/rendez-vous/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-sm font-bold shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 group cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>Valider mon financement</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="text-center text-[11px] text-slate-400">
                  ⚡ Réponse d&apos;éligibilité en moins de 2 heures
                </div>

              </div>
            </FloatingCard3D>
          </div>

        </div>

      </div>
    </section>
  );
}
