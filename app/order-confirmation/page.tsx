"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { mockOrders } from "@/lib/data/mock-orders";
import { formatPrice } from "@/lib/utils";
import { 
  CheckCircle2, 
  Truck, 
  ArrowRight, 
  Package, 
  Download, 
  Calendar, 
  ShieldCheck,
  MapPin
} from "lucide-react";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "NX-892410";
  const paymentMethod = searchParams.get("paymentMethod") || "upi";
  const order = mockOrders.find((o) => o.id === orderId) || mockOrders[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
      
      {/* Confirmation Hero Card */}
      <div className="bg-white rounded-brand-xl border border-borderNeutral p-8 sm:p-12 text-center space-y-4 shadow-card">
        <div className="w-16 h-16 rounded-full bg-lime/30 text-charcoal flex items-center justify-center mx-auto ring-8 ring-lime/10">
          <CheckCircle2 className="w-8 h-8 text-charcoal" />
        </div>

        <span className="badge-dark text-xs font-bold">
          Order Authorized &amp; Confirmed
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
          Thank you for your order, {order.shippingAddress.fullName.split(" ")[0]}.
        </h1>

        <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
          Your order reference is <strong className="text-charcoal font-mono">{order.id}</strong>. We have dispatched confirmation details and your consignment receipt to your verified email.
        </p>

        {/* Selected Payment Method Badge */}
        <div className="pt-1 flex items-center justify-center gap-2">
          <span className="text-xs text-muted font-medium">Payment Protocol:</span>
          <span className="badge-lime text-xs font-bold shadow-2xs">
            {paymentMethod === "cod" 
              ? "💵 Cash on Delivery (Pay at Doorstep)" 
              : paymentMethod === "upi" 
                ? "⚡ Online UPI Payment (Authorized via GPay/PhonePe)" 
                : paymentMethod === "apple"
                  ? " Apple Pay Express"
                  : "💳 Card Authorized (TLS 1.3)"}
          </span>
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            href={`/track-order?id=${order.id}`}
            className="btn-accent text-xs flex items-center gap-2 py-3 px-6 shadow-sm"
          >
            <Truck className="w-4 h-4" />
            <span>Track Consignment Timeline</span>
          </Link>
          <Link
            href="/products"
            className="btn-secondary text-xs py-3 px-6"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Consignment Details Card */}
      <div className="bg-white rounded-brand-xl border border-borderNeutral p-6 sm:p-8 shadow-2xs space-y-6">
        <h2 className="text-base font-bold text-charcoal pb-3 border-b border-borderNeutral flex items-center justify-between">
          <span>Consignment Breakdown</span>
          <span className="text-xs font-normal text-muted">
            Estimated Delivery: <strong className="text-charcoal">{order.estimatedDelivery}</strong>
          </span>
        </h2>

        {/* Item Grid */}
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
                  Qty {item.quantity} · {formatPrice(item.price)} each
                </span>
              </div>
              <span className="text-sm font-extrabold text-charcoal">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="pt-6 border-t border-borderNeutral grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-2">
            <h4 className="font-bold text-charcoal flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-muted" /> Destination Address
            </h4>
            <p className="text-muted leading-relaxed">
              {order.shippingAddress.fullName}<br />
              {order.shippingAddress.street} {order.shippingAddress.apartment}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
          </div>

          <div className="space-y-2 bg-ivory-50 p-4 rounded-lg border border-borderNeutral/80">
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
            <div className="pt-2 border-t border-borderNeutral flex justify-between font-extrabold text-charcoal text-sm">
              <span>Paid Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-muted">Loading order confirmation...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
