import { products } from "@/data/products";
import { cities, vehicles } from "@/data/transport";

export type AiProductSuggestion = {
  id: number;
  name: string;
  brand: string;
  deliveryTime: string;
  price: number;
  unit: string;
};

export type AiAnswer = {
  summary: string;
  products: AiProductSuggestion[];
  estimatedTotal: number;
  nextStep: string;
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
  };
}

export function buildLocalAiAnswer(message: string): AiAnswer {
  const normalized = normalize(message);
  const requestedWords = intentWords.filter((word) => normalized.includes(word));
  const cityMatches = cities.filter((city) => normalized.includes(normalize(city.name)));
  const hasTransportIntent = ["nakliye", "taşıma", "tasima", "sevkiyat", "teslimat"].some(
    (word) => normalized.includes(word),
  );

  const matchedProducts = products.filter((product) => {
    const haystack = normalize(
      [product.name, product.category, product.description, product.brand, ...product.tags].join(
        " ",
      ),
    );

    return requestedWords.some((word) => haystack.includes(word));
  });

  const recommended = (matchedProducts.length > 0 ? matchedProducts : products)
    .filter((product) => product.stock || matchedProducts.length > 0)
    .slice(0, 3);
  const estimatedTotal = recommended.reduce((sum, product) => sum + product.price, 0);
  const vehicle = vehicles.find((item) => normalized.includes(normalize(item.name))) ?? vehicles[2];

  const transportText =
    hasTransportIntent && cityMatches.length >= 2
      ? ` ${cityMatches[0].name}-${cityMatches[1].name} hattı için ${vehicle.name} sınıfı uygun başlangıç noktası olur; kesin bedel nakliye ekranındaki tonaj ve araç kapasitesiyle netleşir.`
      : hasTransportIntent
        ? " Nakliye için çıkış ili, varış ili, tonaj ve teslim süresi birlikte girildiğinde daha doğru rota planı çıkar."
        : "";

  return {
    summary: `Talebinizi ürün, stok, teslimat ve fiyat geçmişiyle birlikte okudum.${transportText} İlk aşamada stokta bulunan ana malzemeleri ayırıp teklif sepetini bu ürünlerle kurmak en hızlı yol olur.`,
    products: recommended.map(toSuggestion),
    estimatedTotal,
    nextStep:
      "Net metraj, teslimat ili, tonaj ve hedef teslim tarihini eklersen yaklaşık malzeme + nakliye senaryosunu birlikte çıkarabilirim.",
  };
}
