 export interface TransportCity {
  id: number;
  name: string;
}

export interface VehicleType {
  id: number;
  name: string;
  capacity: number;
}

export interface TransportResult {
  distance: number;
  price: number;
  duration: string;
}