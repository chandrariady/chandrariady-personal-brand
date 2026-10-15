import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chandra Riady | Mining, Technology & AI",
    short_name: "Chandra Riady",
    description: "Mining knowledge, mine planning insights, technology experiments and practical ideas.",
    start_url: "/",
    display: "standalone",
    background_color: "#07110f",
    theme_color: "#07110f",
  };
}
