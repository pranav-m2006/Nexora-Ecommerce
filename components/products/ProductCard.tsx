"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { formatPrice } from "@/lib/utils";
import { Heart, Star, ShoppingBag, SlidersHorizontal, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    isInCompare 
  } = useMarketplace();

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  return (
    <div className="group relative bg-white rounded-brand-lg border border-borderNeutral hover:border-charcoal/30 hover:shadow-card transition-all duration-200 flex flex-col overflow-hidden">
      
      {/* Image Container with Badges & Action Overlays */}
      <div className="relative aspect-square w-full bg-ivory-100 overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
            }}
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="badge-lime text-[11px] font-bold shadow-2xs">
              {product.badge}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="badge-dark text-[10px] font-bold">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button (Always Visible or Hover) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors z-10 ${
            isWishlisted 
              ? "bg-white text-rose-600 shadow-sm" 
              : "bg-white/80 text-charcoal hover:bg-white hover:text-rose-600 shadow-2xs"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
          title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-600" : ""}`} />
        </button>

        {/* Quick Add To Cart Floating Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="flex-1 btn-primary py-2 text-xs flex items-center justify-center gap-1.5 shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-lime" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-muted mb-1">
            <span className="font-semibold uppercase tracking-wider">{product.brand}</span>
            <div className="flex items-center gap-1 text-charcoal">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-muted">({product.reviewCount})</span>
            </div>
          </div>

          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-neutral-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-muted mt-1 line-clamp-1">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Compare Controls */}
        <div className="mt-4 pt-3 border-t border-borderNeutral/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-charcoal">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => toggleCompare(product)}
            className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded transition-colors font-medium ${
              isCompared
                ? "bg-charcoal text-lime font-bold"
                : "text-muted hover:text-charcoal hover:bg-ivory-200"
            }`}
            title="Compare specifications"
          >
            {isCompared ? (
              <>
                <Check className="w-3 h-3" />
                <span>Comparing</span>
              </>
            ) : (
              <>
                <SlidersHorizontal className="w-3 h-3" />
                <span>Compare</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
