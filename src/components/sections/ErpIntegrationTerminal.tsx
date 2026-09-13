"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, Cpu, ArrowUpRight } from "lucide-react";
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
    erp: `// Connecteurs ERP & Banques supportés nativement
[✓] Shopify Plus & PrestaShop (Webhooks automatiques temps réel)
[✓] SAP S/4HANA & Business One (Connecteur REST API certifié)
[✓] Pennylane & Sage (Exports comptables sans retraitement)
[✓] Cegid & Odoo (Synchronisation multi-entrepôts)
[✓] DSP2 Open Banking (Lecture automatisée des encaissements)`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative z-20 py-28 bg-[#07080d] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full fintech-glass text-xs font-mono font-semibold text-cyan-300 border border-cyan-500/30">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>SYNCHRONISATION ERP &amp; AUTOMATISATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Connecté à vos outils en <span className="fintech-gradient-text">quelques minutes</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Wavo se synchronise de manière invisible avec vos flux informatiques et bancaires. Aucune modification de vos process logistiques : vous vendez, nous régularisons unitairement.
          </p>
        </div>

        {/* Terminal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Key Features */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="p-4 rounded-2xl fintech-card space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400">
                  <span>01</span>
                  <span>CONNEXION SANS INTRUSION</span>
                </div>
                <h4 className="text-sm font-bold text-white">Vos tiers ne voient jamais Wavo</h4>
                <p className="text-xs text-slate-400">
                  Vos clients et vos fournisseurs continuent de traiter directement avec vous. La confidentialité commerciale est 100% absolue.
                </p>
              </div>

              <div className="p-4 rounded-2xl fintech-card space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
                  <span>02</span>
                  <span>DÉCOMPTE UNITAIRE AUTOMATISÉ</span>
                </div>
                <h4 className="text-sm font-bold text-white">Régularisation au fil des sorties de caisse</h4>
                <p className="text-xs text-slate-400">
                  Dès qu&apos;une référence est vendue et payée, notre daemon décompte l&apos;unité sans aucun échéancier mensuel rigide.
                </p>
              </div>

              <div className="p-4 rounded-2xl fintech-card space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                  <span>03</span>
                  <span>COMPATIBILITÉ MULTI-SI</span>
                </div>
                <h4 className="text-sm font-bold text-white">Connecteurs natifs et simples imports CSV</h4>
                <p className="text-xs text-slate-400">
                  Prise en charge de Shopify, SAP, Cegid, Sage, Pennylane ou simples exports sécurisés hebdomadaires.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://www.wavo.fr/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                <span>Documentation d&apos;intégration technique</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Code Terminal */}
          <div className="lg:col-span-7">
            <FloatingCard3D className="rounded-3xl">
              <div className="rounded-3xl bg-[#0a0c14] border border-white/[0.1] shadow-2xl overflow-hidden font-mono text-xs">
                
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-black/60 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    <span className="text-[11px] text-slate-400 ml-2">wavo-daemon // live</span>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setActiveTab("webhook")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                        activeTab === "webhook"
                          ? "bg-indigo-600 text-white shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Webhook
                    </button>
                    <button
                      onClick={() => setActiveTab("payload")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                        activeTab === "payload"
                          ? "bg-indigo-600 text-white shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Ledger
                    </button>
                    <button
                      onClick={() => setActiveTab("erp")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                        activeTab === "erp"
                          ? "bg-indigo-600 text-white shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Connecteurs
                    </button>

                    <button
                      onClick={handleCopy}
                      className="ml-2 p-1.5 rounded-lg hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Copier le code"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 text-slate-300 overflow-x-auto leading-relaxed max-h-[380px]">
                  <pre>{codeSnippets[activeTab]}</pre>
                </div>

                {/* Footer status */}
                <div className="px-5 py-3 bg-black/40 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Flux actif • 0 erreur de synchronisation</span>
                  </div>
                  <span className="text-cyan-300 font-mono">TLS 1.3 Strict</span>
                </div>

              </div>
            </FloatingCard3D>
          </div>

        </div>

      </div>
    </section>
  );
}
