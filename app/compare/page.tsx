"use client";

import React from "react";
import Link from "next/link";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { mockProducts } from "@/lib/data/mock-products";
import { formatPrice } from "@/lib/utils";
import { 
  X, 
  ShoppingBag, 
  Star, 
  Check, 
  Trash2, 
  Plus, 
  SlidersHorizontal,
  ChevronRight
} from "lucide-react";

export default function ComparePage() {
  const { 
    compareList, 
    removeFromCompare, 
    clearCompare, 
    addToCart,
    toggleCompare 
  } = useMarketplace();

  // Extract all unique spec keys across compared products
  const allSpecKeys = Array.from(
    new Set(
      compareList.flatMap((product) => Object.keys(product.specs || {}))
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-muted">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <span className="text-charcoal font-semibold">Product Comparison Matrix</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-borderNeutral gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
            Comparison Matrix
          </h1>
          <p className="text-xs text-muted mt-1">
            Compare industrial parameters, acoustic metrics, materials, and pricing side-by-side (up to 4 products).
          </p>
        </div>

        {compareList.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted">
              {compareList.length} of 4 items selected
            </span>
            <button
              onClick={clearCompare}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Matrix</span>
            </button>
          </div>
        )}
      </div>

      {compareList.length > 0 ? (
        <div className="overflow-x-auto pb-6">
          <table className="w-full min-w-[700px] border-collapse bg-white rounded-brand-xl overflow-hidden border border-borderNeutral shadow-sm text-xs">
            
            {/* 1. Product Cards Header Row */}
            <thead>
              <tr className="border-b border-borderNeutral bg-ivory-50">
                <th className="p-4 text-left font-bold text-muted w-1/5">Product Information</th>
                {compareList.map((product) => (
                  <th key={product.id} className="p-4 text-left w-1/5 align-top">
                    <div className="relative group space-y-2">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute -top-1 -right-1 p-1 bg-white border border-borderNeutral rounded-full text-muted hover:text-charcoal shadow-2xs z-10"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="aspect-square w-full rounded-brand overflow-hidden bg-ivory-100 border border-borderNeutral">
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
                          }}
                        />
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">
                        {product.brand}
                      </span>
                      <Link
                        href={`/products/${product.slug}`}
                        className="font-bold text-charcoal hover:underline block line-clamp-2 text-xs"
                      >
                        {product.name}
                      </Link>

                      <div className="pt-1">
                        <span className="text-base font-extrabold text-charcoal">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-[11px] text-muted line-through ml-1.5 font-normal">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full btn-primary py-2 text-xs flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-lime" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </th>
                ))}

                {/* Empty slots placeholders if less than 4 */}
                {[...Array(4 - compareList.length)].map((_, i) => (
                  <th key={i} className="p-4 text-center align-middle border-l border-dashed border-borderNeutral">
                    <div className="h-48 flex flex-col items-center justify-center text-muted p-4 space-y-2">
                      <div className="w-10 h-10 rounded-full border border-dashed border-borderNeutral flex items-center justify-center">
                        <Plus className="w-5 h-5 text-muted" />
                      </div>
                      <span className="text-[11px]">Add another product</span>
                      <Link
                        href="/products"
                        className="text-[11px] font-bold text-charcoal hover:underline"
                      >
                        Browse items →
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* 2. Core Ratings & Stock Row */}
            <tbody>
              <tr className="border-b border-borderNeutral/60 bg-white">
                <td className="p-4 font-semibold text-muted">Customer Rating</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 font-bold text-charcoal">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-muted font-normal text-[11px]">({product.reviewCount})</span>
                    </div>
                  </td>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => (
                  <td key={i} className="p-4 text-muted border-l border-dashed border-borderNeutral text-center">-</td>
                ))}
              </tr>

              <tr className="border-b border-borderNeutral/60 bg-ivory-50/50">
                <td className="p-4 font-semibold text-muted">Department</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 font-medium text-charcoal">
                    {product.category} ({product.subcategory})
                  </td>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => (
                  <td key={i} className="p-4 text-muted border-l border-dashed border-borderNeutral text-center">-</td>
                ))}
              </tr>

              <tr className="border-b border-borderNeutral/60 bg-white">
                <td className="p-4 font-semibold text-muted">Stock Status</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 font-bold">
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Check className="w-3 h-3" /> In Stock ({product.stockCount} units)
                    </span>
                  </td>
                ))}
                {[...Array(4 - compareList.length)].map((_, i) => (
                  <td key={i} className="p-4 text-muted border-l border-dashed border-borderNeutral text-center">-</td>
                ))}
              </tr>

              {/* 3. Detailed Technical Specs Comparison */}
              {allSpecKeys.map((specKey, idx) => (
                <tr
                  key={specKey}
                  className={`border-b border-borderNeutral/60 ${
                    idx % 2 === 0 ? "bg-ivory-50/50" : "bg-white"
                  }`}
                >
                  <td className="p-4 font-semibold text-muted">{specKey}</td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4 text-charcoal font-medium">
                      {product.specs[specKey] || <span className="text-muted">N/A</span>}
                    </td>
                  ))}
                  {[...Array(4 - compareList.length)].map((_, i) => (
                    <td key={i} className="p-4 text-muted border-l border-dashed border-borderNeutral text-center">-</td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-brand-xl border border-borderNeutral p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-ivory-200 text-charcoal flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-7 h-7 text-muted" />
          </div>
          <h2 className="text-lg font-bold text-charcoal">
            Your comparison matrix is empty
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            Select &quot;Compare&quot; on any product card or detail page to analyze specifications, materials, and price differences side-by-side.
          </p>
          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted block mb-3">
              Or quick add these flagship items:
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {mockProducts.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => toggleCompare(p)}
                  className="px-3 py-1.5 rounded-lg bg-ivory-200 hover:bg-lime hover:border-lime text-charcoal text-xs font-semibold transition-colors border border-borderNeutral"
                >
                  + {p.name.split(" ")[0]} {p.name.split(" ")[1]}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4">
            <Link href="/products" className="btn-primary text-xs">
              Explore Products Catalog
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
