import BackgroundGlow from "./BackgroundGlow";
import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroDescription from "./HeroDescription";
import HeroHeading from "./HeroHeading";
import HeroRight from "./HeroRight";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-amber-50 to-yellow-100">
      <BackgroundGlow />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] lg:gap-14 lg:px-8 lg:py-14 xl:gap-16">
        <div className="max-w-2xl">
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
