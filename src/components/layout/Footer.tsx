"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WAVO_CONTENT } from "@/lib/content";
import { ArrowRight, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const { company } = WAVO_CONTENT;
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative z-20 bg-[#07080d] text-slate-400 border-t border-white/[0.08] pt-24 pb-14 overflow-hidden">
      {/* Ambient ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        
        {/* High-Impact Closing Callout Banner */}
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#0e111a] via-[#131726] to-[#0a0c14] border border-indigo-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="space-y-3.5 text-center md:text-left max-w-xl">
            <span className="px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider inline-block">
              DÉBLOCAGE EXPRESS SOUS 24H
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Prêt à transformer votre stock en moteur de croissance ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Débloquez de 50 000 € à 250 000 € dès maintenant. Sans endettement, sans caution personnelle, sans modification de vos flux logistiques.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto flex-shrink-0">
            <a
              href="https://www.wavo.fr/rendez-vous/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 border border-white/[0.15] flex items-center justify-center gap-2 transition-all whitespace-nowrap cursor-pointer"
            >
              <span>Vérifier mon éligibilité</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#simulateur"
              className="w-full sm:w-auto px-6 py-4 rounded-xl fintech-glass hover:bg-white/[0.08] text-white font-bold text-xs sm:text-sm border border-white/[0.1] flex items-center justify-center transition-all whitespace-nowrap cursor-pointer"
            >
              Calculer ma trésorerie
            </a>
          </div>

        </div>

        {/* 5 Columns Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pt-4">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <div className="relative w-28 h-8">
              <Image
                src="/assets/logo-wavo.webp"
                alt="Wavo"
                fill
                className="object-contain"
              />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Wavo réinvente le financement des TPE et PME françaises grâce au rachat temporaire de stock. Une alternative non dilutive, sans dette et sans caution.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>{company.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Opérations 100% confidentielles &amp; sécurisées</span>
              </div>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#simulateur" className="hover:text-white transition-colors">
                  Financement de stock
                </a>
              </li>
              <li>
                <a href="#piliers" className="hover:text-white transition-colors">
                  Alternative au prêt bancaire
                </a>
              </li>
              <li>
                <a href="#piliers" className="hover:text-white transition-colors">
                  Financement sans dette
                </a>
              </li>
              <li>
                <a href="#piliers" className="hover:text-white transition-colors">
                  Prise en charge de la TVA
                </a>
              </li>
              <li>
                <a href="#etapes" className="hover:text-white transition-colors">
                  Rachat unitaire au fil de l&apos;eau
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Entreprise */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Entreprise
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.wavo.fr/a-propos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  À propos
                </a>
              </li>
              <li>
                <a
                  href="https://www.wavo.fr/emploi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Nous recrutons</span>
                  <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono">
                    Jobs 🚀
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.wavo.fr/contact/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://www.wavo.fr/blog/wavo-leve-3-5-millions-euros-liberer-financement-stocks-tpe-pme/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Presse (Levée 3.5M€)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-xs text-slate-400">
              Recevez nos analyses sur le BFR et les opportunités de marché.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Inscription confirmée !</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="nom@entreprise.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  S&apos;inscrire
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            {company.copyright}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://www.wavo.fr/politique-de-confidentialite/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Politique de confidentialité
            </a>
            <a
              href="https://www.wavo.fr/mentions-legales/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Mentions légales
            </a>
            <span className="text-slate-600">France (FR)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
