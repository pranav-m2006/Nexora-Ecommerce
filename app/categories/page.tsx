"use client";

import React from "react";
import Link from "next/link";
import { categories } from "@/lib/data/mock-categories";
import { ChevronRight, ArrowRight } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-muted mb-6">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <span className="text-charcoal font-semibold">Departments</span>
      </nav>

      {/* Header */}
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
          Explore Curated Departments
        </h1>
        <p className="text-sm text-muted mt-2 leading-relaxed">
          From spatial audio engineering to architectural furniture, explore our six primary design domains curated for discerning modern living.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="group rounded-brand-xl bg-white border border-borderNeutral overflow-hidden hover:border-charcoal hover:shadow-card transition-all duration-300 flex flex-col"
          >
            {/* Visual */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-ivory-200">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute top-3 right-3 badge-dark text-[10px]">
                {cat.itemCount} Designs
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-charcoal group-hover:text-black transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted mt-2 leading-relaxed">
                  {cat.description}
                </p>

                {/* Subcategories preview */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cat.subcategories.slice(0, 4).map((sub, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-ivory-100 text-charcoal font-medium px-2 py-0.5 rounded border border-borderNeutral/60"
                    >
                      {sub}
                    </span>
                  ))}
                  {cat.subcategories.length > 4 && (
                    <span className="text-[10px] text-muted font-medium px-1.5 py-0.5">
                      +{cat.subcategories.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-borderNeutral flex items-center justify-between">
                <Link
                  href={`/categories/${cat.slug}`}
                  className="text-xs font-bold text-charcoal hover:text-black flex items-center gap-1.5 group-hover:underline"
                >
                  <span>Enter Department</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
