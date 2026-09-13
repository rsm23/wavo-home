"use client";

import React from "react";
import Image from "next/image";
import FloatingCard3D from "@/components/3d/FloatingCards3D";
import { WAVO_CONTENT } from "@/lib/content";
import { Quote, Sparkles, TrendingUp, CheckCircle } from "lucide-react";

export default function TestimonialsWall() {
  const { testimonials } = WAVO_CONTENT;

  return (
    <section id="temoignages" className="relative z-20 py-24 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Témoignages Fondateurs &amp; Dirigeants</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Wavo fait <span className="stripe-gradient-text">levier sur leur stock</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Comme eux, préservez votre trésorerie pour investir dans votre technologie, vos équipes et votre croissance commerciale.
          </p>
        </div>

        {/* Testimonials 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <FloatingCard3D key={idx} className="h-full">
              <div className="h-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
                
                {/* Decorative subtle gradient ribbon */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-bl-full pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <Quote className="w-8 h-8 text-indigo-400/40 group-hover:text-indigo-500 transition-colors" />
                    {t.metrics && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {t.metrics}
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-normal italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author Avatar & Info */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4 relative z-10">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-indigo-200 dark:border-indigo-900 shadow-md flex-shrink-0">
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
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                      {t.role}, <span className="text-slate-900 dark:text-white">{t.company}</span>
                    </div>
                    {t.sector && (
                      <div className="text-[11px] text-slate-400 mt-0.5">
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
