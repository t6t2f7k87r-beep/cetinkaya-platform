export default function BackgroundPattern() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-red-200/30 blur-3xl" />

      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-slate-300/30 blur-3xl" />
    </div>
  );
}
