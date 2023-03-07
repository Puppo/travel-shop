
import { useDevice } from "@travel-shop-app/utils";
import { Suspense, lazy } from "react";

const DesktopProductPage = lazy(() => import("@travel-shop-app/products/ui").then((module) => ({ default: module.DesktopProductPage })));
const MobileProductPage = lazy(() => import("@travel-shop-app/products/ui").then((module) => ({ default: module.MobileProductPage })));

export default function ProductsPage() {
  const { isDesktop } = useDevice();

  if (isDesktop)
    return <Suspense>
      <DesktopProductPage />
    </Suspense>

  return <Suspense>
    <MobileProductPage />
  </Suspense>
}