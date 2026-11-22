"use client";

import React from "react";
import Link from "next/link";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { mockOrders } from "@/lib/data/mock-orders";
import { formatPrice } from "@/lib/utils";
import { Package, ChevronRight, Truck, ArrowLeft } from "lucide-react";

export default function AccountOrdersPage() {
  const { user, loginDemo, isMounted } = useMarketplace();

  if (!isMounted) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-charcoal border-t-lime rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-ivory-200 text-charcoal flex items-center justify-center mx-auto">
          <Package className="w-6 h-6 text-muted" />
        </div>
        <h1 className="text-xl font-bold text-charcoal">Sign In to View Order Archive</h1>
        <p className="text-xs text-muted">
          Your personal order history and invoices are private to authenticated member accounts.
        </p>
        <div className="pt-2 flex flex-col gap-2.5">
          <button onClick={loginDemo} className="btn-accent text-xs py-3 font-bold">
            1-Click Demo Sign In (Alex Rivera)
          </button>
          <Link href="/login" className="btn-secondary text-xs py-2.5 font-bold text-center">
            Sign In with Email
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-muted">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <Link href="/account" className="hover:text-charcoal transition-colors">Account</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <span className="text-charcoal font-semibold">Order History</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-borderNeutral">
        <div>
          <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
            Order Archive
          </h1>
          <p className="text-xs text-muted mt-1">
            Track and review your past consignments, invoices, and fulfillment timelines.
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {mockOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-brand-xl border border-borderNeutral overflow-hidden shadow-2xs"
          >
            {/* Top Bar of Order */}
            <div className="bg-ivory-50 p-4 sm:p-5 border-b border-borderNeutral flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <span className="text-muted block text-[10px] uppercase font-bold">Order Placed</span>
                  <span className="font-semibold text-charcoal">{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-muted block text-[10px] uppercase font-bold">Total Amount</span>
                  <span className="font-bold text-charcoal">{formatPrice(order.total)}</span>
                </div>
                <div>
                  <span className="text-muted block text-[10px] uppercase font-bold">Ship To</span>
                  <span className="font-semibold text-charcoal">{order.shippingAddress.fullName}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-muted block text-[10px] uppercase font-bold">Consignment Reference</span>
                <span className="font-mono font-bold text-charcoal">{order.id}</span>
              </div>
            </div>

            {/* Content & Items */}
            <div className="p-5 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderNeutral/60 gap-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-lime text-charcoal"
                  }`}>
                    Status: {order.status}
                  </span>
                  <span className="text-xs text-muted">
                    · Estimated delivery: <strong>{order.estimatedDelivery}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/track-order?id=${order.id}`}
                    className="btn-accent py-1.5 px-3.5 text-xs flex items-center gap-1.5 shadow-2xs"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Track Package</span>
                  </Link>
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="btn-secondary py-1.5 px-3 text-xs"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Items in this order */}
              <div className="divide-y divide-borderNeutral/60">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg bg-ivory-100 border border-borderNeutral"
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
                      {item.variant && (
                        <p className="text-[11px] text-muted">
                          {Object.entries(item.variant).map(([k, v]) => `${k}: ${v}`).join(", ")}
                        </p>
                      )}
                      <p className="text-xs font-semibold text-charcoal mt-1">
                        Qty: {item.quantity} · {formatPrice(item.price)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
