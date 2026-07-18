import { products } from "@/data/products";
import { cities, vehicles } from "@/data/transport";
import { calculateTransportQuote } from "@/lib/transport";

export type AiProductSuggestion = {
  id: number;
  name: string;
  brand: string;
  deliveryTime: string;
  price: number;
  unit: string;
  stockQuantity: number;
};

export type AiAnswer = {
  summary: string;
  products: AiProductSuggestion[];
  estimatedTotal: number;
  nextStep: string;
  transportEstimate?: {
    route: string;
    vehicle: string;
    tonnage: number;
    distance: number;
    duration: string;
    price: number;
    trips: number;
  };
  actionItems: string[];
};

const intentWords = [
  "demir",
  "çimento",
  "cimento",
  "gaz",
  "beton",
  "tuğla",
  "tugla",
  "alçı",
  "alci",
  "yalıtım",
  "yalitim",
  "xps",
  "tutkal",
  "yapıştırıcı",
  "yapistirici",
  "bims",
  "ytong",
  "kireç",
  "kirec",
  "hamur",
  "hidrat",
  "toz",
  "10",
  "12",
  "14",
  "16",
  "19",
  "8 mm",
  "10 mm",
  "12 mm",
  "14 mm",
  "16 mm",
];

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR");
}

function toSuggestion(product: (typeof products)[number]): AiProductSuggestion {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    deliveryTime: product.deliveryTime,
    price: product.price,
    unit: product.unit,
    stockQuantity: product.stockQuantity,
  };
}

function parseQuantity(message: string) {
  const tonMatch = message.match(/(\d+(?:[.,]\d+)?)\s*(ton|t\b)/i);
  const adetMatch = message.match(/(\d+(?:[.,]\d+)?)\s*(adet|torba|m2|m²|metrekare|kova)/i);
  const areaMatch = message.match(/(\d+(?:[.,]\d+)?)\s*(m2|m²|metrekare)/i);

  if (tonMatch) {
    return Number(tonMatch[1].replace(",", "."));
  }

  if (adetMatch) {
    return Number(adetMatch[1].replace(",", "."));
  }

  if (areaMatch) {
    return Math.ceil(Number(areaMatch[1].replace(",", ".")) / 8);
  }

  return 1;
}

function scoreProduct(product: (typeof products)[number], normalized: string, requestedWords: string[]) {
  const haystack = normalize(
    [product.name, product.category, product.description, product.brand, ...product.tags].join(
      " ",
    ),
  );
  let score = 0;

  requestedWords.forEach((word) => {
    if (haystack.includes(word)) {
      score += 3;
    }
  });

  if (normalized.includes(normalize(product.category))) score += 4;
  if (normalized.includes(normalize(product.name))) score += 5;
  if (product.stock) score += 1;

  return score;
}

export function buildLocalAiAnswer(message: string): AiAnswer {
  const normalized = normalize(message);
  const requestedWords = intentWords.filter((word) => normalized.includes(word));
  const cityMatches = cities
    .map((city) => ({
      city,
      index: normalized.indexOf(normalize(city.name)),
    }))
    .filter((item) => item.index >= 0)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.city);
  const hasTransportIntent = ["nakliye", "taşıma", "tasima", "sevkiyat", "teslimat"].some(
    (word) => normalized.includes(word),
  );

  const quantity = parseQuantity(normalized);
  const scoredProducts = products
    .map((product) => ({
      product,
      score: scoreProduct(product, normalized, requestedWords),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
  const matchedProducts = scoredProducts.map((item) => item.product);

  const recommended = (matchedProducts.length > 0 ? matchedProducts : products)
    .filter((product) => product.stock || matchedProducts.length > 0)
    .slice(0, 5);
  const estimatedTotal =
    matchedProducts.length > 0
      ? recommended[0].price * quantity
      : recommended.reduce((sum, product) => sum + product.price, 0);
  const vehicle = vehicles.find((item) => normalized.includes(normalize(item.name))) ?? vehicles[2];
  const tonnage = normalized.includes("ton")
    ? quantity
    : recommended.some((product) => product.category === "Demir")
      ? Math.max(1, quantity)
      : Math.max(1, Math.ceil(quantity / 100));
  const transportQuote =
    hasTransportIntent && cityMatches.length >= 2
      ? calculateTransportQuote(cityMatches[0], cityMatches[1], vehicle, tonnage)
      : null;

  const transportText =
    transportQuote
      ? ` ${transportQuote.fromName}-${transportQuote.toName} hattında ${vehicle.name} ile yaklaşık ${transportQuote.distance} km, ${transportQuote.trips} sefer ve ₺${transportQuote.price.toLocaleString("tr-TR")} nakliye bedeli hesapladım.`
      : hasTransportIntent
        ? " Nakliye için çıkış ili, varış ili, tonaj ve teslim süresi birlikte girildiğinde daha doğru rota planı çıkar."
        : "";
  return {
    summary: `Talebinizi ürün, ölçü ve teslimat bilgileriyle birlikte okudum.${transportText} Öne çıkan malzemeler için teklif seviyelerini aşağıda özetledim.`,
    products: recommended.map(toSuggestion),
    estimatedTotal,
    nextStep:
      transportQuote
        ? "Bu planı teklif ekranında malzeme satışına, nakliye ekranında sevk kaydına çevirebilirsiniz."
        : "Net metraj, teslimat ili, tonaj ve hedef teslim tarihini eklersen yaklaşık malzeme + nakliye senaryosunu birlikte çıkarabilirim.",
    transportEstimate: transportQuote
      ? {
          route: `${transportQuote.fromName} → ${transportQuote.toName}`,
          vehicle: transportQuote.vehicleName,
          tonnage: transportQuote.tonnage,
          distance: transportQuote.distance,
          duration: transportQuote.duration,
          price: transportQuote.price,
          trips: transportQuote.trips,
        }
      : undefined,
    actionItems: [
      "Miktar, teslimat ili ve teslim tarihiyle net teklif oluşturun.",
      hasTransportIntent
        ? "Nakliye teklifini kaydedip sevk planına alın."
        : "Teslimat ili ve tonaj girerek nakliye bedelini netleştirin.",
      "Müşteri adı ve telefonla teklif kaydı oluşturun.",
    ],
  };
}
