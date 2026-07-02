import { Clock, HardHat, MapPin } from "lucide-react";

import Navbar from "@/components/layout/Navbar";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="mx-auto grid min-h-[calc(100svh-96px)] max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-3xl reveal-up">
              <p className="font-bold uppercase tracking-[0.3em] text-red-300">
                Projelerimiz
              </p>

              <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
                Çok yakında sizlerle.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Çetinkayalar İnşaat olarak malzeme tedariği, sevk planlama ve
                saha koordinasyonunda yer aldığımız projeleri bu alanda düzenli
                şekilde paylaşacağız.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: HardHat, label: "Saha çalışmaları" },
                  { icon: MapPin, label: "Malatya merkezli takip" },
                  { icon: Clock, label: "Yakında yayında" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                    >
                      <Icon className="text-red-300" size={26} />
                      <p className="mt-4 font-bold text-white">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
