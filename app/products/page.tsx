"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { FilterState, Product } from "@/lib/types";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { 
  SlidersHorizontal, 
  ChevronRight, 
  X, 
  ArrowUpDown,
  RotateCcw
} from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || undefined;
  const initialSort = (searchParams.get("sort") as FilterState["sortBy"]) || "featured";

  const { products } = useMarketplace();

  const allBrands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  }, [products]);

  const maxPriceLimit = 1600;

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    priceRange: [0, maxPriceLimit],
    brands: [],
    minRating: 0,
    inStockOnly: false,
    sortBy: initialSort,
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const clearFilters = () => {
    setFilters({
      category: undefined,
      priceRange: [0, maxPriceLimit],
      brands: [],
      minRating: 0,
      inStockOnly: false,
      sortBy: "featured",
    });
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category check
      if (filters.category && product.categorySlug !== filters.category) {
        return false;
      }
      // Price check
      if (product.price > filters.priceRange[1]) {
        return false;
      }
      // Brand check
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }
      // Rating check
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }
      // Stock check
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "price-low") return a.price - b.price;
      if (filters.sortBy === "price-high") return b.price - a.price;
      if (filters.sortBy === "rating") return b.rating - a.rating;
      if (filters.sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-muted mb-6">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <span className="text-charcoal font-semibold">Catalog</span>
      </nav>

      {/* Header & Controls Strip */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-borderNeutral gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
            All Products
          </h1>
          <p className="text-xs text-muted mt-1">
            Displaying {filteredProducts.length} curated design pieces across mobiles, airpods, house items, and apparel
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-borderNeutral text-xs font-semibold text-charcoal hover:bg-ivory-200"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white border border-borderNeutral px-3 py-2 rounded-lg text-xs font-medium text-charcoal">
            <ArrowUpDown className="w-3.5 h-3.5 text-muted" />
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterState["sortBy"],
                }))
              }
              className="bg-transparent outline-none cursor-pointer pr-2 font-semibold text-xs"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Layout with Desktop Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28 bg-white p-5 rounded-brand-lg border border-borderNeutral shadow-2xs">
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              availableBrands={allBrands}
              maxPriceLimit={maxPriceLimit}
              onClearFilters={clearFilters}
            />
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-brand-lg border border-borderNeutral p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-ivory-200 text-charcoal flex items-center justify-center mx-auto">
                <SlidersHorizontal className="w-6 h-6 text-muted" />
              </div>
              <h3 className="text-base font-bold text-charcoal">
                No matching products found
              </h3>
              <p className="text-xs text-muted max-w-sm mx-auto">
                We couldn&apos;t find any items matching your active filter criteria. Try resetting your price or brand selection.
              </p>
              <button
                onClick={clearFilters}
                className="btn-secondary text-xs inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            </div>
          )}
        </main>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white h-full shadow-2xl flex flex-col p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-borderNeutral mb-4">
              <span className="font-extrabold text-charcoal text-sm">Filter Products</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded text-charcoal hover:bg-ivory-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              availableBrands={allBrands}
              maxPriceLimit={maxPriceLimit}
              onClearFilters={clearFilters}
            />

            <div className="mt-8 pt-4 border-t border-borderNeutral">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full btn-primary text-xs py-3"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-muted">Loading catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
