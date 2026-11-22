"use client";

import React from "react";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function Toast() {
  const { toast } = useMarketplace();

  if (!toast) return null;

  const isSuccess = toast.type === "success" || !toast.type;
  const isWarn = toast.type === "warn";

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-dropdown border text-xs font-medium ${
        isSuccess 
          ? "bg-charcoal text-white border-neutral-700" 
          : isWarn 
            ? "bg-amber-900 text-white border-amber-700" 
            : "bg-charcoal text-white border-neutral-700"
      }`}>
        {isSuccess && <CheckCircle2 className="w-4 h-4 text-lime shrink-0" />}
        {isWarn && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
        {!isSuccess && !isWarn && <Info className="w-4 h-4 text-neutral-300 shrink-0" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
