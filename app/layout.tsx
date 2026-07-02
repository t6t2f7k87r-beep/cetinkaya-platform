import type { Metadata } from "next";
import LiveSupportWidget from "@/components/support/LiveSupportWidget";
import ScrollReveal from "@/components/shared/ScrollReveal";
import "./globals.css";

const siteUrl = "https://www.cetinkayalarinsaat.com";
const logoUrl = `${siteUrl}/brand/cetinkayalar-logo.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Çetinkayalar İnşaat Malzemeleri | Malatya Yapı Market",
    template: "%s | Çetinkayalar İnşaat",
  },

  description:
    "Malatya merkezli Çetinkayalar İnşaat Malzemeleri; inşaat demiri, çimento, gaz beton, tuğla, bims, kireç, tutkal ve nakliye hizmetlerinde güvenilir satış programı.",

  keywords: [
    "Malatya İnşaat Malzemeleri",
    "Malatya Yapı Market",
    "Malatya Demir Fiyatları",
    "Malatya Çimento",
    "Malatya Gaz Beton",
    "İnşaat Demiri",
    "Çimento",
    "Gaz Beton",
    "Tuğla",
    "Bims",
    "Ytong",
    "Kireç",
    "Tutkal",
    "Nakliye Hesaplama",
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

  category: "İnşaat Malzemeleri",

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: [
      {
        url: "/brand/cetinkayalar-logo.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/brand/cetinkayalar-logo.png",
        type: "image/png",
      },
    ],
  },

  manifest: "/manifest.webmanifest",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Çetinkayalar İnşaat Malzemeleri | Malatya Yapı Market",

    description:
      "Malatya'da inşaat demiri, çimento, gaz beton, tuğla, bims, kireç, tutkal ve nakliye hizmetleri.",

    url: siteUrl,

    siteName: "Çetinkayalar İnşaat",

    locale: "tr_TR",

    type: "website",

    images: [
      {
        url: logoUrl,
        width: 320,
        height: 320,
        alt: "Çetinkayalar İnşaat logosu",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Çetinkayalar İnşaat Malzemeleri",

    description:
      "Malatya merkezli inşaat malzemesi satışı, teklif, nakliye ve e-fatura yönetimi.",

    images: [logoUrl],
  },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  "@id": `${siteUrl}/#business`,
  name: "Çetinkayalar İnşaat Malzemeleri",
  alternateName: "Çetinkayalar İnşaat",
  url: siteUrl,
  logo: logoUrl,
  image: logoUrl,
  telephone: "+904223365500",
  email: "cetinkaya.n@outlook.com",
  priceRange: "₺₺",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hoca Ahmet Yesevi Mah. Apak Sok. No:10/A",
    addressLocality: "Yeşilyurt",
    addressRegion: "Malatya",
    postalCode: "44100",
    addressCountry: "TR",
  },
  areaServed: [
    "Malatya",
    "Yeşilyurt",
    "Battalgazi",
    "Doğanşehir",
    "Akçadağ",
    "Elazığ",
    "Adıyaman",
    "Kahramanmaraş",
  ],
  sameAs: [
    "https://www.google.com/maps/search/?api=1&query=Hoca%20Ahmet%20Yesevi%20Mah.%20Apak%20Sok.%20No%3A10%2FA%20Ye%C5%9Filyurt%20Malatya",
  ],
  description:
    "Malatya merkezli Çetinkayalar İnşaat Malzemeleri, 10 yılı aşkın tecrübesiyle inşaat demiri, çimento, gaz beton, tuğla, bims, kireç ve nakliye hizmetleri sunar.",
  makesOffer: [
    "İnşaat demiri",
    "Çimento",
    "Gaz beton",
    "Bims",
    "Tuğla",
    "Kireç",
    "Tutkal",
    "Nakliye",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      name,
    },
  })),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "Çetinkayalar İnşaat Malzemeleri",
  url: siteUrl,
  publisher: {
    "@id": `${siteUrl}/#business`,
  },
  inLanguage: "tr-TR",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/urunler?q={search_term_string}`,
    "query-input": "required name=search_term_string",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([businessSchema, websiteSchema]),
          }}
        />
        <ScrollReveal />
        {children}
        <LiveSupportWidget />
      </body>
    </html>
  );
}
