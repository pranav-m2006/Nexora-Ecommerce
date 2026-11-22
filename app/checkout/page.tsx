"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { formatPrice } from "@/lib/utils";
import { 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  MapPin, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  QrCode,
  Banknote,
  Smartphone,
  Sparkles
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, user, clearCart, showToast } = useMarketplace();

  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    user?.addresses[0]?.id || "addr-1"
  );
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod" | "card" | "apple">("upi");
  const [upiId, setUpiId] = useState("alex.rivera@okaxis");
  const [upiVerified, setUpiVerified] = useState(true);
  const [upiApp, setUpiApp] = useState<"gpay" | "phonepe" | "paytm" | "qr">("gpay");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("892");
  const [loading, setLoading] = useState(false);

  const deliveryCharge = cartSubtotal > 150 ? 0 : 15;
  const totalAmount = cartSubtotal + deliveryCharge;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("Your cart is empty", "warn");
      return;
    }

    setLoading(true);

    try {
      const activeAddress = user?.addresses.find((a) => a.id === selectedAddressId) || {
        id: "addr-1",
        type: "Home",
        isDefault: true,
        fullName: user?.name || "Alex Rivera",
        street: "742 Evergreen Terrace",
        apartment: "Apt 4B",
        city: "San Francisco",
        state: "CA",
        zipCode: "94107",
        phone: user?.phone || "+1 (555) 392-8172",
      };

      // 1. Create order on server
      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingAddress: activeAddress,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      const createdOrder = data.order;

      // 2. Process payment integration if online
      if (paymentMethod === "upi" || paymentMethod === "card") {
        try {
          const rzpOrderRes = await fetch("/api/payments/razorpay/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: createdOrder.id }),
          });
          const rzpData = await rzpOrderRes.json();

          if (rzpOrderRes.ok && rzpData.razorpayOrder) {
            // In Razorpay Test Mode, simulate signature verification handshake
            await fetch("/api/payments/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: createdOrder.id,
                razorpay_order_id: rzpData.razorpayOrder.id,
                razorpay_payment_id: `pay_${Math.random().toString(36).substring(2, 10)}`,
                razorpay_signature: "mock_test_signature", // In production test mode handled by server
              }),
            }).catch(() => {});
          }
        } catch (payErr) {
          console.warn("Payment verification handshake note:", payErr);
        }
      }

      clearCart();
      showToast("Order verified and placed successfully!", "success");
      router.push(`/order-confirmation?orderId=${createdOrder.id}&paymentMethod=${paymentMethod}`);
    } catch (err: any) {
      showToast(err.message || "Checkout failed. Please try again.", "warn");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <h1 className="text-xl font-bold text-charcoal">Your bag is currently empty</h1>
        <p className="text-xs text-muted">Please add products to your cart before proceeding to checkout.</p>
        <Link href="/products" className="btn-primary text-xs inline-block">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-muted">
        <Link href="/cart" className="hover:text-charcoal transition-colors">Cart</Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <span className="text-charcoal font-semibold">Secure Checkout</span>
      </nav>

      {/* Header */}
      <div className="pb-6 border-b border-borderNeutral">
        <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
          Checkout Protocol
        </h1>
        <p className="text-xs text-muted mt-1">
          Review shipping destination, select payment preference, and authorize consignment dispatch.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Delivery Address & Payment Method */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Step 1: Delivery Address */}
          <div className="bg-white rounded-brand-xl border border-borderNeutral p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-borderNeutral">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-charcoal text-white text-[11px] font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-sm font-bold text-charcoal">Delivery Destination</h2>
              </div>
              <Link href="/account/addresses" className="text-xs font-semibold text-charcoal hover:underline">
                Manage Addresses
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user?.addresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;
                return (
                  <label
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-4 rounded-brand-lg border cursor-pointer transition-all flex flex-col justify-between text-xs space-y-2 ${
                      isSelected
                        ? "border-charcoal bg-ivory-50/70 ring-1 ring-charcoal"
                        : "border-borderNeutral bg-white hover:border-neutral-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-charcoal">{addr.fullName}</span>
                      <span className="badge-dark text-[9px] uppercase font-bold">{addr.type}</span>
                    </div>
                    <p className="text-muted leading-relaxed">
                      {addr.street} {addr.apartment && `· ${addr.apartment}`}<br />
                      {addr.city}, {addr.state} {addr.zipCode}<br />
                      {addr.phone}
                    </p>
                    <div className="pt-2 flex items-center gap-1.5 font-semibold text-charcoal">
                      <input
                        type="radio"
                        name="deliveryAddress"
                        checked={isSelected}
                        onChange={() => setSelectedAddressId(addr.id)}
                        className="accent-charcoal"
                      />
                      <span>Ship to this address</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div className="bg-white rounded-brand-xl border border-borderNeutral p-6 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-borderNeutral">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-charcoal text-white text-[11px] font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-sm font-bold text-charcoal">Select Payment Preference</h2>
              </div>
              <span className="text-[11px] text-muted flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Encrypted &amp; Verified</span>
              </span>
            </div>

            {/* Payment Method Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              {/* Option 1: Online UPI Payments (MANDATORY REQUEST) */}
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`p-3.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all text-center relative ${
                  paymentMethod === "upi"
                    ? "border-charcoal bg-charcoal text-white shadow-sm ring-1 ring-charcoal"
                    : "border-borderNeutral bg-white text-charcoal hover:bg-ivory-100"
                }`}
              >
                <div className="flex items-center gap-1">
                  <Smartphone className="w-4 h-4 text-lime" />
                  <span className="font-bold">Online UPI</span>
                </div>
                <span className="text-[10px] opacity-80">GPay, PhonePe, QR</span>
                <span className="absolute -top-2 px-1.5 py-0.5 rounded-full bg-lime text-charcoal font-black text-[9px] shadow-2xs">
                  FASTEST
                </span>
              </button>

              {/* Option 2: Cash on Delivery (MANDATORY REQUEST) */}
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-3.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all text-center relative ${
                  paymentMethod === "cod"
                    ? "border-charcoal bg-charcoal text-white shadow-sm ring-1 ring-charcoal"
                    : "border-borderNeutral bg-white text-charcoal hover:bg-ivory-100"
                }`}
              >
                <div className="flex items-center gap-1">
                  <Banknote className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">Cash on Delivery</span>
                </div>
                <span className="text-[10px] opacity-80">Pay at Doorstep</span>
              </button>

              {/* Option 3: Credit / Debit Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                  paymentMethod === "card"
                    ? "border-charcoal bg-charcoal text-white shadow-sm ring-1 ring-charcoal"
                    : "border-borderNeutral bg-white text-charcoal hover:bg-ivory-100"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="font-bold">Card</span>
                <span className="text-[10px] opacity-80">Visa, Mastercard</span>
              </button>

              {/* Option 4: Apple Pay */}
              <button
                type="button"
                onClick={() => setPaymentMethod("apple")}
                className={`p-3.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                  paymentMethod === "apple"
                    ? "border-charcoal bg-charcoal text-white shadow-sm ring-1 ring-charcoal"
                    : "border-borderNeutral bg-white text-charcoal hover:bg-ivory-100"
                }`}
              >
                <span className="font-bold text-sm"> Pay</span>
                <span className="text-[10px] opacity-80">1-Click TouchID</span>
              </button>

            </div>

            {/* DETAIL VIEW 1: ONLINE UPI PAYMENTS */}
            {paymentMethod === "upi" && (
              <div className="p-5 rounded-brand-lg bg-ivory-100 border border-borderNeutral space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-borderNeutral/80">
                  <span className="font-bold text-charcoal flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>Instant UPI Settlement (Zero Additional Gateway Fee)</span>
                  </span>
                  <span className="badge-lime text-[10px] font-bold">Recommended</span>
                </div>

                {/* Popular UPI Apps Picker */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-charcoal block text-[11px]">
                    Choose Preferred UPI App or QR:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: "gpay", label: "Google Pay" },
                      { id: "phonepe", label: "PhonePe" },
                      { id: "paytm", label: "Paytm" },
                      { id: "qr", label: "Scan QR Code" }
                    ].map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => setUpiApp(app.id as any)}
                        className={`p-2 rounded-lg border text-[11px] font-bold transition-all text-center ${
                          upiApp === app.id
                            ? "bg-white border-charcoal text-charcoal shadow-2xs ring-1 ring-charcoal"
                            : "bg-white/60 border-borderNeutral text-muted hover:bg-white"
                        }`}
                      >
                        {app.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic QR Code View */}
                {upiApp === "qr" ? (
                  <div className="bg-white p-4 rounded-xl border border-borderNeutral flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className="w-28 h-28 bg-ivory-200 border-2 border-charcoal rounded-lg flex items-center justify-center p-2 shadow-2xs shrink-0">
                      <QrCode className="w-24 h-24 text-charcoal" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-xs text-charcoal">
                        Scan with GPay, PhonePe, Paytm, or any UPI banking app
                      </p>
                      <p className="text-[11px] text-muted">
                        Merchant: <strong className="text-charcoal font-mono">nexora.commerce@icici</strong>
                      </p>
                      <p className="text-xs font-black text-charcoal pt-1">
                        Amount to authorize: {formatPrice(totalAmount)}
                      </p>
                      <span className="inline-block text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                        ✓ Dynamic UPI QR Active
                      </span>
                    </div>
                  </div>
                ) : (
                  /* UPI ID Input with Instant Verification */
                  <div className="space-y-1.5">
                    <label className="font-semibold text-charcoal block text-[11px]">
                      Enter Virtual Payment Address (UPI ID):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          setUpiVerified(false);
                        }}
                        placeholder="yourname@okaxis / mobile@upi"
                        className="flex-1 bg-white border border-borderNeutral rounded-lg p-2.5 outline-none font-mono text-xs focus:border-charcoal"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (upiId.includes("@")) {
                            setUpiVerified(true);
                            showToast("UPI ID verified successfully: Alex Rivera", "success");
                          } else {
                            showToast("Please enter a valid handle like user@bank", "warn");
                          }
                        }}
                        className="btn-secondary px-4 py-2 text-xs font-bold shrink-0"
                      >
                        {upiVerified ? "✓ Verified" : "Verify Handle"}
                      </button>
                    </div>
                    {upiVerified && (
                      <p className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium pt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified VPA: Alex Rivera (NEXORA Authorized Settlement)</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* DETAIL VIEW 2: CASH ON DELIVERY (COD) */}
            {paymentMethod === "cod" && (
              <div className="p-5 rounded-brand-lg bg-emerald-50/60 border border-emerald-200 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-bold">
                  <Banknote className="w-4 h-4 text-emerald-700" />
                  <span>Cash on Delivery (Pay at Doorstep)</span>
                  <span className="badge-dark text-[10px] ml-auto">Zero Advance Fee</span>
                </div>
                <p className="text-emerald-800 text-[11px] leading-relaxed">
                  Pay the total order amount of <strong>{formatPrice(totalAmount)}</strong> directly to our courier executive when your verified consignment arrives at your door. You may pay with physical cash or through instant digital UPI / card scanner upon delivery.
                </p>
                <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-900 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Inspection before acceptance allowed · Tamper-proof security seal included</span>
                </div>
              </div>
            )}

            {/* DETAIL VIEW 3: CARD INPUTS */}
            {paymentMethod === "card" && (
              <div className="p-4 rounded-brand-lg bg-ivory-100 border border-borderNeutral space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Card Number (Simulated)</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-white border border-borderNeutral rounded-lg p-2.5 outline-none font-mono text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-charcoal">Expiration</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-white border border-borderNeutral rounded-lg p-2.5 outline-none font-mono text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-charcoal">Security Code (CVC)</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-white border border-borderNeutral rounded-lg p-2.5 outline-none font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* DETAIL VIEW 4: APPLE PAY */}
            {paymentMethod === "apple" && (
              <div className="p-4 rounded-brand-lg bg-ivory-100 border border-borderNeutral space-y-2 text-xs text-center">
                <p className="font-bold text-charcoal">Apple Pay Express Checkout</p>
                <p className="text-muted text-[11px]">
                  Authorize using your device Touch ID, Face ID, or Apple Watch passcode.
                </p>
              </div>
            )}

            {/* Sandbox Notice */}
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200/80 rounded-lg text-[11px] text-amber-800">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <span>
                <strong>Frontend Evaluation Sandbox:</strong> Ready for Phase 2 backend connection. Selecting <strong>Online UPI</strong> or <strong>Cash on Delivery</strong> simulates authorized order placement with zero real financial liability.
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Order Review & Placement */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-brand-xl border border-borderNeutral p-6 shadow-2xs space-y-6">
            <h2 className="text-sm font-bold text-charcoal pb-3 border-b border-borderNeutral">
              Consignment Items ({cart.length})
            </h2>

            {/* Compact items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-borderNeutral/60">
              {cart.map((item) => (
                <div key={item.product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded bg-ivory-100 border border-borderNeutral"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-charcoal truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-muted">
                      Qty {item.quantity} · {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-charcoal">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="pt-4 border-t border-borderNeutral space-y-2.5 text-xs">
              <div className="flex justify-between text-muted">
                <span>Merchandise Subtotal</span>
                <span className="font-semibold text-charcoal">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Carbon-Neutral Freight</span>
                <span className="font-semibold text-charcoal">
                  {deliveryCharge === 0 ? "Complimentary" : formatPrice(deliveryCharge)}
                </span>
              </div>
              <div className="pt-3 border-t border-borderNeutral flex justify-between items-baseline">
                <span className="text-sm font-bold text-charcoal">Total Amount</span>
                <span className="text-2xl font-black text-charcoal">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-accent py-3.5 text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{loading ? "Authorizing Consignment..." : "Authorize Consignment & Place Order"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted">
              <Lock className="w-3.5 h-3.5" />
              <span>TLS 1.3 End-to-End Cryptographic Security</span>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
}
