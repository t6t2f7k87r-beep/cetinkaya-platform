type PriceCardProps = {
  title: string;
  price: string;
  change: string;
  positive?: boolean;
};

export default function PriceCard({
  title,
  price,
  change,
  positive = true,
}: PriceCardProps) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-bold text-zinc-900">
          {title}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            positive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {change}
        </span>

      </div>

      <p className="mt-6 text-5xl font-black text-zinc-900">
        {price}
      </p>

      <p className="mt-3 text-zinc-500">
        Güncel ton fiyatı
      </p>

    </div>
  );
}