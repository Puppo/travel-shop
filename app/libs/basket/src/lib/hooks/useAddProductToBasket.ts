import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { httpClient } from '@travel-shop-app/utils';
import { Basket, BasketItem } from '../models';
import { QUERY_KEYS } from '../queryKeys';

async function patchAddProductToBasketRequest(
  basket: Basket,
  product: BasketItem
): Promise<void> {
  await httpClient(
    `/api/shopping-baskets/${basket.id}/products/add/${product.id}`,
    {
      method: 'PATCH',
    }
  );
}

type UseAddProductToBasketResult = UseMutateFunction<
  void,
  unknown,
  {
    product: BasketItem;
    basket: Basket;
  },
  unknown
>;

export function useAddProductToBasket(): UseAddProductToBasketResult {
  const queryClient = useQueryClient();
  const { mutate: addProductToBasketMutation } = useMutation<
    void,
    unknown,
    {
      product: BasketItem;
      basket: Basket;
    },
    { previousBasket?: Basket }
  >(({ product, basket }) => patchAddProductToBasketRequest(basket, product), {
    onMutate: async ({ product, basket }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.BASKET] });

      const previousBasket = queryClient.getQueryData<Basket>([
        QUERY_KEYS.BASKET,
      ]);
      if (!previousBasket) return;

      if (basket.items.find((item) => item.id === product.id)) return;

      queryClient.setQueryData<Basket>([QUERY_KEYS.BASKET], (old) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.concat([product]),
        };
      });

      return { previousBasket };
    },
    onError: (err, _, context) => {
      if (context?.previousBasket) {
        queryClient.setQueriesData<Basket>(
          [QUERY_KEYS.BASKET],
          context.previousBasket
        );
      }
    },
  });

  return addProductToBasketMutation;
}
