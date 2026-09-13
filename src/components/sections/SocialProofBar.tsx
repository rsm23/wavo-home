"use client";

import React from "react";
import Image from "next/image";
import { WAVO_CONTENT } from "@/lib/content";
import { ShieldCheck, Award } from "lucide-react";

export default function SocialProofBar() {
  const { investors, clientLogos } = WAVO_CONTENT;

  return (
    <section className="relative z-20 py-20 border-y border-slate-200/80 dark:border-white/[0.08] bg-slate-50/70 dark:bg-[#07090f] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Tier 1: Institutional Investors */}
        <div className="space-y-7 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#fa6e69]">
            <ShieldCheck className="w-4 h-4 text-[#fa6e69]" />
            <span>TOUR D&apos;AMORÇAGE DE 3,5 M€ MENÉ PAR DES FONDS INSTITUTIONNELS MAJEURS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {investors.map((inv, idx) => (
              <div
                key={idx}
                className="group p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] shadow-sm dark:shadow-none hover:shadow-md hover:border-[#fa6e69]/40 dark:hover:border-[#fa6e69]/30 transition-all duration-300 flex flex-col items-center justify-center gap-3"
                title={`${inv.name} - ${inv.description}`}
              >
                <div className="relative h-8 w-28 opacity-80 dark:opacity-70 group-hover:opacity-100 transition-all duration-300">
                  <Image
                    src={inv.logo}
                    alt={inv.name}
                    fill
                    className="object-contain dark:invert"
                  />
                </div>
                <div className="text-[10px] font-mono text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors text-center">
                  {inv.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hairline Divider */}
        <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-slate-300/80 dark:via-white/[0.1] to-transparent mx-auto" />

        {/* Tier 2: Brands using Wavo */}
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400">
            <Award className="w-3.5 h-3.5 text-[#fa6e69] dark:text-[#ffbc7d]" />
            <span>Plus de 50 distributeurs et marques débloquent leur trésorerie avec Wavo</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {clientLogos.map((client, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-white/[0.015] border border-slate-200/80 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/[0.15] shadow-sm dark:shadow-none transition-all duration-300 flex items-center justify-center h-16 group"
                title={client.name}
              >
                <div className="relative h-7 w-24 opacity-75 dark:opacity-60 group-hover:opacity-100 transition-all duration-300">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain dark:invert"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
