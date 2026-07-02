"use client";

import { products as seedProducts } from "@/data/products";
import { vehicles as seedVehicles } from "@/data/transport";
import { Product } from "@/types/product";
import { TransportResult, VehicleType } from "@/types/transport";

export type SteelBundle = {
  id: string;
  productId: number;
  weight: number;
  status: "stokta" | "sevk-edildi";
  createdAt: string;
  shipmentId?: string;
};

export type SaleRecord = {
  id: string;
  productId: number;
  productName: string;
  quantity: number;
  unit: string;
  customerName: string;
  customerPhone: string;
  total: number;
  createdAt: string;
  shipmentId: string;
  bundleIds: string[];
};

export type TransportOrder = TransportResult & {
  id: string;
  customerName: string;
  customerPhone: string;
  note: string;
  createdAt: string;
  status: "teklif" | "planlandi";
};

export type IdisSettings = {
  enabled: boolean;
  endpoint: string;
  username: string;
  tokenPreview: string;
  lastSyncAt?: string;
  status: "beklemede" | "bagli" | "eksik-bilgi";
};

export type IntegrationSettings = {
  einvoiceProvider: string;
  einvoiceEndpoint: string;
  einvoiceUsername: string;
  einvoiceTokenPreview: string;
  einvoiceEnabled: boolean;
  archiveEnabled: boolean;
  idisWebhookUrl: string;
  transportApiEndpoint: string;
  lastHealthCheckAt?: string;
  status: "hazir" | "eksik-bilgi" | "beklemede";
};

export type CustomerRegistration = {
  id: string;
  companyName: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  taxNumber: string;
  need: string;
  createdAt: string;
  status: "yeni" | "incelendi";
};

const PRODUCTS_KEY = "cetinkaya-products";
const VEHICLES_KEY = "cetinkaya-vehicles";
const SALES_KEY = "cetinkaya-sales";
const TRANSPORT_ORDERS_KEY = "cetinkaya-transport-orders";
const BUNDLES_KEY = "cetinkaya-steel-bundles";
const IDIS_SETTINGS_KEY = "cetinkaya-idis-settings";
const INTEGRATION_SETTINGS_KEY = "cetinkaya-integration-settings";
const CUSTOMER_REGISTRATIONS_KEY = "cetinkaya-customer-registrations";
export const STORE_EVENT = "cetinkaya-store-updated";

function isBrowser() {
  return typeof window !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) {
    return fallback;
  }

  const rawValue = localStorage.getItem(key);

  if (!rawValue) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(STORE_EVENT));
}

function defaultBundles(): SteelBundle[] {
  return seedProducts
    .filter((product) => product.category === "Demir")
    .flatMap((steel) => {
      const count = steel.steelBundleCount ?? 0;

      return Array.from({ length: count }, (_, index) => ({
        id: `IDIS-${steel.slug.toUpperCase()}-${String(index + 1).padStart(4, "0")}`,
        productId: steel.id,
        weight: 5,
        status: "stokta" as const,
        createdAt: new Date().toISOString(),
      }));
    });
}

function defaultIdisSettings(): IdisSettings {
  return {
    enabled: false,
    endpoint: "",
    username: "",
    tokenPreview: "",
    status: "beklemede",
  };
}

function defaultIntegrationSettings(): IntegrationSettings {
  return {
    einvoiceProvider: "Özel entegratör seçilecek",
    einvoiceEndpoint: "",
    einvoiceUsername: "",
    einvoiceTokenPreview: "",
    einvoiceEnabled: false,
    archiveEnabled: false,
    idisWebhookUrl: "",
    transportApiEndpoint: "",
    status: "beklemede",
  };
}

function syncSteelProduct(products: Product[], bundles: SteelBundle[]) {
  return products.map((product) =>
    product.category === "Demir"
      ? {
          ...product,
          stockQuantity: bundles
            .filter((bundle) => bundle.productId === product.id && bundle.status === "stokta")
            .reduce((sum, bundle) => sum + bundle.weight, 0),
          steelBundleCount: bundles.filter(
            (bundle) => bundle.productId === product.id && bundle.status === "stokta",
          ).length,
          stock: bundles.some(
            (bundle) => bundle.productId === product.id && bundle.status === "stokta",
          ),
        }
      : product,
  );
}

function mergeSeedProducts(storedProducts: Product[]) {
  const seedSlugs = new Set(seedProducts.map((product) => product.slug));
  const storedSlugs = new Set(storedProducts.map((product) => product.slug));
  const sameCatalog =
    seedSlugs.size === storedSlugs.size &&
    [...seedSlugs].every((slug) => storedSlugs.has(slug));

  if (!sameCatalog) {
    writeJson(PRODUCTS_KEY, seedProducts);
    writeJson(BUNDLES_KEY, defaultBundles());
    return seedProducts;
  }

  const storedBySlug = new Map(storedProducts.map((product) => [product.slug, product]));

  return seedProducts.map((seedProduct) => ({
    ...seedProduct,
    ...storedBySlug.get(seedProduct.slug),
    id: seedProduct.id,
    slug: seedProduct.slug,
    name: seedProduct.name,
    category: seedProduct.category,
  }));
}

