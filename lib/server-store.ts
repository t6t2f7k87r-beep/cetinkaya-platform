import type {
  CustomerRegistration,
  SaleRecord,
  TransportOrder,
} from "@/lib/commerce-store";

export type AdminInbox = {
  registrations: CustomerRegistration[];
  sales: SaleRecord[];
  transportOrders: TransportOrder[];
};

type InboxKey = keyof AdminInbox;

const globalStore = globalThis as typeof globalThis & {
  cetinkayaAdminInbox?: AdminInbox;
};

const storeKeys = {
  registrations: "cetinkaya:registrations",
  sales: "cetinkaya:sales",
  transportOrders: "cetinkaya:transport-orders",
} satisfies Record<InboxKey, string>;

const restUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const restToken =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

function hasPersistentStore() {
  return Boolean(restUrl && restToken);
}

function getInbox() {
  if (!globalStore.cetinkayaAdminInbox) {
    globalStore.cetinkayaAdminInbox = {
      registrations: [],
      sales: [],
      transportOrders: [],
    };
  }

  return globalStore.cetinkayaAdminInbox;
}

async function redisCommand<T>(command: unknown[]) {
  if (!restUrl || !restToken) {
    return null;
  }

  const response = await fetch(restUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${restToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Kalıcı veritabanı isteği başarısız oldu.");
  }

  const payload = (await response.json()) as { result?: T };
  return payload.result ?? null;
}

async function readCollection<T>(key: InboxKey) {
  if (!hasPersistentStore()) {
    return getInbox()[key] as T[];
  }

  const values = await redisCommand<string[]>(["LRANGE", storeKeys[key], 0, 249]);

  return (values ?? [])
    .map((value) => {
      try {
        return JSON.parse(value) as T;
      } catch {
        return null;
      }
    })
    .filter((item): item is T => item !== null);
}

async function prependCollection<T>(key: InboxKey, item: T) {
  const inbox = getInbox();

  (inbox[key] as T[]) = [item, ...(inbox[key] as T[])].slice(0, 250);

  if (!hasPersistentStore()) {
    return;
  }

  await redisCommand(["LPUSH", storeKeys[key], JSON.stringify(item)]);
  await redisCommand(["LTRIM", storeKeys[key], 0, 249]);
}

export async function listAdminInbox() {
  const [registrations, sales, transportOrders] = await Promise.all([
    readCollection<CustomerRegistration>("registrations"),
    readCollection<SaleRecord>("sales"),
    readCollection<TransportOrder>("transportOrders"),
  ]);

  return {
    registrations,
    sales,
    transportOrders,
    persistence: hasPersistentStore() ? "kv" : "memory",
  };
}

export async function addServerRegistration(
  registration: Omit<CustomerRegistration, "id" | "createdAt" | "status">,
) {
  const nextRegistration: CustomerRegistration = {
    ...registration,
    id: `UYE-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "yeni",
  };

  await prependCollection("registrations", nextRegistration);
  return nextRegistration;
}

export async function addServerSale(sale: SaleRecord) {
  await prependCollection("sales", sale);
  return sale;
}

export async function addServerTransportOrder(order: TransportOrder) {
  await prependCollection("transportOrders", order);
  return order;
}
