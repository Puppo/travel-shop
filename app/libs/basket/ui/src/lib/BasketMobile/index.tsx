import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Basket } from '../Basket';

export function BasketMobile() {
  const { t } = useTranslation('common');

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
          component={Link}
          to="/products"
          variant="outlined"
          size="large"
          color="primary"
          sx={{
            width: '180px',
          }}
        >
          {t('basket.back')}
        </Button>
      </Box>
    </Box>
  );
}
