
import { useDevice } from "@travel-shop-app/utils";
import { lazy } from "react";

const DesktopProductPage = lazy(() => import("./Desktop"));
const MobileProductPage = lazy(() => import("./Mobile"));

export default function ProductsPage() {
  const { isDesktop } = useDevice();

  if (isDesktop)
    return <DesktopProductPage />

  return <MobileProductPage />
}