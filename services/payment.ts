import { PaymentIntent, PaymentProvider } from "@/types/payment";

const providerLabels: Record<PaymentProvider, string> = {
  iyzico: "iyzico",
  paytr: "PayTR",
  stripe: "Stripe",
};

export function createPaymentIntent({
  amount,
  provider,
}: {
  amount: number;
  provider: PaymentProvider;
}): PaymentIntent {
  const stableAmount = Math.round(amount);

  return {
    id: `quote_${provider}_${stableAmount}_draft`,
    provider,
    amount,
    currency: "TRY",
    status: "provider_required",
    message: `${providerLabels[provider]} ödeme anahtarları eklenince bu niyet gerçek ödeme oturumuna dönüşecek.`,
  };
}
