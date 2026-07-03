"use client";

import { Product } from "@/types/product";

export type CartItem = {
  productId: number;
  name: string;
  unit: string;
  price: number;
  image: string;
  quantity: number;
};

const CART_KEY = "cetinkaya-cart";
export const CART_EVENT = "cetinkaya-cart-updated";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getCartItems(): CartItem[] {
  if (!isBrowser()) {
    return [];
  }

  const rawValue = localStorage.getItem(CART_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    return JSON.parse(rawValue) as CartItem[];
  } catch {
    localStorage.removeItem(CART_KEY);
    return [];
  }
}

function saveCartItems(items: CartItem[]) {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(product: Product, quantity = 1) {
  const currentItems = getCartItems();
  const safeQuantity = Math.max(1, quantity);
  const existingItem = currentItems.find((item) => item.productId === product.id);
  const nextItems = existingItem
    ? currentItems.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + safeQuantity }
          : item,
      )
    : [
        ...currentItems,
        {
          productId: product.id,
          name: product.name,
          unit: product.unit,
          price: product.price,
          image: product.image,
          quantity: safeQuantity,
        },
      ];

  saveCartItems(nextItems);
  return nextItems;
}

export function updateCartItem(productId: number, quantity: number) {
  const safeQuantity = Math.max(1, quantity);
  const nextItems = getCartItems().map((item) =>
    item.productId === productId ? { ...item, quantity: safeQuantity } : item,
  );

  saveCartItems(nextItems);
  return nextItems;
}

export function removeCartItem(productId: number) {
  const nextItems = getCartItems().filter((item) => item.productId !== productId);

  saveCartItems(nextItems);
  return nextItems;
}

export function clearCart() {
  saveCartItems([]);
}

export function getCartTotal(items = getCartItems()) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
