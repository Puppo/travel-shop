import { z } from 'zod';

export const BasketItem = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
});

export type BasketItem = z.infer<typeof BasketItem>;

export const Basket = z.object({
  id: z.number(),
  items: z.array(BasketItem),
});

export type Basket = z.infer<typeof Basket>;
