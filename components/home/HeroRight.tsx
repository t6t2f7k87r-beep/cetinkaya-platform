 import AiCard from "./AiCard";
import PriceCard from "./PriceCard";
import TransportCard from "./TransportCard";

export default function HeroRight() {
  return (
    <div className="relative">

      {/* Arka Glow */}
      <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-yellow-300/20 blur-3xl" />

      <div className="relative space-y-6">

        <PriceCard />

        <div className="grid gap-6 md:grid-cols-2">

          <TransportCard />

          <AiCard />

        </div>

      </div>

    </div>
  );
}