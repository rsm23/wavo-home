"use client";

import React from "react";
import Image from "next/image";
import { WAVO_CONTENT } from "@/lib/content";
import { ShieldCheck, Award } from "lucide-react";

export default function SocialProofBar() {
  const { investors, clientLogos } = WAVO_CONTENT;

  return (
    <section className="relative z-20 py-16 border-y border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-slate-950/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top: Institutional Investors */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2 text-center">
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Soutenu et financé à hauteur de 3,5 millions d&apos;euros par
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
            {investors.map((inv, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center justify-center p-3 transition-transform duration-200 hover:-translate-y-1"
                title={`${inv.name} - ${inv.description}`}
              >
                <div className="relative h-10 w-28 sm:w-36 grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <Image
                    src={inv.logo}
                    alt={inv.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                  {inv.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-slate-200 dark:bg-slate-800 mx-auto" />

        {/* Bottom: Brands using Wavo */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2 text-center">
            <Award className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Ils libèrent leur trésorerie avec Wavo
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
            {clientLogos.map((client, idx) => (
              <div
                key={idx}
                className="relative h-9 w-28 sm:w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer flex items-center justify-center"
                title={client.name}
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain dark:invert"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
