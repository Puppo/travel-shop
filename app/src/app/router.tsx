import { useDevice } from "@travel-shop-app/utils";
import { Suspense, lazy } from "react";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import { AppBar } from "./components/AppBar";


const DesktopProductsPage = lazy(() => import("@travel-shop-app/products/ui").then((module) => ({ default: module.DesktopProductList })));
const MobileProductsPage = lazy(() => import("@travel-shop-app/products/ui").then((module) => ({ default: module.MobileProductList })));
const MobileBasket = lazy(() => import("@travel-shop-app/basket/ui").then(({ BasketMobile }) => ({ default: BasketMobile })));
const DesktopProductPage = lazy(() => import("@travel-shop-app/products/ui").then((module) => ({ default: module.DesktopProduct })));
const MobileProductPage = lazy(() => import("@travel-shop-app/products/ui").then((module) => ({ default: module.MobileProduct })));

export const desktopRouter = createBrowserRouter([{
  element: <Suspense>
    <AppBar />
    <Outlet />
  </Suspense>,
  children: [{
    path: "/products",
    element: <Suspense><DesktopProductsPage /></Suspense>,
    children: [
      {
        path: ":productId",
        element: <Suspense><DesktopProductPage /></Suspense>,
      }
    ]
  }]
},
{
  path: "*",
  element:
    <Navigate to="/products" replace />
}]);

export const mobileRouter = createBrowserRouter([{
  element: <>
    <Suspense>
      <AppBar />
      <Outlet />
    </Suspense>
  </>,
  children: [{
    path: "/products",
    element: <Suspense><MobileProductsPage /></Suspense>,
  },
  {
    path: "/products/:productId",
    element: <Suspense><MobileProductPage /></Suspense>,
  },
  {
    path: "/basket",
    element: <Suspense><MobileBasket /></Suspense>,
  }]
}, {
  path: "*",
  element:
    <Navigate to="/products" replace />
}]);


export default function Router() {
  const { isDesktop } = useDevice();

  const router = isDesktop ? desktopRouter : mobileRouter;

  return <RouterProvider router={router} />
}