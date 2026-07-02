import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Çetinkayalar İnşaat Malzemeleri",
    short_name: "Çetinkayalar",
    description:
      "Malatya merkezli inşaat malzemesi satış, teklif, nakliye ve e-fatura programı.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#c80012",
    lang: "tr",
    categories: ["business", "shopping"],
    icons: [
      {
        src: "/brand/cetinkayalar-logo.png",
        sizes: "320x320",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
