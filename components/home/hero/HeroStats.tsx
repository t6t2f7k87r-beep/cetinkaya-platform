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
    <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 sm:gap-6 lg:mt-14">

      {stats.map((item) => (
        <div key={item.label}>

          <h2 className="text-3xl font-black text-slate-950 sm:text-4xl lg:text-5xl">
            {item.value}
          </h2>

          <p className="mt-2 text-xs font-semibold uppercase text-slate-500 sm:text-sm">
            {item.label}
          </p>

        </div>
      ))}

    </div>
  );
}
