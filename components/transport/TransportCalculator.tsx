 import Container from "@/components/shared/Container";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";

import TransportForm from "./TransportForm";
import TransportResult from "./TransportResult";

export default function TransportCalculator() {
  return (
    <Section className="bg-slate-50">
      <Container>
        <SectionTitle
          eyebrow="Akıllı Nakliye"
          title="Nakliye Maliyetinizi Hesaplayın"
          description="İl, araç tipi ve tonaj seçerek tahmini nakliye maliyetinizi saniyeler içinde öğrenin."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <TransportForm />
          <TransportResult />
        </div>
      </Container>
    </Section>
  );
}