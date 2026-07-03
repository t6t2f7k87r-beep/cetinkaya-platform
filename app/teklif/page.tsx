import { Suspense } from "react";

import CheckoutPanel from "@/components/payment/CheckoutPanel";
import Navbar from "@/components/layout/Navbar";

export default function QuotePage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Suspense fallback={<div className="text-slate-600">Teklif ekranı hazırlanıyor...</div>}>
            <CheckoutPanel />
          </Suspense>
        </section>
      </main>
    </>
  );
}
