import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: {
    default: "ACE AGRO FARMS | Organic Wellness & Sustainable Living",
    template: "%s | ACE AGRO FARMS",
  },
  description: "Naturally Grown. Purely Nourishing. Sustainably Raised. Your source for organic produce, herbal teas, and pasture-raised meats.",
  openGraph: {
    title: "ACE AGRO FARMS | Organic Wellness & Sustainable Living",
    description: "Naturally Grown. Purely Nourishing. Sustainably Raised.",
    images: [{
      url: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=1200&auto=format&fit=crop", // placeholder farm SEO image
      width: 1200,
      height: 630,
      alt: "ACE AGRO FARMS Organic Produce",
    }],
    type: "website",
  },
  keywords: ["organic farm", "wellness products", "herbal tea", "sustainable living", "pasture-raised meat", "fresh produce"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <ToastProvider />
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
