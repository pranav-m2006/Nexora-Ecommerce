"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Truck, 
  Award,
  Zap,
  Gift
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { login, loginDemo } = useMarketplace();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please provide your full legal name.");
      return;
    }
    if (!email || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }
    if (!agreeTerms) {
      setError("You must acknowledge the NEXORA Terms of Commerce.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      login(email, name);
      setTimeout(() => {
        window.location.href = "/account";
      }, 150);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "alex.rivera@example.com", password: "password123" }),
      }).catch(() => {});
      loginDemo();
      setTimeout(() => {
        window.location.href = "/account";
      }, 150);
    } catch {
      loginDemo();
      setTimeout(() => {
        window.location.href = "/account";
      }, 150);
    }
  };

  return (
    <div className="min-h-[85vh] py-8 lg:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-brand-2xl overflow-hidden border border-borderNeutral shadow-card bg-white">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: EDITORIAL BRAND SHOWCASE & MEMBERSHIP PERKS     */}
        {/* ============================================================ */}
        <div className="lg:col-span-7 bg-charcoal text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-lime/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="space-y-8 relative z-10">
            
            {/* Brand Logo & Tagline */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-lg bg-lime text-charcoal font-black flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 transition-transform">
                  N
                </div>
                <div>
                  <span className="text-2xl font-black tracking-tight text-white block leading-none">
                    NEXORA
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-lime font-bold mt-0.5 block">
                    The Future of Shopping
                  </span>
                </div>
              </Link>
              <span className="px-2.5 py-0.5 rounded-full bg-charcoal-800 text-[10px] text-lime font-bold border border-neutral-700">
                New Member Invitation
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Join the NEXORA Collective. Elevate your everyday standards.
              </h1>
              
              {/* Detailed Description of NEXORA */}
              <div className="mt-4 space-y-3 text-neutral-300 text-xs sm:text-sm leading-relaxed">
                <p>
                  <strong>NEXORA</strong> was founded to challenge the era of disposable consumerism. We assemble an uncompromising catalog of technology, tailored apparel, interior objects, and wellness essentials engineered with material integrity and architectural balance.
                </p>
                <p>
                  As an official NEXORA member, you gain immediate access to carbon-neutral priority shipping, early allocations on limited edition atelier drops, 30-day effortless in-home trials, and our 24/7 autonomous shopping concierge.
                </p>
              </div>
            </div>

            {/* Member Exclusive Privileges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-charcoal-800/80 border border-neutral-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-charcoal text-lime shrink-0">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">$25 Welcome Credit</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Automatically applied on your first curated order over $150.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-charcoal-800/80 border border-neutral-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-charcoal text-lime shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Priority Dispatch</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Guaranteed 48-hour fulfillment window with zero net emissions.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-charcoal-800/80 border border-neutral-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-charcoal text-lime shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Private Flash Drops</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    12-hour advance booking for titanium flagships and Japanese steel.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-charcoal-800/80 border border-neutral-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-charcoal text-lime shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">2-Year Guarantee</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Direct manufacturer warranty coverage on all electronics and home goods.
                  </p>
                </div>
              </div>
            </div>

            {/* Member Trust Badges */}
            <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime" />
                <span>Zero Subscription Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime" />
                <span>30-Day Effortless Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime" />
                <span>Carbon Neutral</span>
              </div>
            </div>

          </div>

          {/* Editorial Footer Tag */}
          <div className="mt-8 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400">
            <span>© 2026 NEXORA COMMERCE GROUP</span>
            <Link href="/products" className="text-lime hover:underline font-semibold flex items-center gap-1">
              <span>Explore Catalog First</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: INTERACTIVE REGISTRATION FORM                  */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-white">
          
          <div className="space-y-6">
            
            {/* Header Switcher: Sign In vs Sign Up */}
            <div className="flex items-center justify-between border-b border-borderNeutral pb-4">
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-lg font-medium text-muted hover:text-charcoal transition-colors pb-4"
                >
                  Sign In
                </Link>
                <span className="text-lg font-extrabold text-charcoal border-b-2 border-charcoal pb-4 -mb-4.5">
                  Create Account
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-charcoal">
                Create Your NEXORA Account
              </h2>
              <p className="text-xs text-muted mt-1">
                Enter your details to create an account and unlock curated pricing and order archives.
              </p>
            </div>

            {/* 1-Click Instant Demo Login Option */}
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full p-3.5 rounded-xl bg-ivory-100 hover:bg-lime/20 border border-borderNeutral hover:border-lime text-charcoal text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs group"
            >
              <Sparkles className="w-4 h-4 text-charcoal group-hover:rotate-12 transition-transform" />
              <span>Instant 1-Click Demo Account (Alex Rivera)</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="h-px bg-borderNeutral flex-1" />
              <span className="text-[10px] uppercase font-bold text-muted">Or register with email</span>
              <div className="h-px bg-borderNeutral flex-1" />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-600 font-medium">
                {error}
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Legal Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-charcoal block">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-muted absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jordan Hayes"
                    className="w-full bg-ivory-50 border border-borderNeutral text-xs text-charcoal rounded-lg pl-10 pr-3 py-2.5 outline-none focus:bg-white focus:border-charcoal transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-charcoal block">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan.hayes@example.com"
                    className="w-full bg-ivory-50 border border-borderNeutral text-xs text-charcoal rounded-lg pl-10 pr-3 py-2.5 outline-none focus:bg-white focus:border-charcoal transition-all"
                  />
                </div>
              </div>

              {/* Choose Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-charcoal block">Choose Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full bg-ivory-50 border border-borderNeutral text-xs text-charcoal rounded-lg pl-10 pr-10 py-2.5 outline-none focus:bg-white focus:border-charcoal transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted hover:text-charcoal"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-1 text-xs">
                <label className="flex items-start gap-2 text-muted cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-borderNeutral text-charcoal accent-charcoal"
                  />
                  <span>
                    I agree to the <a href="#" className="underline text-charcoal font-medium">NEXORA Terms of Commerce</a> and <a href="#" className="underline text-charcoal font-medium">Privacy Protocol</a>.
                  </span>
                </label>

                <label className="flex items-start gap-2 text-muted cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={newsletterOptIn}
                    onChange={(e) => setNewsletterOptIn(e.target.checked)}
                    className="mt-0.5 rounded border-borderNeutral text-charcoal accent-charcoal"
                  />
                  <span>
                    Notify me of limited edition drops, seasonal capsules, and design interviews.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-xs flex items-center justify-center gap-2 mt-2 shadow-2xs font-bold"
              >
                <span>{loading ? "Creating Member Profile..." : "Create Free NEXORA Account"}</span>
                <ArrowRight className="w-4 h-4 text-lime" />
              </button>

            </form>

            {/* Switch to Login Link */}
            <div className="text-center pt-2 text-xs text-muted">
              Already a member?{" "}
              <Link href="/login" className="font-bold text-charcoal hover:underline">
                Sign In to Account
              </Link>
            </div>

          </div>

          {/* Security & Verification Badges */}
          <div className="mt-8 pt-4 border-t border-borderNeutral space-y-2 text-[11px] text-muted">
            <div className="flex items-center gap-2 text-charcoal font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero Spam &amp; Strict Cryptographic Security</span>
            </div>
            <p className="text-[10px] text-muted leading-tight">
              We never sell or distribute member information to third-party ad networks.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
