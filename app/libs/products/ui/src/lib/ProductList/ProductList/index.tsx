import Box from '@mui/material/Box';

import { useGetProducts } from "@travel-shop-app/products/hooks";
import { ProductListItem } from './ProductListItem';

import { Loader } from '@travel-shop-app/shared/ui';


export function ProductList() {
  const { products, isLoading } = useGetProducts();

  return (
    <Box>
      <Box component="main">
        {isLoading && <Loader />}

        <Box component="ul" sx={{
          all: 'unset',
        }}>
          {products.map((item) => (
            <ProductListItem key={item.id} item={item} />
          ))}
        </Box>
      </Box>

    </Box>
  );
}