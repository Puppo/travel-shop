
import { Loader } from "@travel-shop-app/shared/ui";
import { EVENTS, useEventBusSubscriber } from "@travel-shop-app/utils";
import { ReactElement, Suspense, lazy, useEffect, useState } from "react";
import { useOutlet } from "react-router-dom";

const Basket = lazy(() => import("@travel-shop-app/basket/ui").then((module) => ({ default: module.Basket })));
const BasketMobile = lazy(() => import("@travel-shop-app/basket/ui").then((module) => ({ default: module.BasketMobile })));
const Products = lazy(() => import("@travel-shop-app/products/ui").then((module) => ({ default: module.ProductList })));


export default function MobileProductsPage(): ReactElement | null {
  const outlet = useOutlet();
  const [view, setView] = useState<'products' | 'product' | 'basket'>(outlet ? 'product' : 'products');

  useEventBusSubscriber(EVENTS.NAVIGATION.BASKET.TOGGLE, () => {
    if (view === 'basket') {
      setView(outlet ? 'product' : 'products')
      return;
    }
    setView('basket')
  })

  useEventBusSubscriber(EVENTS.NAVIGATION.PRODUCTS.GOTO, () => {
    if (view === 'products') return;
    setView('products')
  })

  useEffect(() => {
    if (view === 'basket') return;
    setView(outlet ? 'product' : 'products')
  }, [outlet, view])


  switch (view) {
    case 'products':
      return <Suspense fallback={<Loader />}>
        <Products />
      </Suspense>
    case 'product':
      return outlet;
    case 'basket':
      return <Suspense fallback={<Loader />}>
        <BasketMobile />
      </Suspense>
  }
}