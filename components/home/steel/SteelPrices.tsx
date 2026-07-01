import PriceCard from "./PriceCard";

export default function SteelPrices() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16">

          <span className="font-bold uppercase tracking-[0.3em] text-red-700">
            CANLI PİYASA
          </span>

          <h2 className="mt-4 text-5xl font-black text-slate-950">
            Güncel Demir Fiyatları
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Fiyatlar ileride API ile otomatik güncellenecek.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          <PriceCard
            title="B420C 8-32 mm"
            price="₺32.450"
            change="+1.8%"
          />

          <PriceCard
            title="Kangal Demir"
            price="₺31.980"
            change="+0.9%"
          />

          <PriceCard
            title="Hasır Çelik"
            price="₺33.120"
            change="-0.4%"
            positive={false}
          />

        </div>

      </div>

    </section>
  );
}
