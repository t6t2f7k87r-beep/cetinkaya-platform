import { Search } from "lucide-react";

export default function ProductSearch() {
  return (
    <div className="relative w-full">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
      />

      <input
        type="text"
        placeholder="Ürün, marka veya kategori ara..."
        className="h-14 w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-5 outline-none transition focus:border-yellow-500"
      />
    </div>
  );
}