import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Foorter from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

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

export default function RootLayout({ children }) {
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
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id=GTM-PZ96DBWV'+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PZ96DBWV');
            `,
          }}
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`bg-[#F8F8F8] ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PZ96DBWV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
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
