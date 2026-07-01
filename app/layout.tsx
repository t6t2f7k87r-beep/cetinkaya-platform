import type { Metadata } from "next";
import LiveSupportWidget from "@/components/support/LiveSupportWidget";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cetinkayayapi.com"),

  title: {
    default: "Çetinkaya İnşaat Malzemeleri",
    template: "%s | Çetinkaya Yapı",
  },

  description:
    "İnşaat demiri, çimento, gaz beton, tuğla, kum, alçı ve diğer yapı malzemelerinde güvenilir tedarikçi. Online teklif, akıllı nakliye ve profesyonel hizmet.",

  keywords: [
    "İnşaat Demiri",
    "Çimento",
    "Gaz Beton",
    "Tuğla",
    "Kum",
    "Yapı Malzemeleri",
    "İnşaat Malzemeleri",
    "Demir Fiyatları",
    "Çetinkaya Yapı",
  ],

  authors: [
    {
      name: "Çetinkaya Yapı",
    },
  ],

  creator: "Çetinkaya Yapı",

  publisher: "Çetinkaya Yapı",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Çetinkaya İnşaat Malzemeleri",

    description:
      "İnşaat malzemesi satışı, teklif, nakliye ve ödeme yönetimi",

    url: "https://cetinkayayapi.com",

    siteName: "Çetinkaya Yapı",

    locale: "tr_TR",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Çetinkaya Yapı",

    description:
      "İnşaat malzemesi satışı, teklif, nakliye ve ödeme yönetimi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        {children}
        <LiveSupportWidget />
      </body>
    </html>
  );
}
