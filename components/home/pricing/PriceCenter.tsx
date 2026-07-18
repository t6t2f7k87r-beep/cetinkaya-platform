import Container from "@/components/shared/Container";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";

import { prices } from "@/data/prices";

import PriceItem from "./PriceItem";

export default function PriceCenter() {
  return (
    <Section className="bg-white">

      <Container>

        <SectionTitle
          eyebrow="Canlı Fiyat Merkezi"
          title="Güncel Yapı Malzemesi Fiyatları"
          description="Demir, çimento, gaz beton ve temel yapı malzemeleri için güncel teklif seviyelerini inceleyin."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">

          {prices.map((item) => (
            <div key={item.id} data-reveal="scale">
              <PriceItem item={item} />
            </div>
          ))}

        </div>

      </Container>

    </Section>
  );
}
