export interface NavItem {
  number?: string;
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  badge?: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  locations: string[];
  links: {
    github: string;
    instagram?: string;
    vimeo?: string;
  };
  mainNav: NavItem[];
}

export const siteConfig: SiteConfig = {
  name: "AI MediaTech",
  tagline: "Next-Gen Cinema & Neural Media Production",
  description:
    "An independent creative AI MediaTech platform directing feature films, high-fashion editorials, virtual LED production volumes, and neural media pipelines for the world's most discerning brands.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og.png",
  locations: ["PARIS", "NEW YORK", "TOKYO", "LONDON"],
  links: {
    github: "https://github.com",
    instagram: "https://instagram.com",
    vimeo: "https://vimeo.com",
  },
  mainNav: [
    {
      number: "01",
      title: "Disciplines",
      href: "#disciplines",
    },
    {
      number: "02",
      title: "Optical vs Neural",
      href: "#optical-neural",
      badge: "Suite",
    },
    {
      number: "03",
      title: "Selected Archive",
      href: "#archive",
    },
    {
      number: "04",
      title: "The Guild",
      href: "#guild",
    },
    {
      number: "05",
      title: "Production Bid",
      href: "#estimate",
      badge: "Estimator",
    },
    {
      number: "06",
      title: "Commission",
      href: "#commission",
    },
  ],
};
