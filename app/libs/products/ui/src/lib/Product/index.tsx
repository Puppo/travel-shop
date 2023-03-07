import { Box, CardActions, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useAddProduct, useGetBasket } from '@travel-shop-app/basket/hooks';
import { useGetProduct } from '@travel-shop-app/products/hooks';
import { Loader, Price } from '@travel-shop-app/shared/ui';
import { EVENTS, useEventBusEmitter, useParamsTypeSafe } from '@travel-shop-app/utils';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const params = z.object({
  productId: z.coerce.number(),
});

export function Product() {
  const { t } = useTranslation(['common'])
  const {
    productId,
  } = useParamsTypeSafe(params)
  const {
    product,
    isLoading,
  } = useGetProduct({
    productId
  })

  const { basket } = useGetBasket();

  const { addProduct } = useAddProduct()
  const { emit: emitToBus } = useEventBusEmitter()

  const isAlreadyInTheBasket = basket?.items.some(item => item.id === productId)

  const addToBasket = useCallback((e: React.MouseEvent) => {
    e.preventDefault()

    if (!product) return;

    addProduct(product)
    emitToBus(EVENTS.PRODUCT.ADDED)
  }, [product, addProduct, emitToBus])

  if (isLoading) {
    return <Loader />
  }

  if (!product) {
    return <p>Product not found</p>
  }

  return (
    <Card sx={{
      borderRadius: {
        xs: 0,
        sm: 0,
      },
      boxShadow: {
        xs: 0,
        sm: 0,
      }
    }}>
      <CardMedia
        component="img"
        loading='lazy'
        decoding='async'
        srcSet={product.image}
        title={product.title}
        height={300}
      />
      <CardContent>
        <Box component="div">
          <Typography gutterBottom variant="h5" component="span">
            {product.title}
          </Typography>
          {' '}
          <Typography gutterBottom variant="h4" component="span" color="primary">
            <Price value={product.price} />
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions sx={{
        justifyContent: {
          xs: 'center',
          sm: 'center',
          md: 'flex-end'
        },
      }}>
        <Button
          disabled={isAlreadyInTheBasket}
          onClick={addToBasket}
          color='primary'
          variant="contained"
          size="large"
          sx={{
            width: '180px'
          }}>{t('product.addToCart')}</Button>
      </CardActions>
    </Card>
  );
}
