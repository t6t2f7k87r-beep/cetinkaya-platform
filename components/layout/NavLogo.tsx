import Link from "next/link";
import Image from "next/image";

export default function NavLogo() {
  return (
    <Link
      href="/"
      className="flex min-w-0 items-center gap-3 transition-transform duration-300 hover:scale-105"
    >
      <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
        <Image
          src="/brand/cetinkayalar-logo.png"
          alt="Çetinkayalar İnşaat logosu"
          fill
          sizes="56px"
          className="object-contain p-1"
          priority
        />
      </div>

      <div className="min-w-0 leading-tight">
        <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
          ÇETİNKAYALAR
        </h2>

        <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
          İnşaat
        </p>
      </div>
    </Link>
  );
}
