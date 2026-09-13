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
  Zap,
  Layers
} from "lucide-react";

export default function ProcessPipeline() {
  const { steps } = WAVO_CONTENT;
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const stepIcons = [PhoneCall, FileCheck2, LayoutDashboard, ShoppingBag];

  return (
    <section id="etapes" className="relative z-20 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-200 dark:border-cyan-800/60 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Processus Transparent &amp; Automatisé</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Une trésorerie optimisée en{" "}
            <span className="stripe-gradient-text">4 étapes simples</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            De la qualification initiale jusqu&apos;à la récupération produit par produit : aucune complexité administrative.
          </p>
        </div>

        {/* Step Navigation Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {steps.map((step, idx) => {
            const Icon = stepIcons[idx];
            const active = selectedStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedStep(idx)}
                className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-white dark:bg-slate-800 shadow-md border border-indigo-500/30 text-indigo-600 dark:text-indigo-400"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50"
                }`}
              >
                <div className={`p-2.5 rounded-lg flex-shrink-0 ${active ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300" : "bg-slate-200/60 dark:bg-slate-800 text-slate-500"}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Étape {step.stepNumber}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                    {step.title.split("&")[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Step Showcase Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Detailed Active Step Description */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Délai moyen d&apos;exécution : {steps[selectedStep].timeframe}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {steps[selectedStep].stepNumber}. {steps[selectedStep].title}
            </h3>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {steps[selectedStep].description}
            </p>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Détail opérationnel Wavo
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {steps[selectedStep].details}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setSelectedStep((prev) => (prev + 1) % steps.length)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                <span>Étape suivante ({selectedStep + 1}/{steps.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://www.wavo.fr/rendez-vous/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
              >
                Démarrer immédiatement →
              </a>
            </div>
          </div>

          {/* Right: Visual Step Flow Simulation Card */}
          <div className="lg:col-span-6">
            <FloatingCard3D className="rounded-3xl">
              <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="text-xs font-mono text-slate-400 ml-2">wavo-pipeline.sh</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300">
                    STATUS: {steps[selectedStep].statusText}
                  </span>
                </div>

                {/* Animated Pipeline Nodes */}
                <div className="space-y-4 font-mono text-xs">
                  {steps.map((s, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                        selectedStep === idx
                          ? "bg-indigo-950/60 border-indigo-500 text-white shadow-lg shadow-indigo-900/30"
                          : idx < selectedStep
                          ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400"
                          : "bg-white/5 border-white/5 text-slate-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border border-current">
                          {idx + 1}
                        </span>
                        <span className="font-semibold">{s.title}</span>
                      </div>
                      <span className="text-[11px] opacity-80">{s.timeframe}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-[11px] font-mono text-slate-400 border-t border-white/10 flex items-center justify-between">
                  <span>Protocole Wavo v2.6</span>
                  <span className="text-emerald-400">● Chiffrement AES-256</span>
                </div>

              </div>
            </FloatingCard3D>
          </div>

        </div>

      </div>
    </section>
  );
}
