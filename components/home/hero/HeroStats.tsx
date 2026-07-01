 const stats = [
  {
    value: "10.000+",
    label: "Ürün",
  },
  {
    value: "500+",
    label: "Tedarikçi",
  },
  {
    value: "81",
    label: "İl",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-16 grid grid-cols-3 gap-10">

      {stats.map((item) => (
        <div key={item.label}>

          <h2 className="text-5xl font-black text-zinc-900">
            {item.value}
          </h2>

          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {item.label}
          </p>

        </div>
      ))}

    </div>
  );
}