import { useQuery } from '@tanstack/react-query';
import { Basket } from '@travel-shop-app/basket/models';
import { httpClient } from '@travel-shop-app/utils';
import { useEffect } from 'react';
import { QUERY_KEYS } from '../queryKeys';
import {
  clearStoredBasket,
  getStoredBasket,
  setStoredBasket,
} from '../storage';

async function getBasketRequest(
  basket: Basket | null,
  signal?: AbortSignal
): Promise<Basket | null> {
  if (!basket) return null;
  return await httpClient(`/api/shopping-baskets/${basket.id}`, {
    schema: Basket,
    signal,
  });
}

interface UseGetBasketResult {
  isLoading: boolean;
  basket: Basket | null;
  error?: unknown;
}

export function useGetBasket(): UseGetBasketResult {
  const {
    // @ts-ignore
    data: basket,
    isLoading,
    error,
  }: {
    isLoading: boolean;
    data?: Basket | null;
    error?: unknown;
  } = useQuery([QUERY_KEYS.BASKET], () => getBasketRequest(basket), {
    initialData: getStoredBasket(),
  });

  useEffect(() => {
    if (!basket) clearStoredBasket();
    else setStoredBasket(basket);
  }, [basket]);

  return {
    isLoading,
    basket,
    error,
  };
}
