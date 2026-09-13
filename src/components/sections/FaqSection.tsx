"use client";

import React, { useState } from "react";
import { WAVO_CONTENT } from "@/lib/content";
import { HelpCircle, ChevronDown, Search, X, Sparkles } from "lucide-react";

export default function FaqSection() {
  const { faq } = WAVO_CONTENT;
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    who: true,
    cost: true,
    "diff-credit": true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { id: "all", label: "Toutes les questions" },
    { id: "model", label: "Fonctionnement du modèle" },
    { id: "eligibility", label: "Éligibilité & Produits" },
    { id: "pricing", label: "Tarification & Frais" },
    { id: "security", label: "Sécurité & Confidentialité" },
  ];

  const filteredFaq = faq.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="relative z-20 py-28 bg-[#080b13] border-t border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full wavo-glass text-xs font-mono font-semibold text-[#fa6e69] border border-[#fa6e69]/30">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>CENTRE DE CONNAISSANCES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Questions <span className="wavo-gradient-text">fréquentes</span>
          </h2>

          <p className="text-base text-slate-400">
            Tout ce que vous devez savoir sur le fonctionnement juridique, les tarifs, l&apos;éligibilité et la confidentialité de Wavo.
          </p>
        </div>

        {/* Bespoke Command Search & Category Filter */}
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fa6e69]/20 via-[#ffbc7d]/10 to-transparent rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative flex items-center bg-[#10101b] border border-white/[0.1] rounded-2xl px-4 py-3.5 group-focus-within:border-[#fa6e69]/60 transition-all shadow-xl">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-[#fa6e69] transition-colors flex-shrink-0" />
              
              <input
                type="text"
                placeholder="Rechercher par mot-clé (rachat, caution, taux journalier, TVA, bilan)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-3 text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
              />

              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-slate-400 hover:text-white transition-colors cursor-pointer mr-2"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : null}

              <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono text-slate-400 whitespace-nowrap">
                <span>⌘K</span>
              </div>
            </div>
          </div>

          {/* Category Filter Chips with counts */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const count = cat.id === "all" ? faq.length : faq.filter((f) => f.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === cat.id
                      ? "bg-[#fa6e69] text-white shadow-lg shadow-[#fa6e69]/30 border border-[#fa6e69]"
                      : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                      activeCategory === cat.id ? "bg-white/20 text-white" : "bg-white/[0.06] text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results Counter if searching */}
          {searchQuery && (
            <div className="text-center text-xs font-mono text-slate-400">
              {filteredFaq.length} question{filteredFaq.length > 1 ? "s" : ""} trouvée{filteredFaq.length > 1 ? "s" : ""} pour « {searchQuery} »
            </div>
          )}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaq.length === 0 ? (
            <div className="text-center py-14 rounded-3xl border border-white/[0.06] bg-[#10101b] space-y-3">
              <Sparkles className="w-6 h-6 text-slate-500 mx-auto" />
              <div className="text-sm font-medium text-slate-300">
                Aucune question ne correspond à votre recherche « {searchQuery} »
              </div>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs font-mono text-[#fa6e69] hover:underline cursor-pointer"
              >
                Réinitialiser la recherche
              </button>
            </div>
          ) : (
            filteredFaq.map((item) => {
              const isOpen = !!openItems[item.id];
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-[#fa6e69]/40 bg-[#121422] shadow-xl shadow-[#fa6e69]/5"
                      : "border-white/[0.07] bg-[#10101b] hover:border-white/[0.14]"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full transition-colors flex-shrink-0 ${
                          isOpen ? "bg-[#fa6e69]" : "bg-white/20"
                        }`}
                      />
                      <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                        {item.question}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center border transition-all flex-shrink-0 ${
                        isOpen
                          ? "bg-[#fa6e69]/20 border-[#fa6e69]/40 text-[#fa6e69] rotate-180"
                          : "bg-white/[0.04] border-white/[0.08] text-slate-400"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.05] pt-4 font-normal">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Support Callout */}
        <div className="p-7 rounded-3xl wavo-card flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-white">Vous avez une question spécifique sur vos contrats ?</h4>
            <p className="text-xs text-slate-400">
              Nos analystes en financement de stock vous répondent sous 2 heures ouvrées.
            </p>
          </div>
          <a
            href="https://www.wavo.fr/contact/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#fa6e69] hover:bg-[#e0534e] text-white shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            Contacter un analyste
          </a>
        </div>

      </div>
    </section>
  );
}
