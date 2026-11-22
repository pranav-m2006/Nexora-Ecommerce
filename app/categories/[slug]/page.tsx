"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/lib/data/mock-categories";
import { useMarketplace } from "@/lib/store/marketplace-context";
import ProductCard from "@/components/products/ProductCard";
import { ChevronRight, ArrowUpDown, SlidersHorizontal } from "lucide-react";

interface CategoryDetailPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const { products } = useMarketplace();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating">("featured");

  const categoryProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.categorySlug !== category.slug) return false;
      if (selectedSubcategory && p.subcategory !== selectedSubcategory) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, category.slug, selectedSubcategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-muted mb-6">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <Link href="/categories" className="hover:text-charcoal transition-colors">Departments</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <span className="text-charcoal font-semibold">{category.name}</span>
      </nav>

      {/* Editorial Category Header Banner */}
      <div className="rounded-brand-xl bg-charcoal text-white overflow-hidden p-8 sm:p-12 mb-10 relative border border-neutral-800 shadow-card">
        <div className="relative z-10 max-w-xl space-y-4">
          <span className="badge-lime text-[11px] font-bold uppercase tracking-wider">
            Curated Department
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Category Ambient Silhouette Background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 hidden md:block">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover object-center mix-blend-luminosity"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
            }}
          />
        </div>
      </div>

      {/* Subcategory Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-borderNeutral gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedSubcategory(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedSubcategory === null
                ? "bg-charcoal text-white"
                : "bg-white border border-borderNeutral text-charcoal hover:bg-ivory-200"
            }`}
          >
            All {category.name} ({products.filter((p) => p.categorySlug === category.slug).length})
          </button>
          {category.subcategories.map((sub, i) => (
            <button
              key={i}
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedSubcategory === sub
                  ? "bg-charcoal text-white"
                  : "bg-white border border-borderNeutral text-charcoal hover:bg-ivory-200"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 bg-white border border-borderNeutral px-3 py-1.5 rounded-lg text-xs font-medium text-charcoal shrink-0">
          <ArrowUpDown className="w-3.5 h-3.5 text-muted" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-transparent outline-none cursor-pointer pr-2 font-semibold text-xs"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-brand-lg border border-borderNeutral space-y-3">
          <SlidersHorizontal className="w-8 h-8 text-muted mx-auto" />
          <p className="text-sm font-bold text-charcoal">No products in this specific subcategory yet.</p>
          <button
            onClick={() => setSelectedSubcategory(null)}
            className="btn-secondary text-xs"
          >
            Show all {category.name}
          </button>
        </div>
      )}

    </div>
  );
}
