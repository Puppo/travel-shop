import { Suspense, lazy } from "react";
import {
  Navigate,
  createBrowserRouter
} from "react-router-dom";

const ProductsPage = lazy(() => import("./pages/Products"));
const ProductPage = lazy(() => import("./pages/Product"));

export const router = createBrowserRouter([
  {
    path: "/products",
    element: <Suspense><ProductsPage /></Suspense>,
    children: [
      {
        path: ":productId",
        element: <Suspense><ProductPage /></Suspense>,
      }
    ]
  },
  {
    path: "*",
    element:
      <Navigate to="/products" replace />
  }
]);
