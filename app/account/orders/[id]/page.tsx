"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockOrders } from "@/lib/data/mock-orders";
import { formatPrice } from "@/lib/utils";
import { ChevronRight, Truck, ArrowLeft, Download, ShieldCheck, MapPin, CreditCard } from "lucide-react";

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const order = mockOrders.find((o) => o.id === params.id) || mockOrders[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-muted">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <Link href="/account" className="hover:text-charcoal transition-colors">Account</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <Link href="/account/orders" className="hover:text-charcoal transition-colors">Orders</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <span className="text-charcoal font-semibold">{order.id}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-borderNeutral gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
              Order {order.id}
            </h1>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              order.status === "Delivered"
                ? "bg-emerald-100 text-emerald-800"
                : "bg-lime text-charcoal"
            }`}>
              {order.status}
            </span>
          </div>
          <p className="text-xs text-muted mt-1">
            Authorized on {new Date(order.date).toLocaleDateString()} · Carrier: {order.carrier} ({order.trackingNumber})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/track-order?id=${order.id}`}
            className="btn-accent py-2 px-4 text-xs flex items-center gap-1.5 shadow-2xs"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Live Consignment Tracking</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Items List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-brand-xl border border-borderNeutral p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-charcoal pb-3 border-b border-borderNeutral">
              Purchased Items ({order.items.length})
            </h2>

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
                    <h3 className="font-bold text-xs text-charcoal">
                      {item.name}
                    </h3>
                    {item.variant && (
                      <p className="text-[11px] text-muted">
                        {Object.entries(item.variant).map(([k, v]) => `${k}: ${v}`).join(", ")}
                      </p>
                    )}
                    <span className="text-xs text-charcoal font-semibold block mt-1">
                      Qty {item.quantity} · {formatPrice(item.price)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-charcoal">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Payment Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-brand-lg border border-borderNeutral p-5 shadow-2xs space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-charcoal">
                <MapPin className="w-4 h-4 text-muted" />
                <span>Shipping Address</span>
              </div>
              <p className="font-semibold text-charcoal">{order.shippingAddress.fullName}</p>
              <p className="text-muted leading-relaxed">
                {order.shippingAddress.street} {order.shippingAddress.apartment}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                {order.shippingAddress.phone}
              </p>
            </div>

            <div className="bg-white rounded-brand-lg border border-borderNeutral p-5 shadow-2xs space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-charcoal">
                <CreditCard className="w-4 h-4 text-muted" />
                <span>Payment Authorization</span>
              </div>
              <p className="font-semibold text-charcoal">{order.paymentMethod}</p>
              <p className="text-muted leading-relaxed">
                Transaction ID: TX-{order.id.replace("NX-", "")}894<br />
                Security verification: Verified by Visa / 3D Secure 2.0
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary Right Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-brand-xl border border-borderNeutral p-6 shadow-2xs space-y-4 text-xs">
            <h2 className="text-sm font-bold text-charcoal pb-3 border-b border-borderNeutral">
              Financial Breakdown
            </h2>

            <div className="space-y-2.5">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-semibold text-charcoal">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Carbon-Neutral Freight</span>
                <span className="font-semibold text-charcoal">
                  {order.shipping === 0 ? "Complimentary" : formatPrice(order.shipping)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Privilege Concession</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-borderNeutral flex justify-between items-baseline">
                <span className="text-sm font-bold text-charcoal">Paid Total</span>
                <span className="text-xl font-black text-charcoal">{formatPrice(order.total)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-borderNeutral">
              <button
                onClick={() => alert("Commercial invoice PDF download simulated.")}
                className="w-full btn-secondary py-2.5 text-xs flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download VAT Invoice</span>
              </button>
            </div>
          </div>

          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Order History</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
