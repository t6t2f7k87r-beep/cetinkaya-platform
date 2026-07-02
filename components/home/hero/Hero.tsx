import BackgroundGlow from "./BackgroundGlow";
import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroDescription from "./HeroDescription";
import HeroHeading from "./HeroHeading";
import HeroRight from "./HeroRight";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-red-50">
      <BackgroundGlow />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-96px)] w-full max-w-6xl items-center gap-14 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] lg:gap-16 lg:px-8 lg:py-20 xl:gap-20">
        <div className="max-w-2xl reveal-up">
          <HeroBadge />
          <HeroHeading />
          <HeroDescription />

          <HeroButtons />

          <HeroStats />

        </div>

        <HeroRight />
      </div>

    </section>
  );
}
