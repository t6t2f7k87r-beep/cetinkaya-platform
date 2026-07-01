import type { MetadataRoute } from "next";

const siteUrl = "https://www.cetinkayalarinsaat.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/urunler",
    "/kategoriler",
    "/nakliye",
    "/ai",
    "/teklif",
    "/iletisim",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/urunler" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