export function getManagedProducts() {
  const bundles = getSteelBundles();
  const products = mergeSeedProducts(readJson<Product[]>(PRODUCTS_KEY, seedProducts));

  return syncSteelProduct(products, bundles);
}

export function saveManagedProducts(products: Product[]) {
  writeJson(PRODUCTS_KEY, products);
}

export function updateManagedProduct(productId: number, patch: Partial<Product>) {
  const products = getManagedProducts().map((product) =>
    product.id === productId ? { ...product, ...patch } : product,
  );

  saveManagedProducts(products);
  return products;
}

export function getManagedVehicles() {
  return readJson<VehicleType[]>(VEHICLES_KEY, seedVehicles);
}

export function saveManagedVehicles(vehicles: VehicleType[]) {
  writeJson(VEHICLES_KEY, vehicles);
}

export function getSales() {
  return readJson<SaleRecord[]>(SALES_KEY, []);
}

export function getTransportOrders() {
  return readJson<TransportOrder[]>(TRANSPORT_ORDERS_KEY, []);
}

export function recordTransportOrder(params: {
  result: TransportResult;
  customerName: string;
  customerPhone: string;
  note: string;
}) {
  const order: TransportOrder = {
    ...params.result,
    id: `NAK-${Date.now()}`,
    customerName: params.customerName || "Nakliye müşterisi",
    customerPhone: params.customerPhone || "-",
    note: params.note,
    createdAt: new Date().toISOString(),
    status: "teklif",
  };
  const orders = [order, ...getTransportOrders()];

  writeJson(TRANSPORT_ORDERS_KEY, orders);
  return order;
}

export function getSteelBundles() {
  const storedBundles = readJson<SteelBundle[]>(BUNDLES_KEY, defaultBundles());
  const defaultByProduct = defaultBundles();
  const productIdsWithBundles = new Set(storedBundles.map((bundle) => bundle.productId));
  const missingProductBundles = defaultByProduct.filter(
    (bundle) => !productIdsWithBundles.has(bundle.productId),
  );

  if (missingProductBundles.length === 0) {
    return storedBundles;
  }

  const nextBundles = [...storedBundles, ...missingProductBundles];
  writeJson(BUNDLES_KEY, nextBundles);
  return nextBundles;
}

export function getIdisSettings() {
  return readJson<IdisSettings>(IDIS_SETTINGS_KEY, defaultIdisSettings());
}

export function saveIdisSettings(settings: IdisSettings) {
  const hasConnectionInfo =
    settings.endpoint.trim().length > 0 &&
    settings.username.trim().length > 0 &&
    settings.tokenPreview.trim().length > 0;

  writeJson(IDIS_SETTINGS_KEY, {
    ...settings,
    enabled: hasConnectionInfo ? settings.enabled : false,
    status: hasConnectionInfo && settings.enabled ? "bagli" : "eksik-bilgi",
    lastSyncAt: hasConnectionInfo && settings.enabled ? new Date().toISOString() : settings.lastSyncAt,
  });
}

export function getIntegrationSettings() {
  return readJson<IntegrationSettings>(
    INTEGRATION_SETTINGS_KEY,
    defaultIntegrationSettings(),
  );
}

export function saveIntegrationSettings(settings: IntegrationSettings) {
  const hasEinvoiceInfo =
    settings.einvoiceProvider.trim().length > 0 &&
    settings.einvoiceEndpoint.trim().length > 0 &&
    settings.einvoiceUsername.trim().length > 0 &&
    settings.einvoiceTokenPreview.trim().length > 0;
  const hasOperationalInfo =
    hasEinvoiceInfo || settings.idisWebhookUrl.trim() || settings.transportApiEndpoint.trim();

  writeJson(INTEGRATION_SETTINGS_KEY, {
    ...settings,
    einvoiceEnabled: hasEinvoiceInfo ? settings.einvoiceEnabled : false,
    archiveEnabled: hasEinvoiceInfo ? settings.archiveEnabled : false,
    lastHealthCheckAt: hasOperationalInfo ? new Date().toISOString() : settings.lastHealthCheckAt,
    status: hasEinvoiceInfo ? "hazir" : hasOperationalInfo ? "eksik-bilgi" : "beklemede",
  });
}

export function simulateIntegrationHealthCheck() {
  const settings = getIntegrationSettings();
  const hasAnyEndpoint =
    settings.einvoiceEndpoint.trim() ||
    settings.idisWebhookUrl.trim() ||
    settings.transportApiEndpoint.trim();

  if (!hasAnyEndpoint) {
    return {
      ok: false,
      message:
        "E-fatura, e-arşiv, İDİS veya nakliye için en az bir bağlantı adresi ekleyin.",
    };
  }

  saveIntegrationSettings({
    ...settings,
    lastHealthCheckAt: new Date().toISOString(),
  });

  return {
    ok: true,
    message: "Entegrasyon altyapısı kontrol edildi; canlı API bilgileri girilince gönderim aktifleşir.",
  };
}

