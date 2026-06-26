import { TransportCity, VehicleType } from "@/types/transport";

export const cities: TransportCity[] = [
  { id: 44, name: "Malatya" },
  { id: 6, name: "Ankara" },
  { id: 34, name: "İstanbul" },
  { id: 35, name: "İzmir" },
  { id: 27, name: "Gaziantep" },
  { id: 46, name: "Kahramanmaraş" },
  { id: 21, name: "Diyarbakır" },
];

export const vehicles: VehicleType[] = [
  {
    id: 1,
    name: "Kamyonet",
    capacity: 3,
  },
  {
    id: 2,
    name: "Kamyon",
    capacity: 10,
  },
  {
    id: 3,
    name: "Tır",
    capacity: 27,
  },
];