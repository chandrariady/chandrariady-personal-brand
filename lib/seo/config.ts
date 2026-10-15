export const siteConfig = {
  name: "Chandra Riady",
  title: "Chandra Riady | Mining, Technology & AI",
  description:
    "Mining knowledge, mine planning insights, technology experiments and practical ideas by Chandra Riady.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en_ID",
  language: "en",
  author: "Chandra Riady",
  email: "",
  keywords: [
    "Chandra Riady",
    "mine planning",
    "mining technology",
    "nickel laterite",
    "mining consultant",
    "AI in mining",
    "Indonesia mining",
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
