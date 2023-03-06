import {
  UseMutateAsyncFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { httpClient } from '@travel-shop-app/utils';
import { Basket } from '../models';
import { QUERY_KEYS } from '../queryKeys';

async function postCreateBasketRequest(): Promise<Basket> {
  return await httpClient(`/api/shopping-baskets`, {
    method: 'POST',
    schema: Basket,
  });
}

type UseCreateBasketResult = {
  createBasketMutation: UseMutateAsyncFunction<Basket, unknown, void, unknown>;
  isCreateBasketMutationPending: boolean;
};

export function useCreateBasket(): UseCreateBasketResult {
  const queryClient = useQueryClient();
  const {
    mutateAsync: createBasketMutation,
    isLoading: isCreateBasketMutationPending,
  } = useMutation(() => postCreateBasketRequest(), {
    onSuccess: (basket) => {
      queryClient.setQueryData([QUERY_KEYS.BASKET], basket);
    },
  });

  return {
    createBasketMutation,
    isCreateBasketMutationPending,
  };
}
