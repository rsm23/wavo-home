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
  Layers,
  Terminal
} from "lucide-react";

export default function ProcessPipeline() {
  const { steps } = WAVO_CONTENT;
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const stepIcons = [PhoneCall, FileCheck2, LayoutDashboard, ShoppingBag];

  return (
    <section id="etapes" className="relative z-20 py-28 bg-[#07080d] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full fintech-glass text-xs font-mono font-semibold text-cyan-300 border border-cyan-500/30">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>PROCESSUS AUTOMATISÉ &amp; TRANSPARENT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Une trésorerie optimisée en{" "}
            <span className="fintech-gradient-text">4 étapes simples</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            De la qualification initiale jusqu&apos;à la récupération produit par produit : zéro lourdeur administrative, aucun passage devant le greffe.
          </p>
        </div>

        {/* Step Selector Horizontal Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-2 rounded-2xl fintech-glass border border-white/[0.08]">
          {steps.map((step, idx) => {
            const Icon = stepIcons[idx];
            const active = selectedStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedStep(idx)}
                className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-indigo-600/30 border border-indigo-500/50 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <div className={`p-2.5 rounded-lg flex-shrink-0 ${active ? "bg-indigo-600 text-white" : "bg-white/[0.05] text-slate-400"}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Étape {step.stepNumber}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-200 truncate">
                    {step.title.split("&")[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Step Details & Interactive Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Step Description */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Délai d&apos;exécution moyen : {steps[selectedStep].timeframe}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {steps[selectedStep].stepNumber}. {steps[selectedStep].title}
            </h3>

            <p className="text-base text-slate-400 leading-relaxed font-normal">
              {steps[selectedStep].description}
            </p>

            <div className="p-5 rounded-2xl fintech-card space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Protocole Opérationnel Wavo
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {steps[selectedStep].details}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setSelectedStep((prev) => (prev + 1) % steps.length)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
              >
                <span>Étape suivante ({selectedStep + 1}/{steps.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://www.wavo.fr/rendez-vous/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Démarrer mon dossier →
              </a>
            </div>
          </div>

          {/* Right: Interactive Terminal Node Visual */}
          <div className="lg:col-span-6">
            <FloatingCard3D className="rounded-3xl">
              <div className="p-8 rounded-3xl bg-[#0e111a] text-white border border-white/[0.08] shadow-2xl relative overflow-hidden space-y-6">
                
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    <span className="text-xs font-mono text-slate-400 ml-2">wavo-settlement-flow</span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
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
                          ? "bg-indigo-600/25 border-indigo-500/60 text-white shadow-lg shadow-indigo-900/30"
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
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
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
