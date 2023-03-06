import { lazy } from "react";
import {
  Navigate,
  createBrowserRouter
} from "react-router-dom";

const ProductsPage = lazy(() => import("./pages/Products"));
const ProductPage = lazy(() => import("./pages/Product"));

export const router = createBrowserRouter([
  {
    path: "/products",
    element: <ProductsPage />,
    children: [
      {
        path: ":productId",
        element: <ProductPage />,
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/products" replace />
  }
]);
