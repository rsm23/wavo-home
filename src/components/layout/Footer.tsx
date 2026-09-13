"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WAVO_CONTENT } from "@/lib/content";
import { ArrowRight, Mail, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";

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
    <footer className="relative z-20 bg-slate-950 text-slate-300 border-t border-slate-800 pt-20 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Stripe-style High-Impact Conversion Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold uppercase tracking-wider inline-block">
              Déblocage express sous 24h
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Prêt à transformer votre stock en moteur de croissance ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Débloquez de 50 000 € à 250 000 € dès maintenant. Sans endettement, sans caution personnelle, sans modification de vos flux de vente.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="https://www.wavo.fr/rendez-vous/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all whitespace-nowrap cursor-pointer"
            >
              <span>Vérifier mon éligibilité</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#simulateur"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/10 flex items-center justify-center transition-all whitespace-nowrap cursor-pointer"
            >
              Calculer ma trésorerie
            </a>
          </div>

        </div>

        {/* 4 Columns Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pt-4">
          
          {/* Col 1: Brand & Headquarters */}
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
              Wavo réinvente le financement des TPE et PME françaises grâce au rachat temporaire de stock. Une solution non dilutive, sans dette et sans caution.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>{company.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Opérations confidentielles &amp; sécurisées</span>
              </div>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#simulateur" className="text-slate-400 hover:text-white transition-colors">
                  Financement de stock
                </a>
              </li>
              <li>
                <a href="#piliers" className="text-slate-400 hover:text-white transition-colors">
                  Alternative au prêt bancaire
                </a>
              </li>
              <li>
                <a href="#piliers" className="text-slate-400 hover:text-white transition-colors">
                  Financement sans dette
                </a>
              </li>
              <li>
                <a href="#piliers" className="text-slate-400 hover:text-white transition-colors">
                  Prise en charge de la TVA
                </a>
              </li>
              <li>
                <a href="#etapes" className="text-slate-400 hover:text-white transition-colors">
                  Rachat unitaire au fil de l&apos;eau
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Entreprise */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Entreprise
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.wavo.fr/a-propos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  À propos
                </a>
              </li>
              <li>
                <a
                  href="https://www.wavo.fr/emploi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Nous recrutons</span>
                  <span className="px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 text-[10px]">
                    Jobs 🚀
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.wavo.fr/contact/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://www.wavo.fr/blog/wavo-leve-3-5-millions-euros-liberer-financement-stocks-tpe-pme/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Presse (Levée de 3.5M€)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-xs text-slate-400">
              Recevez nos conseils de gestion de BFR et nos analyses de marché.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Inscription confirmée !</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="votre.email@entreprise.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  S&apos;inscrire
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {company.copyright}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://www.wavo.fr/politique-de-confidentialite/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 transition-colors"
            >
              Politique de confidentialité
            </a>
            <a
              href="https://www.wavo.fr/mentions-legales/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 transition-colors"
            >
              Mentions légales
            </a>
            <span>France (FR)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
