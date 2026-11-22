"use client";

import React, { useState } from "react";
import { Save, CheckCircle2, ShieldCheck, Lock, Globe, DollarSign } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [storeName, setStoreName] = useState("NEXORA Marketplace");
  const [supportEmail, setSupportEmail] = useState("concierge@nexora.io");
  const [currency, setCurrency] = useState("USD");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("150");
  const [standardShippingFee, setStandardShippingFee] = useState("15");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-borderNeutral">
        <h1 className="text-2xl font-extrabold text-charcoal tracking-tight">
          System & Marketplace Settings
        </h1>
        <p className="text-xs text-muted mt-0.5">
          Configure commercial policies, currency formats, freight thresholds, and API credentials.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-brand text-xs text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>System configuration parameters saved and updated across edge caches.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Brand & Identity */}
        <div className="bg-white p-6 rounded-brand-xl border border-borderNeutral shadow-2xs space-y-4 text-xs">
          <h2 className="text-sm font-bold text-charcoal pb-3 border-b border-borderNeutral flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-charcoal" />
            <span>Storefront Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-charcoal">Marketplace Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2.5 outline-none focus:border-charcoal text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-charcoal">Concierge Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2.5 outline-none focus:border-charcoal text-xs"
              />
            </div>
          </div>
        </div>

        {/* Shipping & Freight */}
        <div className="bg-white p-6 rounded-brand-xl border border-borderNeutral shadow-2xs space-y-4 text-xs">
          <h2 className="text-sm font-bold text-charcoal pb-3 border-b border-borderNeutral flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-charcoal" />
            <span>Freight & Logistics Policy</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-charcoal">Complimentary Freight Threshold ($)</label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2.5 outline-none focus:border-charcoal text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-charcoal">Standard Courier Rate ($)</label>
              <input
                type="number"
                value={standardShippingFee}
                onChange={(e) => setStandardShippingFee(e.target.value)}
                className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2.5 outline-none focus:border-charcoal text-xs"
              />
            </div>
          </div>
        </div>

        {/* API Tokens & Integration Stubs */}
        <div className="bg-white p-6 rounded-brand-xl border border-borderNeutral shadow-2xs space-y-4 text-xs">
          <h2 className="text-sm font-bold text-charcoal pb-3 border-b border-borderNeutral flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-charcoal" />
            <span>Phase 2 Backend Integration Credentials</span>
          </h2>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="font-semibold text-charcoal">Stripe / Payment Gateway Public Key</label>
              <input
                type="text"
                readOnly
                value="pk_test_51NxM924NexoraSimulatedKeyPlaceholder00"
                className="w-full bg-ivory-100 border border-borderNeutral rounded-lg p-2.5 outline-none font-mono text-muted text-xs cursor-not-allowed"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-charcoal">AI Concierge Engine Endpoint</label>
              <input
                type="text"
                readOnly
                value="https://api.nexora.io/v1/concierge/inference"
                className="w-full bg-ivory-100 border border-borderNeutral rounded-lg p-2.5 outline-none font-mono text-muted text-xs cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="btn-primary py-2.5 px-6 text-xs flex items-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4 text-lime" />
            <span>Save Settings Changes</span>
          </button>
        </div>

      </form>

    </div>
  );
}
