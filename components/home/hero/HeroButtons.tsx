 export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap gap-5">
      <button className="rounded-2xl bg-yellow-500 px-9 py-5 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-600">
        Ürünleri İncele
      </button>

      <button className="rounded-2xl border-2 border-zinc-300 bg-white px-9 py-5 text-lg font-bold text-zinc-800 transition-all duration-300 hover:border-yellow-500 hover:text-yellow-600">
        Fiyat Teklifi Al
      </button>
    </div>
  );
}