export default function BackgroundGlow() {
  return (
    <>
      <div className="absolute left-[-150px] top-0 h-[500px] w-[500px] rounded-full bg-yellow-300/20 blur-[120px]" />
      <div className="absolute right-[-180px] bottom-[-120px] h-[520px] w-[520px] rounded-full bg-amber-300/20 blur-[140px]" />
    </>
  );
}
