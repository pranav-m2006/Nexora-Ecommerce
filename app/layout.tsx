import type { Metadata } from "next";
import "./globals.css";
import { MarketplaceProvider } from "@/lib/store/marketplace-context";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/layout/Toast";
import AiAssistant from "@/components/assistant/AiAssistant";
import CompareFloatingBar from "@/components/products/CompareFloatingBar";

export const metadata: Metadata = {
  title: "NEXORA | The Future of Shopping",
  description: "A premium multi-category e-commerce marketplace featuring titanium smartphones, spatial airpods, GaN power banks, architectural dresses, and Scandinavian interiors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-ivory text-charcoal selection:bg-lime selection:text-charcoal">
        <MarketplaceProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toast />
          <AiAssistant />
          <CompareFloatingBar />
        </MarketplaceProvider>
      </body>
    </html>
  );
}
