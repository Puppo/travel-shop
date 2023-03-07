import { Box, Button, Typography } from '@mui/material';
import List from '@mui/material/List';
import { useGetBasket } from '@travel-shop-app/basket/hooks';
import { Loader, Price } from '@travel-shop-app/shared/ui';
import { useTranslation } from 'react-i18next';
import { BasketEmpty } from './BasketEmpty';
import { BasketRow } from './BasketRow';

export function Basket() {
  const { t } = useTranslation("common")
  const { basket, isLoading } = useGetBasket()

  const total = basket?.items.reduce((acc, item) => acc + item.price, 0)

  return (
    <Box sx={{
      height: {
        md: 'calc(100vh - 120px)',
      },
      overflow: 'auto',
      position: ['sticky', '-webkit-sticky'],
      top: 0,
    }}>
      <Box sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Box component="main" sx={{
          flex: 1,
          overflow: 'auto'
        }}>

          {isLoading && <Loader />}

          {!total && <BasketEmpty />}

          {!!total && <List>
            {basket?.items.map((item) => <BasketRow key={item.id} item={item} />)}
          </List>
          }
        </Box>

        {
          !!total && <Box component="footer" sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Box sx={{
              textAlign: 'right',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 2,
              borderTop: '1px solid #e0e0e0',
            }}>
              <Typography variant='h5'>{t('basket.total')}</Typography>
              <Typography variant='h4'><Price value={total} /></Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <Button variant="contained" color="primary" size="large" fullWidth sx={{
                width: '180px'
              }}>
                {t('basket.checkout')}
              </Button>
            </Box>

          </Box>
        }

      </Box>
    </Box>
  );
}
