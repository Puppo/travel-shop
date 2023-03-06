
import { useDevice } from "@travel-shop-app/utils";
import { Suspense, lazy } from "react";

const DesktopProductsPage = lazy(() => import("./Desktop"));
const MobileProductsPage = lazy(() => import("./Mobile"));

export default function ProductsPage() {
  const { isDesktop } = useDevice();

  if (isDesktop)
    return <Suspense>
      <DesktopProductsPage />
    </Suspense>

  return <Suspense>
    <MobileProductsPage />
  </Suspense>
}