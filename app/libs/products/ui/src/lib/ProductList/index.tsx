import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

import { useGetProducts } from "@travel-shop-app/products/hooks";
import { ProductListItem } from './ProductListItem';

import styles from './index.module.scss';


export function ProductList() {
  const { t } = useTranslation(['common'])
  const { products, isLoading } = useGetProducts();

  return (
    <Box>
      <Box itemType="main">
        {isLoading && <p>Loading...</p>}

        <Box itemType='ul' className={styles['list-container']}>
          {products.map((item) => (
            <ProductListItem key={item.id} item={item} />
          ))}
        </Box>
      </Box>

    </Box>
  );
}