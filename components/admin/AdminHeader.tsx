"use client";

import React from "react";
import Link from "next/link";
import { Search, Bell, Shield, ArrowUpRight } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-borderNeutral px-6 flex items-center justify-between sticky top-0 z-30">
      
      {/* Search Input */}
      <div className="relative max-w-sm w-full hidden sm:block">
        <Search className="w-4 h-4 text-muted absolute left-3 top-2.5 pointer-events-none" />
        <input
          type="text"
          placeholder="Search SKUs, orders, customers..."
          className="w-full bg-ivory-50 border border-borderNeutral text-xs text-charcoal rounded-lg pl-9 pr-3 py-2 outline-none focus:bg-white focus:border-charcoal"
        />
      </div>

      {/* Admin Profile Area */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>Production Master</span>
        </div>

        <div className="flex items-center gap-3 pl-2 border-l border-borderNeutral">
          <div className="w-8 h-8 rounded-full bg-charcoal text-lime flex items-center justify-center font-black text-xs">
            AD
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-bold text-charcoal leading-none">Admin Operations</p>
            <p className="text-[10px] text-muted mt-0.5">superadmin@nexora.io</p>
          </div>
        </div>
      </div>

    </header>
  );
}
