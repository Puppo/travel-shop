import { Box, Typography } from '@mui/material';
import List from '@mui/material/List';
import { useTranslation } from 'react-i18next';
import { useGetBasket } from '../../hooks/useGetBasket';
import { BasketRow } from './BasketRow';

export function Basket() {
  const { t } = useTranslation("common")
  const { basket, isLoading } = useGetBasket()

  return (
    <Box sx={{
      height: {
        md: 'calc(100vh - 100px)',
      },
      overflow: 'auto'
    }}>
      <Typography variant='h5'>{t('basket.title')}</Typography>

      {isLoading && <p>Loading...</p>}

      {(!basket || basket.items.length === 0) && <Box>
        <Typography >
          {t('basket.empty')}
        </Typography>
      </Box>}

      <List>
        {basket?.items.map((item) => <BasketRow item={item} />)}
      </List>
    </Box>
  );
}
