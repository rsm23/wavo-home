"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { WAVO_CONTENT } from "@/lib/content";
import { 
  Building2, 
  PackageCheck, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Calendar,
  Users,
  TrendingUp,
  Scale,
  CreditCard,
  Cpu,
  Box,
  Warehouse,
  RotateCcw,
  Check
} from "lucide-react";
import FloatingCard3D from "@/components/3d/FloatingCards3D";

export default function EligibilityQuiz() {
  const { eligibility } = WAVO_CONTENT;

  // Selected criteria state
  const [checkedCriteria, setCheckedCriteria] = useState<Record<string, boolean>>({
    immat: true,
    team: true,
    ca: true,
    proc: true,
    pay: true,
    tools: true,
    phys: true,
    stock: true,
    cycle: true,
  });

  const enterpriseIcons: Record<string, React.ElementType> = {
    immat: Calendar,
    team: Users,
    ca: TrendingUp,
    proc: Scale,
    pay: CreditCard,
    tools: Cpu,
  };

  const productIcons: Record<string, React.ElementType> = {
    phys: Box,
    stock: Warehouse,
    cycle: RotateCcw,
  };

  const toggleCriterion = (id: string) => {
    setCheckedCriteria((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      const allChecked = Object.values(updated).every(Boolean);
      if (allChecked) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
        });
      }
      return updated;
    });
  };

  const totalCriteria = eligibility.enterpriseCriteria.length + eligibility.productCriteria.length;
  const passedCount = Object.values(checkedCriteria).filter(Boolean).length;
  const isFullyEligible = passedCount === totalCriteria;
  const percentage = Math.round((passedCount / totalCriteria) * 100);

  return (
    <section id="eligibilite" className="relative z-20 py-28 bg-[#080b13] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full wavo-glass text-xs font-mono font-semibold text-[#fa6e69] border border-[#fa6e69]/30">
            <PackageCheck className="w-3.5 h-3.5" />
            <span>DIAGNOSTIC DE QUALIFICATION EN DIRECT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Qui peut utiliser <span className="wavo-gradient-text">Wavo ?</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Wavo s’adresse aux entreprises établies qui achètent et stockent des produits physiques avant de les revendre en B2B ou B2C. Activez vos critères ci-dessous pour tester votre éligibilité en temps réel.
          </p>
        </div>

        {/* Diagnostic Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Bespoke Interactive Criteria Cards */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Group 1: Enterprise Criteria */}
            <div className="p-7 sm:p-9 rounded-3xl wavo-card space-y-6">
              <div className="flex items-center gap-3.5 border-b border-white/[0.08] pb-5">
                <div className="p-3 rounded-2xl bg-[#fa6e69]/15 text-[#fa6e69] border border-[#fa6e69]/30 shadow-lg shadow-[#fa6e69]/10">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Critères Entreprise (TPE &amp; PME Françaises)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Conditions requises sur la structure juridique et financière
                  </p>
                </div>
              </div>

              {/* Bespoke Interactive Row Items (NO BASIC HTML CHECKBOXES!) */}
              <div className="space-y-3">
                {eligibility.enterpriseCriteria.map((c) => {
                  const isChecked = !!checkedCriteria[c.id];
                  const Icon = enterpriseIcons[c.id] || Building2;
                  return (
                    <div
                      key={c.id}
                      onClick={() => toggleCriterion(c.id)}
                      className={`group p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 select-none ${
                        isChecked
                          ? "bg-[#fa6e69]/[0.08] border-[#fa6e69]/40 hover:border-[#fa6e69]/70 shadow-lg shadow-[#fa6e69]/5"
                          : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15] opacity-60 hover:opacity-100"
                      }`}
                    >
                      {/* Left: Custom Icon + Text */}
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`p-2.5 rounded-xl border transition-colors ${
                            isChecked
                              ? "bg-[#fa6e69]/20 border-[#fa6e69]/40 text-[#fa6e69]"
                              : "bg-white/[0.04] border-white/[0.08] text-slate-500"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                          {c.label}
                        </span>
                      </div>

                      {/* Right: Bespoke Luxury Interactive Toggle Pill */}
                      <div className="flex-shrink-0">
                        <div
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold flex items-center gap-2 transition-all duration-300 ${
                            isChecked
                              ? "bg-[#fa6e69] text-white shadow-md shadow-[#fa6e69]/40"
                              : "bg-white/[0.05] text-slate-500 border border-white/[0.08]"
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                              isChecked ? "bg-white text-[#fa6e69]" : "bg-white/10 text-slate-500"
                            }`}
                          >
                            {isChecked ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : null}
                          </div>
                          <span>{isChecked ? "CONFORME" : "NON COCHÉ"}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Group 2: Product Criteria */}
            <div className="p-7 sm:p-9 rounded-3xl wavo-card space-y-6">
              <div className="flex items-center gap-3.5 border-b border-white/[0.08] pb-5">
                <div className="p-3 rounded-2xl bg-[#ffbc7d]/15 text-[#ffbc7d] border border-[#ffbc7d]/30 shadow-lg shadow-[#ffbc7d]/10">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Critères Produits &amp; Stocks
                  </h3>
                  <p className="text-xs text-slate-400">
                    Conditions d&apos;éligibilité pour les références en inventaire
                  </p>
                </div>
              </div>

              {/* Bespoke Interactive Product Cards */}
              <div className="space-y-3">
                {eligibility.productCriteria.map((c) => {
                  const isChecked = !!checkedCriteria[c.id];
                  const Icon = productIcons[c.id] || Box;
                  return (
                    <div
                      key={c.id}
                      onClick={() => toggleCriterion(c.id)}
                      className={`group p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none ${
                        isChecked
                          ? "bg-[#ffbc7d]/[0.08] border-[#ffbc7d]/40 hover:border-[#ffbc7d]/70 shadow-lg shadow-[#ffbc7d]/5"
                          : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15] opacity-60 hover:opacity-100"
                      }`}
                    >
                      {/* Left: Icon + Label + Explanatory note */}
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`p-2.5 rounded-xl border mt-0.5 transition-colors ${
                            isChecked
                              ? "bg-[#ffbc7d]/20 border-[#ffbc7d]/40 text-[#ffbc7d]"
                              : "bg-white/[0.04] border-white/[0.08] text-slate-500"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs sm:text-sm font-semibold text-white">
                            {c.label}
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal">
                            {c.note}
                          </div>
                        </div>
                      </div>

                      {/* Right: Bespoke Luxury Interactive Toggle Pill */}
                      <div className="flex-shrink-0 self-end sm:self-center">
                        <div
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold flex items-center gap-2 transition-all duration-300 ${
                            isChecked
                              ? "bg-[#ffbc7d] text-[#10101b] shadow-md shadow-[#ffbc7d]/40"
                              : "bg-white/[0.05] text-slate-500 border border-white/[0.08]"
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                              isChecked ? "bg-[#10101b] text-[#ffbc7d]" : "bg-white/10 text-slate-500"
                            }`}
                          >
                            {isChecked ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : null}
                          </div>
                          <span>{isChecked ? "VALIDÉ" : "NON COCHÉ"}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: High-End Live Diagnostic Gauge & Action Card */}
          <div className="lg:col-span-5 sticky top-28">
            <FloatingCard3D className="rounded-3xl">
              <div className="p-8 sm:p-9 rounded-3xl bg-gradient-to-br from-[#10101b] via-[#1c2639] to-[#0a0c14] border border-[#fa6e69]/30 shadow-2xl space-y-7">
                
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#fa6e69] animate-ping" />
                    Indicateur de Conformité
                  </span>
                  <span className="text-[#fa6e69] font-bold">
                    {passedCount} / {totalCriteria} Validés
                  </span>
                </div>

                {/* Circular SVG Compliance Gauge (Original Bespoke Element) */}
                <div className="flex items-center justify-center py-2">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      {/* Background circle */}
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth="10"
                      />
                      {/* Progress animated circle */}
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="url(#coralGrad)"
                        strokeWidth="10"
                        strokeDasharray={314.16}
                        strokeDashoffset={314.16 - (314.16 * percentage) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-700 ease-out"
                      />
                      <defs>
                        <linearGradient id="coralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#fa6e69" />
                          <stop offset="100%" stopColor="#ffbc7d" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="text-3xl font-black text-white font-mono tracking-tight">
                        {percentage}%
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        Qualifié
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Callout */}
                {isFullyEligible ? (
                  <div className="p-5 rounded-2xl bg-[#fa6e69]/15 border border-[#fa6e69]/40 space-y-2">
                    <div className="flex items-center gap-2 text-[#fa6e69] font-bold text-sm">
                      <Sparkles className="w-4 h-4 text-[#ffbc7d]" />
                      <span>Félicitations ! Dossier 100% éligible</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      Votre entreprise et vos stocks répondent aux exigences d&apos;intervention Wavo. Vous pouvez débloquer jusqu&apos;à 250 000 € en moins de 24h.
                    </p>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                      <span>Éligibilité partielle ({totalCriteria - passedCount} critère(s) manquant(s))</span>
                    </div>
                    <p className="text-xs text-amber-200/80 leading-relaxed">
                      Certaines conditions nécessitent une analyse spécifique. Contactez notre équipe pour étudier une dérogation.
                    </p>
                  </div>
                )}

                {/* Direct Booking CTA */}
                <a
                  href="https://www.wavo.fr/rendez-vous/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#fa6e69] via-[#e0534e] to-[#c43834] hover:from-[#ff8a85] hover:to-[#e0534e] text-white text-sm font-bold shadow-xl shadow-[#fa6e69]/30 flex items-center justify-center gap-2 group cursor-pointer transition-all active:scale-[0.98] border border-white/[0.15]"
                >
                  <span>Prendre rendez-vous avec un analyste</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="text-center text-[11px] font-mono text-slate-500">
                  🔒 Données d&apos;entreprise protégées sous secret professionnel
                </div>

              </div>
            </FloatingCard3D>
          </div>

        </div>

      </div>
    </section>
  );
}
