"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { mockProducts, reviewsData } from "@/lib/data/mock-products";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  SlidersHorizontal, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  ChevronRight, 
  Check, 
  Minus, 
  Plus,
  Share2,
  Clock,
  Sparkles
} from "lucide-react";

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const { 
    products,
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    isInCompare,
    showToast 
  } = useMarketplace();

  const product = products.find((p) => p.slug === params.slug) || mockProducts.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (product.variants) {
      product.variants.forEach((v) => {
        initial[v.name] = v.options[0];
      });
    }
    return initial;
  });

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const relatedProducts = mockProducts
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariants);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-16">
      
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-muted">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <Link href="/products" className="hover:text-charcoal transition-colors">Catalog</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <Link href={`/categories/${product.categorySlug}`} className="hover:text-charcoal transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <span className="text-charcoal font-semibold truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* 2. Main Product Hero (Gallery + Information) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
        
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square w-full rounded-brand-xl overflow-hidden bg-white border border-borderNeutral shadow-card">
            <img
              src={product.images[activeImageIndex] || product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
              }}
            />
            {product.badge && (
              <span className="absolute top-4 left-4 badge-lime font-bold text-xs shadow-2xs">
                {product.badge}
              </span>
            )}
            {product.discountPercent > 0 && (
              <span className="absolute top-4 right-4 badge-dark font-bold text-xs">
                Save {product.discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-brand overflow-hidden border-2 transition-all shrink-0 bg-white ${
                    activeImageIndex === idx ? "border-charcoal ring-1 ring-charcoal" : "border-borderNeutral opacity-70 hover:opacity-100"
                  }`}
                >
                  <img 
                    src={img} 
                    alt="" 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Buy Box & Product Details */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Brand & Reviews */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                {product.brand}
              </span>
              <div className="flex items-center gap-1.5 text-xs">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-neutral-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-charcoal">{product.rating}</span>
                <span className="text-muted">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl font-extrabold text-charcoal">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-base text-muted line-through font-normal">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="badge-lime text-xs font-bold">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Variants Selector */}
            {product.variants && product.variants.map((variant) => (
              <div key={variant.id} className="pt-3 border-t border-borderNeutral/70 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-charcoal">{variant.name}:</span>
                  <span className="font-medium text-muted">{selectedVariants[variant.name]}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((opt) => {
                    const isSelected = selectedVariants[variant.name] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() =>
                          setSelectedVariants((prev) => ({ ...prev, [variant.name]: opt }))
                        }
                        className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                          isSelected
                            ? "bg-charcoal text-white border-charcoal shadow-2xs"
                            : "bg-white border-borderNeutral text-charcoal hover:bg-ivory-200"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity Selector & Stock Info */}
            <div className="pt-3 border-t border-borderNeutral/70 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-charcoal">Quantity:</span>
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  {product.inStock ? `In Stock (${product.stockCount} remaining)` : "Out of Stock"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-borderNeutral rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-charcoal hover:bg-ivory-200 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-xs text-charcoal select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount || 10, q + 1))}
                    className="p-2 text-charcoal hover:bg-ivory-200 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="text-xs text-muted">
                  Max 5 per client order
                </span>
              </div>
            </div>

            {/* Delivery Estimate Box */}
            <div className="p-3.5 rounded-lg bg-ivory-200 border border-borderNeutral/80 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-charcoal font-semibold">
                <Clock className="w-4 h-4 text-charcoal" />
                <span>Dispatch Guarantee</span>
              </div>
              <p className="text-muted leading-relaxed text-[11px]">
                Order within 3 hrs 24 mins to receive by <strong className="text-charcoal font-semibold">Tuesday, Nov 24</strong> via Expedited Carbon-Neutral Courier.
              </p>
            </div>

            {/* Main Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(product, quantity, selectedVariants)}
                  className="flex-1 btn-primary py-3.5 text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-lime" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 btn-accent py-3.5 text-xs flex items-center justify-center gap-2"
                >
                  <span>Buy Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Auxiliary Controls (Wishlist, Compare, Share) */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    isWishlisted 
                      ? "bg-rose-50 border-rose-200 text-rose-600" 
                      : "bg-white border-borderNeutral text-charcoal hover:bg-ivory-200"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-rose-600" : ""}`} />
                  <span>{isWishlisted ? "Saved" : "Wishlist"}</span>
                </button>

                <button
                  onClick={() => toggleCompare(product)}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    isCompared 
                      ? "bg-charcoal text-lime border-charcoal" 
                      : "bg-white border-borderNeutral text-charcoal hover:bg-ivory-200"
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{isCompared ? "In Matrix" : "Compare"}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="py-2 px-3 rounded-lg border border-borderNeutral bg-white text-charcoal hover:bg-ivory-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Reassurance strip */}
            <div className="pt-4 border-t border-borderNeutral grid grid-cols-3 gap-2 text-[11px] text-muted text-center">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-charcoal mb-1" />
                <span>Free Freight</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-charcoal mb-1" />
                <span>30-Day Trial</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-charcoal mb-1" />
                <span>Authentic</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 3. Deep Dive: Description & Technical Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10 border-t border-borderNeutral">
        
        {/* Editorial Story & Narrative */}
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            Product Narrative & Craftsmanship
          </span>
          <h2 className="text-2xl font-extrabold text-charcoal tracking-tight">
            Designed for performance, pared to the essentials.
          </h2>
          <p className="text-sm text-neutral-700 leading-relaxed">
            {product.description}
          </p>
          <div className="p-4 rounded-brand-lg bg-ivory-100 border border-borderNeutral space-y-2 mt-4">
            <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-charcoal" />
              <span>Nexora Verification Seal</span>
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Every unit dispatched undergoes multi-point optical and mechanical tolerances testing at our central facility. Includes individual serial certificate and 2-year international warranty.
            </p>
          </div>
        </div>

        {/* Technical Specs Table */}
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            Technical Specifications
          </span>
          <h2 className="text-2xl font-extrabold text-charcoal tracking-tight">
            Engineering Parameters
          </h2>

          <div className="bg-white rounded-brand-lg border border-borderNeutral overflow-hidden">
            <table className="w-full text-xs text-left">
              <tbody>
                {Object.entries(product.specs).map(([key, val], idx) => (
                  <tr
                    key={key}
                    className={`border-b border-borderNeutral/60 last:border-b-0 ${
                      idx % 2 === 0 ? "bg-white" : "bg-ivory-50"
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-muted w-1/3">
                      {key}
                    </td>
                    <td className="py-3 px-4 font-bold text-charcoal">
                      {val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* 4. Customer Reviews Section */}
      <div className="pt-10 border-t border-borderNeutral space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted block mb-1">
              Verified Client Feedback
            </span>
            <h2 className="text-2xl font-extrabold text-charcoal tracking-tight">
              Customer Reviews ({product.reviewCount})
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-2xl font-black text-charcoal">{product.rating}</span>
              <span className="text-xs text-muted"> / 5.0</span>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-neutral-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsData.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-brand-lg bg-white border border-borderNeutral shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-neutral-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-muted">{rev.date}</span>
                </div>
                <h4 className="text-xs font-bold text-charcoal mb-1">{rev.title}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>
              </div>

              <div className="pt-3 border-t border-borderNeutral/60 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-charcoal">{rev.userName}</span>
                {rev.verified && (
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-borderNeutral space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                Complementary Curations
              </span>
              <h2 className="text-2xl font-extrabold text-charcoal tracking-tight">
                Related Designs You May Like
              </h2>
            </div>
            <Link
              href={`/categories/${product.categorySlug}`}
              className="text-xs font-bold text-charcoal hover:underline"
            >
              More in {product.category} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
