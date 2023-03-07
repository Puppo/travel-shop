import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { EVENTS, useEventBusEmitter } from '@travel-shop-app/utils';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Basket } from '../Basket';

export function BasketMobile() {
  const { t } = useTranslation('common');
  const { emit: sendMessageToBus } = useEventBusEmitter();

  const onGoToProducts = useCallback(() => {
    sendMessageToBus(EVENTS.NAVIGATION.PRODUCTS.GOTO);
  }, [sendMessageToBus]);

  return (
    <Box>
      <Box>
        <Basket />
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          marginTop: 3,
        }}
      >
        <Button
          onClick={onGoToProducts}
          variant="outlined"
          size="large"
          color="primary"
          sx={{
            width: '180px',
          }}
        >
          {t('product.back')}
        </Button>
      </Box>
    </Box>
  );
}
