import { useAddProduct } from '@travel-shop-app/basket/hooks';
import { useGetProduct } from '@travel-shop-app/products/hooks';
import { EVENTS, useEventBusEmitter, useParamsTypeSafe } from '@travel-shop-app/utils';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const params = z.object({
  productId: z.coerce.number(),
});

export function Product() {
  const { t } = useTranslation(['product'])
  const {
    productId,
  } = useParamsTypeSafe(params)
  const {
    product,
    isLoading,
  } = useGetProduct({
    productId
  })

  const { addProduct } = useAddProduct()
  const { emit: emitToBus } = useEventBusEmitter()

  const addToBasket = useCallback((e: React.MouseEvent) => {
    e.preventDefault()

    if (!product) return;

    addProduct(product)
    emitToBus(EVENTS.PRODUCT.ADDED)
  }, [product, addProduct])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!product) {
    return <p>Product not found</p>
  }

  return (
    <div>
      <h2>{product.title}</h2>

      <p>
        {product.description}
      </p>
      <p>
        <span>{t('price')}</span>{product.price}</p>

      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}
