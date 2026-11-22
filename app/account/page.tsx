"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { mockOrders } from "@/lib/data/mock-orders";
import { formatPrice } from "@/lib/utils";
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  LogOut, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  Clock
} from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, wishlist, loginDemo, isMounted } = useMarketplace();

  if (!isMounted) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-charcoal border-t-lime rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-ivory-200 text-charcoal flex items-center justify-center mx-auto">
          <User className="w-6 h-6 text-muted" />
        </div>
        <h1 className="text-xl font-bold text-charcoal">Sign In to View Your Profile</h1>
        <p className="text-xs text-muted">
          Your profile, saved addresses, and active orders are private to authenticated member accounts.
        </p>
        <div className="pt-2 flex flex-col gap-2.5">
          <button onClick={loginDemo} className="btn-accent text-xs py-3 font-bold">
            1-Click Demo Sign In (Alex Rivera)
          </button>
          <Link href="/login" className="btn-secondary text-xs py-2.5 font-bold text-center">
            Sign In with Email
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      
      {/* Header Profile Card */}
      <div className="bg-white rounded-brand-xl border border-borderNeutral p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-charcoal text-lime flex items-center justify-center font-extrabold text-2xl shadow-sm">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal">
                {user.name}
              </h1>
              <span className="badge-lime text-[10px] font-bold">
                Member
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">{user.email} · {user.phone}</p>
            <p className="text-[11px] text-muted-dark mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-muted" /> Member since {user.joinedDate}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn-secondary text-xs flex items-center gap-1.5 self-end sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5 text-muted" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Navigation Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          href="/account/orders"
          className="group bg-white rounded-brand-lg border border-borderNeutral p-5 hover:border-charcoal hover:shadow-card transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-ivory-100 text-charcoal group-hover:bg-charcoal group-hover:text-lime transition-colors">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-charcoal">My Orders</h3>
              <p className="text-xs text-muted">{mockOrders.length} historical shipments</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/account/addresses"
          className="group bg-white rounded-brand-lg border border-borderNeutral p-5 hover:border-charcoal hover:shadow-card transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-ivory-100 text-charcoal group-hover:bg-charcoal group-hover:text-lime transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-charcoal">Saved Addresses</h3>
              <p className="text-xs text-muted">{user.addresses.length} addresses stored</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/wishlist"
          className="group bg-white rounded-brand-lg border border-borderNeutral p-5 hover:border-charcoal hover:shadow-card transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-ivory-100 text-charcoal group-hover:bg-charcoal group-hover:text-lime transition-colors">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-charcoal">Saved Wishlist</h3>
              <p className="text-xs text-muted">{wishlist.length} saved products</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Recent Orders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-borderNeutral">
          <h2 className="text-base font-bold text-charcoal">Recent Consignments</h2>
          <Link href="/account/orders" className="text-xs font-semibold text-charcoal hover:underline">
            View All ({mockOrders.length}) →
          </Link>
        </div>

        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-brand-lg border border-borderNeutral p-5 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-charcoal">{order.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    order.status === "Delivered" 
                      ? "bg-emerald-100 text-emerald-800" 
                      : "bg-lime text-charcoal"
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-muted">
                  Placed on {new Date(order.date).toLocaleDateString()} · {order.items.length} items
                </p>
                <div className="flex gap-2 pt-2">
                  {order.items.map((item, idx) => (
                    <img
                      key={idx}
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded bg-ivory-100 border border-borderNeutral"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-borderNeutral">
                <div className="text-left md:text-right">
                  <span className="text-xs text-muted block">Total Paid</span>
                  <span className="text-base font-extrabold text-charcoal">
                    {formatPrice(order.total)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/track-order?id=${order.id}`}
                    className="btn-accent py-1.5 px-3 text-xs flex items-center gap-1 shadow-2xs"
                  >
                    <span>Track</span>
                  </Link>
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="btn-secondary py-1.5 px-3 text-xs"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
