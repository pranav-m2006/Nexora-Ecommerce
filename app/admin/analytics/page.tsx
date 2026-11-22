"use client";

import React from "react";
import { formatPrice } from "@/lib/utils";
import { BarChart3, TrendingUp, Users, ShoppingBag, ArrowUpRight, DollarSign, PieChart } from "lucide-react";

export default function AdminAnalyticsPage() {
  const departmentShare = [
    { name: "Electronics & Audio", pct: 38, revenue: 108281 },
    { name: "Fashion & Outerwear", pct: 26, revenue: 74087 },
    { name: "Home & Scandinavian Living", pct: 18, revenue: 51291 },
    { name: "Accessories & Horology", pct: 11, revenue: 31344 },
    { name: "Beauty & Bio-Wellness", pct: 7, revenue: 19947 },
  ];

  const trafficChannels = [
    { channel: "Direct Editorial & Gazette", share: "42%", count: "18,400 sessions" },
    { channel: "Organic Design Search", share: "31%", count: "13,580 sessions" },
    { channel: "Social Drops & Press", share: "18%", count: "7,890 sessions" },
    { channel: "Concierge AI Suggestions", share: "9%", count: "3,940 sessions" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="pb-4 border-b border-borderNeutral">
        <h1 className="text-2xl font-extrabold text-charcoal tracking-tight">
          Commercial Analytics & Intelligence
        </h1>
        <p className="text-xs text-muted mt-0.5">
          Comprehensive conversion efficiency, department performance, and cohort retention.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-brand-lg border border-borderNeutral shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-muted">Gross Merch Value</span>
          <div className="text-2xl font-black text-charcoal">$284,950</div>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% monthly velocity
          </span>
        </div>

        <div className="bg-white p-5 rounded-brand-lg border border-borderNeutral shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-muted">Average Order Value</span>
          <div className="text-2xl font-black text-charcoal">$248.50</div>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +$12.30 vs Q3
          </span>
        </div>

        <div className="bg-white p-5 rounded-brand-lg border border-borderNeutral shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-muted">Conversion Rate</span>
          <div className="text-2xl font-black text-charcoal">3.42%</div>
          <span className="text-[11px] text-muted">Industry baseline: 2.10%</span>
        </div>

        <div className="bg-white p-5 rounded-brand-lg border border-borderNeutral shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-muted">Customer Repeat Rate</span>
          <div className="text-2xl font-black text-charcoal">41.8%</div>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 90-day repeat cohort
          </span>
        </div>
      </div>

      {/* Department Breakdown & Traffic Share */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Department Share */}
        <div className="lg:col-span-7 bg-white p-6 rounded-brand-xl border border-borderNeutral shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-borderNeutral">
            <h2 className="text-sm font-bold text-charcoal flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-charcoal" />
              <span>Department Sales Contribution</span>
            </h2>
            <span className="text-xs font-bold text-muted">100% Total GMV</span>
          </div>

          <div className="space-y-4 pt-2">
            {departmentShare.map((dept) => (
              <div key={dept.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-charcoal">{dept.name}</span>
                  <span className="font-bold text-charcoal">{formatPrice(dept.revenue)} ({dept.pct}%)</span>
                </div>
                <div className="w-full h-2.5 bg-ivory-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${dept.pct}%` }}
                    className="h-full bg-charcoal rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Channels */}
        <div className="lg:col-span-5 bg-white p-6 rounded-brand-xl border border-borderNeutral shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-borderNeutral">
            <h2 className="text-sm font-bold text-charcoal">Acquisition Sources</h2>
            <span className="badge-lime text-[10px] font-bold">November 2026</span>
          </div>

          <div className="space-y-3 pt-2">
            {trafficChannels.map((tc, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-ivory-50 border border-borderNeutral/70 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-charcoal">{tc.channel}</p>
                  <p className="text-[10px] text-muted">{tc.count}</p>
                </div>
                <span className="font-black text-charcoal text-sm">{tc.share}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
