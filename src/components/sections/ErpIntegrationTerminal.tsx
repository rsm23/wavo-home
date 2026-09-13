"use client";

import React, { useState } from "react";
import { Copy, Check, Cpu, ArrowUpRight } from "lucide-react";
import FloatingCard3D from "@/components/3d/FloatingCards3D";

export default function ErpIntegrationTerminal() {
  const [activeTab, setActiveTab] = useState<"webhook" | "payload" | "erp">("webhook");
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    webhook: `// Wavo Inventory Daemon: Détection automatique d'une vente unitaire
POST /api/v1/wavo/webhooks/order-fulfilled
Host: api.wavo.fr
Authorization: Bearer sk_live_wavo_987d6a2f...
Content-Type: application/json

{
  "event": "stock.item_released",
  "timestamp": "2026-09-13T22:40:00Z",
  "data": {
    "sku": "SOLAR-PANEL-EV-400W",
    "quantity_sold": 1,
    "unit_repurchase_price": 1850.00,
    "wavo_contract_id": "CTR-2026-8819",
    "repurchase_status": "AUTO_SETTLED",
    "instant_margin_retained": "+28.4%"
  }
}`,
    payload: `{
  "wavo_facility": "FR-LYON-LOGISTICS-01",
  "inventory_ledger": {
    "total_value_financed": "240,000.00 EUR",
    "tva_advanced": "48,000.00 EUR",
    "units_monitored": 340,
    "units_reclaimed_to_date": 194,
    "daily_holding_cost": "0.05%",
    "bank_balance_impact": "0.00 EUR (AUCUNE DETTE AU BILAN)"
  }
}`,
    erp: `// Connecteurs ERP & Banques synchronisés en direct
CONNECTED: Shopify Plus & PrestaShop (Webhooks automatiques temps réel)
CONNECTED: SAP S/4HANA & Business One (Connecteur REST API certifié)
CONNECTED: Pennylane & Sage (Exports comptables sans retraitement)
CONNECTED: Cegid & Odoo (Synchronisation multi-entrepôts)
CONNECTED: DSP2 Open Banking (Lecture automatisée des encaissements)`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative z-20 py-28 bg-white dark:bg-[#080b13] border-t border-slate-200/80 dark:border-white/[0.08] transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full wavo-glass text-xs font-mono font-semibold text-[#fa6e69] border border-[#fa6e69]/30 shadow-xs">
            <Cpu className="w-3.5 h-3.5" />
            <span>SYNCHRONISATION ERP &amp; AUTOMATISATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight transition-colors">
            Connecté à vos outils en <span className="wavo-gradient-text">quelques minutes</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 transition-colors">
            Wavo se synchronise de manière invisible avec vos flux informatiques et bancaires. Aucune modification de vos process logistiques : vous vendez, nous régularisons unitairement.
          </p>
        </div>

        {/* Terminal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Key Features */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="p-4 rounded-2xl wavo-card space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#fa6e69]">
                  <span>01</span>
                  <span>CONNEXION SANS INTRUSION</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Vos tiers ne voient jamais Wavo</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Vos clients et vos fournisseurs continuent de traiter directement avec vous. La confidentialité commerciale est 100% absolue.
                </p>
              </div>

              <div className="p-4 rounded-2xl wavo-card space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-[#ffbc7d]">
                  <span>02</span>
                  <span>DÉCOMPTE UNITAIRE AUTOMATISÉ</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Régularisation au fil des sorties de caisse</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Dès qu&apos;une référence est vendue et payée, notre daemon décompte l&apos;unité sans aucun échéancier mensuel rigide.
                </p>
              </div>

              <div className="p-4 rounded-2xl wavo-card space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#fa6e69]">
                  <span>03</span>
                  <span>COMPATIBILITÉ MULTI-SI</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Connecteurs natifs et simples imports CSV</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Prise en charge de Shopify, SAP, Cegid, Sage, Pennylane ou simples exports sécurisés hebdomadaires.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://www.wavo.fr/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#fa6e69] hover:text-[#ff8a85] transition-colors"
              >
                <span>Documentation d&apos;intégration technique</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Institutional Systems Console */}
          <div className="lg:col-span-7">
            <FloatingCard3D className="rounded-3xl">
              <div className="rounded-3xl bg-[#0f172a] dark:bg-[#0f131f] border border-slate-700/50 dark:border-white/[0.1] shadow-2xl overflow-hidden text-xs">
                
                {/* Institutional Console Header (No generic mac dots) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 bg-slate-950/60 dark:bg-black/50 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#fa6e69] animate-pulse" />
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#fa6e69] font-bold">
                      WAVO-SYNC // MODULE ERP &amp; FLUX BANCAIRES
                    </span>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-1.5 font-mono">
                    <button
                      type="button"
                      onClick={() => setActiveTab("webhook")}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                        activeTab === "webhook"
                          ? "bg-[#fa6e69] text-white shadow-md shadow-[#fa6e69]/30"
                          : "text-slate-400 hover:text-white bg-white/[0.03]"
                      }`}
                    >
                      Événement Vente
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("payload")}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                        activeTab === "payload"
                          ? "bg-[#fa6e69] text-white shadow-md shadow-[#fa6e69]/30"
                          : "text-slate-400 hover:text-white bg-white/[0.03]"
                      }`}
                    >
                      Registre Collatéral
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("erp")}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                        activeTab === "erp"
                          ? "bg-[#fa6e69] text-white shadow-md shadow-[#fa6e69]/30"
                          : "text-slate-400 hover:text-white bg-white/[0.03]"
                      }`}
                    >
                      Connecteurs Certifiés
                    </button>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="ml-1 p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Copier"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Console Content */}
                <div className="p-6 text-slate-300 font-mono overflow-x-auto leading-relaxed max-h-[380px] bg-[#090b12]">
                  {activeTab === "erp" ? (
                    <div className="space-y-3">
                      <div className="text-xs text-slate-400 mb-4 font-sans font-medium">
                        Wavo s&apos;interconnecte nativement avec vos briques de gestion sans perturber votre production :
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { name: "Shopify Plus & PrestaShop", type: "E-Commerce", desc: "Détection unitaire des commandes expédiées" },
                          { name: "SAP S/4HANA & Business One", type: "ERP Industrie", desc: "Connecteur certifié API REST bi-directionnel" },
                          { name: "Pennylane & Sage", type: "Comptabilité", desc: "Écritures de rachat exportées sans retraitement" },
                          { name: "Cegid & Odoo", type: "Gestion Stock", desc: "Suivi multi-entrepôts & traçabilité SKU" },
                          { name: "DSP2 Open Banking", type: "Agrégation Flux", desc: "Réconciliation automatisée des encaissements" },
                          { name: "Exports Sécurisés CSV/SFTP", type: "Universel", desc: "Intégration manuelle hebdomadaire si besoin" },
                        ].map((c, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1 font-sans">
                            <div className="flex items-center justify-between text-xs font-bold text-white">
                              <span>{c.name}</span>
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#fa6e69]/20 text-[#fa6e69]">
                                ACTIF
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400">{c.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <pre className="text-xs leading-relaxed text-slate-300">{codeSnippets[activeTab]}</pre>
                  )}
                </div>

                {/* Footer Telemetry Status */}
                <div className="px-6 py-3.5 bg-black/40 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Synchronisation certifiée ISO-27001 &amp; DSP2</span>
                  </div>
                  <span className="text-[#fa6e69] font-bold">Chiffrement AES-256</span>
                </div>

              </div>
            </FloatingCard3D>
          </div>

        </div>

      </div>
    </section>
  );
}
