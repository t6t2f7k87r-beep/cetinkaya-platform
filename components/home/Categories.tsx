 const categories = [
  {
    icon: "🏗️",
    title: "Demir",
    description: "İnşaat demiri ve çelik ürünleri",
  },
  {
    icon: "🧱",
    title: "Tuğla",
    description: "Tuğla ve duvar ürünleri",
  },
  {
    icon: "🏢",
    title: "Çimento",
    description: "Tüm çimento çeşitleri",
  },
  {
    icon: "🪨",
    title: "Gaz Beton",
    description: "Ytong ve gaz beton ürünleri",
  },
  {
    icon: "🪟",
    title: "PVC",
    description: "Kapı ve pencere sistemleri",
  },
  {
    icon: "🧰",
    title: "Yalıtım",
    description: "Isı ve su yalıtımı",
  },
  {
    icon: "⚡",
    title: "Elektrik",
    description: "Elektrik malzemeleri",
  },
  {
    icon: "🚿",
    title: "Tesisat",
    description: "Sıhhi tesisat ürünleri",
  },
];

export default function Categories() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14">

          <p className="font-bold uppercase tracking-[0.3em] text-yellow-500">
            KATEGORİLER
          </p>

          <h2 className="mt-4 text-5xl font-black text-zinc-900">
            Yapı Malzemeleri
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-zinc-500">
            İhtiyacınız olan tüm yapı malzemelerine tek platformdan ulaşın.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {categories.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-300 hover:shadow-2xl"
            >
              <div className="text-5xl">
                {item.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-zinc-500">
                {item.description}
              </p>

              <button className="mt-8 font-bold text-yellow-500 transition group-hover:translate-x-2">
                İncele →
              </button>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}