
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MuiAppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useGetBasket } from '@travel-shop-app/basket/hooks';
import { LANGUAGES, Language } from '@travel-shop-app/utils';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function AppBar() {
  const { t, i18n: { changeLanguage } } = useTranslation(['common']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { basket } = useGetBasket();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (lang: Language) => {
    changeLanguage(lang.code)
    setAnchorEl(null);
  };

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
            component={Link}
            to="/basket"
          >
            <Badge badgeContent={basket?.items?.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
        <Box>
          <IconButton
            size="large"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {LANGUAGES.map((lang) => <MenuItem key={lang.code} onClick={() => handleChangeLanguage(lang)}>{lang.label}</MenuItem>)}
          </Menu>
        </Box>
      </Toolbar>
    </MuiAppBar>
  </Box>
}