 import Link from "next/link";

export default function NavActions() {
  return (
    <div className="hidden lg:flex items-center gap-4">
      <Link
        href="/giris"
        className="text-sm font-semibold text-slate-700 transition hover:text-red-700"
      >
        Giriş Yap
      </Link>

      <Link
        href="/teklif"
        className="rounded-xl bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-xl"
      >
        Teklif Al
      </Link>
    </div>
  );
}
