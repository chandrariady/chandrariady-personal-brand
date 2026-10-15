import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Field Notes",
  description:
    "Field notes on mine planning, nickel, mining technology, AI and engineering practice by Chandra Riady.",
  path: "/writing",
});

export default function WritingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
