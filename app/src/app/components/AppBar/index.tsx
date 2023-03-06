
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { EVENTS, useEventBusEmitter } from '@travel-shop-app/utils';
import { useGetBasket } from 'libs/basket/src/lib/hooks/useGetBasket';

export function AppBar() {
  const { basket } = useGetBasket();

  const { emit: emitToBus } = useEventBusEmitter();

  const handleBasketClick = () => {
    emitToBus(EVENTS.NAV_BAR.BASKET.TOGGLE);
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
        <Box sx={{ display: { xs: 'flex', md: 'flex', lg: 'none' } }}>
          <IconButton
            size="large"
            aria-label={`show ${basket?.items?.length || 0} new mails`}
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