"use client";

import React from "react";
import Image from "next/image";
import { WAVO_CONTENT } from "@/lib/content";
import { ShieldCheck, Award } from "lucide-react";

export default function SocialProofBar() {
  const { investors, clientLogos } = WAVO_CONTENT;

  return (
    <section className="relative z-20 py-16 border-y border-white/[0.08] bg-[#07080d]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Tier 1: Institutional Investors */}
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Soutenu &amp; financé à hauteur de 3,5M€ par des investisseurs de premier plan</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-20">
            {investors.map((inv, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center justify-center p-2 transition-all duration-300 hover:scale-105"
                title={`${inv.name} - ${inv.description}`}
              >
                <div className="relative h-10 w-28 sm:w-36 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <Image
                    src={inv.logo}
                    alt={inv.name}
                    fill
                    className="object-contain invert"
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                  {inv.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle Divider */}
        <div className="w-28 h-px bg-white/[0.08] mx-auto" />

        {/* Tier 2: Brands using Wavo */}
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-slate-400">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ils débloquent leur trésorerie avec Wavo</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-18">
            {clientLogos.map((client, idx) => (
              <div
                key={idx}
                className="relative h-9 w-28 sm:w-32 grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-105"
                title={client.name}
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain invert"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
