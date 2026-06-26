export interface ProductPrice {
  id: number;
  name: string;
  price: number;
  unit: string;
  change: number;
  updatedAt: string;
}

export const prices: ProductPrice[] = [
  {
    id: 1,
    name: "Nervürlü İnşaat Demiri",
    price: 32450,
    unit: "Ton",
    change: 2.4,
    updatedAt: "09:30",
  },
  {
    id: 2,
    name: "42.5 Çimento",
    price: 265,
    unit: "Torba",
    change: -0.7,
    updatedAt: "09:30",
  },
  {
    id: 3,
    name: "13.5 Gaz Beton",
    price: 145,
    unit: "Adet",
    change: 1.1,
    updatedAt: "09:30",
  },
  {
    id: 4,
    name: "Yığma Tuğla",
    price: 16,
    unit: "Adet",
    change: 0,
    updatedAt: "09:30",
  },
];