"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/data/mock-categories";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { Product } from "@/lib/types";
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  CheckCircle2, 
  Plus, 
  X,
  Sparkles
} from "lucide-react";

export default function AdminNewProductPage() {
  const router = useRouter();
  const { addProduct } = useMarketplace();
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState("");
  const [sku, setSku] = useState("NX-PROD-2026-");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("electronics");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("25");
  const [badge, setBadge] = useState("New Release");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !brand) {
      alert("Please enter product name, brand, and retail price.");
      return;
    }

    const priceNum = parseFloat(price);
    const origPriceNum = originalPrice ? parseFloat(originalPrice) : priceNum;
    const catObj = categories.find((c) => c.slug === category);

    const newProd: Product = {
      id: `nx-custom-${Date.now()}`,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name,
      brand,
      category: catObj ? catObj.name : "Electronics",
      categorySlug: category,
      subcategory: catObj?.subcategories[0] || "General",
      price: priceNum,
      originalPrice: origPriceNum,
      discountPercent: origPriceNum > priceNum ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100) : 0,
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      stockCount: parseInt(stock, 10) || 20,
      badge: badge || undefined,
      thumbnail: imageUrl,
      images: [imageUrl],
      shortDescription: shortDescription || `${name} by ${brand}`,
      description: description || `${name} engineered with precision architectural craftsmanship.`,
      specs: {
        "SKU Identifier": sku,
        "Department": catObj ? catObj.name : "Electronics",
        "Manufacture Verification": "Verified by Nexora Master Sourcing"
      },
      tags: [name.toLowerCase(), brand.toLowerCase(), category]
    };

    addProduct(newProd);
    setSaved(true);
    setTimeout(() => {
      router.push("/products");
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-borderNeutral">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-1.5 rounded-lg border border-borderNeutral bg-white text-muted hover:text-charcoal"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-charcoal tracking-tight">
              Register New Design Product
            </h1>
            <p className="text-xs text-muted">
              Add a verified SKU to the customer catalog with specs and high-res imagery.
            </p>
          </div>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-brand text-xs text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Product SKU successfully minted and indexed in marketplace database!</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Core Attributes Card */}
        <div className="bg-white p-6 rounded-brand-xl border border-borderNeutral shadow-2xs space-y-4 text-xs">
          <h2 className="text-sm font-bold text-charcoal pb-3 border-b border-borderNeutral">
            1. Core Nomenclature & Department
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-charcoal">Product Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Nexora Spatial Monitor Studio"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2.5 outline-none focus:border-charcoal text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-charcoal">Design House / Brand *</label>
              <input
                type="text"
                required
                placeholder="e.g. Nexora Audio"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2.5 outline-none focus:border-charcoal text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-charcoal">Stock Keeping Unit (SKU) *</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2.5 outline-none font-mono text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-charcoal">Department Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2.5 outline-none font-semibold cursor-pointer text-xs"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-charcoal">Editorial Badge</label>
              <input
                type="text"
                placeholder="Staff Pick, Limited Edition..."
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2.5 outline-none text-xs"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="bg-white p-6 rounded-brand-xl border border-borderNeutral shadow-2xs space-y-4 text-xs">
          <h2 className="text-sm font-bold text-charcoal pb-3 border-b border-borderNeutral">
            2. Commercial Pricing & Allocation
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-charcoal">Retail Price ($ USD) *</label>
              <input
                type="number"
                required
                placeholder="299.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2.5 outline-none font-bold text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-charcoal">Original / Reference Price ($ USD)</label>
              <input
                type="number"
                placeholder="349.00"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2.5 outline-none text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-charcoal">Warehouse Units In-Stock *</label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2.5 outline-none font-semibold text-xs"
              />
            </div>
          </div>
        </div>

        {/* Photography & Narratives */}
        <div className="bg-white p-6 rounded-brand-xl border border-borderNeutral shadow-2xs space-y-4 text-xs">
          <h2 className="text-sm font-bold text-charcoal pb-3 border-b border-borderNeutral">
            3. Editorial Media & Specifications
          </h2>

          <div className="space-y-1">
            <label className="font-semibold text-charcoal">Primary Image CDN URL</label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2.5 outline-none font-mono text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-charcoal">Short Tagline Summary</label>
            <input
              type="text"
              placeholder="One-line summary for product card listings"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2.5 outline-none text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-charcoal">Detailed Architectural Description</label>
            <textarea
              rows={4}
              placeholder="Describe materials, engineering tolerances, ergonomics..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2.5 outline-none text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/admin/products"
            className="btn-secondary py-2.5 px-4 text-xs"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="btn-primary py-2.5 px-6 text-xs flex items-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4 text-lime" />
            <span>Publish SKU to Catalog</span>
          </button>
        </div>

      </form>

    </div>
  );
}
