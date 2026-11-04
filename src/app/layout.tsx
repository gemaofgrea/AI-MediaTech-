import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#070709",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `${siteConfig.name} // ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: [
    "Cannes Film Production",
    "Virtual LED Production",
    "Haute Couture Photography",
    "8K Telecine Post-Production",
    "Generative Cinema",
    "ACES 2065-1",
    "Fashion Lookbooks",
    "Creative Media Atelier",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#070709] text-[#f4f3ef] antialiased selection:bg-[#c5a059]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
