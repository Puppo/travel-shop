import { Basket } from '@travel-shop-app/basket/models';

const BASKET_LOCAL_STORAGE_KEY = '[travel-shop].basket';
const BASKET_LOCAL_STORAGE_TTL = 900000;

type StoredBasket = {
  expirationAt: number;
  basket: Basket;
};

export function getStoredBasket(): Basket | null {
  const storedBasket = localStorage.getItem(BASKET_LOCAL_STORAGE_KEY);
  const result = storedBasket
    ? (JSON.parse(storedBasket) as StoredBasket)
    : null;
  if (!result) return null;
  const { expirationAt } = result;
  const now = new Date().getTime();
  if (now > expirationAt) {
    clearStoredBasket();
    return null;
  }
  return result.basket;
}

export function setStoredBasket(basket: Basket): void {
  const expirationAt = new Date().getTime() + BASKET_LOCAL_STORAGE_TTL;
  const storedBasket: StoredBasket = {
    expirationAt,
    basket,
  };
  localStorage.setItem(BASKET_LOCAL_STORAGE_KEY, JSON.stringify(storedBasket));
}

export function clearStoredBasket(): void {
  localStorage.removeItem(BASKET_LOCAL_STORAGE_KEY);
}
