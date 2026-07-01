 import HeroButtons from "./HeroButtons";
import HeroRight from "./HeroRight";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-amber-50 to-yellow-100">

      {/* Glow */}
      <div className="absolute left-[-150px] top-0 h-[500px] w-[500px] rounded-full bg-yellow-300/20 blur-[120px]" />

      <div className="absolute right-[-180px] bottom-[-120px] h-[520px] w-[520px] rounded-full bg-amber-300/20 blur-[140px]" />

      <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl items-center justify-between gap-24 px-6">

        {/* LEFT */}

        <div className="max-w-2xl">

          <div className="inline-flex rounded-full border border-yellow-200 bg-yellow-100 px-5 py-2 text-sm font-bold text-yellow-700">
            🇹🇷 Türkiye&apos;nin En Büyük Dijital Yapı Platformu
          </div>

          <h1 className="mt-10 text-7xl font-black leading-[0.95] tracking-tight text-zinc-900">

            İnşaatın

            <br />

            <span className="text-yellow-500">
              Dijital Merkezi
            </span>

          </h1>

          <p className="mt-10 max-w-xl text-xl leading-9 text-zinc-600">

            Demirden çimentoya...

            Gaz betondan seramiğe...

            Türkiye&apos;nin en kapsamlı yapı platformu.

          </p>

          <HeroButtons />

          <HeroStats />

        </div>

        {/* RIGHT */}

        <HeroRight />

      </div>

    </section>
  );
}
