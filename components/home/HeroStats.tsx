 const stats = [
  {
    value: "500+",
    label: "Ürün Çeşidi",
  },
  {
    value: "81",
    label: "İle Nakliye",
  },
  {
    value: "24/7",
    label: "Destek",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-14 grid max-w-xl grid-cols-3 gap-6">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur"
        >
          <h3 className="text-3xl font-black text-yellow-500">
            {item.value}
          </h3>

          <p className="mt-2 text-sm font-medium text-slate-500">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}