import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Foorter from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import CookieConsent from "@/components/CookieConsent";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";
import { isAdminRequest } from "@/lib/auth/admin";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jwlmarketing.fr";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}#localbusiness`,
  name: "JWL Marketing",
  image: `${siteUrl}/assets/brandinglogo.png`,
  url: siteUrl,
  description: "Consultante marketing digital et SEO local à Aix-en-Provence.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Aix-en-Provence",
    addressRegion: "Provence-Alpes-Côte d'Azur",
    postalCode: "13100",
    addressCountry: "FR",
  },
  areaServed: "France",
  priceRange: "€€",
  sameAs: [
    "https://www.linkedin.com/company/jwl-marketing",
    "https://www.facebook.com/profile.php?id=61578345536283&locale=fr_FR",
    "https://www.instagram.com/jwlmarketing13/",
  ],
};

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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const hasAdminSession = await isAdminRequest();
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          id="localbusiness-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`bg-[#F8F8F8] ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header isAdmin={hasAdminSession} />
            <div className="flex-1">
              {children}
            </div>
            <Foorter />
          </div>
          <CartDrawer />
          <CookieConsent />
        </CartProvider>
      </body>
    </html>
  );
}
