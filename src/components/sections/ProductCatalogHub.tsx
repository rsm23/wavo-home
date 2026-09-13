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
  CheckCircle2, 
  ArrowRight,
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
    <section id="produits" className="relative z-20 py-24 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catalogue d&apos;Éligibilité</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Nous accompagnons les entreprises dans la{" "}
            <span className="stripe-gradient-text">valorisation de leurs stocks</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Premier achat ou réassort régulier : nous travaillons avec tous types de produits physiques en stock respectant un cycle de rotation inférieur à 8 mois.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === "all"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100"
            }`}
          >
            Tous les produits ({productCategories.length})
          </button>
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((item) => {
            const Icon = iconMap[item.icon] || Boxes;
            return (
              <FloatingCard3D key={item.id} className="h-full">
                <div className="h-full p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        Rotation {item.rotation}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Exemples concrets financés
                    </div>
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {item.examples}
                    </div>
                  </div>

                </div>
              </FloatingCard3D>
            );
          })}
        </div>

        {/* Bottom Qualification Prompt */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold">Vous avez un stock physique atypique ou spécifique ?</h4>
            <p className="text-xs text-slate-300">
              Nos analystes étudient la liquidité de vos références sous 2 heures ouvrées.
            </p>
          </div>
          <a
            href="https://www.wavo.fr/rendez-vous/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-indigo-950 hover:bg-slate-100 shadow-md transition-all whitespace-nowrap"
          >
            Faire évaluer mon stock →
          </a>
        </div>

      </div>
    </section>
  );
}
