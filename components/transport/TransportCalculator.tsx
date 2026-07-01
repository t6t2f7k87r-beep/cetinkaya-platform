 import TransportForm from "./TransportForm";
import TransportResult from "./TransportResult";

export default function TransportCalculator() {
  return (
    <section className="bg-zinc-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14">
          <span className="font-bold uppercase tracking-[0.3em] text-yellow-500">
            NAKLİYE
          </span>

          <h2 className="mt-4 text-5xl font-black text-zinc-900">
            Nakliye Hesaplama
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-zinc-500">
            Güzergâhınızı ve yük miktarınızı girerek yaklaşık taşıma maliyetini öğrenin.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          <TransportForm />

          <TransportResult />

        </div>

      </div>
    </section>
  );
}