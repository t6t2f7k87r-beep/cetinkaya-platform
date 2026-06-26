 import Container from "@/components/shared/Container";
import HeroButtons from "./HeroButtons";
import HeroRight from "./HeroRight";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-amber-50 to-yellow-100">

      <Container>

        <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-28 py-20 lg:grid-cols-[1.1fr_0.9fr]">

          <div className="max-w-xl">

            <span className="inline-flex rounded-full border border-yellow-200 bg-yellow-100 px-5 py-2 text-sm font-semibold text-yellow-700">
              Türkiye'nin En Büyük Dijital Yapı Platformu
            </span>

            <h1 className="mt-8 text-5xl font-black leading-[0.95] tracking-tight text-zinc-900 lg:text-7xl">
              İnşaatın
              <br />
              <span className="text-yellow-500">
                Dijital Merkezi
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-xl leading-9 text-zinc-600">
              Demir, çimento, gaz beton, tuğla, seramik ve binlerce yapı
              malzemesini tek platformdan keşfedin, fiyat alın ve Türkiye'nin
              her yerine güvenle ulaştırın.
            </p>

            <div className="mt-10">
              <HeroButtons />
            </div>

            <div className="mt-14">
              <HeroStats />
            </div>

          </div>

          <div className="flex justify-end">
            <HeroRight />
          </div>

        </div>

      </Container>

    </section>
  );
}