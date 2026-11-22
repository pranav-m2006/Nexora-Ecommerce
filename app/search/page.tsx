"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useMarketplace } from "@/lib/store/marketplace-context";
import ProductCard from "@/components/products/ProductCard";
import { Search as SearchIcon, X, SlidersHorizontal, Sparkles, ArrowRight } from "lucide-react";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "all";

  const { products, recentSearches, addRecentSearch, setAssistantOpen } = useMarketplace();
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);

  // Sync state if URL changes
  React.useEffect(() => {
    setSearchTerm(queryParam);
    setSelectedCategory(categoryParam);
  }, [queryParam, categoryParam]);

  const matchingProducts = useMemo(() => {
    const q = queryParam.trim().toLowerCase();
    const cat = selectedCategory.toLowerCase();

    // If neither query nor specific category, return empty to show popular picks
    if (!q && cat === "all") return [];

    return products.filter((product) => {
      // 1. Check text query if present
      if (q) {
        const matchText =
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.subcategory.toLowerCase().includes(q) ||
          product.tags.some((t) => t.toLowerCase().includes(q)) ||
          product.shortDescription.toLowerCase().includes(q);

        if (!matchText) return false;
      }

      // 2. Check category / subcategory filter
      if (cat !== "all") {
        if (cat === "mobiles") {
          return product.subcategory.toLowerCase().includes("mobile") || product.tags.includes("mobile") || product.tags.includes("phone");
        }
        if (cat === "audio") {
          return product.subcategory.toLowerCase().includes("audio") || product.subcategory.toLowerCase().includes("airpods") || product.tags.includes("airpods") || product.tags.includes("audio");
        }
        if (cat === "power") {
          return product.subcategory.toLowerCase().includes("power") || product.tags.includes("power-bank") || product.tags.includes("charger");
        }
        return product.categorySlug === cat || product.category.toLowerCase().includes(cat);
      }

      return true;
    });
  }, [products, queryParam, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed) {
      addRecentSearch(trimmed);
    }
    
    if (trimmed && selectedCategory !== "all") {
      router.push(`/search?q=${encodeURIComponent(trimmed)}&category=${encodeURIComponent(selectedCategory)}`);
    } else if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else if (selectedCategory !== "all") {
      router.push(`/search?category=${encodeURIComponent(selectedCategory)}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      
      {/* Search Input Hero Section */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
          Explore the Marketplace
        </h1>
        <p className="text-xs text-muted">
          Search across mobiles, airpods, power banks, dresses, cookware, and architectural accessories.
        </p>

        <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
          <SearchIcon className="w-5 h-5 text-muted absolute left-4 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search phones, airpods, power banks, dress, knives, desks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-borderNeutral focus:border-charcoal text-sm text-charcoal placeholder-muted rounded-xl pl-12 pr-28 py-3.5 shadow-sm outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-20 top-3.5 p-1 text-muted hover:text-charcoal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-2 btn-primary px-4 py-2 text-xs font-bold"
          >
            Search
          </button>
        </form>

        {/* Quick Search Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="text-muted font-medium">Quick keywords:</span>
          {["Titanium Phone", "AirPods", "Power Bank", "Trench Coat", "Damascus Knives", "Dumbbells"].map((term, i) => (
            <button
              key={i}
              onClick={() => {
                setSearchTerm(term);
                router.push(`/search?q=${encodeURIComponent(term)}`);
              }}
              className="px-2.5 py-1 rounded-full bg-white border border-borderNeutral hover:bg-lime hover:border-lime text-charcoal transition-colors font-medium text-[11px]"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header with Category Filters */}
      {(queryParam || selectedCategory !== "all") ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderNeutral gap-4">
            <div>
              <p className="text-xs text-muted">
                {queryParam ? (
                  <>Showing results for <strong className="text-charcoal">&quot;{queryParam}&quot;</strong></>
                ) : (
                  <>Showing department curation for <strong className="text-charcoal capitalize">&quot;{selectedCategory.replace(/-/g, " ")}&quot;</strong></>
                )}
              </p>
              <h2 className="text-lg font-bold text-charcoal">
                {matchingProducts.length} Products Found
              </h2>
            </div>

            {/* Category Filter Chips with no scrollbar */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scrollbar-none pb-1">
              {[
                { id: "all", label: "All" },
                { id: "mobiles", label: "📱 Mobiles" },
                { id: "audio", label: "🎧 AirPods" },
                { id: "power", label: "⚡ Power Banks" },
                { id: "home-and-living", label: "🏡 House Items" },
                { id: "fashion", label: "👗 Dress & Fashion" },
                { id: "accessories", label: "⌚ Accessories" },
                { id: "beauty", label: "✨ Beauty" },
                { id: "sports", label: "🏃 Sports" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-charcoal text-white"
                      : "bg-white border border-borderNeutral text-charcoal hover:bg-ivory-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid or Empty State */}
          {matchingProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {matchingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-brand-xl border border-borderNeutral p-12 text-center max-w-lg mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-ivory-200 text-charcoal flex items-center justify-center mx-auto">
                <SearchIcon className="w-6 h-6 text-muted" />
              </div>
              <h3 className="text-base font-bold text-charcoal">
                No products match {queryParam ? `"${queryParam}"` : `the "${selectedCategory}" category`}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Try searching for broader keywords like phone, airpods, power, dress, or lamp.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <Link href="/products" className="btn-secondary text-xs">
                  Browse All Products
                </Link>
                <button
                  onClick={() => setAssistantOpen(true)}
                  className="btn-primary text-xs flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-lime" />
                  <span>Ask AI Concierge</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Default Search Landing (Recommended picks) */
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between pb-3 border-b border-borderNeutral">
            <h2 className="text-base font-bold text-charcoal">Popular Design Curations</h2>
            <Link href="/products" className="text-xs font-semibold text-charcoal hover:underline">
              View All ({products.length}) →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-muted">Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
