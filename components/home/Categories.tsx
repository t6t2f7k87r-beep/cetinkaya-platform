import {
  Building2,
  BrickWall,
  Cylinder,
  Package,
  Pickaxe,
  Hammer,
  Layers3,
  Shield,
} from "lucide-react";

import Container from "@/components/shared/Container";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";

const categories = [
  {
    title: "İnşaat Demiri",
    icon: Building2,
    count: "25+ Ürün",
  },
  {
    title: "Çimento",
    icon: Package,
    count: "12+ Ürün",
  },
  {
    title: "Tuğla",
    icon: BrickWall,
    count: "30+ Ürün",
  },
  {
    title: "Gaz Beton",
    icon: Layers3,
    count: "18+ Ürün",
  },
  {
    title: "Alçı",
    icon: Cylinder,
    count: "20+ Ürün",
  },
  {
    title: "Kireç",
    icon: Pickaxe,
    count: "8+ Ürün",
  },
  {
    title: "Kum",
    icon: Shield,
    count: "15+ Ürün",
  },
  {
    title: "Çivi & Tel",
    icon: Hammer,
    count: "40+ Ürün",
  },
];

export default function Categories() {
  return (
    <Section className="bg-slate-50">
      <Container>
        <SectionTitle
          eyebrow="Kategoriler"
          title="İhtiyacınız Olan Tüm Yapı Malzemeleri"
          description="Türkiye'nin en geniş yapı malzemesi kataloğunu tek platformda keşfedin."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 transition group-hover:bg-yellow-500">
                  <Icon
                    size={30}
                    className="text-yellow-600 transition group-hover:text-white"
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {category.title}
                </h3>

                <p className="mt-2 text-slate-500">
                  {category.count}
                </p>

                <button className="mt-8 font-semibold text-yellow-600 transition hover:translate-x-2">
                  İncele →
                </button>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}