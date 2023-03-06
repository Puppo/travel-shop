
import { ReactElement, Suspense, lazy } from "react";

const Product = lazy(() => import("@travel-shop-app/products").then((module) => ({ default: module.Product })));

export default function MobileProductPage(): ReactElement | null {
  return <Suspense fallback={<div>Loading...</div>}>
    <Product />
  </Suspense>
}