"use client";

import React from "react";
import Link from "next/link";
import { categories } from "@/lib/data/mock-categories";
import { FolderTree, Plus, Edit, ExternalLink } from "lucide-react";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-borderNeutral">
        <div>
          <h1 className="text-2xl font-extrabold text-charcoal tracking-tight">
            Department Categories
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Organize catalog hierarchy, manage subcategories, and set department banner imagery.
          </p>
        </div>

        <button
          onClick={() => alert("Category creation modal.")}
          className="btn-accent py-2 px-4 text-xs flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Department</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-brand-xl border border-borderNeutral overflow-hidden shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/9] w-full bg-ivory-200 overflow-hidden relative">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 badge-dark text-[10px]">
                  {cat.itemCount} SKUs
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-charcoal">{cat.name}</h3>
                  <code className="text-[10px] text-muted font-mono">/{cat.slug}</code>
                </div>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {cat.description}
                </p>

                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted block mb-1.5">
                    Subcategories ({cat.subcategories.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.subcategories.map((sub, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-ivory-100 border border-borderNeutral/70 px-2 py-0.5 rounded text-charcoal"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-ivory-50 border-t border-borderNeutral flex items-center justify-between text-xs">
              <Link
                href={`/categories/${cat.slug}`}
                target="_blank"
                className="font-semibold text-charcoal hover:underline flex items-center gap-1"
              >
                <span>View on Store</span>
                <ExternalLink className="w-3 h-3 text-muted" />
              </Link>

              <button
                onClick={() => alert(`Edit category ${cat.name}`)}
                className="p-1 text-muted hover:text-charcoal"
                title="Edit Category"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
