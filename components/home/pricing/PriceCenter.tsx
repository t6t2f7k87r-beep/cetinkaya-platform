import Container from "@/components/shared/Container";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";

import { prices } from "@/data/prices";

import PriceItem from "./PriceItem";

export default function PriceCenter() {
  return (
    <Section>

      <Container>

        <SectionTitle
          eyebrow="Canlı Fiyat Merkezi"
          title="Güncel Yapı Malzemesi Fiyatları"
          description="Fiyatlar yönetim panelinden anlık olarak güncellenebilir."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">

          {prices.map((item) => (
            <PriceItem
              key={item.id}
              item={item}
            />
          ))}

        </div>

      </Container>

    </Section>
  );
}