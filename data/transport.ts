import { TransportCity, VehicleType } from "@/types/transport";

export const cities: TransportCity[] = [
  { id: 4400, name: "Malatya Merkez", region: "Malatya İlçeleri", lat: 38.3552, lng: 38.3095 },
  { id: 4401, name: "Battalgazi", region: "Malatya İlçeleri", lat: 38.4242, lng: 38.3647 },
  { id: 4402, name: "Yeşilyurt", region: "Malatya İlçeleri", lat: 38.2969, lng: 38.2481 },
  { id: 4403, name: "Akçadağ", region: "Malatya İlçeleri", lat: 38.3463, lng: 37.9706 },
  { id: 4404, name: "Arapgir", region: "Malatya İlçeleri", lat: 39.0417, lng: 38.4895 },
  { id: 4405, name: "Arguvan", region: "Malatya İlçeleri", lat: 38.7816, lng: 38.2636 },
  { id: 4406, name: "Darende", region: "Malatya İlçeleri", lat: 38.5458, lng: 37.5053 },
  { id: 4407, name: "Doğanşehir", region: "Malatya İlçeleri", lat: 38.0854, lng: 37.8715 },
  { id: 4408, name: "Doğanyol", region: "Malatya İlçeleri", lat: 38.3075, lng: 39.0392 },
  { id: 4409, name: "Hekimhan", region: "Malatya İlçeleri", lat: 38.8169, lng: 37.9282 },
  { id: 4410, name: "Kale", region: "Malatya İlçeleri", lat: 38.4164, lng: 38.7702 },
  { id: 4411, name: "Kuluncak", region: "Malatya İlçeleri", lat: 38.8762, lng: 37.6631 },
  { id: 4412, name: "Pütürge", region: "Malatya İlçeleri", lat: 38.1964, lng: 38.8681 },
  { id: 4413, name: "Yazıhan", region: "Malatya İlçeleri", lat: 38.5921, lng: 38.1734 },

  { id: 2300, name: "Elazığ Merkez", region: "Çevre İller", lat: 38.6743, lng: 39.2232 },
  { id: 2301, name: "Baskil", region: "Elazığ İlçeleri", lat: 38.5689, lng: 38.8167 },
  { id: 2302, name: "Keban", region: "Elazığ İlçeleri", lat: 38.7935, lng: 38.7352 },
  { id: 2303, name: "Sivrice", region: "Elazığ İlçeleri", lat: 38.4421, lng: 39.3095 },
  { id: 2304, name: "Palu", region: "Elazığ İlçeleri", lat: 38.6918, lng: 39.9289 },

  { id: 200, name: "Adıyaman Merkez", region: "Çevre İller", lat: 37.7648, lng: 38.2786 },
  { id: 201, name: "Gölbaşı", region: "Adıyaman İlçeleri", lat: 37.7839, lng: 37.6367 },
  { id: 202, name: "Besni", region: "Adıyaman İlçeleri", lat: 37.6928, lng: 37.8612 },
  { id: 203, name: "Kahta", region: "Adıyaman İlçeleri", lat: 37.7855, lng: 38.6237 },
  { id: 204, name: "Gerger", region: "Adıyaman İlçeleri", lat: 38.0285, lng: 39.0317 },

  { id: 4600, name: "Kahramanmaraş Merkez", region: "Çevre İller", lat: 37.5753, lng: 36.9228 },
  { id: 4601, name: "Elbistan", region: "Kahramanmaraş İlçeleri", lat: 38.2059, lng: 37.1983 },
  { id: 4602, name: "Afşin", region: "Kahramanmaraş İlçeleri", lat: 38.2477, lng: 36.914 },
  { id: 4603, name: "Pazarcık", region: "Kahramanmaraş İlçeleri", lat: 37.4868, lng: 37.2993 },
  { id: 4604, name: "Göksun", region: "Kahramanmaraş İlçeleri", lat: 38.0202, lng: 36.4973 },

  { id: 2700, name: "Gaziantep Merkez", region: "Çevre İller", lat: 37.0662, lng: 37.3833 },
  { id: 2701, name: "Nurdağı", region: "Gaziantep İlçeleri", lat: 37.1773, lng: 36.7394 },
  { id: 2702, name: "İslahiye", region: "Gaziantep İlçeleri", lat: 37.025, lng: 36.6304 },

  { id: 2100, name: "Diyarbakır Merkez", region: "Çevre İller", lat: 37.9144, lng: 40.2306 },
  { id: 6300, name: "Şanlıurfa Merkez", region: "Çevre İller", lat: 37.1674, lng: 38.7955 },
  { id: 5800, name: "Sivas Merkez", region: "Çevre İller", lat: 39.7505, lng: 37.015 },
  { id: 2400, name: "Erzincan Merkez", region: "Çevre İller", lat: 39.7468, lng: 39.4911 },
  { id: 6200, name: "Tunceli Merkez", region: "Çevre İller", lat: 39.1062, lng: 39.5483 },
  { id: 1200, name: "Bingöl Merkez", region: "Çevre İller", lat: 38.8847, lng: 40.4939 },
  { id: 3800, name: "Kayseri Merkez", region: "Çevre İller", lat: 38.7205, lng: 35.4826 },

  { id: 100, name: "Adana", region: "Diğer İller", lat: 37.0, lng: 35.3213 },
  { id: 600, name: "Ankara", region: "Diğer İller", lat: 39.9334, lng: 32.8597 },
  { id: 700, name: "Antalya", region: "Diğer İller", lat: 36.8969, lng: 30.7133 },
  { id: 1600, name: "Bursa", region: "Diğer İller", lat: 40.1885, lng: 29.061 },
  { id: 3400, name: "İstanbul", region: "Diğer İller", lat: 41.0082, lng: 28.9784 },
  { id: 3500, name: "İzmir", region: "Diğer İller", lat: 38.4237, lng: 27.1428 },
  { id: 4100, name: "Kocaeli", region: "Diğer İller", lat: 40.8533, lng: 29.8815 },
];

export const vehicles: VehicleType[] = [
  {
    id: 1,
    name: "Kamyonet",
    capacity: 3,
    basePrice: 2400,
    pricePerKm: 18,
  },
  {
    id: 2,
    name: "Kamyon",
    capacity: 10,
    basePrice: 4200,
    pricePerKm: 29,
  },
  {
    id: 3,
    name: "Tır",
    capacity: 27,
    basePrice: 7200,
    pricePerKm: 46,
  },
];
