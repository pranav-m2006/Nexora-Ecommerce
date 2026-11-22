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
  Sparkles, 
  CheckCircle2, 
  Truck, 
  Award, 
  Zap,
  Smartphone,
  Headphones,
  Home
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginDemo, user } = useMarketplace();

  const [email, setEmail] = useState("alex.rivera@example.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      login(email, data.user?.name);
      setTimeout(() => {
        window.location.href = "/account";
      }, 150);
    } catch (err: any) {
      setError(err.message || "Invalid credentials.");
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
        {/* LEFT COLUMN: EDITORIAL BRAND SHOWCASE & MARKETPLACE DETAILS  */}
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
              <span className="px-2.5 py-0.5 rounded-full bg-charcoal-800 text-[10px] text-neutral-300 font-semibold border border-neutral-700">
                Member Gateway
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                The curated global marketplace for modern living &amp; precision craft.
              </h1>
              
              {/* Detailed Description of NEXORA */}
              <div className="mt-4 space-y-3 text-neutral-300 text-xs sm:text-sm leading-relaxed">
                <p>
                  <strong>NEXORA</strong> is a premier multi-category digital marketplace redefining the intersection of industrial precision, sustainable craftsmanship, and modern lifestyle aesthetics.
                </p>
                <p>
                  From aerospace-grade titanium smartphones and custom-tuned planar AirPods to MagSafe carbon-fiber power banks, architectural Belgian linen trench coats, Nordic solid-oak furniture, and hand-forged Damascus cutlery, NEXORA bridges discerning customers with the world&apos;s finest design ateliers.
                </p>
                <p>
                  Built on the ethos of zero-compromise longevity, every single product featured on NEXORA undergoes strict material auditing, ethical supply-chain verification, and 100% carbon-neutral fulfillment.
                </p>
              </div>
            </div>

            {/* Marketplace 4 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-charcoal-800/80 border border-neutral-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-charcoal text-lime shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Atelier Provenance</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    100% verified genuine products sourced directly from certified makers.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-charcoal-800/80 border border-neutral-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-charcoal text-lime shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Carbon-0 Delivery</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Complimentary carbon-neutral priority shipping on qualifying orders.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-charcoal-800/80 border border-neutral-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-charcoal text-lime shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">AI Concierge</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Real-time cross-category analysis, spec comparisons, and tailored curation.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-charcoal-800/80 border border-neutral-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-charcoal text-lime shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">VIP Privileges</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Early access drops, saved wishlists, and priority order tracking.
                  </p>
                </div>
              </div>
            </div>

            {/* Live Marketplace Statistics Strip */}
            <div className="pt-6 border-t border-neutral-800 grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-lg font-black text-lime">$4.8M+</p>
                <p className="text-[10px] text-neutral-400 mt-0.5 uppercase tracking-wider">Volume</p>
              </div>
              <div>
                <p className="text-lg font-black text-white">99.4%</p>
                <p className="text-[10px] text-neutral-400 mt-0.5 uppercase tracking-wider">On-Time</p>
              </div>
              <div>
                <p className="text-lg font-black text-lime">40+</p>
                <p className="text-[10px] text-neutral-400 mt-0.5 uppercase tracking-wider">Ateliers</p>
              </div>
              <div>
                <p className="text-lg font-black text-white">4.9 / 5</p>
                <p className="text-[10px] text-neutral-400 mt-0.5 uppercase tracking-wider">Rating</p>
              </div>
            </div>

          </div>

          {/* Editorial Footer Tag */}
          <div className="mt-8 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400">
            <span>© 2026 NEXORA COMMERCE GROUP</span>
            <Link href="/products" className="text-lime hover:underline font-semibold flex items-center gap-1">
              <span>Browse Catalog as Guest</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: INTERACTIVE SIGN IN FORM                      */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-white">
          
          <div className="space-y-6">
            
            {/* Header Switcher: Sign In vs Sign Up */}
            <div className="flex items-center justify-between border-b border-borderNeutral pb-4">
              <div className="flex items-center gap-4">
                <span className="text-lg font-extrabold text-charcoal border-b-2 border-charcoal pb-4 -mb-4.5">
                  Sign In
                </span>
                <Link
                  href="/register"
                  className="text-lg font-medium text-muted hover:text-charcoal transition-colors pb-4"
                >
                  Create Account
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-charcoal">
                Welcome back to NEXORA
              </h2>
              <p className="text-xs text-muted mt-1">
                Enter your credentials to access saved cart items, order archives, and verified shipping addresses.
              </p>
            </div>

            {/* 1-Click Instant Demo Login Button */}
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full p-3.5 rounded-xl bg-ivory-100 hover:bg-lime/20 border border-borderNeutral hover:border-lime text-charcoal text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs group"
            >
              <Sparkles className="w-4 h-4 text-charcoal group-hover:rotate-12 transition-transform" />
              <span>Instant 1-Click Demo Sign In (Alex Rivera)</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="h-px bg-borderNeutral flex-1" />
              <span className="text-[10px] uppercase font-bold text-muted">Or continue with email</span>
              <div className="h-px bg-borderNeutral flex-1" />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-600 font-medium">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-charcoal block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-ivory-50 border border-borderNeutral text-xs text-charcoal rounded-lg pl-10 pr-3 py-2.5 outline-none focus:bg-white focus:border-charcoal transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-charcoal">Password</label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Demo password reset instructions have been dispatched to your email.");
                    }}
                    className="text-muted hover:text-charcoal underline text-[11px]"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-muted">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-borderNeutral accent-charcoal text-charcoal"
                  />
                  <span>Keep me signed in for 30 days</span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-xs flex items-center justify-center gap-2 mt-2 shadow-2xs font-bold"
              >
                <span>{loading ? "Verifying Credentials..." : "Sign In to NEXORA"}</span>
                <ArrowRight className="w-4 h-4 text-lime" />
              </button>

            </form>

            {/* Switch to Register link */}
            <div className="text-center pt-2 text-xs text-muted">
              Don&apos;t have an account yet?{" "}
              <Link href="/register" className="font-bold text-charcoal hover:underline">
                Register as Member (Sign Up)
              </Link>
            </div>

          </div>

          {/* Security & Verification Badges */}
          <div className="mt-8 pt-4 border-t border-borderNeutral space-y-2 text-[11px] text-muted">
            <div className="flex items-center gap-2 text-charcoal font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Enterprise Grade 256-Bit SSL Protection</span>
            </div>
            <p className="text-[10px] text-muted leading-tight">
              NEXORA enforces strict cryptographic tokenization and zero customer data sharing.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
