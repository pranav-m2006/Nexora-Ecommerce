"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  ShoppingBag, 
  Users, 
  FolderTree, 
  Boxes, 
  BarChart3, 
  Settings, 
  ArrowLeft,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

const adminNavItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/products/new", label: "Add Product", icon: PlusCircle },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/inventory", label: "Inventory", icon: Boxes },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-charcoal text-white min-h-screen flex flex-col justify-between border-r border-charcoal-200 shrink-0">
      <div className="p-5 space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-charcoal-50">
          <div className="w-8 h-8 rounded-lg bg-lime text-charcoal font-black flex items-center justify-center text-base">
            N
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-white block">
              NEXORA ADMIN
            </span>
            <span className="text-[10px] text-lime font-mono">
              MERCHANT CONSOLE
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-lime text-charcoal shadow-sm"
                    : "text-neutral-300 hover:bg-charcoal-50 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-charcoal" : "text-neutral-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

      </div>

      {/* Return to Customer Storefront Link */}
      <div className="p-4 border-t border-charcoal-50 space-y-3">
        <div className="p-3 bg-charcoal-800 rounded-lg text-[11px] text-neutral-400">
          <p className="font-bold text-white flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-lime" />
            <span>Storefront Status</span>
          </p>
          <p className="mt-0.5 text-emerald-400 text-[10px]">● Operational (All Regions)</p>
        </div>

        <Link
          href="/"
          className="flex items-center justify-between text-xs font-semibold text-neutral-300 hover:text-white p-2 rounded hover:bg-charcoal-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Store</span>
          </span>
          <ExternalLink className="w-3 h-3 text-neutral-500" />
        </Link>
      </div>

    </aside>
  );
}
