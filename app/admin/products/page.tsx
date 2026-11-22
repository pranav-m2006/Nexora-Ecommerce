"use client";

import React, { useState } from "react";
import Link from "next/link";
import { adminProductsList } from "@/lib/data/mock-admin";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { formatPrice } from "@/lib/utils";
import { 
  Package, 
  PlusCircle, 
  Search, 
  SlidersHorizontal, 
  Check, 
  AlertTriangle,
  Edit,
  Trash2,
  ExternalLink
} from "lucide-react";

export default function AdminProductsPage() {
  const { products } = useMarketplace();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Merge products with admin metrics
  const combinedList = products.map((p, idx) => ({
    id: p.id,
    sku: p.specs["SKU Identifier"] || `NX-${p.category.slice(0, 3).toUpperCase()}-${idx + 10}`,
    name: p.name,
    category: p.category,
    price: p.price,
    stock: p.stockCount || 20,
    status: (p.stockCount && p.stockCount < 10 ? "Low Stock" : "In Stock") as "In Stock" | "Low Stock",
    salesCount: 40 + (idx * 12),
    image: p.thumbnail,
    slug: p.slug,
  }));

  const filtered = combinedList.filter((p) => {
    const match =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    if (!match) return false;
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-borderNeutral">
        <div>
          <h1 className="text-2xl font-extrabold text-charcoal tracking-tight">
            Catalog Management
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Manage SKUs, stock levels, wholesale pricing, and publication statuses.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="btn-accent py-2 px-4 text-xs flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-brand-lg border border-borderNeutral shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-muted absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Filter by title or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-ivory-50 border border-borderNeutral text-xs text-charcoal rounded-lg pl-9 pr-3 py-2 outline-none focus:border-charcoal"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-muted font-medium">Department:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-ivory-50 border border-borderNeutral rounded-lg px-2.5 py-1.5 text-xs text-charcoal outline-none font-semibold cursor-pointer"
          >
            <option value="all">All Departments</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Living">Home & Living</option>
            <option value="Accessories">Accessories</option>
            <option value="Sports & Performance">Sports & Performance</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-brand-xl border border-borderNeutral shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-ivory-50 border-b border-borderNeutral text-muted uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">Design Piece</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Retail Price</th>
                <th className="py-3 px-4">Inventory Balance</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderNeutral/60">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-ivory-50/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt=""
                        className="w-10 h-10 object-cover rounded bg-ivory-100 border border-borderNeutral shrink-0"
                      />
                      <span className="font-bold text-charcoal truncate max-w-[200px]">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-muted text-[11px]">
                    {product.sku}
                  </td>
                  <td className="py-3 px-4 font-medium text-charcoal">
                    {product.category}
                  </td>
                  <td className="py-3 px-4 font-black text-charcoal">
                    {formatPrice(product.price)}
                  </td>
                  <td className="py-3 px-4 font-semibold text-charcoal">
                    {product.stock} units
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      product.status === "In Stock"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="p-1 text-muted hover:text-charcoal"
                        title="View on Storefront"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => alert(`Edit SKU ${product.sku}`)}
                        className="p-1 text-muted hover:text-charcoal"
                        title="Edit Record"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
