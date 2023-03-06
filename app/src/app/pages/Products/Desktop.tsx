
// import { Product, Products } from "@travel-shop-app/products";
import { Box } from "@mui/material";
import { Suspense, lazy } from "react";
import { useOutlet } from "react-router-dom";

const Basket = lazy(() => import("@travel-shop-app/basket").then((module) => ({ default: module.Basket })));
const Products = lazy(() => import("@travel-shop-app/products").then((module) => ({ default: module.ProductList })));

export default function DesktopProductsPage() {
  const outlet = useOutlet();

  return <Box sx={{
    display: "flex",
    margin: '30px',
  }}>

    <Box sx={{
      flex: 1
    }}>
      <Products />
    </Box>

    <Box sx={{
      width: '35%',
      marginLeft: '30px'
    }}>
      <Basket />
    </Box>

    <Suspense>
      {outlet}
    </Suspense>
  </Box>
}