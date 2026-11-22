"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { categories } from "@/lib/data/mock-categories";
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  SlidersHorizontal,
  ChevronDown, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Package,
  LogOut
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function Navbar() {
  const router = useRouter();
  const { 
    products,
    cartCount, 
    wishlist, 
    compareList, 
    searchQuery, 
    setSearchQuery, 
    addRecentSearch, 
    recentSearches, 
    user,
    loginDemo,
    logout,
    setAssistantOpen 
  } = useMarketplace();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeCategoryDropdown, setActiveCategoryDropdown] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close search & user dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    addRecentSearch(searchQuery.trim());
    setSearchFocused(false);
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  // Live matching products for autocomplete
  const filteredSuggestions = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : [];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-borderNeutral">
      
      {/* 1. Announcement Bar */}
      <div className="bg-charcoal text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="font-medium tracking-wide">
              Winter Curation 2026: Complimentary priority carbon-neutral delivery on orders over $150
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-neutral-300 text-[11px]">
            <Link href="/track-order" className="hover:text-white transition-colors flex items-center gap-1">
              <Package className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </Link>
            <Link href="/admin" className="text-lime hover:underline font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-charcoal hover:bg-ivory-200 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-charcoal text-lime flex items-center justify-center font-bold text-lg tracking-tighter shadow-sm group-hover:bg-charcoal-50 transition-colors">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-tight text-charcoal leading-none">
                  NEXORA
                </span>
                <span className="text-[9px] uppercase tracking-widest text-muted font-semibold mt-0.5">
                  The Future of Shopping
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 relative" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-muted absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search products, brands, materials, or aesthetics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full bg-ivory-100 border border-borderNeutral hover:border-muted/40 focus:border-charcoal focus:bg-white text-sm text-charcoal placeholder-muted rounded-lg pl-10 pr-24 py-2.5 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setAssistantOpen(true)}
                  className="absolute right-2 px-2.5 py-1 text-xs font-semibold bg-white border border-borderNeutral rounded text-charcoal hover:bg-lime hover:border-lime transition-all flex items-center gap-1 shadow-2xs"
                  title="Ask AI Assistant"
                >
                  <Sparkles className="w-3 h-3 text-charcoal" />
                  <span>Ask AI</span>
                </button>
              </div>
            </form>

            {/* Search Suggestions Dropdown */}
            {searchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-brand-lg shadow-dropdown border border-borderNeutral p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {searchQuery.trim() ? (
                  <div>
                    <div className="text-xs font-semibold uppercase text-muted tracking-wider mb-2">
                      Matching Products
                    </div>
                    {filteredSuggestions.length > 0 ? (
                      <div className="space-y-2">
                        {filteredSuggestions.map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => {
                              setSearchFocused(false);
                              router.push(`/products/${prod.slug}`);
                            }}
                            className="flex items-center gap-3 p-2 hover:bg-ivory-100 rounded-lg cursor-pointer transition-colors"
                          >
                            <img
                              src={prod.thumbnail}
                              alt={prod.name}
                              className="w-11 h-11 object-cover rounded-md bg-ivory-200"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-charcoal truncate">{prod.name}</p>
                              <p className="text-[11px] text-muted">{prod.brand} · {prod.subcategory}</p>
                            </div>
                            <span className="text-xs font-bold text-charcoal">{formatPrice(prod.price)}</span>
                          </div>
                        ))}
                        <button
                          onClick={() => handleSearchSubmit()}
                          className="w-full pt-2 text-center text-xs font-bold text-charcoal hover:text-black flex items-center justify-center gap-1 border-t border-borderNeutral mt-2"
                        >
                          View all results for &quot;{searchQuery}&quot; <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="py-4 text-center text-sm text-muted">
                        No direct match found for &quot;{searchQuery}&quot;. Press enter to search all items.
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="text-xs font-semibold uppercase text-muted tracking-wider mb-2">
                      Recent &amp; Trending Searches
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSearchQuery(term);
                            router.push(`/search?q=${encodeURIComponent(term)}`);
                            setSearchFocused(false);
                          }}
                          className="text-xs px-3 py-1.5 rounded-full bg-ivory-200 hover:bg-ivory-300 text-charcoal transition-colors font-medium"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            
            {/* Compare */}
            <Link
              href="/compare"
              className="relative p-2.5 text-charcoal hover:bg-ivory-200 rounded-lg transition-colors flex items-center"
              aria-label="Compare products"
              title="Compare Products"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-charcoal text-white text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2.5 text-charcoal hover:bg-ivory-200 rounded-lg transition-colors"
              aria-label="Wishlist"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-charcoal text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2.5 text-charcoal hover:bg-ivory-200 rounded-lg transition-colors flex items-center gap-2"
              aria-label="Shopping Cart"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-lime text-charcoal font-extrabold text-[10px] flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline text-xs font-bold text-charcoal">
                Cart
              </span>
            </Link>

            {/* Account & Sign In */}
            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="p-1.5 sm:px-3 sm:py-2 rounded-lg bg-ivory-200 hover:bg-ivory-300 text-charcoal transition-colors flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-charcoal text-lime font-bold flex items-center justify-center text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-xs font-bold">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-borderNeutral shadow-dropdown rounded-brand-lg p-2 z-50 space-y-1">
                    <div className="px-3 py-2 border-b border-borderNeutral text-xs">
                      <p className="font-bold text-charcoal">{user.name}</p>
                      <p className="text-[10px] text-muted truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-3 py-2 text-xs text-charcoal hover:bg-ivory-200 rounded font-medium"
                    >
                      Account Dashboard
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-3 py-2 text-xs text-charcoal hover:bg-ivory-200 rounded font-medium"
                    >
                      Order History
                    </Link>
                    <Link
                      href="/account/addresses"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-3 py-2 text-xs text-charcoal hover:bg-ivory-200 rounded font-medium"
                    >
                      Shipping Addresses
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded font-semibold flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative" ref={userDropdownRef}>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="p-2 sm:px-3 sm:py-2 text-charcoal hover:bg-ivory-200 rounded-lg transition-colors flex items-center gap-1.5 font-bold text-xs"
                    aria-label="Sign In"
                    title="Sign In to NEXORA"
                  >
                    <User className="w-4 h-4 text-charcoal" />
                    <span>Sign In</span>
                    <ChevronDown className="w-3 h-3 text-muted" />
                  </button>

                  <Link
                    href="/register"
                    className="hidden md:inline-flex px-3 py-2 rounded-lg bg-charcoal text-white hover:bg-black text-xs font-bold transition-colors shadow-2xs"
                  >
                    Sign Up
                  </Link>
                </div>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-borderNeutral shadow-dropdown rounded-brand-lg p-3 z-50 space-y-2.5 animate-in fade-in duration-150">
                    <div className="text-center pb-2 border-b border-borderNeutral">
                      <Link
                        href="/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full btn-primary py-2 text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <span>Sign In</span>
                        <ArrowRight className="w-3.5 h-3.5 text-lime" />
                      </Link>
                      <p className="text-[11px] text-muted mt-2">
                        New customer?{" "}
                        <Link
                          href="/register"
                          onClick={() => setUserDropdownOpen(false)}
                          className="text-charcoal font-bold underline hover:text-black"
                        >
                          Start here.
                        </Link>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        loginDemo();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full p-2.5 rounded-lg bg-ivory-100 hover:bg-lime/30 border border-borderNeutral text-charcoal text-[11px] font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-charcoal" />
                      <span>1-Click VIP Demo Login</span>
                    </button>

                    <div className="pt-1 text-[11px] space-y-1 text-neutral-600">
                      <Link
                        href="/account"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-2 py-1.5 hover:bg-ivory-200 rounded text-charcoal font-medium"
                      >
                        Account Space
                      </Link>
                      <Link
                        href="/track-order"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-2 py-1.5 hover:bg-ivory-200 rounded text-charcoal font-medium"
                      >
                        Track Orders
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* 3. Category Sub-Navigation Bar (Desktop) */}
        <div className="hidden lg:flex items-center justify-between border-t border-borderNeutral py-2.5 text-xs font-medium text-charcoal">
          <div className="flex items-center space-x-7">
            <Link 
              href="/products" 
              className="font-bold hover:text-black py-1 transition-colors flex items-center gap-1 text-charcoal"
            >
              All Products
            </Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setActiveCategoryDropdown(true)}
              onMouseLeave={() => setActiveCategoryDropdown(false)}
            >
              <Link 
                href="/categories" 
                className="hover:text-black py-1 transition-colors flex items-center gap-1 font-semibold"
              >
                Categories
                <ChevronDown className="w-3.5 h-3.5 text-muted" />
              </Link>

              {activeCategoryDropdown && (
                <div className="absolute top-full left-0 w-64 bg-white border border-borderNeutral shadow-dropdown rounded-brand-lg p-2 z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      className="flex items-center justify-between px-3 py-2 text-xs rounded hover:bg-ivory-200 text-charcoal transition-colors"
                    >
                      <span className="font-medium">{cat.name}</span>
                      <span className="text-[10px] text-muted">{cat.itemCount} items</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="text-neutral-700 hover:text-charcoal py-1 transition-colors font-medium"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-5 text-muted">
            <Link href="/products?sort=newest" className="hover:text-charcoal transition-colors">
              New Arrivals
            </Link>
            <Link href="/products?featured=true" className="hover:text-charcoal transition-colors">
              Best Sellers
            </Link>
            <span className="text-borderNeutral">|</span>
            <button
              onClick={() => setAssistantOpen(true)}
              className="inline-flex items-center gap-1.5 font-semibold text-charcoal bg-lime/40 hover:bg-lime px-2.5 py-1 rounded transition-colors text-[11px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-charcoal" />
              <span>AI Shopping Concierge</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar below header */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-muted absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search marketplace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-ivory-100 border border-borderNeutral text-xs text-charcoal placeholder-muted rounded-lg pl-9 pr-10 py-2.5 outline-none focus:bg-white focus:border-charcoal"
            />
            <button
              type="submit"
              className="absolute right-2 top-1.5 px-2 py-1 text-[11px] font-bold bg-charcoal text-white rounded"
            >
              Go
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/40 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-borderNeutral flex items-center justify-between">
              <span className="font-extrabold text-lg text-charcoal">NEXORA</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-charcoal hover:bg-ivory-200 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 space-y-6">
              <div>
                <p className="text-[11px] font-bold uppercase text-muted tracking-wider mb-2">Shop Categories</p>
                <div className="space-y-1">
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-semibold rounded-lg text-charcoal hover:bg-ivory-200"
                  >
                    All Products
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-sm rounded-lg text-charcoal hover:bg-ivory-200"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-muted">{cat.itemCount}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-borderNeutral pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-bold uppercase text-muted tracking-wider">Customer Space</p>
                  {user && (
                    <span className="text-[10px] font-bold text-lime-dark bg-lime/20 px-2 py-0.5 rounded-full">
                      Signed In
                    </span>
                  )}
                </div>

                {!user ? (
                  <div className="space-y-2 mb-3 bg-ivory-100 p-3 rounded-xl border border-borderNeutral">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4 text-lime" />
                      <span>Sign In to Account</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        loginDemo();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2 bg-white hover:bg-lime/20 border border-borderNeutral text-charcoal text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-charcoal" />
                      <span>1-Click VIP Demo Login</span>
                    </button>
                    <div className="text-center pt-1">
                      <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-[11px] text-muted hover:text-charcoal underline"
                      >
                        Don&apos;t have an account? Register here
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="mb-3 p-3 bg-ivory-100 rounded-xl border border-borderNeutral flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-charcoal">{user.name}</p>
                      <p className="text-[10px] text-muted truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-xs text-rose-600 font-bold hover:underline"
                    >
                      Sign Out
                    </button>
                  </div>
                )}

                <div className="space-y-1">
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm rounded-lg text-charcoal hover:bg-ivory-200"
                  >
                    My Account &amp; Orders
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm rounded-lg text-charcoal hover:bg-ivory-200"
                  >
                    Saved Wishlist ({wishlist.length})
                  </Link>
                  <Link
                    href="/compare"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm rounded-lg text-charcoal hover:bg-ivory-200"
                  >
                    Product Comparison ({compareList.length})
                  </Link>
                  <Link
                    href="/track-order"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm rounded-lg text-charcoal hover:bg-ivory-200"
                  >
                    Track Package
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAssistantOpen(true);
                    }}
                    className="w-full text-left px-3 py-2 text-sm rounded-lg text-charcoal hover:bg-lime/20 flex items-center gap-2 font-semibold"
                  >
                    <Sparkles className="w-4 h-4 text-charcoal" />
                    <span>AI Shopping Concierge</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-borderNeutral pt-4">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-semibold bg-charcoal text-white rounded-lg"
                >
                  <ShieldCheck className="w-4 h-4 text-lime" />
                  <span>Merchant Admin Console</span>
                </Link>
              </div>
            </div>

            <div className="p-4 bg-ivory-100 border-t border-borderNeutral text-xs text-muted">
              Nexora Marketplace © 2026. The Future of Shopping.
            </div>
          </div>
          
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}
