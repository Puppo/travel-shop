import { useCallback } from 'react';
import { BasketItem } from '../models';
import { useAddProductToBasket } from './useAddProductToBasket';
import { useCreateBasket } from './useCreateBasket';
import { useGetBasket } from './useGetBasket';

type UseGetBasketResult = {
  addProduct: (product: BasketItem) => void;
};

export function useAddProduct(): UseGetBasketResult {
  const { createBasketMutation, isCreateBasketMutationPending } =
    useCreateBasket();
  const addProductToBasketMutation = useAddProductToBasket();
  const { basket } = useGetBasket();

  const addProduct = useCallback(
    (product: BasketItem) => {
      if (isCreateBasketMutationPending) return;
      if (!basket) {
        createBasketMutation().then((basket) =>
          addProductToBasketMutation({ basket, product })
        );
        return;
      }

      addProductToBasketMutation({ basket, product });
    },
    [basket, addProductToBasketMutation]
  );

  return {
    addProduct,
  };
}
