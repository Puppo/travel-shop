import { useQuery } from '@tanstack/react-query';
import { Product, Products } from '@travel-shop-app/products/models';
import { httpClient } from '@travel-shop-app/utils';
import { QUERY_KEYS } from '../queryKeys';

async function getProductsRequest(signal?: AbortSignal): Promise<Product[]> {
  return await httpClient('/api/products', {
    schema: Products,
    signal,
  });
}

interface UseGetProductsResult {
  isLoading: boolean;
  products: Product[];
  error?: unknown;
}

export function useGetProducts(): UseGetProductsResult {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery([QUERY_KEYS.PRODUCTS], ({ signal }) =>
    getProductsRequest(signal)
  );
  return {
    isLoading,
    products,
    error,
  };
}
