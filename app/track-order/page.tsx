"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { mockOrders } from "@/lib/data/mock-orders";
import { formatPrice } from "@/lib/utils";
import { 
  Package, 
  Search, 
  CheckCircle2, 
  Clock, 
  Truck, 
  MapPin, 
  Calendar, 
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from "lucide-react";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "NX-892410";

  const [inputOrderId, setInputOrderId] = useState(initialId);
  const [currentOrder, setCurrentOrder] = useState(() => {
    return mockOrders.find((o) => o.id === initialId) || mockOrders[0];
  });

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputOrderId.trim();
    if (!clean) return;

    setIsSearching(true);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(clean)}`);
      const data = await res.json();
      if (res.ok && data.order) {
        setCurrentOrder(data.order);
      } else {
        const found = mockOrders.find((o) => o.id.toLowerCase() === clean.toLowerCase());
        if (found) {
          setCurrentOrder(found);
        } else {
          alert(`Order ${clean} not found. Please try NX-892410 or a recently placed order.`);
        }
      }
    } catch {
      const found = mockOrders.find((o) => o.id.toLowerCase() === clean.toLowerCase());
      if (found) {
        setCurrentOrder(found);
      } else {
        alert(`Order ${clean} not found. Please try NX-892410.`);
      }
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-muted">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <span className="text-charcoal font-semibold">Consignment Tracking</span>
      </nav>

      {/* Header & Search Bar */}
      <div className="bg-white rounded-brand-xl border border-borderNeutral p-6 sm:p-8 shadow-card space-y-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
            Live Consignment Tracking
          </h1>
          <p className="text-xs text-muted mt-1">
            Real-time status updates across all 7 verification, packing, and courier milestones.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="e.g. NX-892410"
              value={inputOrderId}
              onChange={(e) => setInputOrderId(e.target.value)}
              className="w-full bg-ivory-50 border border-borderNeutral rounded-lg pl-10 pr-3 py-2 text-xs font-mono uppercase text-charcoal outline-none focus:border-charcoal"
            />
          </div>
          <button
            type="submit"
            className="btn-primary px-4 py-2 text-xs"
          >
            Track
          </button>
        </form>

        <div className="flex gap-2 text-[11px] text-muted">
          <span>Demo Consignment IDs:</span>
          <button
            onClick={() => {
              setInputOrderId("NX-892410");
              setCurrentOrder(mockOrders[0]);
            }}
            className="font-mono underline text-charcoal font-semibold"
          >
            NX-892410 (In Transit)
          </button>
          <span>·</span>
          <button
            onClick={() => {
              setInputOrderId("NX-875192");
              setCurrentOrder(mockOrders[1]);
            }}
            className="font-mono underline text-charcoal font-semibold"
          >
            NX-875192 (Delivered)
          </button>
        </div>
      </div>

      {/* Order Status Hero Bar */}
      <div className="bg-charcoal text-white rounded-brand-xl p-6 sm:p-8 shadow-card space-y-6 border border-neutral-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-50">
          <div>
            <span className="badge-lime text-[10px] font-bold uppercase tracking-wider">
              {currentOrder.carrier} · {currentOrder.trackingNumber}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
              Consignment {currentOrder.id}
            </h2>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] text-neutral-400 block uppercase font-bold tracking-wider">
              Estimated Delivery
            </span>
            <span className="text-lime font-bold text-base">
              {currentOrder.estimatedDelivery}
            </span>
          </div>
        </div>

        {/* The 7-Stage Tracking Timeline (Mandatory Requirement) */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Milestone Progress (7 Verified Stages)
          </h3>

          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-neutral-700">
            {currentOrder.timeline.map((step, idx) => (
              <div key={idx} className="relative group">
                
                {/* Node icon */}
                <div className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${
                  step.completed
                    ? "bg-lime border-lime text-charcoal"
                    : step.current
                      ? "bg-charcoal border-lime text-lime animate-pulse ring-4 ring-lime/20"
                      : "bg-charcoal-800 border-neutral-700 text-neutral-500"
                }`}>
                  {step.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.step}
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className={`text-sm font-bold ${
                      step.current ? "text-lime" : step.completed ? "text-white" : "text-neutral-400"
                    }`}>
                      {step.step}. {step.label}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      {step.date}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Package Contents Preview */}
      <div className="bg-white rounded-brand-xl border border-borderNeutral p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-charcoal pb-3 border-b border-borderNeutral">
          Consignment Contents ({currentOrder.items.length} items)
        </h3>
        <div className="divide-y divide-borderNeutral/60">
          {currentOrder.items.map((item, idx) => (
            <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-lg bg-ivory-100 border border-borderNeutral"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
                }}
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                  {item.brand}
                </span>
                <h4 className="font-bold text-xs text-charcoal truncate">
                  {item.name}
                </h4>
                <p className="text-[11px] text-muted">
                  Quantity: {item.quantity} · {formatPrice(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-muted">Loading consignment tracking...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
