export interface TransportCity {
  id: number;
  name: string;
  region: string;
  lat: number;
  lng: number;
}

export interface VehicleType {
  id: number;
  name: string;
  capacity: number;
  basePrice: number;
  pricePerKm: number;
}

export interface TransportResult {
  distance: number;
  price: number;
  duration: string;
  vehicleName: string;
  fromName: string;
  toName: string;
  tonnage: number;
  trips: number;
}
