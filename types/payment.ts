export type PaymentProvider = "iyzico" | "paytr" | "stripe";

export type PaymentStatus = "draft" | "provider_required" | "ready";

export type PaymentIntent = {
  id: string;
  provider: PaymentProvider;
  amount: number;
  currency: "TRY";
  status: PaymentStatus;
  message: string;
};
