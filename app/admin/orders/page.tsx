"use client";

import React, { useState } from "react";
import Link from "next/link";
import { mockOrders } from "@/lib/data/mock-orders";
import { formatPrice } from "@/lib/utils";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Eye,
  ChevronRight
} from "lucide-react";

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = mockOrders.filter((order) => {
    const match =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    if (!match) return false;
    if (statusFilter !== "all" && order.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-borderNeutral">
        <div>
          <h1 className="text-2xl font-extrabold text-charcoal tracking-tight">
            Consignment Dispatch & Orders
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Real-time fulfillment tracking, carrier dispatch authorization, and invoice logs.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-brand-lg border border-borderNeutral shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-muted absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-ivory-50 border border-borderNeutral text-xs text-charcoal rounded-lg pl-9 pr-3 py-2 outline-none focus:border-charcoal"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-muted font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-ivory-50 border border-borderNeutral rounded-lg px-2.5 py-1.5 text-xs text-charcoal outline-none font-semibold cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-brand-xl border border-borderNeutral shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-ivory-50 border-b border-borderNeutral text-muted uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">Consignment ID</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Carrier & Tracking</th>
                <th className="py-3 px-4">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderNeutral/60">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-ivory-50/50">
                  <td className="py-3 px-4 font-mono font-bold text-charcoal">
                    {order.id}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-charcoal">{order.shippingAddress.fullName}</p>
                    <p className="text-[10px] text-muted">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex -space-x-2">
                      {order.items.map((it, idx) => (
                        <img
                          key={idx}
                          src={it.image}
                          alt=""
                          className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-black text-charcoal">
                    {formatPrice(order.total)}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-muted">
                    {order.carrier} <br />
                    <span className="text-charcoal font-semibold">{order.trackingNumber}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      order.status === "Delivered" ? "bg-emerald-100 text-emerald-800" : "bg-lime text-charcoal"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/track-order?id=${order.id}`}
                      className="btn-secondary py-1 px-2.5 text-[11px] inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Tracking</span>
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
