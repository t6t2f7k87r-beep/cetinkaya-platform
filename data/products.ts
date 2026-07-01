 import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "B420C İnşaat Demiri",
    category: "Demir",
    brand: "Kardemir",
    price: 32450,
    image: "/products/demir.jpg",
    unit: "Ton",
    stock: true,
  },
  {
    id: 2,
    name: "Portland Çimento",
    category: "Çimento",
    brand: "OYAK",
    price: 285,
    image: "/products/cimento.jpg",
    unit: "Torba",
    stock: true,
  },
  {
    id: 3,
    name: "Gaz Beton Blok",
    category: "Gaz Beton",
    brand: "YTONG",
    price: 165,
    image: "/products/gazbeton.jpg",
    unit: "Adet",
    stock: true,
  },
];

export const featuredProducts = products;
