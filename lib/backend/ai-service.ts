import { productRepo } from "./db";
import { Product } from "../types";

export interface AiShoppingResponse {
  reply: string;
  recommendedProducts: Product[];
  comparisonProducts?: Product[];
}

export const aiAssistantService = {
  async processQuery(prompt: string, maxBudget?: number, categorySlug?: string): Promise<AiShoppingResponse> {
    const { products } = await productRepo.getAll({
      categorySlug,
      maxPrice: maxBudget,
      limit: 50,
    });

    const lower = prompt.toLowerCase();
    let reply = "";
    let recommended: Product[] = [];
    let comparison: Product[] = [];

    // Semantic matching against real catalog inventory
    if (lower.includes("phone") || lower.includes("mobile") || lower.includes("titanium") || lower.includes("fold")) {
      recommended = products.filter((p) => p.subcategory.includes("Phones") || p.tags.includes("phone"));
      reply = `We feature ${recommended.length} flagship smartphones engineered with aerospace-grade titanium and clean ZenOS. Here are the top verified selections from our warehouse:`;
    } else if (lower.includes("airpod") || lower.includes("earbud") || lower.includes("audio") || lower.includes("sound") || lower.includes("headphone")) {
      recommended = products.filter((p) => p.subcategory.includes("Audio") || p.tags.includes("audio"));
      reply = `For acoustic fidelity, here are our spatial noise-cancelling earbuds and planar magnetic studio headphones:`;
    } else if (lower.includes("power") || lower.includes("bank") || lower.includes("charger") || lower.includes("battery")) {
      recommended = products.filter((p) => p.subcategory.includes("Power") || p.tags.includes("charging"));
      reply = `Here are our high-density GaN power banks and MagSafe travel docks with carbon fiber enclosures:`;
    } else if (lower.includes("dress") || lower.includes("trench") || lower.includes("coat") || lower.includes("fashion")) {
      recommended = products.filter((p) => p.categorySlug === "fashion");
      reply = `Our architectural fashion collection combines technical textiles, weather-bonded trenches, and minimalist silhouettes:`;
    } else if (lower.includes("desk") || lower.includes("knife") || lower.includes("kitchen") || lower.includes("chair") || lower.includes("home")) {
      recommended = products.filter((p) => p.categorySlug === "home-and-living");
      reply = `Crafted for ergonomics and enduring beauty, here are our solid oak standing desks, Damascus steel knives, and Scandinavian furniture:`;
    } else if (lower.includes("compare") || lower.includes("vs") || lower.includes("difference")) {
      // Comparison request
      comparison = products.slice(0, 2);
      reply = `Here is a side-by-side technical comparison of specifications, materials, and value for these models:`;
    } else {
      // Keyword search across title, brand, specs
      const matched = products.filter((p) => {
        const combined = `${p.name} ${p.brand} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
        return lower.split(/\s+/).some((word) => word.length > 2 && combined.includes(word));
      });

      if (matched.length > 0) {
        recommended = matched.slice(0, 4);
        reply = `Based on your request "${prompt}", I identified these verified items directly from our inventory:`;
      } else {
        recommended = products.filter((p) => p.isFeatured || p.isTrending).slice(0, 4);
        reply = `Here are our most celebrated flagship arrivals across Electronics, Home, and Minimalist Fashion:`;
      }
    }

    // Budget filtering
    if (maxBudget) {
      recommended = recommended.filter((p) => p.price <= maxBudget);
    }

    // Call live Google Gemini API if GEMINI_API_KEY is configured
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key") {
      try {
        const topCatalog = (recommended.length > 0 ? recommended : products).slice(0, 5);
        const catalogContext = topCatalog
          .map((p) => `- ${p.name} ($${p.price}) in ${p.category} (${p.subcategory}): ${p.shortDescription}`)
          .join("\n");

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are the NEXORA Intelligent Shopping Concierge for a luxury minimalist e-commerce marketplace. The shopper asks: "${prompt}".\nRelevant inventory:\n${catalogContext}\nProvide a concise, sophisticated 2-3 sentence recommendation explaining which items best fit their request.`,
                    },
                  ],
                },
              ],
              generationConfig: {
                maxOutputTokens: 250,
                temperature: 0.7,
              },
            }),
            signal: AbortSignal.timeout(4000),
          }
        );

        if (res.ok) {
          const geminiData = await res.json();
          const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text && text.trim().length > 0) {
            reply = text.trim();
          }
        }
      } catch (err) {
        // Fallback to grounded catalog reply if Gemini API is unreachable or rate limited
        console.warn("Gemini API call fallback to deterministic response:", err);
      }
    }

    return {
      reply,
      recommendedProducts: recommended.slice(0, 4),
      comparisonProducts: comparison.length > 0 ? comparison : undefined,
    };
  },
};
