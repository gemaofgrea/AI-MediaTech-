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
    "AI Cinema",
    "Virtual LED Production",
    "Haute Couture Photography",
    "8K Telecine Post-Production",
    "Generative Cinema",
    "ACES 2065-1",
    "AI MediaTech",
    "Cinema Direction",
    "Color Grading",
  ],
  openGraph: {
    title: `${siteConfig.name} // ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Studio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} // ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.svg`,
  description: siteConfig.description,
  sameAs: [
    "https://instagram.com/aimediatech",
    "https://vimeo.com/aimediatech",
    "https://youtube.com/@aimediatech",
    "https://x.com/aimediatech",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#070709] text-[#f4f3ef] antialiased selection:bg-lime-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
