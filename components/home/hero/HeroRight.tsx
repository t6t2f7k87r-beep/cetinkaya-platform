 import SteelPriceCard from "./SteelPriceCard";
import TransportCard from "./TransportCard";
import AiCard from "./AiCard";

export default function HeroRight() {
  return (
    <div className="space-y-6">
      <SteelPriceCard />
      <TransportCard />
      <AiCard />
    </div>
  );
}