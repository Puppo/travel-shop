
import { Box } from "@mui/material";
import { Basket } from "@travel-shop-app/basket/ui";
import { ProductList } from "@travel-shop-app/products/ui";
import { Suspense } from "react";
import { useOutlet } from "react-router-dom";

export default function DesktopProductsPage() {
  const outlet = useOutlet();

  return <Box sx={{
    display: "flex",
    margin: '30px',
  }}>

    <Box sx={{
      flex: 1
    }}>
      <ProductList />
    </Box>

    <Box sx={{
      width: '30%',
      marginLeft: '30px'
    }}>
      <Basket />
    </Box>

    <Suspense>
      {outlet}
    </Suspense>
  </Box>
}