"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { WAVO_CONTENT } from "@/lib/content";
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Building2, 
  PackageCheck, 
  Sparkles, 
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import FloatingCard3D from "@/components/3d/FloatingCards3D";

export default function EligibilityQuiz() {
  const { eligibility } = WAVO_CONTENT;

  // Selected checkboxes state
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

  const toggleCriterion = (id: string) => {
    setCheckedCriteria((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      const allChecked = Object.values(updated).every(Boolean);
      if (allChecked) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
      return updated;
    });
  };

  const totalCriteria = eligibility.enterpriseCriteria.length + eligibility.productCriteria.length;
  const passedCount = Object.values(checkedCriteria).filter(Boolean).length;
  const isFullyEligible = passedCount === totalCriteria;

  return (
    <section id="eligibilite" className="relative z-20 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/60 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Test d&apos;Éligibilité Immédiat</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Qui peut utiliser <span className="stripe-gradient-text">Wavo ?</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Wavo s’adresse aux entreprises établies qui achètent et stockent des produits physiques avant de les revendre en B2B ou B2C. Cochez vos critères pour tester votre éligibilité en temps réel.
          </p>
        </div>

        {/* Dual Column Criteria Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Checklists */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Box 1: Enterprise Criteria */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Critères Entreprise (TPE &amp; PME Françaises)
                  </h3>
                  <p className="text-xs text-slate-500">
                    6 conditions indispensables pour le déblocage de fonds
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {eligibility.enterpriseCriteria.map((c) => {
                  const isChecked = !!checkedCriteria[c.id];
                  return (
                    <div
                      key={c.id}
                      onClick={() => toggleCriterion(c.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isChecked
                          ? "bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800/60 text-slate-900 dark:text-slate-100"
                          : "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <span className="text-xs font-medium">{c.label}</span>
                      </div>
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Box 2: Product Criteria */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Critères Produits &amp; Stocks
                  </h3>
                  <p className="text-xs text-slate-500">
                    Conditions requises pour que le stock soit valorisable
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {eligibility.productCriteria.map((c) => {
                  const isChecked = !!checkedCriteria[c.id];
                  return (
                    <div
                      key={c.id}
                      onClick={() => toggleCriterion(c.id)}
                      className={`p-3.5 rounded-xl border flex flex-col gap-1.5 cursor-pointer transition-all ${
                        isChecked
                          ? "bg-cyan-50/50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800/60 text-slate-900 dark:text-slate-100"
                          : "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                          />
                          <span className="text-xs font-semibold">{c.label}</span>
                        </div>
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 ml-7">
                        {c.note}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Score Badge with 3D Card */}
          <div className="lg:col-span-5 sticky top-28">
            <FloatingCard3D className="rounded-3xl">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-2xl space-y-6">
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-indigo-300">
                    Diagnostic d&apos;Éligibilité
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {passedCount} / {totalCriteria} Validés
                  </span>
                </div>

                {/* Progress Ring / Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full transition-all duration-500"
                      style={{ width: `${(passedCount / totalCriteria) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Result Status Message */}
                {isFullyEligible ? (
                  <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Félicitations ! Votre profil est 100% éligible</span>
                    </div>
                    <p className="text-xs text-emerald-100/80 leading-relaxed">
                      Votre entreprise et vos stocks répondent parfaitement aux critères d&apos;intervention Wavo. Vous pouvez débloquer jusqu&apos;à 250 000 € en moins de 24 heures.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                      <span>Éligibilité partielle ({totalCriteria - passedCount} critère(s) manquant(s))</span>
                    </div>
                    <p className="text-xs text-amber-200/80 leading-relaxed">
                      Certains critères ne sont pas cochés. Contactez nos analystes pour une étude personnalisée de vos dérogations.
                    </p>
                  </div>
                )}

                {/* Fast-Track Appointment CTA */}
                <a
                  href="https://www.wavo.fr/rendez-vous/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-indigo-600 to-violet-600 hover:from-emerald-400 hover:to-violet-500 text-white text-sm font-bold shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 group cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>Prendre rendez-vous en ligne</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="text-center text-[11px] text-slate-400">
                  🔒 Vos données d&apos;entreprise restent 100% confidentielles
                </div>

              </div>
            </FloatingCard3D>
          </div>

        </div>

      </div>
    </section>
  );
}
