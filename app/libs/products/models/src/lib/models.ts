import { z } from 'zod';

export const Product = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string().url(),
  price: z.number(),
});

export const Products = z.array(Product);

export type Product = z.infer<typeof Product>;
