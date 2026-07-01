import SteelPriceCard from "./SteelPriceCard";
import TransportCard from "./TransportCard";
import AiCard from "./AiCard";

export default function HeroRight() {
  return (
    <div className="w-full max-w-[460px] space-y-4 justify-self-center lg:justify-self-end">
      <SteelPriceCard />
      <TransportCard />
      <AiCard />
    </div>
  );
}
