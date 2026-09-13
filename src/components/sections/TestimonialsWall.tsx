"use client";

import React from "react";
import Image from "next/image";
import FloatingCard3D from "@/components/3d/FloatingCards3D";
import { WAVO_CONTENT } from "@/lib/content";
import { Quote, Sparkles, TrendingUp } from "lucide-react";

export default function TestimonialsWall() {
  const { testimonials } = WAVO_CONTENT;

  return (
    <section id="temoignages" className="relative z-20 py-28 bg-slate-50/70 dark:bg-[#080b13] border-t border-slate-200/80 dark:border-white/[0.08] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full wavo-glass text-xs font-mono font-semibold text-[#fa6e69] border border-[#fa6e69]/30 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>RETOURS D&apos;EXPÉRIENCE FONDATEURS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight transition-colors">
            Wavo fait <span className="wavo-gradient-text">levier sur leur stock</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 transition-colors">
            Comme eux, préservez votre trésorerie pour investir dans votre technologie, vos équipes et vos opportunités de marché.
          </p>
        </div>

        {/* 2x2 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <FloatingCard3D key={idx} className="h-full">
              <div className="h-full p-8 sm:p-10 rounded-3xl wavo-card flex flex-col justify-between space-y-8 relative overflow-hidden group">
                
                {/* Subtle coral gradient corner highlight */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#fa6e69]/10 rounded-bl-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <Quote className="w-8 h-8 text-[#fa6e69]/40 group-hover:text-[#fa6e69] transition-colors" />
                    {t.metrics && (
                      <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#fa6e69]/10 dark:bg-[#fa6e69]/15 text-[#fa6e69] border border-[#fa6e69]/30 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {t.metrics}
                      </span>
                    )}
                  </div>

                  <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-normal italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author Information */}
                <div className="pt-6 border-t border-slate-200/80 dark:border-white/[0.08] flex items-center gap-4 relative z-10">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#fa6e69]/50 shadow-lg flex-shrink-0">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {t.name}
                    </div>
                    <div className="text-xs text-[#fa6e69] font-semibold">
                      {t.role}, <span className="text-slate-900 dark:text-white font-bold">{t.company}</span>
                    </div>
                    {t.sector && (
                      <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                        {t.sector}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </FloatingCard3D>
          ))}
        </div>

      </div>
    </section>
  );
}
