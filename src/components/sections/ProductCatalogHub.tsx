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
  Sparkles,
  ArrowRight
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
    <section id="produits" className="relative z-20 py-28 bg-[#07080d] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full fintech-glass text-xs font-mono font-semibold text-indigo-400 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CATALOGUE D&apos;ACTIFS VALORISABLES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Nous accompagnons les entreprises dans la{" "}
            <span className="fintech-gradient-text">valorisation de leurs stocks</span>
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
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40"
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
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40"
                  : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* 6 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((item) => {
            const Icon = iconMap[item.icon] || Boxes;
            return (
              <FloatingCard3D key={item.id} className="h-full">
                <div className="h-full p-7 rounded-3xl fintech-card flex flex-col justify-between space-y-6 group">
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-white/[0.04] text-indigo-400 border border-white/[0.08] group-hover:scale-110 group-hover:text-cyan-300 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        Rotation {item.rotation}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      Exemples concrets financés
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
        <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-[#0e111a] to-[#07080d] border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
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
            className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all whitespace-nowrap cursor-pointer"
          >
            Faire évaluer mon stock →
          </a>
        </div>

      </div>
    </section>
  );
}
