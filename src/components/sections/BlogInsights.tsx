"use client";

import React from "react";
import Image from "next/image";
import { WAVO_CONTENT } from "@/lib/content";
import { BookOpen, ArrowUpRight, Clock, Sparkles } from "lucide-react";
import FloatingCard3D from "@/components/3d/FloatingCards3D";

export default function BlogInsights() {
  const { blogArticles } = WAVO_CONTENT;

  return (
    <section id="blog" className="relative z-20 py-24 bg-slate-50/60 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Analyses &amp; Perspectives Financières</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Nos derniers <span className="stripe-gradient-text">articles de blog</span>
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-400">
              Décryptages stratégiques pour optimiser votre besoin en fonds de roulement, votre trésorerie et votre bilan.
            </p>
          </div>

          <a
            href="https://www.wavo.fr/blog/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors self-start sm:self-auto"
          >
            <span>Consulter tous les articles</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogArticles.map((article, idx) => (
            <FloatingCard3D key={idx} className="h-full">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group block"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[11px] font-semibold text-white">
                      {article.tag}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span>Lire l&apos;article complet</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </FloatingCard3D>
          ))}
        </div>

      </div>
    </section>
  );
}
