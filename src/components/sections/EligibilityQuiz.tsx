"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { WAVO_CONTENT } from "@/lib/content";
import { 
  CheckCircle2, 
  XCircle, 
  Building2, 
  PackageCheck, 
  Sparkles, 
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import FloatingCard3D from "@/components/3d/FloatingCards3D";

export default function EligibilityQuiz() {
  const { eligibility } = WAVO_CONTENT;

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

  return (
    <section id="eligibilite" className="relative z-20 py-28 bg-[#080b13] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full wavo-glass text-xs font-mono font-semibold text-[#fa6e69] border border-[#fa6e69]/30">
            <PackageCheck className="w-3.5 h-3.5" />
            <span>CRITÈRES D&apos;ÉLIGIBILITÉ DU MODÈLE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Qui peut utiliser <span className="wavo-gradient-text">Wavo ?</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Wavo s’adresse aux entreprises établies qui achètent et stockent des produits physiques avant de les revendre en B2B ou B2C. Cochez vos critères pour tester votre éligibilité en direct.
          </p>
        </div>

        {/* Diagnostic Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Criteria Checklists */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Box 1: Enterprise Criteria */}
            <div className="p-7 sm:p-9 rounded-3xl wavo-card space-y-6">
              <div className="flex items-center gap-3.5 border-b border-white/[0.08] pb-4">
                <div className="p-3 rounded-2xl bg-[#fa6e69]/15 text-[#fa6e69] border border-[#fa6e69]/30">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Critères Entreprise (TPE &amp; PME Françaises)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Conditions requises sur la structure juridique et financière
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
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isChecked
                          ? "bg-[#fa6e69]/15 border-[#fa6e69]/40 text-slate-200"
                          : "bg-white/[0.02] border-white/[0.06] text-slate-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-[#fa6e69] bg-black/40 border-white/20 focus:ring-[#fa6e69] cursor-pointer"
                        />
                        <span className="text-xs font-medium">{c.label}</span>
                      </div>
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-[#fa6e69] flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-600 flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Box 2: Product Criteria */}
            <div className="p-7 sm:p-9 rounded-3xl wavo-card space-y-6">
              <div className="flex items-center gap-3.5 border-b border-white/[0.08] pb-4">
                <div className="p-3 rounded-2xl bg-[#ffbc7d]/15 text-[#ffbc7d] border border-[#ffbc7d]/30">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Critères Produits &amp; Stocks
                  </h3>
                  <p className="text-xs text-slate-400">
                    Conditions d&apos;éligibilité pour les références en inventaire
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
                      className={`p-4 rounded-xl border flex flex-col gap-1.5 cursor-pointer transition-all ${
                        isChecked
                          ? "bg-[#ffbc7d]/15 border-[#ffbc7d]/40 text-slate-200"
                          : "bg-white/[0.02] border-white/[0.06] text-slate-500"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="w-4 h-4 rounded text-[#ffbc7d] bg-black/40 border-white/20 focus:ring-[#ffbc7d] cursor-pointer"
                          />
                          <span className="text-xs font-semibold text-white">{c.label}</span>
                        </div>
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-[#ffbc7d] flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-600 flex-shrink-0" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 ml-7">
                        {c.note}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Score & Status Card */}
          <div className="lg:col-span-5 sticky top-28">
            <FloatingCard3D className="rounded-3xl">
              <div className="p-8 sm:p-9 rounded-3xl bg-gradient-to-br from-[#10101b] via-[#1c2639] to-[#0a0c14] border border-[#fa6e69]/30 shadow-2xl space-y-7">
                
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-400 uppercase tracking-widest">
                    Score de conformité
                  </span>
                  <span className="text-[#fa6e69] font-bold">
                    {passedCount} / {totalCriteria} Critères
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/[0.06] rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#fa6e69] to-[#ffbc7d] h-full transition-all duration-500"
                    style={{ width: `${(passedCount / totalCriteria) * 100}%` }}
                  />
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
