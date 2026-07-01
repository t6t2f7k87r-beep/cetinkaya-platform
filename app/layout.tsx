import type { Metadata } from "next";
import LiveSupportWidget from "@/components/support/LiveSupportWidget";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cetinkayalarinsaat.com"),

  title: {
    default: "Çetinkayalar İnşaat Malzemeleri",
    template: "%s | Çetinkayalar İnşaat",
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
    "Çetinkayalar İnşaat",
  ],

  authors: [
    {
      name: "Çetinkayalar İnşaat",
    },
  ],

  creator: "Çetinkayalar İnşaat",

  publisher: "Çetinkayalar İnşaat",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Çetinkayalar İnşaat Malzemeleri",

    description:
      "İnşaat malzemesi satışı, teklif, nakliye ve ödeme yönetimi",

    url: "https://www.cetinkayalarinsaat.com",

    siteName: "Çetinkayalar İnşaat",

    locale: "tr_TR",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Çetinkayalar İnşaat",

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
