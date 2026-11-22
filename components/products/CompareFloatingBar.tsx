"use client";

import React from "react";
import Link from "next/link";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { SlidersHorizontal, X, ArrowRight } from "lucide-react";

export default function CompareFloatingBar() {
  const { compareList, removeFromCompare, clearCompare } = useMarketplace();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-charcoal text-white rounded-full px-5 py-3 shadow-dropdown border border-neutral-700 flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-lime text-charcoal font-black flex items-center justify-center text-xs">
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-bold text-white whitespace-nowrap">
          Compare ({compareList.length}/4)
        </span>
      </div>

      {/* Thumbnails */}
      <div className="hidden sm:flex items-center gap-1.5 border-l border-neutral-700 pl-3">
        {compareList.map((product) => (
          <div key={product.id} className="relative group">
            <img
              src={product.thumbnail}
              alt=""
              className="w-7 h-7 rounded-full object-cover bg-neutral-800 border border-neutral-600"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
              }}
            />
            <button
              onClick={() => removeFromCompare(product.id)}
              className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-black text-white rounded-full flex items-center justify-center text-[9px] hover:bg-rose-600"
              title="Remove"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 border-l border-neutral-700 pl-3">
        <Link
          href="/compare"
          className="btn-accent py-1 px-3 text-xs flex items-center gap-1 whitespace-nowrap"
        >
          <span>View Matrix</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
        <button
          onClick={clearCompare}
          className="text-neutral-400 hover:text-white p-1 text-xs"
          title="Clear all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
