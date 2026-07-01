type Props = {
  activeCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
};

export default function ProductFilter({
  activeCategory,
  categories,
  onCategoryChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const active = category === activeCategory;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`rounded-full px-5 py-2 font-semibold transition ${
              active
                ? "bg-red-700 text-white"
                : "border border-slate-200 text-slate-700 hover:border-red-200 hover:text-red-700"
            }`}
          >
            {category}
          </button>
        );
      })}

    </div>
  );
}
