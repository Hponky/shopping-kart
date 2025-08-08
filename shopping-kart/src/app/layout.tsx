import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FloatingCartButton } from "@/components/ui/floating-cart-button";
import { CartProvider } from "@/hooks/use-cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechKart - Tu tienda de tecnología",
  description: "Descubre los mejores productos tecnológicos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-background via-muted/30 to-background min-h-screen`}
      >
        <CartProvider>
          {children}
          <FloatingCartButton />
        </CartProvider>
      </body>
    </html>
  );
}
