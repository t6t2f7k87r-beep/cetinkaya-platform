import { TransportCity, TransportResult, VehicleType } from "@/types/transport";

const EARTH_RADIUS_KM = 6371;

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function calculateDistance(from: TransportCity, to: TransportCity) {
  const latDistance = toRadians(to.lat - from.lat);
  const lngDistance = toRadians(to.lng - from.lng);
  const fromLat = toRadians(from.lat);
  const toLat = toRadians(to.lat);

  const a =
    Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
    Math.cos(fromLat) *
      Math.cos(toLat) *
      Math.sin(lngDistance / 2) *
      Math.sin(lngDistance / 2);

  const distance = 2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(distance * 1.18);
}

export function calculateTransportQuote(
  from: TransportCity,
  to: TransportCity,
  vehicle: VehicleType,
  tonnage: number,
): TransportResult {
  const distance = calculateDistance(from, to);
  const trips = Math.max(1, Math.ceil(tonnage / vehicle.capacity));
  const loadRatio = Math.min(1, tonnage / (vehicle.capacity * trips));
  const price = Math.round(
    (vehicle.basePrice + distance * vehicle.pricePerKm * (0.82 + loadRatio * 0.28)) *
      trips,
  );
  const totalHours = Math.max(2, Math.round(distance / 62 + trips * 1.5));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  return {
    distance,
    price,
    duration: days > 0 ? `${days} gün ${hours} saat` : `${hours} saat`,
    vehicleName: vehicle.name,
    fromName: from.name,
    toName: to.name,
    tonnage,
    trips,
  };
}
