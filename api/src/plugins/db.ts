import { faker } from "@faker-js/faker";
import fp from "fastify-plugin";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

interface Cart {
  id: number;
  products: Product[];
}

interface Db {
  products: Product[];
  carts: Map<number, Product[]>;
}

const DB: Db = {
  products: Array.from(
    {
      length: faker.datatype.number({
        min: 30,
        max: 50,
      }),
    },
    (_, i) => ({
      id: i + 1,
      title: faker.address.country(),
      description: faker.lorem.paragraph(),
      image: faker.image.city(),
      price: faker.datatype.number({
        min: 70,
        max: 500,
      }),
    })
  ),
  carts: new Map<number, Product[]>(),
};

interface DbApi {
  getProducts(): Product[];
  getProduct(id: number): Product | null;
  createCart(): Cart["id"];
  getCart(id: number): Cart | null;
  addProductToCart(cartId: number, productId: number): void;
  removeProductFromCart(cartId: number, productId: number): void;
}

declare module "fastify" {
  interface FastifyInstance {
    db: DbApi;
  }
}

const db = fp(async app => {
  let cartIdCount = 0;

  const getProducts = () => DB.products;

  const getProduct = (id: number): Product | null =>
    DB.products.find(product => product.id === id) || null;

  const createCart = (): Cart["id"] => {
    DB.carts.set(++cartIdCount, []);
    return cartIdCount;
  };

  const getCart = (id: number): Cart | null => {
    const products = DB.carts.get(id);
    if (!products) return null;
    return {
      id,
      products,
    };
  };

  const addProductToCart = (cartId: number, productId: number): void => {
    const cart = getCart(cartId);
    if (!cart) throw new Error(`Cart with id ${cartId} not found`);
    if (cart.products.find(p => p.id === productId)) return;

    const product = getProduct(productId);
    if (!product) throw new Error(`Product with id ${productId} not found`);

    DB.carts.set(cartId, cart.products.concat(product));
  };

  const removeProductFromCart = (cartId: number, productId: number): void => {
    const cart = getCart(cartId);
    if (!cart) throw new Error(`Cart with id ${cartId} not found`);

    const newProducts = cart.products.filter(p => p.id !== productId);

    DB.carts.set(cartId, newProducts);
  };

  const DB_API: DbApi = {
    getProducts,
    getProduct,
    createCart,
    getCart,
    addProductToCart,
    removeProductFromCart,
  };

  app.decorate("db", DB_API);
});

export default db;
