import Container from "@/components/shared/Container";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";

import { featuredProducts } from "@/data/products";

import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  return (
    <Section>
      <Container>

        <SectionTitle
          eyebrow="En Çok Satanlar"
          title="Popüler Yapı Malzemeleri"
          description="En çok tercih edilen ürünleri inceleyin ve anında teklif alın."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </Container>
    </Section>
  );
}