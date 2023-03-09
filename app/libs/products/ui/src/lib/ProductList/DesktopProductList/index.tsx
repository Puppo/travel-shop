
import { Box } from "@mui/material";
import { Basket } from "@travel-shop-app/basket/ui";
import { Suspense } from "react";
import { useOutlet } from "react-router-dom";
import { ProductList } from "../ProductList";

export function DesktopProductList() {
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