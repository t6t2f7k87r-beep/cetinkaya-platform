import { TransportCity, VehicleType } from "@/types/transport";

export const cities: TransportCity[] = [
  { id: 1, name: "Adana", region: "Akdeniz", lat: 37.0, lng: 35.3213 },
  { id: 6, name: "Ankara", region: "İç Anadolu", lat: 39.9334, lng: 32.8597 },
  { id: 7, name: "Antalya", region: "Akdeniz", lat: 36.8969, lng: 30.7133 },
  { id: 16, name: "Bursa", region: "Marmara", lat: 40.1885, lng: 29.061 },
  { id: 21, name: "Diyarbakır", region: "Güneydoğu Anadolu", lat: 37.9144, lng: 40.2306 },
  { id: 27, name: "Gaziantep", region: "Güneydoğu Anadolu", lat: 37.0662, lng: 37.3833 },
  { id: 34, name: "İstanbul", region: "Marmara", lat: 41.0082, lng: 28.9784 },
  { id: 35, name: "İzmir", region: "Ege", lat: 38.4237, lng: 27.1428 },
  { id: 41, name: "Kocaeli", region: "Marmara", lat: 40.8533, lng: 29.8815 },
  { id: 44, name: "Malatya", region: "Doğu Anadolu", lat: 38.3552, lng: 38.3095 },
  { id: 46, name: "Kahramanmaraş", region: "Akdeniz", lat: 37.5753, lng: 36.9228 },
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
