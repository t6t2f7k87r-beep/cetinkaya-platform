export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  stock: string;
}

export const featuredProducts: Product[] = [
  {
    id: 1,
    title: "Nervürlü İnşaat Demiri",
    category: "Demir",
    price: 32450,
    image: "/images/products/demir.jpg",
    stock: "Stokta",
  },
  {
    id: 2,
    title: "42.5 Portland Çimento",
    category: "Çimento",
    price: 265,
    image: "/images/products/cimento.jpg",
    stock: "Stokta",
  },
  {
    id: 3,
    title: "Gaz Beton Blok",
    category: "Gaz Beton",
    price: 145,
    image: "/images/products/gazbeton.jpg",
    stock: "Stokta",
  },
  {
    id: 4,
    title: "Yığma Tuğla",
    category: "Tuğla",
    price: 16,
    image: "/images/products/tugla.jpg",
    stock: "Stokta",
  },
];