export function getCustomerRegistrations() {
  return readJson<CustomerRegistration[]>(CUSTOMER_REGISTRATIONS_KEY, []);
}

export function recordCustomerRegistration(params: Omit<CustomerRegistration, "id" | "createdAt" | "status">) {
  const registration: CustomerRegistration = {
    ...params,
    id: `UYE-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "yeni",
  };

  writeJson(CUSTOMER_REGISTRATIONS_KEY, [registration, ...getCustomerRegistrations()]);
  return registration;
}

export function simulateIdisSync() {
  const settings = getIdisSettings();

  if (!settings.enabled || settings.status !== "bagli") {
    return {
      ok: false,
      message: "İDİS bağlantısı için endpoint, kullanıcı ve token bilgilerini kaydedin.",
    };
  }

  const bundles = getSteelBundles();
  writeJson(BUNDLES_KEY, bundles);
  saveIdisSettings({
    ...settings,
    lastSyncAt: new Date().toISOString(),
  });

  return {
    ok: true,
    message: `${bundles.length} bağ kaydı İDİS koordinasyon kuyruğunda kontrol edildi.`,
  };
}

export function addSteelBundle(bundle: Pick<SteelBundle, "id" | "weight"> & { productId?: number }) {
  const products = getManagedProducts();
  const steelProduct =
    products.find((product) => product.id === bundle.productId && product.category === "Demir") ??
    products.find((product) => product.category === "Demir") ??
    products[0];
  const bundles = getSteelBundles();
  const normalizedId = bundle.id.trim();

  if (!normalizedId || bundles.some((item) => item.id === normalizedId)) {
    return bundles;
  }

  const nextBundles: SteelBundle[] = [
    ...bundles,
    {
      id: normalizedId,
      productId: steelProduct.id,
      weight: Math.max(0.1, bundle.weight),
      status: "stokta",
      createdAt: new Date().toISOString(),
    },
  ];

  writeJson(BUNDLES_KEY, nextBundles);
  saveManagedProducts(syncSteelProduct(products, nextBundles));
  markIdisActivity();
  return nextBundles;
}

function markIdisActivity() {
  const settings = getIdisSettings();

  if (settings.enabled && settings.status === "bagli") {
    saveIdisSettings({
      ...settings,
      lastSyncAt: new Date().toISOString(),
    });
  }
}

export function recordSale(params: {
  productId: number;
  quantity: number;
  customerName: string;
  customerPhone: string;
  total: number;
}) {
  const products = getManagedProducts();
  const product = products.find((item) => item.id === params.productId) ?? products[0];
  const quantity = Math.max(1, params.quantity);
  const shipmentId = `SEVK-${Date.now()}`;
  let bundleIds: string[] = [];
  let nextBundles = getSteelBundles();

  if (product.category === "Demir") {
    const selectedBundles: SteelBundle[] = [];
    let selectedWeight = 0;

    for (const bundle of nextBundles.filter(
      (item) => item.productId === product.id && item.status === "stokta",
    )) {
      if (selectedWeight >= quantity) {
        break;
      }

      selectedBundles.push(bundle);
      selectedWeight += bundle.weight;
    }

    bundleIds = selectedBundles.map((bundle) => bundle.id);
    nextBundles = nextBundles.map((bundle) =>
      bundleIds.includes(bundle.id)
        ? { ...bundle, status: "sevk-edildi", shipmentId }
        : bundle,
    );
    writeJson(BUNDLES_KEY, nextBundles);
  }

  const nextProducts = products.map((item) =>
    item.id === product.id
      ? {
          ...item,
          stockQuantity:
            product.category === "Demir"
              ? item.stockQuantity
              : Math.max(0, item.stockQuantity - quantity),
          stock:
            product.category === "Demir"
              ? item.stock
              : Math.max(0, item.stockQuantity - quantity) > 0,
        }
      : item,
  );
  const syncedProducts = syncSteelProduct(nextProducts, nextBundles);

  saveManagedProducts(syncedProducts);

  const sale: SaleRecord = {
    id: `SATIS-${Date.now()}`,
    productId: product.id,
    productName: product.name,
    quantity,
    unit: product.unit,
    customerName: params.customerName || "Perakende müşteri",
    customerPhone: params.customerPhone || "-",
    total: params.total,
    createdAt: new Date().toISOString(),
    shipmentId,
    bundleIds,
  };
  const sales = [sale, ...getSales()];

  writeJson(SALES_KEY, sales);
  markIdisActivity();
  return sale;
}

export function resetCommerceStore() {
  writeJson(PRODUCTS_KEY, seedProducts);
  writeJson(VEHICLES_KEY, seedVehicles);
  writeJson(SALES_KEY, []);
  writeJson(TRANSPORT_ORDERS_KEY, []);
  writeJson(BUNDLES_KEY, defaultBundles());
  writeJson(IDIS_SETTINGS_KEY, defaultIdisSettings());
  writeJson(INTEGRATION_SETTINGS_KEY, defaultIntegrationSettings());
  writeJson(CUSTOMER_REGISTRATIONS_KEY, []);
}
