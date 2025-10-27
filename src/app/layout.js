import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Foorter from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "JWL Marketing",
  description: "JWL Marketing - Votre partenaire en marketing digital",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`bg-[#F8F8F8] ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">
              {children}
            </div>
            <Foorter />
          </div>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
