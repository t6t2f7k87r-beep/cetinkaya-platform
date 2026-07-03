import { CustomerRegistration, SaleRecord, TransportOrder } from "@/lib/commerce-store";

export type AdminInbox = {
  registrations: CustomerRegistration[];
  sales: SaleRecord[];
  transportOrders: TransportOrder[];
};

const globalStore = globalThis as typeof globalThis & {
  cetinkayaAdminInbox?: AdminInbox;
};

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

export function listAdminInbox() {
  return getInbox();
}

export function addServerRegistration(
  registration: Omit<CustomerRegistration, "id" | "createdAt" | "status">,
) {
  const inbox = getInbox();
  const nextRegistration: CustomerRegistration = {
    ...registration,
    id: `UYE-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "yeni",
  };

  inbox.registrations = [nextRegistration, ...inbox.registrations].slice(0, 250);
  return nextRegistration;
}

export function addServerSale(sale: SaleRecord) {
  const inbox = getInbox();

  inbox.sales = [sale, ...inbox.sales].slice(0, 250);
  return sale;
}

export function addServerTransportOrder(order: TransportOrder) {
  const inbox = getInbox();

  inbox.transportOrders = [order, ...inbox.transportOrders].slice(0, 250);
  return order;
}
