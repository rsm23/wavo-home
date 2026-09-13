"use client";

import React, { useState } from "react";
import FloatingCard3D from "@/components/3d/FloatingCards3D";
import { WAVO_CONTENT } from "@/lib/content";
import { 
  PhoneCall, 
  FileCheck2, 
  LayoutDashboard, 
  ShoppingBag, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  Layers
} from "lucide-react";

export default function ProcessPipeline() {
  const { steps } = WAVO_CONTENT;
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const stepIcons = [PhoneCall, FileCheck2, LayoutDashboard, ShoppingBag];

  return (
    <section id="etapes" className="relative z-20 py-28 bg-[#080b13] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full wavo-glass text-xs font-mono font-semibold text-[#fa6e69] border border-[#fa6e69]/30">
            <Layers className="w-3.5 h-3.5" />
            <span>LE CYCLE DU PORTAGE WAVO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Un cycle de trésorerie fluide en{" "}
            <span className="wavo-gradient-text">4 temps sans friction</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            De la valorisation initiale de votre bon de commande jusqu&apos;au rachat unitaire pièce par pièce : aucun passage devant notaire, aucun ralentissement opérationnel.
          </p>
        </div>

        {/* Connected High-End Stepper Track */}
        <div className="relative">
          {/* Connecting Track Line */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-0.5 bg-white/[0.08] -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {steps.map((step, idx) => {
              const Icon = stepIcons[idx];
              const active = selectedStep === idx;
              const isPast = idx < selectedStep;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedStep(idx)}
                  className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 border select-none ${
                    active
                      ? "bg-[#0f131f] border-[#fa6e69] text-white shadow-xl shadow-[#fa6e69]/20"
                      : isPast
                      ? "bg-[#0a0d15] border-white/[0.1] text-slate-300 hover:border-white/[0.2]"
                      : "bg-[#080a10] border-white/[0.05] text-slate-500 hover:border-white/[0.1] hover:text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        active
                          ? "bg-[#fa6e69] text-white shadow-md shadow-[#fa6e69]/40"
                          : isPast
                          ? "bg-white/[0.08] text-white"
                          : "bg-white/[0.03] text-slate-500"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                        active
                          ? "bg-[#fa6e69]/20 text-[#fa6e69]"
                          : "bg-white/[0.04] text-slate-500"
                      }`}
                    >
                      0{step.stepNumber}
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {step.timeframe}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-0.5 line-clamp-1">
                      {step.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Step Details & Interactive Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Step Description */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fa6e69]/15 border border-[#fa6e69]/30 text-[#fa6e69] text-xs font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>Délai d&apos;exécution moyen : {steps[selectedStep].timeframe}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {steps[selectedStep].stepNumber}. {steps[selectedStep].title}
            </h3>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              {steps[selectedStep].description}
            </p>

            <div className="p-5 rounded-2xl wavo-card space-y-2">
              <div className="text-xs font-mono font-bold text-[#fa6e69] uppercase tracking-wider flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#fa6e69]" />
                Protocole Opérationnel Wavo
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {steps[selectedStep].details}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setSelectedStep((prev) => (prev + 1) % steps.length)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-[#fa6e69] hover:bg-[#e0534e] transition-all cursor-pointer shadow-lg shadow-[#fa6e69]/30"
              >
                <span>Étape suivante ({selectedStep + 1}/{steps.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://www.wavo.fr/rendez-vous/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-slate-400 hover:text-[#fa6e69] transition-colors"
              >
                Démarrer mon dossier →
              </a>
            </div>
          </div>

          {/* Right: Interactive Terminal Node Visual */}
          <div className="lg:col-span-6">
            <FloatingCard3D className="rounded-3xl">
              <div className="p-8 rounded-3xl bg-[#10101b] text-white border border-white/[0.08] shadow-2xl relative overflow-hidden space-y-6">
                
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    <span className="text-xs font-mono text-slate-400 ml-2">wavo-settlement-flow</span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#fa6e69]/15 text-[#fa6e69] border border-[#fa6e69]/30">
                    STATUS: {steps[selectedStep].statusText}
                  </span>
                </div>

                {/* Animated Pipeline Nodes */}
                <div className="space-y-3.5 font-mono text-xs">
                  {steps.map((s, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                        selectedStep === idx
                          ? "bg-[#fa6e69]/20 border-[#fa6e69] text-white shadow-lg shadow-[#fa6e69]/20"
                          : idx < selectedStep
                          ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300"
                          : "bg-white/[0.02] border-white/[0.05] text-slate-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border border-current">
                          {idx + 1}
                        </span>
                        <span className="font-semibold">{s.title}</span>
                      </div>
                      <span className="text-[11px] opacity-75">{s.timeframe}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-[11px] font-mono text-slate-400 border-t border-white/[0.08] flex items-center justify-between">
                  <span>Protocole Wavo v2.6 • Déblocage SEPA</span>
                  <span className="text-[#fa6e69] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fa6e69] animate-ping" />
                    Temps réel
                  </span>
                </div>

              </div>
            </FloatingCard3D>
          </div>

        </div>

      </div>
    </section>
  );
}
