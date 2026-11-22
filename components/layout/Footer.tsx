"use client";

import React, { useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/data/mock-categories";
import { ArrowRight, CheckCircle2, Shield, Truck, RefreshCw, Headphones } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-charcoal text-white pt-16 pb-12 border-t border-charcoal-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Propositions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-charcoal-50 text-neutral-300">
          <div className="flex items-start gap-3">
            <Truck className="w-6 h-6 text-lime shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-sm font-semibold">Carbon-Neutral Freight</h4>
              <p className="text-xs text-neutral-400 mt-1">Complimentary expedited delivery on all curated orders over $150.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-lime shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-sm font-semibold">Verified Authenticity</h4>
              <p className="text-xs text-neutral-400 mt-1">Every item authenticated and inspected prior to dispatch.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RefreshCw className="w-6 h-6 text-lime shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-sm font-semibold">30-Day Hassle-Free Returns</h4>
              <p className="text-xs text-neutral-400 mt-1">Pre-printed return labels and doorstep courier pickup.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Headphones className="w-6 h-6 text-lime shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-sm font-semibold">24/7 Client Concierge</h4>
              <p className="text-xs text-neutral-400 mt-1">Human specialists backed by intelligent shopping guidance.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-charcoal-50">
          
          {/* Brand & Newsletter Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-lime text-charcoal flex items-center justify-center font-black text-sm">
                N
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">NEXORA</span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed mb-6">
              A curated marketplace uniting architectural engineering, contemporary aesthetics, and sustainable manufacturing.
            </p>

            <div className="max-w-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-lime block mb-2">
                Join The Nexora Gazette
              </span>
              <p className="text-xs text-neutral-400 mb-3">
                Receive private showroom invites, design essays, and limited catalog drops.
              </p>
              
              {subscribed ? (
                <div className="flex items-center gap-2 text-lime text-xs font-semibold bg-charcoal-800 p-3 rounded-lg border border-lime/30">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the circle. Check your inbox for your private preview token.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-charcoal-800 border border-neutral-700 text-xs text-white placeholder-neutral-500 rounded-lg px-3 py-2.5 outline-none focus:border-lime"
                  />
                  <button
                    type="submit"
                    className="bg-lime text-charcoal font-semibold px-4 py-2.5 rounded-lg text-xs hover:bg-lime-hover transition-colors flex items-center gap-1"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Categories
            </h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={`/categories/${c.slug}`} className="hover:text-white transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="text-lime hover:underline font-medium">
                  View All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Client Support
            </h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Consignment
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-white transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition-colors">
                  Product Comparison Matrix
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/account/addresses" className="hover:text-white transition-colors">
                  Shipping Addresses
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Operations */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Governance & Admin
            </h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/admin" className="text-lime hover:underline font-semibold flex items-center gap-1">
                  <span>Merchant Admin Portal</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/products" className="hover:text-white transition-colors">
                  Catalog Management
                </Link>
              </li>
              <li>
                <Link href="/admin/orders" className="hover:text-white transition-colors">
                  Fulfillment Dispatch
                </Link>
              </li>
              <li>
                <Link href="/admin/analytics" className="hover:text-white transition-colors">
                  Marketplace Analytics
                </Link>
              </li>
              <li>
                <Link href="/admin/inventory" className="hover:text-white transition-colors">
                  Inventory Balances
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Security Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 NEXORA Marketplace Inc. All rights reserved. The Future of Shopping.</p>
          <div className="flex items-center space-x-4 text-neutral-400">
            <span className="px-2 py-0.5 rounded bg-charcoal-800 text-[10px] font-mono border border-neutral-800">
              256-BIT ENCRYPTION
            </span>
            <span className="px-2 py-0.5 rounded bg-charcoal-800 text-[10px] font-mono border border-neutral-800">
              PCI-DSS COMPLIANT
            </span>
            <span className="px-2 py-0.5 rounded bg-charcoal-800 text-[10px] font-mono border border-neutral-800 text-lime">
              CARBON BALANCED
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
