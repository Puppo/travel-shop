
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Price } from '@travel-shop-app/shared';
import { MouseEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetBasket } from '../../../hooks/useGetBasket';
import { useRemoveProductFromBasket } from '../../../hooks/useRemoveProductFromBasket';
import { BasketItem } from '../../../models';

interface BasketRowProps {
  item: BasketItem;
}

export function BasketRow({ item }: BasketRowProps) {
  const { basket } = useGetBasket();
  const removeProductFromBasketMutation = useRemoveProductFromBasket();
  const { t } = useTranslation();

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
          aria-label="delete"
          onClick={removeProductFromBasket}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={item.title}
        secondary={<>
          {t('price')}: <Price value={item.price} />
        </>}
      />

    </ListItem>
  );
}

