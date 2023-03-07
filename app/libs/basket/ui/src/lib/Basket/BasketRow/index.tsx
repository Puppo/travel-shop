
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useGetBasket, useRemoveProductFromBasket } from '@travel-shop-app/basket/hooks';
import { BasketItem } from '@travel-shop-app/basket/models';
import { Price } from '@travel-shop-app/shared/ui';
import { MouseEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface BasketRowProps {
  item: BasketItem;
}

export function BasketRow({ item }: BasketRowProps) {
  const { basket } = useGetBasket();
  const removeProductFromBasketMutation = useRemoveProductFromBasket();
  const { t } = useTranslation(['common']);

  const removeProductFromBasket = useCallback((e: MouseEvent) => {
    e.preventDefault();

    if (!basket) return;

    removeProductFromBasketMutation({
      basket,
      product: item,
    });
  }, [removeProductFromBasketMutation, basket])

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label={t('basket.remove')!}
          onClick={removeProductFromBasket}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={item.title}
        secondary={<Price value={item.price} />}
      />

    </ListItem>
  );
}

