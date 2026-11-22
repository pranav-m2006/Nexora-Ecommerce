"use client";

import React from "react";
import Link from "next/link";
import { 
  adminSummary, 
  adminRevenueHistory, 
  adminProductsList 
} from "@/lib/data/mock-admin";
import { mockOrders } from "@/lib/data/mock-orders";
import { formatPrice } from "@/lib/utils";
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  ArrowUpRight,
  PlusCircle,
  Truck
} from "lucide-react";

export default function AdminDashboardPage() {
  const [summary, setSummary] = React.useState(adminSummary);
  const [productsList, setProductsList] = React.useState(adminProductsList);

  React.useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.analytics) {
          setSummary(data.analytics.summary);
          if (data.analytics.productMetrics?.length) {
            setProductsList(data.analytics.productMetrics);
          }
        }
      })
      .catch(() => {});
  }, []);
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-borderNeutral">
        <div>
          <h1 className="text-2xl font-extrabold text-charcoal tracking-tight">
            Marketplace Overview
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Key operational telemetry, financial run-rate, and inventory dispatch status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/products/new"
            className="btn-accent py-2 px-3 text-xs flex items-center gap-1.5 shadow-2xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Product</span>
          </Link>
          <Link
            href="/admin/orders"
            className="btn-secondary py-2 px-3 text-xs flex items-center gap-1.5"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>View Orders</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-brand-lg border border-borderNeutral shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-muted text-xs font-semibold">
            <span>Total Revenue</span>
            <div className="p-2 rounded bg-ivory-200 text-charcoal">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-charcoal">
            {formatPrice(summary.totalRevenue)}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {summary.revenueGrowth}
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-brand-lg border border-borderNeutral shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-muted text-xs font-semibold">
            <span>Total Orders</span>
            <div className="p-2 rounded bg-ivory-200 text-charcoal">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-charcoal">
            {summary.totalOrders}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {summary.ordersGrowth}
          </p>
        </div>

        {/* Active Customers */}
        <div className="bg-white p-5 rounded-brand-lg border border-borderNeutral shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-muted text-xs font-semibold">
            <span>Active Customers</span>
            <div className="p-2 rounded bg-ivory-200 text-charcoal">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-charcoal">
            {summary.activeCustomers}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {summary.customersGrowth}
          </p>
        </div>

        {/* Operational Attention Required */}
        <div className="bg-white p-5 rounded-brand-lg border border-borderNeutral shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-muted text-xs font-semibold">
            <span>Pending & Low Stock</span>
            <div className="p-2 rounded bg-amber-50 text-amber-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-700">
            {summary.pendingOrders} Orders · {summary.lowStockItems} Items
          </div>
          <p className="text-[11px] text-muted">
            Requires warehouse manager review
          </p>
        </div>

      </div>

      {/* Revenue Trend Visual Representation & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Revenue Trend Chart Representation */}
        <div className="lg:col-span-8 bg-white p-6 rounded-brand-xl border border-borderNeutral shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-borderNeutral">
            <div>
              <h2 className="text-sm font-bold text-charcoal">Revenue Velocity (H2 2026)</h2>
              <p className="text-[11px] text-muted">Aggregated monthly gross merchandise volume</p>
            </div>
            <span className="badge-dark text-[10px] font-mono">USD ($)</span>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
            {adminRevenueHistory.map((item) => {
              const maxRev = 75000;
              const heightPct = Math.round((item.revenue / maxRev) * 100);
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] font-bold text-charcoal font-mono">
                    ${Math.round(item.revenue / 1000)}k
                  </span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[48px] bg-charcoal rounded-t-md hover:bg-lime transition-all group relative cursor-pointer"
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-20">
                      {item.month}: {formatPrice(item.revenue)} ({item.orders} orders)
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-muted">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-4 bg-white p-6 rounded-brand-xl border border-borderNeutral shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-borderNeutral">
            <h2 className="text-sm font-bold text-charcoal flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Low Inventory Alert</span>
            </h2>
            <Link href="/admin/inventory" className="text-xs font-semibold text-charcoal hover:underline">
              All
            </Link>
          </div>

          <div className="space-y-3">
            {productsList.filter((p) => p.status === "Low Stock").map((p) => (
              <div key={p.id} className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/70 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={p.image} alt="" className="w-10 h-10 object-cover rounded bg-white" />
                  <div>
                    <h4 className="text-xs font-bold text-charcoal truncate max-w-[140px]">{p.name}</h4>
                    <span className="text-[10px] font-mono text-muted">{p.sku}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-amber-800">{p.stock} units</span>
                  <Link href={`/admin/inventory`} className="block text-[10px] font-bold text-charcoal underline">
                    Reorder
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-brand-xl border border-borderNeutral shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-borderNeutral flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-charcoal">Recent Consignments</h2>
            <p className="text-[11px] text-muted">Latest authorized orders awaiting final-mile courier delivery</p>
          </div>
          <Link href="/admin/orders" className="text-xs font-bold text-charcoal hover:underline">
            View All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-ivory-50 border-b border-borderNeutral text-muted uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">Consignment ID</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderNeutral/60">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-ivory-50/50">
                  <td className="py-3 px-4 font-mono font-bold text-charcoal">{order.id}</td>
                  <td className="py-3 px-4 font-semibold text-charcoal">{order.shippingAddress.fullName}</td>
                  <td className="py-3 px-4 text-muted">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 font-extrabold text-charcoal">{formatPrice(order.total)}</td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      order.status === "Delivered" ? "bg-emerald-100 text-emerald-800" : "bg-lime text-charcoal"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/admin/orders`}
                      className="text-xs font-semibold text-charcoal hover:underline"
                    >
                      Inspect
                    </Link>
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
