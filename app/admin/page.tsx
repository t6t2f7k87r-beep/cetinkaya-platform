"use client";

import {
  Archive,
  BarChart3,
  FileText,
  KeyRound,
  PackageCheck,
  Plug,
  RefreshCw,
  Settings2,
  Save,
  Truck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import { endAdminSession, isAdminSessionActive, syncAdminSession } from "@/lib/auth";
import {
  addSteelBundle,
  getCustomerRegistrations,
  getIdisSettings,
  getIntegrationSettings,
  getManagedProducts,
  getManagedVehicles,
  getSales,
  getSteelBundles,
  getTransportOrders,
  resetCommerceStore,
  saveIdisSettings,
  saveIntegrationSettings,
  saveManagedProducts,
  saveManagedVehicles,
  simulateIntegrationHealthCheck,
  simulateIdisSync,
} from "@/lib/commerce-store";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => isAdminSessionActive());
  const [products, setProducts] = useState(() => getManagedProducts());
  const [vehicles, setVehicles] = useState(() => getManagedVehicles());
  const [sales, setSales] = useState(() => getSales());
  const [transportOrders, setTransportOrders] = useState(() => getTransportOrders());
  const [bundles, setBundles] = useState(() => getSteelBundles());
  const [idisSettings, setIdisSettings] = useState(() => getIdisSettings());
  const [integrationSettings, setIntegrationSettings] = useState(() =>
    getIntegrationSettings(),
  );
  const [registrations, setRegistrations] = useState(() => getCustomerRegistrations());
  const [bundleId, setBundleId] = useState("");
  const [bundleWeight, setBundleWeight] = useState(5);
  const [bundleProductId, setBundleProductId] = useState(
    () => getManagedProducts().find((product) => product.category === "Demir")?.id ?? 1,
  );
  const [status, setStatus] = useState("");

  useEffect(() => {
    void syncAdminSession().then(setIsLoggedIn);
  }, []);

  const cards = useMemo(
    () => [
      {
        icon: PackageCheck,
        label: "Toplam Stok",
        value: products
          .reduce((sum, product) => sum + product.stockQuantity, 0)
          .toLocaleString("tr-TR"),
      },
      {
        icon: Truck,
        label: "Nakliye Kaydı",
        value: transportOrders.length.toString(),
      },
      {
        icon: FileText,
        label: "Stoktaki Demir Bağı",
        value: bundles.filter((bundle) => bundle.status === "stokta").length.toString(),
      },
      {
        icon: Plug,
        label: "İDİS Durumu",
        value: idisSettings.status === "bagli" ? "Bağlı" : "Bekliyor",
      },
      {
        icon: Users,
        label: "Satış Toplamı",
        value: `₺${sales
          .reduce((sum, sale) => sum + sale.total, 0)
          .toLocaleString("tr-TR")}`,
      },
      {
        icon: KeyRound,
        label: "Yeni Kayıt",
        value: registrations
          .filter((registration) => registration.status === "yeni")
          .length.toString(),
      },
    ],
    [bundles, idisSettings.status, products, registrations, sales, transportOrders],
  );

  function refreshAll(message?: string) {
    setProducts(getManagedProducts());
    setVehicles(getManagedVehicles());
    setSales(getSales());
    setTransportOrders(getTransportOrders());
    setBundles(getSteelBundles());
    setIdisSettings(getIdisSettings());
    setIntegrationSettings(getIntegrationSettings());
    setRegistrations(getCustomerRegistrations());

    if (message) {
      setStatus(message);
    }
  }

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <main className="bg-slate-50">
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-950/5">
              <h1 className="text-3xl font-black text-slate-950">
                Admin paneli için giriş gerekli
              </h1>

              <p className="mt-4 leading-7 text-slate-600">
                Ürün, stok, nakliye, İDİS bağ ve sevk yönetimini görmek için
                üye girişi ekranından oturum açın.
              </p>

              <Link
                href="/giris"
                className="mt-8 inline-flex rounded-2xl bg-red-700 px-6 py-3 font-bold text-white transition hover:bg-red-800"
              >
                Giriş Ekranına Git
              </Link>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-slate-50">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-bold uppercase tracking-[0.3em] text-red-700">
                Admin Paneli
              </p>

              <h1 className="mt-4 text-5xl font-black text-slate-950">
                Tek tıkla satış ve stok yönetimi
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Ürün fiyatı, stok, demir bağları, nakliye tarifeleri ve sevk
                kayıtları bu ekrandan yönetilir. Satış onaylanınca stok ve
                sevk kayıtları otomatik güncellenir.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => refreshAll("Ekran güncellendi.")}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 transition hover:border-red-200 hover:text-red-700"
              >
                <RefreshCw size={18} />
                Yenile
              </button>

              <button
                type="button"
                onClick={() => {
                  endAdminSession();
                  setIsLoggedIn(false);
                }}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 transition hover:border-red-200 hover:text-red-700"
              >
                Çıkış Yap
              </button>
            </div>
          </div>

          {status ? (
            <p className="mb-6 rounded-2xl bg-red-50 px-5 py-4 font-semibold text-red-700">
              {status}
            </p>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.label}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                    <Icon size={24} />
                  </div>

                  <p className="mt-5 text-sm font-bold uppercase text-slate-500">
                    {card.label}
                  </p>

                  <h2 className="mt-2 text-4xl font-black text-slate-950">
                    {card.value}
                  </h2>
                </article>
              );
            })}
          </div>

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                    <Plug size={24} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-slate-950">
                      İDİS koordinasyon ayarları
                    </h2>
                    <p className="mt-1 text-sm font-bold text-slate-500">
                      Durum: {idisSettings.status === "bagli" ? "Bağlantı hazır" : "Hesap bilgisi bekleniyor"}
                    </p>
                  </div>
                </div>

                <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                  İDİS hesabını ilettiğinde bu alana endpoint, kullanıcı ve
                  token bilgileri girilecek. Demir bağı eklendiğinde site
                  stoğuna düşecek; satış yapıldığında bağ sevke çekilecek ve
                  İDİS senkronizasyon kuyruğunda işaretlenecek.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const result = simulateIdisSync();
                  refreshAll(result.message);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-red-700"
              >
                <RefreshCw size={18} />
                İDİS Senkronize Et
              </button>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr_1fr_160px]">
              <label className="block">
                <span className="text-sm font-bold text-slate-600">
                  İDİS API Adresi
                </span>
                <input
                  value={idisSettings.endpoint}
                  onChange={(event) =>
                    setIdisSettings((current) => ({
                      ...current,
                      endpoint: event.target.value,
                    }))
                  }
                  placeholder="https://..."
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-red-700"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-600">
                  Kullanıcı / Firma Kodu
                </span>
                <input
                  value={idisSettings.username}
                  onChange={(event) =>
                    setIdisSettings((current) => ({
                      ...current,
                      username: event.target.value,
                    }))
                  }
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-red-700"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-600">
                  Token / Şifre
                </span>
                <input
                  value={idisSettings.tokenPreview}
                  type="password"
                  onChange={(event) =>
                    setIdisSettings((current) => ({
                      ...current,
                      tokenPreview: event.target.value,
                    }))
                  }
                  placeholder="Sonradan eklenecek"
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-red-700"
                />
              </label>

              <label className="flex items-center gap-3 self-end rounded-2xl border border-slate-200 px-4 py-3">
                <input
                  checked={idisSettings.enabled}
                  type="checkbox"
                  onChange={(event) =>
                    setIdisSettings((current) => ({
                      ...current,
                      enabled: event.target.checked,
                    }))
                  }
                  className="h-5 w-5 accent-red-700"
                />
                <span className="font-bold text-slate-700">Aktif</span>
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-sm font-semibold text-slate-500">
                Son senkronizasyon:{" "}
                {idisSettings.lastSyncAt
                  ? new Date(idisSettings.lastSyncAt).toLocaleString("tr-TR")
                  : "Henüz yapılmadı"}
              </p>

              <button
                type="button"
                onClick={() => {
                  saveIdisSettings(idisSettings);
                  refreshAll("İDİS bağlantı ayarları kaydedildi.");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-700 px-5 py-3 font-bold text-white"
              >
                <Save size={18} />
                İDİS Ayarlarını Kaydet
              </button>
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                    <Settings2 size={24} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-slate-950">
                      E-fatura, e-arşiv ve servis entegrasyonları
                    </h2>
                    <p className="mt-1 text-sm font-bold text-slate-500">
                      Durum: {integrationSettings.status === "hazir" ? "Gönderime hazır" : "Kurulum bekliyor"}
                    </p>
                  </div>
                </div>

                <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                  Özel entegratör, e-arşiv, İDİS webhook ve nakliye servis
                  adresleri bu merkezden yönetilir. Canlı API kullanıcı
                  bilgileri geldiğinde fatura gönderimi ve senkronizasyon aynı
                  panelden aktif edilir.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const result = simulateIntegrationHealthCheck();
                  refreshAll(result.message);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-red-700"
              >
                <RefreshCw size={18} />
                Bağlantıları Kontrol Et
              </button>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-slate-600">
                  Özel Entegratör
                </span>
                <input
                  value={integrationSettings.einvoiceProvider}
                  onChange={(event) =>
                    setIntegrationSettings((current) => ({
                      ...current,
                      einvoiceProvider: event.target.value,
                    }))
                  }
                  placeholder="Logo, Paraşüt, Uyumsoft, Mikro vb."
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-red-700"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-600">
                  E-Fatura / E-Arşiv API Adresi
                </span>
                <input
                  value={integrationSettings.einvoiceEndpoint}
                  onChange={(event) =>
                    setIntegrationSettings((current) => ({
                      ...current,
                      einvoiceEndpoint: event.target.value,
                    }))
                  }
                  placeholder="https://api..."
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-red-700"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-600">
                  Entegratör Kullanıcı
                </span>
                <input
                  value={integrationSettings.einvoiceUsername}
                  onChange={(event) =>
                    setIntegrationSettings((current) => ({
                      ...current,
                      einvoiceUsername: event.target.value,
                    }))
                  }
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-red-700"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-600">
                  Entegratör Token / Şifre
                </span>
                <input
                  value={integrationSettings.einvoiceTokenPreview}
                  type="password"
                  onChange={(event) =>
                    setIntegrationSettings((current) => ({
                      ...current,
                      einvoiceTokenPreview: event.target.value,
                    }))
                  }
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-red-700"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-600">
                  İDİS Webhook Adresi
                </span>
                <input
                  value={integrationSettings.idisWebhookUrl}
                  onChange={(event) =>
                    setIntegrationSettings((current) => ({
                      ...current,
                      idisWebhookUrl: event.target.value,
                    }))
                  }
                  placeholder="https://..."
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-red-700"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-600">
                  Nakliye Servis API Adresi
                </span>
                <input
                  value={integrationSettings.transportApiEndpoint}
                  onChange={(event) =>
                    setIntegrationSettings((current) => ({
                      ...current,
                      transportApiEndpoint: event.target.value,
                    }))
                  }
                  placeholder="https://..."
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-red-700"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                  <input
                    checked={integrationSettings.einvoiceEnabled}
                    type="checkbox"
                    onChange={(event) =>
                      setIntegrationSettings((current) => ({
                        ...current,
                        einvoiceEnabled: event.target.checked,
                      }))
                    }
                    className="h-5 w-5 accent-red-700"
                  />
                  <span className="font-bold text-slate-700">E-fatura aktif</span>
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                  <input
                    checked={integrationSettings.archiveEnabled}
                    type="checkbox"
                    onChange={(event) =>
                      setIntegrationSettings((current) => ({
                        ...current,
                        archiveEnabled: event.target.checked,
                      }))
                    }
                    className="h-5 w-5 accent-red-700"
                  />
                  <span className="font-bold text-slate-700">E-arşiv aktif</span>
                </label>
              </div>

              <button
                type="button"
                onClick={() => {
                  saveIntegrationSettings(integrationSettings);
                  refreshAll("Entegrasyon ayarları kaydedildi.");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-700 px-5 py-3 font-bold text-white"
              >
                <Archive size={18} />
                Entegrasyonları Kaydet
              </button>
            </div>
          </section>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-black text-slate-950">
                  Ürün fiyatı ve stok
                </h2>

                <button
                  type="button"
                  onClick={() => {
                    saveManagedProducts(products);
                    refreshAll("Ürün fiyatları ve stoklar siteye aktarıldı.");
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-red-700 px-5 py-3 font-bold text-white"
                >
                  <Save size={18} />
                  Ürünleri Kaydet
                </button>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="grid gap-4 border-b border-slate-200 p-4 last:border-b-0 lg:grid-cols-[1fr_140px_150px_180px]"
                  >
                    <div>
                      <strong className="text-slate-950">{product.name}</strong>
                      <p className="mt-1 text-sm text-slate-500">
                        {product.category} / {product.brand}
                      </p>
                    </div>

                    <label className="block">
                      <span className="text-xs font-bold text-slate-500">Fiyat</span>
                      <input
                        value={product.price}
                        type="number"
                        onChange={(event) => {
                          const value = Number(event.target.value);
                          setProducts((current) =>
                            current.map((item) =>
                              item.id === product.id ? { ...item, price: value } : item,
                            ),
                          );
                        }}
                        className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 font-semibold outline-none focus:border-red-700"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold text-slate-500">
                        Stok ({product.unit})
                      </span>
                      <input
                        value={product.stockQuantity}
                        type="number"
                        disabled={product.category === "Demir"}
                        onChange={(event) => {
                          const value = Number(event.target.value);
                          setProducts((current) =>
                            current.map((item) =>
                              item.id === product.id
                                ? {
                                    ...item,
                                    stockQuantity: value,
                                    stock: value > 0,
                                  }
                                : item,
                            ),
                          );
                        }}
                        className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 font-semibold outline-none focus:border-red-700 disabled:bg-slate-100"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold text-slate-500">
                        Teslimat
                      </span>
                      <input
                        value={product.deliveryTime}
                        onChange={(event) => {
                          const value = event.target.value;
                          setProducts((current) =>
                            current.map((item) =>
                              item.id === product.id ? { ...item, deliveryTime: value } : item,
                            ),
                          );
                        }}
                        className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 font-semibold outline-none focus:border-red-700"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
              <h2 className="text-2xl font-black text-slate-950">
                İDİS demir bağ girişi
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                İDİS API bilgileri gelene kadar her bağ numarasını buradan
                ekleyebilirsiniz. Eklenen bağ stokta görünür; satışta sevke
                düşer ve stoktan eksilir.
              </p>

              <div className="mt-6 grid gap-4">
                <label className="block">
                  <span className="text-sm font-bold text-slate-600">
                    Demir Çapı
                  </span>
                  <select
                    value={bundleProductId}
                    onChange={(event) => setBundleProductId(Number(event.target.value))}
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none transition focus:border-red-700"
                  >
                    {products
                      .filter((product) => product.category === "Demir")
                      .map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-slate-600">
                    İDİS Bağ No
                  </span>
                  <input
                    value={bundleId}
                    onChange={(event) => setBundleId(event.target.value)}
                    placeholder="Örn: IDIS-MLT-000123"
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-red-700"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-slate-600">
                    Bağ Ağırlığı (Ton)
                  </span>
                  <input
                    value={bundleWeight}
                    type="number"
                    min={0.1}
                    step={0.1}
                    onChange={(event) => setBundleWeight(Number(event.target.value))}
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-red-700"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    addSteelBundle({
                      id: bundleId,
                      weight: bundleWeight,
                      productId: bundleProductId,
                    });
                    setBundleId("");
                    refreshAll("İDİS bağ kaydı site stoğuna eklendi.");
                  }}
                  className="h-12 rounded-2xl bg-slate-950 font-bold text-white transition hover:bg-red-700"
                >
                  Bağı Site Stoğuna Ekle
                </button>
              </div>

              <div className="mt-6 max-h-72 space-y-2 overflow-y-auto">
                {bundles.slice(0, 8).map((bundle) => (
                  <div
                    key={bundle.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  >
                    <span className="font-bold text-slate-950">{bundle.id}</span>
                    <span
                      className={
                        bundle.status === "stokta"
                          ? "font-bold text-emerald-700"
                          : "font-bold text-red-700"
                      }
                    >
                      {bundle.status === "stokta" ? "Stokta" : "Sevk edildi"}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-black text-slate-950">
                  Nakliye fiyatları
                </h2>

                <button
                  type="button"
                  onClick={() => {
                    saveManagedVehicles(vehicles);
                    refreshAll("Nakliye fiyatları güncellendi.");
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-red-700 px-5 py-3 font-bold text-white"
                >
                  <Save size={18} />
                  Nakliyeyi Kaydet
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-3"
                  >
                    <strong className="text-slate-950">{vehicle.name}</strong>

                    <label className="block">
                      <span className="text-xs font-bold text-slate-500">
                        Açılış Bedeli
                      </span>
                      <input
                        value={vehicle.basePrice}
                        type="number"
                        onChange={(event) => {
                          const value = Number(event.target.value);
                          setVehicles((current) =>
                            current.map((item) =>
                              item.id === vehicle.id ? { ...item, basePrice: value } : item,
                            ),
                          );
                        }}
                        className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 font-semibold outline-none focus:border-red-700"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold text-slate-500">
                        Km Bedeli
                      </span>
                      <input
                        value={vehicle.pricePerKm}
                        type="number"
                        onChange={(event) => {
                          const value = Number(event.target.value);
                          setVehicles((current) =>
                            current.map((item) =>
                              item.id === vehicle.id ? { ...item, pricePerKm: value } : item,
                            ),
                          );
                        }}
                        className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 font-semibold outline-none focus:border-red-700"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
              <h2 className="text-2xl font-black text-slate-950">
                Satış ve sevk kayıtları
              </h2>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                {sales.length === 0 ? (
                  <p className="p-5 text-slate-600">
                    Henüz satış kaydı yok. Teklif ekranından satış onaylanınca
                    burada sevk olarak görünür.
                  </p>
                ) : (
                  sales.slice(0, 8).map((sale) => (
                    <div
                      key={sale.id}
                      className="grid gap-3 border-b border-slate-200 p-4 last:border-b-0 lg:grid-cols-[1fr_130px_150px]"
                    >
                      <div>
                        <strong className="text-slate-950">
                          {sale.productName}
                        </strong>
                        <p className="mt-1 text-sm text-slate-500">
                          {sale.customerName} / {sale.shipmentId}
                        </p>
                        {sale.bundleIds.length > 0 ? (
                          <p className="mt-1 text-xs font-bold text-red-700">
                            Sevk edilen bağ: {sale.bundleIds.join(", ")}
                          </p>
                        ) : null}
                      </div>

                      <span className="font-semibold text-slate-700">
                        {sale.quantity} {sale.unit}
                      </span>

                      <span className="font-black text-slate-950">
                        ₺{sale.total.toLocaleString("tr-TR")}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  Üye kayıt talepleri
                </h2>
                <p className="mt-2 leading-7 text-slate-600">
                  Kayıt ol ekranından gelen firma ve müşteri talepleri burada
                  toplanır. Telefon, vergi bilgisi ve ihtiyaç notu tek ekranda
                  takip edilir.
                </p>
              </div>

              <Link
                href="/kayit-ol"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:border-red-200 hover:text-red-700"
              >
                Kayıt Sayfasını Aç
              </Link>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              {registrations.length === 0 ? (
                <p className="p-5 text-slate-600">
                  Henüz kayıt talebi yok. Kayıt ol sayfasından talep
                  oluşturulunca burada görünecek.
                </p>
              ) : (
                registrations.slice(0, 10).map((registration) => (
                  <div
                    key={registration.id}
                    className="grid gap-3 border-b border-slate-200 p-4 last:border-b-0 lg:grid-cols-[1fr_180px_140px]"
                  >
                    <div>
                      <strong className="text-slate-950">
                        {registration.companyName}
                      </strong>
                      <p className="mt-1 text-sm text-slate-500">
                        {registration.fullName} / {registration.phone}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">
                        {registration.need || "İhtiyaç notu eklenmedi."}
                      </p>
                    </div>

                    <span className="font-semibold text-slate-700">
                      {registration.city} · {registration.taxNumber || "Vergi no yok"}
                    </span>

                    <span className="font-black text-red-700">
                      {registration.status === "yeni" ? "Yeni" : "İncelendi"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <h2 className="text-2xl font-black text-slate-950">
              Nakliye teklif kayıtları
            </h2>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              {transportOrders.length === 0 ? (
                <p className="p-5 text-slate-600">
                  Henüz nakliye kaydı yok. Nakliye hesaplama ekranından teklif
                  kaydedilince burada görünür.
                </p>
              ) : (
                transportOrders.slice(0, 8).map((order) => (
                  <div
                    key={order.id}
                    className="grid gap-3 border-b border-slate-200 p-4 last:border-b-0 lg:grid-cols-[1fr_180px_150px]"
                  >
                    <div>
                      <strong className="text-slate-950">
                        {order.fromName} → {order.toName}
                      </strong>
                      <p className="mt-1 text-sm text-slate-500">
                        {order.customerName} / {order.vehicleName} / {order.tonnage} ton
                      </p>
                      {order.note ? (
                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {order.note}
                        </p>
                      ) : null}
                    </div>

                    <span className="font-semibold text-slate-700">
                      {order.distance} km · {order.trips} sefer
                    </span>

                    <span className="font-black text-slate-950">
                      ₺{order.price.toLocaleString("tr-TR")}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

          <div className="mt-8 rounded-3xl border border-red-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="text-red-700" />
                  <h2 className="text-2xl font-black text-slate-950">
                    Resmi canlı veri bağlantısı
                  </h2>
                </div>

                <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                  Grafikler 24 saat açık canlı ekran olarak çalışıyor. Gerçek
                  resmi borsa/İDİS/nakliye API anahtarları verildiğinde bu panel
                  aynı akıştan dış sisteme bağlanacak; şu an veriler admin
                  panelinden yönetiliyor ve siteye anında yansıyor.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  resetCommerceStore();
                  refreshAll("Demo stok, sevk ve nakliye verileri sıfırlandı.");
                }}
                className="rounded-2xl border border-red-200 px-5 py-3 font-bold text-red-700 transition hover:bg-red-50"
              >
                Sistemi Sıfırla
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
