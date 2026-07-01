interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full bg-red-50 px-4 py-1 text-sm font-semibold text-red-700 ring-1 ring-red-100">
          {eyebrow}
        </span>
      )}

      <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}
