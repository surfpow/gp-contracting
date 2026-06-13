import type { Metadata } from "next";
import { Barlow, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LocalBusinessJsonLd } from "@/components/local-business-json-ld";
import { SITE_URL } from "@/lib/service-schema";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "GP Contracting Group | Construction Across Greater Vancouver",
  description:
    "Family-owned construction delivering residential, commercial, tenant improvement, and specialized construction across Greater Vancouver, Vancouver Island, and the Fraser Valley.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocalBusinessJsonLd />
        {children}
      </body>
    </html>
  );
}
