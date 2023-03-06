import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { useGetProducts } from "../../hooks/useGetProducts";
import { ProductListItem } from './ProductListItem';

import styles from './index.module.scss';


export function ProductList() {
  const { t } = useTranslation(['common'])
  const { products, isLoading } = useGetProducts();

  return (
    <Box sx={{
      height: {
        md: 'calc(100vh - 100px)',
      },
      overflow: 'auto'
    }}>
      <Box itemType="header">
        <Typography variant='h5'>{t('products.title')}</Typography>
      </Box>

      <Box itemType="main">
        {isLoading && <p>Loading...</p>}

        <Box itemType='ul' className={styles['list-container']}>
          {products.map((item) => (
            <ProductListItem key={item.id} item={item} />
          ))}
        </Box>
      </Box>

      <Box itemType="Footer">
        <Typography variant='h5'>{t('products.footer')}</Typography>

      </Box>

    </Box>
  );
}