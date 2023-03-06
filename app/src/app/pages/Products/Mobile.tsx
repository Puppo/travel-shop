
import { EVENTS, useEventBusSubscriber } from "@travel-shop-app/utils";
import { ReactElement, Suspense, lazy, useEffect, useState } from "react";
import { useOutlet } from "react-router-dom";

const Basket = lazy(() => import("@travel-shop-app/basket").then((module) => ({ default: module.Basket })));
const Products = lazy(() => import("@travel-shop-app/products").then((module) => ({ default: module.ProductList })));

export default function MobileProductsPage(): ReactElement | null {
  const outlet = useOutlet();
  const [view, setView] = useState<'products' | 'product' | 'basket'>(outlet ? 'product' : 'products');

  useEventBusSubscriber(EVENTS.NAV_BAR.BASKET.TOGGLE, () => {
    if (view === 'basket') {
      setView(outlet ? 'product' : 'products')
      return;
    }
    setView('basket')
  })

  useEffect(() => {
    if (view === 'basket') return;
    setView(outlet ? 'product' : 'products')
  }, [outlet, view])


  switch (view) {
    case 'products':
      return <Suspense fallback={<div>Loading...</div>}>
        <Products />
      </Suspense>
    case 'product':
      return outlet;
    case 'basket':
      return <Suspense fallback={<div>Loading...</div>}>
        <Basket />
      </Suspense>
  }
}