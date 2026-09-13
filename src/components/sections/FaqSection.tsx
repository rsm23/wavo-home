"use client";

import React, { useState } from "react";
import { WAVO_CONTENT } from "@/lib/content";
import { HelpCircle, ChevronDown, Search } from "lucide-react";

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
            Tout ce que vous devez savoir sur le fonctionnement légal, les tarifs, l&apos;éligibilité et la confidentialité de Wavo.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher une réponse (rachat, caution, taux journalier, bilan, TVA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#fa6e69] transition-all font-sans"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "Toutes les questions" },
              { id: "model", label: "Fonctionnement du modèle" },
              { id: "eligibility", label: "Éligibilité & Produits" },
              { id: "pricing", label: "Tarification & Frais" },
              { id: "security", label: "Sécurité & Confidentialité" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#fa6e69] text-white shadow-lg shadow-[#fa6e69]/30 border border-[#fa6e69]"
                    : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaq.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm font-mono">
              Aucune question ne correspond à votre recherche.
            </div>
          ) : (
            filteredFaq.map((item) => {
              const isOpen = !!openItems[item.id];
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/[0.07] bg-[#10101b] overflow-hidden transition-all duration-200 hover:border-white/[0.14]"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-[#fa6e69]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/[0.05] pt-3 font-normal">
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
