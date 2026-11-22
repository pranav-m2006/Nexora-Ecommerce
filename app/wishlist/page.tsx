"use client";

import React from "react";
import Link from "next/link";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { formatPrice } from "@/lib/utils";
import { 
  Heart, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ChevronRight,
  Sparkles
} from "lucide-react";

export default function WishlistPage() {
  const { wishlistProducts, toggleWishlist, addToCart, user, loginDemo, isMounted } = useMarketplace();

  if (!isMounted) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-charcoal border-t-lime rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-muted">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <span className="text-charcoal font-semibold">Saved Wishlist</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-borderNeutral gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
            Saved Wishlist
          </h1>
          <p className="text-xs text-muted mt-1">
            {wishlistProducts.length} items saved for future consideration.
          </p>
        </div>

        <Link
          href="/products"
          className="text-xs font-semibold text-charcoal hover:underline flex items-center gap-1"
        >
          <span>Continue browsing catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-brand-lg border border-borderNeutral overflow-hidden hover:border-charcoal hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-square w-full bg-ivory-100 overflow-hidden">
                <Link href={`/products/${product.slug}`} className="block w-full h-full">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                </Link>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white text-rose-600 shadow-sm hover:bg-rose-50 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    {product.brand}
                  </span>
                  <Link
                    href={`/products/${product.slug}`}
                    className="font-bold text-charcoal hover:underline block text-xs line-clamp-1 mt-0.5"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted line-clamp-1 mt-1">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-borderNeutral/70 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-charcoal">
                    {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="btn-primary py-1.5 px-3 text-xs flex items-center gap-1.5 shadow-2xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-lime" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : !user ? (
        /* Signed Out State */
        <div className="bg-white rounded-brand-xl border border-borderNeutral p-12 text-center max-w-md mx-auto space-y-4 shadow-card">
          <div className="w-14 h-14 rounded-full bg-ivory-200 text-charcoal flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7 text-muted" />
          </div>
          <h2 className="text-xl font-bold text-charcoal">
            Private Wishlist Locked
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            You are currently signed out. Sign in to your account to view and synchronize your saved designs and capsule drops.
          </p>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={loginDemo}
              className="w-full btn-accent py-3 text-xs font-bold"
            >
              1-Click Demo Sign In (Alex Rivera)
            </button>
            <Link href="/login" className="w-full btn-secondary py-2.5 text-xs font-bold text-center">
              Sign In with Email
            </Link>
          </div>
        </div>
      ) : (
        /* Empty Wishlist State */
        <div className="bg-white rounded-brand-xl border border-borderNeutral p-16 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-ivory-200 text-charcoal flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7 text-muted" />
          </div>
          <h2 className="text-lg font-bold text-charcoal">
            Your wishlist is empty
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            Click the heart icon on any product to save it to your private wishlist for later review.
          </p>
          <div className="pt-4">
            <Link href="/products" className="btn-primary text-xs">
              Explore Our Curations
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
