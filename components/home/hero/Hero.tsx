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

      <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl items-center justify-between gap-24 px-6">

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
