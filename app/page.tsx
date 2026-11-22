"use client";

import React, { useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/data/mock-categories";
import ProductCard from "@/components/products/ProductCard";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Flame, 
  Clock, 
  SlidersHorizontal,
  ChevronRight,
  ArrowUpRight,
  Truck,
  CheckCircle2
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function HomePage() {
  const { setAssistantOpen, products } = useMarketplace();
  const [activeTab, setActiveTab] = useState<"trending" | "best" | "new">("trending");

  const trendingProducts = products.filter((p) => p.isTrending);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.filter((p) => p.isNewArrival);
  const recommended = products.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      
      {/* C. HERO SECTION */}
      <section className="relative overflow-hidden bg-ivory-100 border-b border-borderNeutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-borderNeutral shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                <span className="text-xs font-semibold text-charcoal tracking-wide">
                  Autonomous Winter Release 2026
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal tracking-tight leading-[1.08]">
                Objects designed for clarity, built for endurance.
              </h1>

              <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
                NEXORA curates world-class industrial acoustics, architectural garments, Nordic interiors, and bio-active wellness essentials through a unified modern marketplace.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="btn-accent px-7 py-3.5 text-sm flex items-center gap-2"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/categories"
                  className="btn-secondary px-6 py-3.5 text-sm flex items-center gap-2"
                >
                  <span>Browse Departments</span>
                </Link>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-6 border-t border-borderNeutral/80 grid grid-cols-3 gap-4 text-xs text-muted">
                <div>
                  <p className="font-bold text-charcoal text-sm">100%</p>
                  <p className="text-[11px] mt-0.5">Verified Sourcing</p>
                </div>
                <div>
                  <p className="font-bold text-charcoal text-sm">48-Hr</p>
                  <p className="text-[11px] mt-0.5">Priority Dispatch</p>
                </div>
                <div>
                  <p className="font-bold text-charcoal text-sm">Carbon-0</p>
                  <p className="text-[11px] mt-0.5">Offset Logistics</p>
                </div>
              </div>
            </div>

            {/* Right Editorial Imagery Hero Box */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-brand-xl overflow-hidden shadow-card border border-borderNeutral bg-white">
                <div className="aspect-[4/5] w-full relative">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80"
                    alt="Nexora Featured Studio Acoustic Device"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                  
                  {/* Floating Product Callout Card on Image */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-brand bg-white/95 backdrop-blur-md border border-white/40 shadow-dropdown flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted tracking-wider block">
                        Featured Highlight
                      </span>
                      <h4 className="text-sm font-bold text-charcoal">
                        Nexora Studio Pro Acoustic
                      </h4>
                      <p className="text-xs font-extrabold text-charcoal mt-0.5">
                        $349.00 <span className="text-muted line-through font-normal text-[11px]">$420.00</span>
                      </p>
                    </div>
                    <Link
                      href="/products/nexora-studio-pro-headphones"
                      className="p-2.5 rounded-full bg-charcoal text-lime hover:bg-black transition-transform active:scale-90"
                      aria-label="View product"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Decorative Subtle Accent Tag */}
              <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lime text-charcoal text-xs font-bold shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curator&apos;s Selection</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* D. FEATURED CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-borderNeutral gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted block mb-1">
              Curated Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
              Explore by Category
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-xs font-bold text-charcoal hover:underline flex items-center gap-1 group"
          >
            <span>View all 6 departments</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative rounded-brand-lg overflow-hidden bg-white border border-borderNeutral hover:border-charcoal hover:shadow-card transition-all flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-ivory-200">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
                  }}
                />
              </div>
              <div className="p-3">
                <h3 className="text-xs font-bold text-charcoal group-hover:text-black line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-[11px] text-muted mt-0.5">
                  {category.itemCount} items
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* E, F, G. TABBED CURATION: TRENDING / BEST SELLERS / NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-borderNeutral gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted block mb-1">
              Marketplace Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
              Curated Collections
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center bg-ivory-200 p-1 rounded-lg border border-borderNeutral self-start md:self-auto">
            <button
              onClick={() => setActiveTab("trending")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "trending"
                  ? "bg-white text-charcoal shadow-2xs"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-lime-dark" />
              <span>Trending</span>
            </button>

            <button
              onClick={() => setActiveTab("best")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "best"
                  ? "bg-white text-charcoal shadow-2xs"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Best Sellers</span>
            </button>

            <button
              onClick={() => setActiveTab("new")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "new"
                  ? "bg-white text-charcoal shadow-2xs"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-sky-500" />
              <span>New Arrivals</span>
            </button>
          </div>
        </div>

        {/* Product Grid based on active tab */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeTab === "trending" &&
            trendingProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          {activeTab === "best" &&
            bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
          {activeTab === "new" &&
            newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* H & J. SEASONAL EDITORIAL PROMOTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-brand-xl bg-charcoal text-white overflow-hidden relative shadow-card border border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6 z-10">
              <span className="badge-lime text-xs font-bold uppercase tracking-wider">
                Winter Capsule Edition
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Architectural warmth meets technical performance.
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base max-w-lg leading-relaxed">
                Engineered with 380 GSM Australian merino wool and water-resistant sailcloth hardware. Discover our seasonal wardrobe staples curated for harsh elements.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/products/merino-wool-architectural-overshirt"
                  className="btn-accent px-6 py-3 text-xs flex items-center gap-2"
                >
                  <span>Shop Capsule Piece</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/categories/fashion"
                  className="inline-flex items-center justify-center font-medium px-5 py-3 rounded-lg border border-neutral-700 text-white hover:bg-neutral-800 transition-colors text-xs"
                >
                  Explore All Fashion
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 lg:h-full min-h-[360px] relative">
              <img
                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1000&auto=format&fit=crop&q=80"
                alt="Architectural Winter Capsule"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/40 to-transparent lg:block hidden" />
            </div>

          </div>
        </div>
      </section>

      {/* I. RECOMMENDED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-borderNeutral">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted block mb-1">
              Personalized Selections
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
              Recommended For Your Taste
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold text-charcoal hover:underline flex items-center gap-1"
          >
            <span>See entire catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommended.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* K. AI SHOPPING ASSISTANT INTRODUCTION CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-brand-xl bg-ivory-200 border border-borderNeutral p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-borderNeutral text-xs font-semibold text-charcoal">
              <Sparkles className="w-3.5 h-3.5 text-charcoal" />
              <span>Next-Generation Shopping Intelligence</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
              Looking for something tailored to your exact specifications?
            </h3>

            <p className="text-sm text-muted leading-relaxed">
              Our autonomous shopping concierge analyzes material compositions, architectural ergonomics, and cross-brand compatibilities to find your ideal match in seconds.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setAssistantOpen(true)}
                className="btn-primary text-xs flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-lime" />
                <span>Launch Nexora Concierge</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
