"use client";

import React, { useState } from "react";
import { adminProductsList } from "@/lib/data/mock-admin";
import { formatPrice } from "@/lib/utils";
import { Boxes, AlertTriangle, CheckCircle2, RotateCw, Plus } from "lucide-react";

export default function AdminInventoryPage() {
  const [inventoryList, setInventoryList] = useState(adminProductsList);

  const handleRestock = (id: string) => {
    setInventoryList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, stock: item.stock + 20, status: "In Stock" }
          : item
      )
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-borderNeutral">
        <div>
          <h1 className="text-2xl font-extrabold text-charcoal tracking-tight">
            Inventory & Warehouse Balances
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Monitor real-time fulfillment stock counts, safety buffer thresholds, and supply chain re-orders.
          </p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-brand-xl border border-borderNeutral shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-ivory-50 border-b border-borderNeutral text-muted uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">Item & SKU</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Available Units</th>
                <th className="py-3 px-4">Safety Threshold</th>
                <th className="py-3 px-4">Health Status</th>
                <th className="py-3 px-4 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderNeutral/60">
              {inventoryList.map((item) => {
                const isLow = item.stock < 10;
                return (
                  <tr key={item.id} className="hover:bg-ivory-50/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt="" className="w-10 h-10 object-cover rounded bg-ivory-100" />
                        <div>
                          <p className="font-bold text-charcoal truncate max-w-[200px]">{item.name}</p>
                          <p className="font-mono text-[10px] text-muted">{item.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted font-medium">{item.category}</td>
                    <td className="py-3 px-4 font-black text-charcoal">{item.stock} units</td>
                    <td className="py-3 px-4 text-muted font-semibold">10 units buffer</td>
                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isLow ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {isLow ? "Low Stock Trigger" : "Optimal Reserve"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleRestock(item.id)}
                        className="btn-secondary py-1 px-2.5 text-[11px] inline-flex items-center gap-1 hover:border-charcoal"
                      >
                        <Plus className="w-3 h-3 text-lime-dark" />
                        <span>Add +20</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
