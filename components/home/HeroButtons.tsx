import { Button } from "@/components/ui/button";

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <Button size="lg">
        Ürünleri İncele
      </Button>

      <Button
        size="lg"
        variant="outline"
      >
        Teklif Oluştur
      </Button>
    </div>
  );
}