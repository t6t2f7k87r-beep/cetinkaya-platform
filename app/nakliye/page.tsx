import { Suspense } from "react";

import Navbar from "@/components/layout/Navbar";
import TransportCalculator from "@/components/transport/TransportCalculator";

export default function TransportPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<div className="p-8 text-slate-600">Nakliye hesaplama yükleniyor...</div>}>
          <TransportCalculator />
        </Suspense>
      </main>
    </>
  );
}
