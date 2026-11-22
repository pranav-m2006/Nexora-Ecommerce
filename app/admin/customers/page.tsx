"use client";

import React, { useState } from "react";
import { adminCustomersList } from "@/lib/data/mock-admin";
import { formatPrice } from "@/lib/utils";
import { Users, Search, Mail, ShieldCheck, UserCheck } from "lucide-react";

export default function AdminCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = adminCustomersList.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-borderNeutral">
        <div>
          <h1 className="text-2xl font-extrabold text-charcoal tracking-tight">
            Customer Directory
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Verified client profiles, lifetime gross spend, and account engagement metrics.
          </p>
        </div>

        <span className="badge-dark text-xs font-bold self-start sm:self-auto">
          {adminCustomersList.length} Registered Accounts
        </span>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-brand-lg border border-borderNeutral shadow-2xs max-w-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-muted absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-ivory-50 border border-borderNeutral text-xs text-charcoal rounded-lg pl-9 pr-3 py-2 outline-none focus:border-charcoal"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-brand-xl border border-borderNeutral shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-ivory-50 border-b border-borderNeutral text-muted uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Lifetime Spend</th>
                <th className="py-3 px-4">Registration Date</th>
                <th className="py-3 px-4">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderNeutral/60">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-ivory-50/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-charcoal text-lime font-bold flex items-center justify-center text-[11px]">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-bold text-charcoal">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-muted">
                    {customer.email}
                  </td>
                  <td className="py-3 px-4 font-semibold text-charcoal">
                    {customer.totalOrders} consignments
                  </td>
                  <td className="py-3 px-4 font-black text-charcoal">
                    {formatPrice(customer.totalSpent)}
                  </td>
                  <td className="py-3 px-4 text-muted">
                    {customer.joinedDate}
                  </td>
                  <td className="py-3 px-4">
                    <span className="badge-lime text-[10px] font-bold">
                      {customer.status}
                    </span>
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
