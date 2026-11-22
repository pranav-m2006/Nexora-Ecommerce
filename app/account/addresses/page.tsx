"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { Address } from "@/lib/types";
import { ChevronRight, MapPin, Plus, Trash2, CheckCircle2, X } from "lucide-react";

export default function AccountAddressesPage() {
  const { user, updateAddress, loginDemo, showToast, isMounted } = useMarketplace();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Address>>({
    type: "Home",
    isDefault: false,
    fullName: user?.name || "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: user?.phone || "",
  });

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
          <MapPin className="w-6 h-6 text-muted" />
        </div>
        <h1 className="text-xl font-bold text-charcoal">Sign In to Manage Addresses</h1>
        <p className="text-xs text-muted">
          Your saved shipping destinations are private to authenticated member accounts.
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.street || !formData.city || !formData.state || !formData.zipCode) {
      alert("Please fill in all mandatory address fields.");
      return;
    }

    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      type: formData.type || "Home",
      isDefault: formData.isDefault || user.addresses.length === 0,
      fullName: formData.fullName,
      street: formData.street,
      apartment: formData.apartment,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      phone: formData.phone || "+1 (555) 000-0000",
    };

    updateAddress(newAddress);
    setModalOpen(false);
    setFormData({
      type: "Home",
      isDefault: false,
      fullName: user.name,
      street: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      phone: user.phone,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-muted">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <Link href="/account" className="hover:text-charcoal transition-colors">Account</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <span className="text-charcoal font-semibold">Delivery Addresses</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-borderNeutral gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
            Saved Addresses
          </h1>
          <p className="text-xs text-muted mt-1">
            Manage your personal residences, corporate offices, and dispatch destinations.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="btn-primary py-2.5 px-4 text-xs flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-lime" />
          <span>Add New Address</span>
        </button>
      </div>

      {/* Address Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user.addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-6 rounded-brand-xl bg-white border transition-all relative space-y-3 ${
              addr.isDefault
                ? "border-charcoal shadow-card ring-1 ring-charcoal"
                : "border-borderNeutral shadow-2xs"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="badge-dark text-[10px] font-bold">
                  {addr.type}
                </span>
                {addr.isDefault && (
                  <span className="badge-lime text-[10px] font-bold">
                    Primary Default
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm text-charcoal">{addr.fullName}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mt-1">
                {addr.street} {addr.apartment && `· ${addr.apartment}`}<br />
                {addr.city}, {addr.state} {addr.zipCode}<br />
                Phone: {addr.phone}
              </p>
            </div>

            <div className="pt-3 border-t border-borderNeutral/60 flex items-center justify-between text-xs">
              {!addr.isDefault ? (
                <button
                  onClick={() => updateAddress({ ...addr, isDefault: true })}
                  className="font-semibold text-charcoal hover:underline"
                >
                  Set as Primary
                </button>
              ) : (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active for Checkout
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-brand-xl max-w-lg w-full p-6 shadow-2xl border border-borderNeutral space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-borderNeutral">
              <h3 className="font-extrabold text-sm text-charcoal">
                Add Destination Address
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-muted hover:text-charcoal">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2 outline-none focus:border-charcoal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2 outline-none focus:border-charcoal"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100 Montgomery St"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2 outline-none focus:border-charcoal"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2 outline-none focus:border-charcoal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">State / Province *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2 outline-none focus:border-charcoal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">ZIP / Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full bg-ivory-50 border border-borderNeutral rounded-lg p-2 outline-none focus:border-charcoal"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    checked={formData.type === "Home"}
                    onChange={() => setFormData({ ...formData, type: "Home" })}
                    className="accent-charcoal"
                  />
                  <span>Residential (Home)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    checked={formData.type === "Work"}
                    onChange={() => setFormData({ ...formData, type: "Work" })}
                    className="accent-charcoal"
                  />
                  <span>Commercial (Work)</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-borderNeutral">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-secondary py-2 px-4 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary py-2 px-5 text-xs"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
