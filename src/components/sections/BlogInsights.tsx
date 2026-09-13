"use client";

import React from "react";
import Image from "next/image";
import { WAVO_CONTENT } from "@/lib/content";
import { BookOpen, ArrowUpRight, Clock } from "lucide-react";
import FloatingCard3D from "@/components/3d/FloatingCards3D";

export default function BlogInsights() {
  const { blogArticles } = WAVO_CONTENT;

  return (
    <section id="blog" className="relative z-20 py-28 bg-[#080b13] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full wavo-glass text-xs font-mono font-semibold text-[#fa6e69] border border-[#fa6e69]/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>PERSPECTIVES &amp; ANALYSES DE MARCHÉ</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Nos derniers <span className="wavo-gradient-text">articles de blog</span>
            </h2>

            <p className="text-base text-slate-400">
              Analyses stratégiques sur le BFR, le financement non dilutif et les alternatives au crédit bancaire.
            </p>
          </div>

          <a
            href="https://www.wavo.fr/blog/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#fa6e69] hover:text-[#ffbc7d] transition-colors self-start sm:self-auto font-mono"
          >
            <span>VOIR TOUS LES ARTICLES</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogArticles.map((article, idx) => (
            <FloatingCard3D key={idx} className="h-full">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full rounded-3xl wavo-card overflow-hidden flex flex-col justify-between group block"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-black/40">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-wider text-[#fa6e69] border border-white/[0.1]">
                      {article.tag}
                    </div>
                  </div>

                  <div className="p-7 space-y-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug group-hover:text-[#fa6e69] transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-normal">
                      {article.description}
                    </p>
                  </div>
                </div>

                <div className="p-7 pt-0 flex items-center justify-between text-xs font-bold text-[#fa6e69] group-hover:text-[#ffbc7d] transition-colors">
                  <span>Lire l&apos;analyse complète</span>
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
