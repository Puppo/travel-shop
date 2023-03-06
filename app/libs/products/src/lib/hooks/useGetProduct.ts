import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@travel-shop-app/utils';
import { Product } from '../models';
import { QUERY_KEYS } from '../queryKeys';

export async function getProductRequest(
  productId: Product['id'],
  signal?: AbortSignal
): Promise<Product> {
  return await httpClient(`/api/products/${productId}`, {
    schema: Product,
    signal,
  });
}

interface UseGetProductProps {
  productId: Product['id'];
}

interface UseGetProductResult {
  isLoading: boolean;
  product: Product | null;
  error?: unknown;
}

export function useGetProduct({
  productId,
}: UseGetProductProps): UseGetProductResult {
  const {
    data: product = null,
    isLoading,
    error,
  } = useQuery([QUERY_KEYS.PRODUCTS, productId], ({ signal }) =>
    getProductRequest(productId, signal)
  );
  return {
    isLoading,
    product,
    error,
  };
}
