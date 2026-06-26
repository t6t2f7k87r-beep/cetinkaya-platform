 import Link from "next/link";

export default function NavActions() {
  return (
    <div className="hidden lg:flex items-center gap-4">
      <Link
        href="/giris"
        className="text-sm font-semibold text-zinc-700 transition hover:text-yellow-600"
      >
        Giriş Yap
      </Link>

      <Link
        href="/teklif"
        className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-bold text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400 hover:shadow-xl"
      >
        Teklif Al
      </Link>
    </div>
  );
}