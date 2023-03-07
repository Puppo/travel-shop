import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";


export function BasketEmpty() {
  const { t } = useTranslation('common')

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <ProductionQuantityLimitsIcon sx={{
        fontSize: 100,
        marginBottom: 1,
      }} />
      <Typography variant='h4'>{t('basket.empty')}</Typography>
    </Box>
  )
}