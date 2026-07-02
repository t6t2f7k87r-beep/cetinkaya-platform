import SteelPriceCard from "./SteelPriceCard";
import TransportCard from "./TransportCard";
import AiCard from "./AiCard";

export default function HeroRight() {
  return (
    <div className="w-full max-w-[460px] space-y-3 justify-self-center lg:justify-self-end lg:space-y-4">
      <div className="reveal-scale" style={{ animationDelay: "120ms" }}>
        <div className="soft-float">
          <SteelPriceCard />
        </div>
      </div>
      <div className="reveal-scale" style={{ animationDelay: "220ms" }}>
        <TransportCard />
      </div>
      <div className="reveal-scale" style={{ animationDelay: "320ms" }}>
        <AiCard />
      </div>
    </div>
  );
}
