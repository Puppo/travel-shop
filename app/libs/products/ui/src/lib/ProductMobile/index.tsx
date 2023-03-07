
import { Box, Button } from "@mui/material";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Product } from "../Product";

export function MobileProductPage(): ReactElement | null {
  const { t } = useTranslation('common');

  return <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box>
      <Product />
    </Box>

    <Box sx={{
      marginTop: 3
    }}>
      <Button component={Link} to="/products" variant="outlined" color="primary" sx={{
        width: '180px'
      }}>
        {t('product.back')}
      </Button>
    </Box>
  </Box>
}