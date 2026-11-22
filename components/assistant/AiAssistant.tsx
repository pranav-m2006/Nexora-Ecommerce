"use client";

import React, { useState, useRef, useEffect } from "react";
import { useMarketplace } from "@/lib/store/marketplace-context";
import { mockProducts } from "@/lib/data/mock-products";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User as UserIcon, 
  ArrowRight, 
  ShoppingBag,
  SlidersHorizontal,
  RefreshCw
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  recommendedProducts?: Product[];
  comparisonProducts?: Product[];
  timestamp: string;
}

const suggestedPrompts = [
  "Show me flagship titanium smartphones & foldables",
  "Recommend noise-cancelling airpods and spatial earbuds",
  "Find MagSafe magnetic power banks and GaN chargers",
  "Show architectural dresses, trench coats & tailoring",
  "Find solid oak desks and Japanese Damascus chef knives"
];

export default function AiAssistant() {
  const { 
    products,
    isAssistantOpen, 
    setAssistantOpen, 
    addToCart, 
    toggleCompare, 
    isInCompare 
  } = useMarketplace();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      sender: "bot",
      text: "Greetings. I am your Nexora Intelligent Shopping Concierge. I can assist you with titanium smartphones, noise-cancelling airpods, MagSafe fast charging, Scandinavian interiors, architectural dresses, and material specifications. What would you like to explore today?",
      timestamp: "Just now"
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAssistantOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAssistantOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Query real server-side AI Assistant endpoint
    fetch("/api/ai/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: query }),
    })
      .then((res) => res.json())
      .then((data) => {
        let replyText = data.reply;
        let recommended: Product[] = data.recommendedProducts || [];
        let comparison: Product[] = data.comparisonProducts || [];

        if (!replyText) {
          replyText = `Based on your request "${query}", here is a curated selection matching our highest editorial standards:`;
          recommended = products.filter((p) => p.isFeatured).slice(0, 3);
        }

        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: replyText,
          recommendedProducts: recommended.length > 0 ? recommended : undefined,
          comparisonProducts: comparison.length > 0 ? comparison : undefined,
          timestamp: "Just now",
        };

        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("AI Assistant fallback note:", err);
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `Here are our flagship products matching "${query}":`,
          recommendedProducts: products.slice(0, 3),
          timestamp: "Just now",
        };
        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isAssistantOpen && (
        <button
          onClick={() => setAssistantOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-charcoal text-white hover:bg-black px-4 py-3 rounded-full shadow-dropdown border border-charcoal-200 flex items-center gap-2.5 transition-all duration-200 group active:scale-95"
          aria-label="Open AI Shopping Concierge"
        >
          <div className="w-6 h-6 rounded-full bg-lime text-charcoal flex items-center justify-center font-bold">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold tracking-wide">Nexora Concierge</span>
          <span className="inline-block w-2 h-2 rounded-full bg-lime animate-ping" />
        </button>
      )}

      {/* Slide-out Assistant Modal / Drawer */}
      {isAssistantOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            
            {/* Header */}
            <div className="p-4 bg-charcoal text-white flex items-center justify-between border-b border-charcoal-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-lime text-charcoal flex items-center justify-center font-black">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">Nexora Shopping Concierge</h3>
                  <p className="text-[10px] text-lime font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime inline-block" />
                    AI Architectural Engine Active
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAssistantOpen(false)}
                className="p-1.5 text-neutral-300 hover:text-white rounded-lg hover:bg-charcoal-50"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-ivory-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-charcoal text-lime flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[85%] ${
                    msg.sender === "user"
                      ? "bg-charcoal text-white rounded-2xl rounded-tr-xs p-3.5 text-xs"
                      : "bg-white border border-borderNeutral text-charcoal rounded-2xl rounded-tl-xs p-3.5 text-xs shadow-subtle"
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>

                    {/* Render Recommended Product Cards */}
                    {msg.recommendedProducts && (
                      <div className="mt-3 space-y-2">
                        {msg.recommendedProducts.map((p) => (
                          <div
                            key={p.id}
                            className="bg-ivory-100 rounded-lg p-2.5 border border-borderNeutral flex gap-3 items-center"
                          >
                            <img
                              src={p.thumbnail}
                              alt={p.name}
                              className="w-12 h-12 rounded object-cover bg-white"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-charcoal truncate text-xs">{p.name}</p>
                              <p className="text-[11px] text-muted">{p.brand} · {formatPrice(p.price)}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Link
                                  href={`/products/${p.slug}`}
                                  onClick={() => setAssistantOpen(false)}
                                  className="text-[10px] font-bold text-charcoal underline hover:text-black flex items-center gap-0.5"
                                >
                                  View Details <ArrowRight className="w-2.5 h-2.5" />
                                </Link>
                                <button
                                  onClick={() => addToCart(p)}
                                  className="text-[10px] bg-charcoal text-white px-2 py-0.5 rounded font-medium hover:bg-black"
                                >
                                  + Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Render Comparison Cards */}
                    {msg.comparisonProducts && (
                      <div className="mt-3 space-y-2">
                        {msg.comparisonProducts.map((p) => (
                          <div
                            key={p.id}
                            className="bg-ivory-100 rounded-lg p-2 border border-borderNeutral flex items-center justify-between"
                          >
                            <span className="text-xs font-semibold truncate mr-2">{p.name}</span>
                            <button
                              onClick={() => toggleCompare(p)}
                              className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 ${
                                isInCompare(p.id) ? "bg-lime text-charcoal" : "bg-white border border-borderNeutral text-charcoal"
                              }`}
                            >
                              <SlidersHorizontal className="w-3 h-3" />
                              {isInCompare(p.id) ? "Comparing" : "Add to Matrix"}
                            </button>
                          </div>
                        ))}
                        <Link
                          href="/compare"
                          onClick={() => setAssistantOpen(false)}
                          className="block text-center text-xs font-bold text-charcoal hover:underline mt-2 pt-2 border-t border-borderNeutral"
                        >
                          Open Comparison Table →
                        </Link>
                      </div>
                    )}

                    <span className="block text-[9px] text-muted-light mt-1 text-right">
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-full bg-ivory-300 text-charcoal flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      <UserIcon className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Indicator */}
              {loading && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-charcoal text-lime flex items-center justify-center shrink-0 text-xs">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white border border-borderNeutral rounded-2xl rounded-tl-xs p-3 shadow-subtle flex items-center gap-1.5 text-xs text-muted">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-charcoal" />
                    <span>Analyzing product specifications and catalog indices...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            <div className="px-4 py-2 border-t border-borderNeutral bg-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted block mb-1.5">
                Suggested Inquiries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="text-[11px] text-left px-2.5 py-1 rounded bg-ivory-200 hover:bg-lime/30 text-charcoal transition-colors border border-borderNeutral/60"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <div className="p-3 bg-white border-t border-borderNeutral">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask about materials, sizing, delivery..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-ivory-100 border border-borderNeutral text-xs text-charcoal placeholder-muted rounded-lg px-3 py-2.5 outline-none focus:bg-white focus:border-charcoal"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="bg-charcoal text-white hover:bg-black p-2.5 rounded-lg disabled:opacity-40 transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 text-lime" />
                </button>
              </form>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
