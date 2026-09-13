"use client";

import React, { useState } from "react";
import { WAVO_CONTENT } from "@/lib/content";
import { 
  Boxes, 
  Recycle, 
  Bike, 
  ShoppingBag, 
  Laptop, 
  Factory, 
  Sparkles
} from "lucide-react";
import FloatingCard3D from "@/components/3d/FloatingCards3D";

export default function ProductCatalogHub() {
  const { productCategories } = WAVO_CONTENT;
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const iconMap: Record<string, React.ElementType> = {
    Boxes: Boxes,
    Recycle: Recycle,
    Bike: Bike,
    ShoppingBag: ShoppingBag,
    Laptop: Laptop,
    Factory: Factory,
  };

  const filteredCategories =
    activeCategory === "all"
      ? productCategories
      : productCategories.filter((c) => c.id === activeCategory);

  return (
    <section id="produits" className="relative z-20 py-28 bg-[#080b13] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full wavo-glass text-xs font-mono font-semibold text-[#fa6e69] border border-[#fa6e69]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CATALOGUE D&apos;ACTIFS VALORISABLES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Nous accompagnons les entreprises dans la{" "}
            <span className="wavo-gradient-text">valorisation de leurs stocks</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Premier achat ou réassort régulier : nous travaillons avec tous types de produits physiques en stock respectant un cycle de rotation inférieur à 8 mois.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === "all"
                ? "bg-[#fa6e69] text-white shadow-lg shadow-[#fa6e69]/30 border border-[#fa6e69]"
                : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
            }`}
          >
            Tous les stocks ({productCategories.length})
          </button>
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#fa6e69] text-white shadow-lg shadow-[#fa6e69]/30 border border-[#fa6e69]"
                  : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* 6 Institutional Asset Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((item, idx) => {
            const Icon = iconMap[item.icon] || Boxes;
            const grades = ["GRADE AAA", "GRADE AA+", "GRADE AAA", "GRADE A+", "GRADE AA", "GRADE AA+"];
            const grade = grades[idx % grades.length];
            return (
              <FloatingCard3D key={item.id} className="h-full">
                <div className="h-full p-7 rounded-3xl wavo-card flex flex-col justify-between space-y-6 group relative overflow-hidden bg-[#0f131f]">
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-white/[0.04] text-[#fa6e69] border border-white/[0.08] group-hover:scale-110 group-hover:text-[#ffbc7d] transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                          {grade}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#fa6e69]/15 text-[#fa6e69] border border-[#fa6e69]/30">
                          &lt; {item.rotation}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      <span>Exemples financés</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        ● Collatéral Éligible
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-300">
                      {item.examples}
                    </div>
                  </div>

                </div>
              </FloatingCard3D>
            );
          })}
        </div>

        {/* Custom Inventory Review Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1c2639] via-[#10101b] to-[#080b13] border border-[#fa6e69]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-base font-bold text-white">Vous avez un stock physique spécifique ou atypique ?</h4>
            <p className="text-xs text-slate-400">
              Nos analystes étudient la liquidité de vos références et vous répondent sous 2 heures ouvrées.
            </p>
          </div>
          <a
            href="https://www.wavo.fr/rendez-vous/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#fa6e69] hover:bg-[#e0534e] shadow-lg shadow-[#fa6e69]/30 transition-all whitespace-nowrap cursor-pointer"
          >
            Faire évaluer mon stock →
          </a>
        </div>

      </div>
    </section>
  );
}
