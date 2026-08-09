import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navigation } from "@/components/ui/Navigation";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Footer } from "@/components/sections/Footer";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.primeplusbuilders.example"),
  title: {
    default:
      "Prime Plus Builders & Developers | Construction, Interior & Infrastructure",
    template: "%s | Prime Plus Builders",
  },
  description:
    "Prime Plus Builders and Developers brings together construction, interior and infrastructure with a focus on quality, precision and purposeful design.",
  keywords: [
    "Prime Plus Builders",
    "construction",
    "interior",
    "infrastructure",
    "developers",
    "architecture",
  ],
  authors: [{ name: "Prime Plus Builders And Developers Pvt Ltd" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Prime Plus Builders And Developers Pvt Ltd",
    title:
      "Prime Plus Builders & Developers | Construction, Interior & Infrastructure",
    description:
      "Prime Plus Builders and Developers brings together construction, interior and infrastructure with a focus on quality, precision and purposeful design.",
    images: [
      {
        url: "/images/logo.png",
        width: 927,
        height: 840,
        alt: "Prime Plus Builders And Developers Pvt Ltd",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Prime Plus Builders & Developers | Construction, Interior & Infrastructure",
    description:
      "Prime Plus Builders and Developers brings together construction, interior and infrastructure with a focus on quality, precision and purposeful design.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-navy-950 text-warm-white antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
