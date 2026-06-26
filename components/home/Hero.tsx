 import Container from "@/components/shared/Container";
import Section from "@/components/shared/Section";

import BackgroundPattern from "./BackgroundPattern";
import HeroButtons from "./HeroButtons";
import HeroRight from "./HeroRight";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <Section className="relative overflow-hidden pt-24 lg:pt-32">
      <BackgroundPattern />

      <Container>
        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Sol Taraf */}

          <div>

            <span className="inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
              Türkiye'nin Akıllı Yapı Malzemeleri Platformu
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-slate-900 lg:text-7xl">
              Yapı
              <span className="text-yellow-500">
                {" "}Malzemelerini
              </span>

              <br />

              Dijitalleştiriyoruz.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-600">
              İnşaat demiri, çimento, gaz beton,
              tuğla, kum, alçı ve yüzlerce yapı
              malzemesini tek platformdan inceleyin,
              teklif alın ve Türkiye'nin her yerine
              güvenle ulaştırın.
            </p>

            <HeroButtons />

            <HeroStats />

          </div>

          {/* Sağ Taraf */}

          <HeroRight />

        </div>
      </Container>
    </Section>
  );
}