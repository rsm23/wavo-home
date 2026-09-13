"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, Radio, Cpu, ArrowUpRight } from "lucide-react";
import FloatingCard3D from "@/components/3d/FloatingCards3D";

export default function ErpIntegrationTerminal() {
  const [activeTab, setActiveTab] = useState<"webhook" | "payload" | "erp">("webhook");
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    webhook: `// Wavo Inventory Webhook: Détection automatique d'une vente client
POST /api/v1/wavo/webhooks/order-fulfilled
Host: api.wavo.fr
Authorization: Bearer sk_live_wavo_987d6a...
Content-Type: application/json

{
  "event": "stock.item_released",
  "timestamp": "2026-09-13T22:15:00Z",
  "data": {
    "sku": "BIKE-ELEC-VOLT-400",
    "quantity_sold": 1,
    "unit_repurchase_price": 1450.00,
    "wavo_contract_id": "CTR-2026-8819",
    "repurchase_status": "AUTO_SETTLED",
    "instant_margin_retained": "+28.4%"
  }
}`,
    payload: `{
  "wavo_facility": "FR-LYON-LOGISTICS-01",
  "inventory_status": {
    "total_value_financed": "240,000.00 EUR",
    "tva_advanced": "48,000.00 EUR",
    "units_monitored": 340,
    "units_reclaimed_to_date": 194,
    "daily_holding_cost": "0.05%",
    "bank_balance_impact": "0.00 EUR (AUCUNE DETTE)"
  }
}`,
    erp: `// Connecteurs ERP & Banques supportés nativement
[✓] Shopify Plus / WooCommerce (Webhooks temps réel)
[✓] SAP S/4HANA & Business One (Connecteur REST API)
[✓] Pennylane & Sage (Exports comptables automatisés)
[✓] Cegid & Odoo (Synchronisation multi-entrepôts)
[✓] Open Banking DSP2 (Suivi des flux de trésorerie)`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative z-20 py-24 bg-slate-900 text-white overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 stripe-bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-xs font-semibold text-cyan-300">
            <Cpu className="w-3.5 h-3.5" />
            <span>Automatisation &amp; Connectivité ERP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Connecté à vos outils en <span className="stripe-gradient-text">quelques minutes</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Wavo se synchronise de manière invisible avec vos flux informatiques et bancaires. Aucune modification de vos process logistiques : vous vendez, nous régularisons unitairement.
          </p>
        </div>

        {/* Interactive Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Explanations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Connexion transparente sans intrusion</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Connectez vos exports comptables ou votre ERP. Vos clients et vos fournisseurs ne voient jamais Wavo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Rachat unitaire automatique</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Dès qu&apos;un produit est vendu et expédié, notre API décompte l&apos;unité sans échéancier rigide.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Zéro impact sur votre SI</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Compatible Shopify, PrestaShop, SAP, Odoo, Cegid, Pennylane ou simples fichiers CSV sécurisés.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://www.wavo.fr/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Consulter la documentation technique</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: The Terminal Screen */}
          <div className="lg:col-span-7">
            <FloatingCard3D className="rounded-2xl">
              <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
                
                {/* Window Top Controls */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    <span className="text-[11px] text-slate-400 ml-2">wavo-daemon // v2.6.4</span>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveTab("webhook")}
                      className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                        activeTab === "webhook"
                          ? "bg-indigo-600 text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Webhook
                    </button>
                    <button
                      onClick={() => setActiveTab("payload")}
                      className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                        activeTab === "payload"
                          ? "bg-indigo-600 text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Ledger
                    </button>
                    <button
                      onClick={() => setActiveTab("erp")}
                      className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                        activeTab === "erp"
                          ? "bg-indigo-600 text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Connecteurs
                    </button>

                    <button
                      onClick={handleCopy}
                      className="ml-2 p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Copier le code"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-5 text-slate-300 overflow-x-auto leading-relaxed max-h-96">
                  <pre>{codeSnippets[activeTab]}</pre>
                </div>

                {/* Footer Bar */}
                <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>WebSocket connecté • Latence 14ms</span>
                  </div>
                  <span>TLS 1.3 Strict</span>
                </div>

              </div>
            </FloatingCard3D>
          </div>

        </div>

      </div>
    </section>
  );
}
