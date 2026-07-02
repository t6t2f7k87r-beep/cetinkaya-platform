import Link from "next/link";
import Image from "next/image";

export default function NavLogo() {
  return (
    <Link
      href="/"
      className="flex min-w-0 items-center gap-2.5 transition-transform duration-300 hover:scale-105 sm:gap-3"
    >
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-200 sm:h-14 sm:w-14 sm:rounded-2xl">
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
        <h2 className="truncate text-base font-black tracking-tight text-slate-950 min-[380px]:text-lg sm:text-2xl">
          ÇETİNKAYALAR
        </h2>

        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500 sm:text-xs sm:tracking-[0.25em]">
          İnşaat
        </p>
      </div>
    </Link>
  );
}
