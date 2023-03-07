
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useGetBasket } from '@travel-shop-app/basket/hooks';
import { EVENTS, useEventBusEmitter } from '@travel-shop-app/utils';
import { useTranslation } from 'react-i18next';

export function AppBar() {
  const { t } = useTranslation(['common']);
  const { basket } = useGetBasket();

  const { emit: emitToBus } = useEventBusEmitter();

  const handleBasketClick = () => {
    emitToBus(EVENTS.NAVIGATION.BASKET.TOGGLE);
  }

  return <Box sx={{ flexGrow: 1 }}>
    <MuiAppBar
      position="static">
      <Toolbar>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: 'block' }}
        >
          Travel Shop
        </Typography>


        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label={t('appBar.basketCount', { total: basket?.items?.length || 0 })!}
            color="inherit"
            onClick={handleBasketClick}
          >
            <Badge badgeContent={basket?.items?.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </MuiAppBar>
  </Box>
}