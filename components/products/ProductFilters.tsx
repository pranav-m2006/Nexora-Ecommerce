"use client";

import React from "react";
import { FilterState } from "@/lib/types";
import { Star, RotateCcw, Check } from "lucide-react";

interface ProductFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableBrands: string[];
  maxPriceLimit: number;
  onClearFilters: () => void;
}

export default function ProductFilters({
  filters,
  setFilters,
  availableBrands,
  maxPriceLimit,
  onClearFilters,
}: ProductFiltersProps) {

  const toggleBrand = (brand: string) => {
    setFilters((prev) => {
      const exists = prev.brands.includes(brand);
      const brands = exists
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands };
    });
  };

  const handlePriceChange = (value: number) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [prev.priceRange[0], value],
    }));
  };

  const isFiltered = 
    filters.brands.length > 0 ||
    filters.priceRange[1] < maxPriceLimit ||
    filters.minRating > 0 ||
    filters.inStockOnly;

  return (
    <div className="space-y-6">
      
      {/* Header with Clear Button */}
      <div className="flex items-center justify-between pb-3 border-b border-borderNeutral">
        <span className="text-xs font-bold uppercase tracking-wider text-charcoal">
          Filters
        </span>
        {isFiltered && (
          <button
            onClick={onClearFilters}
            className="text-[11px] font-semibold text-muted hover:text-charcoal flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* 1. Price Range Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-charcoal">Max Price</span>
          <span className="font-bold text-charcoal">${filters.priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="50"
          max={maxPriceLimit}
          step="25"
          value={filters.priceRange[1]}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full accent-charcoal cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-muted font-medium">
          <span>$50</span>
          <span>${maxPriceLimit}</span>
        </div>
      </div>

      {/* 2. Availability Filter */}
      <div className="pt-4 border-t border-borderNeutral/60 space-y-2">
        <span className="text-xs font-semibold text-charcoal block">Availability</span>
        <label className="flex items-center gap-2 text-xs text-charcoal cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
            }
            className="rounded border-borderNeutral text-charcoal focus:ring-0 w-4 h-4 cursor-pointer accent-charcoal"
          />
          <span>In Stock items only</span>
        </label>
      </div>

      {/* 3. Brand Filter */}
      <div className="pt-4 border-t border-borderNeutral/60 space-y-2.5">
        <span className="text-xs font-semibold text-charcoal block">Design House & Brand</span>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {availableBrands.map((brand) => {
            const checked = filters.brands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center justify-between text-xs text-charcoal hover:bg-ivory-200 p-1.5 rounded cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleBrand(brand)}
                    className="rounded border-borderNeutral text-charcoal focus:ring-0 w-3.5 h-3.5 cursor-pointer accent-charcoal"
                  />
                  <span>{brand}</span>
                </div>
                {checked && <Check className="w-3 h-3 text-charcoal" />}
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Minimum Rating Filter */}
      <div className="pt-4 border-t border-borderNeutral/60 space-y-2">
        <span className="text-xs font-semibold text-charcoal block">Customer Rating</span>
        <div className="space-y-1">
          {[4, 3, 0].map((rating) => {
            const active = filters.minRating === rating;
            return (
              <button
                key={rating}
                type="button"
                onClick={() =>
                  setFilters((prev) => ({ ...prev, minRating: rating }))
                }
                className={`w-full flex items-center justify-between text-xs px-2 py-1.5 rounded text-left transition-colors ${
                  active ? "bg-charcoal text-white font-semibold" : "hover:bg-ivory-200 text-charcoal"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Star className={`w-3.5 h-3.5 ${active ? "fill-lime text-lime" : "fill-amber-400 text-amber-400"}`} />
                  <span>{rating > 0 ? `${rating} Stars & above` : "All Ratings"}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
