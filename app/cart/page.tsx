"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { formatPrice } from "@/lib/utils";
import { 
  ShoppingBag, 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  ChevronRight,
  RotateCcw
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    cartTotal, 
    cartSavings,
    user,
    loginDemo,
    isMounted,
    showToast 
  } = useMarketplace();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  if (!isMounted) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-charcoal border-t-lime rounded-full animate-spin" />
      </div>
    );
  }

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "NEXORA10" || promoCode.trim().toUpperCase() === "WELCOME") {
      setPromoApplied(true);
      const discountVal = Math.round(cartSubtotal * 0.1);
      setPromoDiscount(discountVal);
      showToast("Promo code applied: 10% privilege discount");
    } else {
      showToast("Invalid promo code. Try 'NEXORA10'", "warn");
    }
  };

  const deliveryCharge = cartSubtotal > 150 ? 0 : 15;
  const finalPayable = Math.max(0, cartSubtotal + deliveryCharge - promoDiscount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-muted">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <span className="text-charcoal font-semibold">Shopping Cart</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-borderNeutral gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-muted mt-1">
            Review your selected designs, configure quantities, and proceed to secure checkout.
          </p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Empty Cart</span>
          </button>
        )}
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-brand-xl border border-borderNeutral overflow-hidden divide-y divide-borderNeutral/70 shadow-2xs">
              {cart.map((item) => (
                <div key={item.product.id} className="p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  
                  {/* Thumbnail */}
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="w-24 h-24 rounded-lg bg-ivory-100 border border-borderNeutral overflow-hidden shrink-0"
                  >
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
                      }}
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                      {item.product.brand}
                    </span>
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-sm font-bold text-charcoal hover:underline block truncate"
                    >
                      {item.product.name}
                    </Link>

                    {item.selectedVariant && (
                      <p className="text-xs text-muted">
                        {Object.entries(item.selectedVariant).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                      </p>
                    )}

                    <div className="pt-1 flex items-baseline gap-2">
                      <span className="text-sm font-extrabold text-charcoal">
                        {formatPrice(item.product.price)}
                      </span>
                      {item.product.originalPrice > item.product.price && (
                        <span className="text-xs text-muted line-through">
                          {formatPrice(item.product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                    <div className="flex items-center border border-borderNeutral rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-charcoal hover:bg-ivory-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-bold text-xs text-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 text-charcoal hover:bg-ivory-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-extrabold text-charcoal">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-muted hover:text-rose-600 transition-colors p-1"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Shopping Assurance Note */}
            <div className="p-4 rounded-lg bg-ivory-100 border border-borderNeutral text-xs text-muted flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-charcoal" />
                <span>
                  {cartSubtotal > 150
                    ? "You have qualified for complimentary expedited carbon-neutral delivery!"
                    : `Add ${formatPrice(150 - cartSubtotal)} more to unlock complimentary delivery.`}
                </span>
              </div>
              <Link href="/products" className="text-charcoal font-bold hover:underline shrink-0 text-xs">
                Continue Shopping →
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-brand-xl border border-borderNeutral p-6 shadow-2xs space-y-6">
              <h2 className="text-base font-bold text-charcoal pb-3 border-b border-borderNeutral">
                Order Summary
              </h2>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="text-xs font-semibold text-charcoal flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Promo / Privilege Token</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. NEXORA10"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-ivory-50 border border-borderNeutral rounded-lg px-3 py-2 text-xs uppercase text-charcoal outline-none focus:border-charcoal"
                  />
                  <button
                    type="submit"
                    className="btn-secondary px-3 py-2 text-xs font-semibold"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[11px] text-emerald-700 font-medium">
                    ✓ Privilege discount active (-10%)
                  </p>
                )}
              </form>

              {/* Breakdown */}
              <div className="space-y-3 text-xs border-t border-borderNeutral pt-4">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal">{formatPrice(cartSubtotal)}</span>
                </div>

                {cartSavings > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Catalog Savings</span>
                    <span>-{formatPrice(cartSavings)}</span>
                  </div>
                )}

                {promoApplied && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Promo Discount (NEXORA10)</span>
                    <span>-{formatPrice(promoDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-muted">
                  <span>Estimated Freight</span>
                  <span className="font-semibold text-charcoal">
                    {deliveryCharge === 0 ? "Complimentary" : formatPrice(deliveryCharge)}
                  </span>
                </div>

                <div className="pt-3 border-t border-borderNeutral flex justify-between items-baseline">
                  <span className="text-sm font-bold text-charcoal">Estimated Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-charcoal">
                      {formatPrice(finalPayable)}
                    </span>
                    <span className="block text-[10px] text-muted">Taxes calculated at checkout</span>
                  </div>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => router.push("/checkout")}
                className="w-full btn-accent py-3.5 text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-muted">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Encrypted 256-bit Bank-Grade Checkout</span>
              </div>
            </div>
          </div>

        </div>
      ) : !user ? (
        /* Signed Out Empty State */
        <div className="bg-white rounded-brand-xl border border-borderNeutral p-12 text-center max-w-md mx-auto space-y-4 shadow-card">
          <div className="w-14 h-14 rounded-full bg-ivory-200 text-charcoal flex items-center justify-center mx-auto">
            <ShoppingBag className="w-7 h-7 text-muted" />
          </div>
          <h2 className="text-xl font-bold text-charcoal">
            Your Bag is Empty &amp; Signed Out
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            You are currently signed out of NEXORA. Sign in to access your saved bag, or start exploring our flagship collections.
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
            <Link href="/products" className="text-xs text-charcoal underline pt-1 font-semibold">
              Explore All Products →
            </Link>
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="bg-white rounded-brand-xl border border-borderNeutral p-16 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-ivory-200 text-charcoal flex items-center justify-center mx-auto">
            <ShoppingBag className="w-7 h-7 text-muted" />
          </div>
          <h2 className="text-lg font-bold text-charcoal">
            Your shopping bag is empty
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            Discover our curated departments including precision audio, architectural outerwear, and minimal Scandinavian design objects.
          </p>
          <div className="pt-4">
            <Link href="/products" className="btn-primary text-xs">
              Start Shopping
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
