 import Link from "next/link";

export default function NavLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-700 to-slate-950 text-xl font-black text-white shadow-lg">
        Ç
      </div>

      <div className="leading-tight">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">
          ÇETİNKAYA
        </h2>

        <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
          Yapı Platformu
        </p>
      </div>
    </Link>
  );
}
