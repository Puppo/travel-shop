import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Basket, BasketItem } from '@travel-shop-app/basket/models';
import { httpClient } from '@travel-shop-app/utils';
import { QUERY_KEYS } from '../queryKeys';

async function patchAddProductToBasketRequest(
  basket: Basket,
  product: BasketItem
): Promise<void> {
  await httpClient(
    `/api/shopping-baskets/${basket.id}/products/remove/${product.id}`,
    {
      method: 'PATCH',
    }
  );
}

type UseRemoveProductFromBasketResult = UseMutateFunction<
  void,
  unknown,
  {
    product: BasketItem;
    basket: Basket;
  },
  unknown
>;

export function useRemoveProductFromBasket(): UseRemoveProductFromBasketResult {
  const queryClient = useQueryClient();
  const { mutate: removeProductFromBasketMutation } = useMutation<
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

      queryClient.setQueryData<Basket>([QUERY_KEYS.BASKET], (old) => {
        if (!old) return old;
        const newBasket = {
          ...old,
          items: old.items.filter((p) => p.id !== product.id),
        };
        return newBasket;
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

  return removeProductFromBasketMutation;
}
