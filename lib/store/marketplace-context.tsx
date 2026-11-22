"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, CartItem, CustomerUser, Address } from "../types";
import { mockProducts } from "../data/mock-products";

interface MarketplaceContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: Record<string, string>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartTotal: number;
  cartSavings: number;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistProducts: Product[];
  
  compareList: Product[];
  toggleCompare: (product: Product) => boolean;
  isInCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  
  user: CustomerUser | null;
  isMounted: boolean;
  login: (email: string, userName?: string) => void;
  loginDemo: () => void;
  logout: () => void;
  updateAddress: (address: Address) => void;
  
  isAssistantOpen: boolean;
  setAssistantOpen: (open: boolean) => void;
  
  toast: { message: string; type?: 'info' | 'success' | 'warn' } | null;
  showToast: (message: string, type?: 'info' | 'success' | 'warn') => void;
}

export const defaultDemoUser: CustomerUser = {
  id: "usr-901",
  name: "Alex Rivera",
  email: "alex.rivera@example.com",
  phone: "+1 (555) 392-8172",
  joinedDate: "January 2025",
  totalOrders: 6,
  addresses: [
    {
      id: "addr-1",
      type: "Home",
      isDefault: true,
      fullName: "Alex Rivera",
      street: "742 Evergreen Terrace",
      apartment: "Apt 4B",
      city: "San Francisco",
      state: "CA",
      zipCode: "94107",
      phone: "+1 (555) 392-8172",
    },
    {
      id: "addr-2",
      type: "Work",
      isDefault: false,
      fullName: "Alex Rivera",
      street: "500 Howard Street",
      apartment: "Suite 1200",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      phone: "+1 (555) 392-8172",
    }
  ]
};

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Titanium Phone",
    "AirPulse Earbuds",
    "MagPower Bank",
    "Damascus Knives",
    "Trench Coat"
  ]);
  
  // Public visitor state by default (user is null before sign in)
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [isAssistantOpen, setAssistantOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: 'info' | 'success' | 'warn' } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Restore stored session, cart & wishlist from localStorage on client load and verify with backend session
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem("nexora_user");
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
          } catch {}

          const savedCart = localStorage.getItem("nexora_cart");
          if (savedCart) {
            try {
              setCart(JSON.parse(savedCart));
            } catch {}
          }

          const savedWishlist = localStorage.getItem("nexora_wishlist");
          if (savedWishlist) {
            try {
              setWishlist(JSON.parse(savedWishlist));
            } catch {}
          }
        }

        // Verify active server-side session cookie in background
        fetch("/api/auth/session")
          .then((res) => res.json())
          .then((data) => {
            if (data.authenticated && data.user) {
              setUser((prev) => ({
                ...(prev || defaultDemoUser),
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
              }));
            }
          })
          .catch(() => {});
      }
    } catch (err) {
      console.error("Failed to restore session from localStorage", err);
    } finally {
      setIsMounted(true);
    }
  }, []);

  // Sync state changes to localStorage ONLY after initial mount has completed
  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;
    localStorage.setItem("nexora_cart", JSON.stringify(cart));
  }, [cart, isMounted]);

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;
    localStorage.setItem("nexora_wishlist", JSON.stringify(wishlist));
  }, [wishlist, isMounted]);

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;
    if (user) {
      localStorage.setItem("nexora_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("nexora_user");
    }
  }, [user, isMounted]);

  const showToast = (message: string, type: 'info' | 'success' | 'warn' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Published SKU "${newProduct.name}" to live catalog`);
  };

  const addToCart = (product: Product, quantity = 1, variant?: Record<string, string>) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedVariant: variant }];
    });
    showToast(`Added "${product.name}" to cart`);

    // Async sync with backend
    fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        quantity,
        selectedVariant: variant,
      }),
    }).catch(() => {});
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Item removed from cart", "info");

    fetch(`/api/cart?productId=${encodeURIComponent(productId)}`, {
      method: "DELETE",
    }).catch(() => {});
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );

    fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    }).catch(() => {});
  };

  const clearCart = () => {
    setCart([]);
    fetch("/api/cart", { method: "DELETE" }).catch(() => {});
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from wishlist", "info");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Saved to wishlist", "success");
        return [...prev, productId];
      }
    });

    fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    }).catch(() => {});
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const toggleCompare = (product: Product): boolean => {
    const exists = compareList.some((p) => p.id === product.id);
    if (exists) {
      setCompareList((prev) => prev.filter((p) => p.id !== product.id));
      showToast("Removed from comparison", "info");
      return false;
    } else {
      if (compareList.length >= 4) {
        showToast("Maximum 4 products can be compared simultaneously", "warn");
        return false;
      }
      setCompareList((prev) => [...prev, product]);
      showToast(`Added "${product.name}" to comparison matrix`);
      return true;
    }
  };

  const isInCompare = (productId: string) => compareList.some((p) => p.id === productId);

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const addRecentSearch = (query: string) => {
    const clean = query.trim();
    if (!clean) return;
    setRecentSearches((prev) => [clean, ...prev.filter((q) => q.toLowerCase() !== clean.toLowerCase())].slice(0, 8));
  };

  const login = (email: string, userName?: string) => {
    const derivedName = userName?.trim() || email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Alex Rivera";
    const freshUser: CustomerUser = {
      ...defaultDemoUser,
      email,
      name: derivedName,
    };
    setUser(freshUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("nexora_user", JSON.stringify(freshUser));
    }

    // Load user's saved bag and wishlist
    if (cart.length === 0) {
      const demoCart = [
        {
          product: mockProducts[0],
          selectedVariant: { "Storage": "256GB Unified" },
          quantity: 1,
        }
      ];
      setCart(demoCart);
      if (typeof window !== "undefined") {
        localStorage.setItem("nexora_cart", JSON.stringify(demoCart));
      }
    }
    if (wishlist.length === 0) {
      const demoWish = ["nx-prod-mob-1", "nx-prod-aud-1"];
      setWishlist(demoWish);
      if (typeof window !== "undefined") {
        localStorage.setItem("nexora_wishlist", JSON.stringify(demoWish));
      }
    }

    showToast(`Welcome back, ${freshUser.name}`, "success");
  };

  const loginDemo = () => {
    setUser(defaultDemoUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("nexora_user", JSON.stringify(defaultDemoUser));
    }
    
    // Load demo user bag and wishlist
    const demoCart = [
      {
        product: mockProducts[0],
        selectedVariant: { "Storage": "256GB Unified" },
        quantity: 1,
      }
    ];
    setCart(demoCart);
    const demoWish = ["nx-prod-mob-1", "nx-prod-aud-1"];
    setWishlist(demoWish);

    if (typeof window !== "undefined") {
      localStorage.setItem("nexora_cart", JSON.stringify(demoCart));
      localStorage.setItem("nexora_wishlist", JSON.stringify(demoWish));
    }

    showToast("Signed in as Alex Rivera (VIP Member)", "success");
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
    setCompareList([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("nexora_user");
      localStorage.removeItem("nexora_cart");
      localStorage.removeItem("nexora_wishlist");
    }
    fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    showToast("Signed out. Bag and wishlist details hidden.", "info");
  };

  const updateAddress = (address: Address) => {
    if (!user) return;
    const existing = user.addresses.some((a) => a.id === address.id);
    let nextAddresses: Address[];
    if (existing) {
      nextAddresses = user.addresses.map((a) => (a.id === address.id ? address : a));
    } else {
      nextAddresses = [...user.addresses, address];
    }
    setUser({ ...user, addresses: nextAddresses });
    showToast("Address saved");
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const originalSubtotal = cart.reduce((total, item) => total + (item.product.originalPrice || item.product.price) * item.quantity, 0);
  const cartSavings = Math.max(0, originalSubtotal - cartSubtotal);
  const cartTotal = cartSubtotal > 0 ? (cartSubtotal > 150 ? cartSubtotal : cartSubtotal + 15) : 0;

  return (
    <MarketplaceContext.Provider
      value={{
        products,
        addProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartTotal,
        cartSavings,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistProducts,
        compareList,
        toggleCompare,
        isInCompare,
        removeFromCompare,
        clearCompare,
        searchQuery,
        setSearchQuery,
        recentSearches,
        addRecentSearch,
        user,
        isMounted,
        login,
        loginDemo,
        logout,
        updateAddress,
        isAssistantOpen,
        setAssistantOpen,
        toast,
        showToast,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
}
