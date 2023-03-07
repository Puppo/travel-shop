
import { EVENTS, useEventBusSubscriber } from "@travel-shop-app/utils";
import { ReactElement, useEffect, useState } from "react";
import { useOutlet } from "react-router-dom";


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
      return
    case 'product':
      return outlet;
    case 'basket':
      return
  }
}