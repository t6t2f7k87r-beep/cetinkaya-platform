 "use client";

import Link from "next/link";

const links = [
  {
    title: "Anasayfa",
    href: "/",
  },
  {
    title: "Ürünler",
    href: "/urunler",
  },
  {
    title: "Kategoriler",
    href: "/kategoriler",
  },
  {
    title: "Nakliye",
    href: "/nakliye",
  },
  {
    title: "AI Asistan",
    href: "/ai",
  },
  {
    title: "İletişim",
    href: "/iletisim",
  },
];

export default function DesktopNav() {
  return (
    <nav className="hidden lg:flex items-center gap-10">
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group relative text-[15px] font-semibold text-zinc-700 transition-all duration-300 hover:text-yellow-600"
        >
          {item.title}

          <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-yellow-500 transition-all duration-300 group-hover:w-full" />
        </Link>
      ))}
    </nav>
  );
}