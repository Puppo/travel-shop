import { Static, Type } from '@sinclair/typebox';
import { FastifyPluginAsync, errorCodes } from 'fastify';

const GetCartParams = Type.Object({
  id: Type.Number(),
});

type GetCartParams = Static<typeof GetCartParams>;

const AddProductToCartParams = Type.Object({
  cartId: Type.Number(),
  productId: Type.Number(),
});

type AddProductToCartParams = Static<typeof AddProductToCartParams>;

const RemoveProductFromCartParams = Type.Object({
  cartId: Type.Number(),
  productId: Type.Number(),
});

type RemoveProductFromCartParams = Static<typeof RemoveProductFromCartParams>;

const Product = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  description: Type.String(),
  image: Type.String(),
  price: Type.Number(),
});
const Products = Type.Array(Product);

type Product = Static<typeof Product>;

const Cart = Type.Object({
  id: Type.Number(),
  items: Products,
});

type Cart = Static<typeof Cart>;

const cartRoutes: FastifyPluginAsync = async (app) => {
  app.post<{
    Reply: Cart;
  }>(
    '',
    {
      schema: {
        response: {
          200: Cart,
        },
      },
    },
    async () => {
      app.log.info('Create cart');
      await app.waiter.wait(1, 2);
      const id = app.db.createCart();
      return { id, items: [] };
    }
  );

  app.get<{
    Params: GetCartParams;
    Reply: Cart;
  }>(
    '/:id',
    {
      schema: {
        params: GetCartParams,
        response: {
          200: Cart,
        },
      },
    },
    async (request) => {
      app.log.info(`Getting cart ${request.params.id}`);
      await app.waiter.wait(1, 2);
      const cart = app.db.getCart(request.params.id);
      if (!cart) throw errorCodes.FST_ERR_NOT_FOUND;

      return {
        id: cart.id,
        items: cart.products,
      };
    }
  );

  app.patch<{
    Params: AddProductToCartParams;
  }>(
    '/:cartId/products/add/:productId',
    {
      schema: {
        params: AddProductToCartParams,
      },
    },
    async (request) => {
      app.log.info(
        `Add product ${request.params.productId} to cart ${request.params.cartId}`
      );
      await app.waiter.wait(1, 2);
      app.db.addProductToCart(request.params.cartId, request.params.productId);
    }
  );

  app.patch<{
    Params: RemoveProductFromCartParams;
  }>(
    '/:cartId/products/remove/:productId',
    {
      schema: {
        params: RemoveProductFromCartParams,
      },
    },
    async (request) => {
      app.log.info(
        `Remove product ${request.params.productId} from cart ${request.params.cartId}`
      );
      await app.waiter.wait(1, 2);
      app.db.removeProductFromCart(
        request.params.cartId,
        request.params.productId
      );
    }
  );
};

export default cartRoutes;
