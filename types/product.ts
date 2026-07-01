export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  unit: string;
  stock: boolean;
  description: string;
  location: string;
  deliveryTime: string;
  minOrder: string;
  tags: string[];
  specs: {
    label: string;
    value: string;
  }[];
  priceHistory: {
    label: string;
    price: number;
  }[];
};
