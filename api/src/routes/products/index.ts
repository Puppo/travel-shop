import { Static, Type } from '@sinclair/typebox';
import { FastifyPluginAsync, errorCodes } from 'fastify';

const GetProductParams = Type.Object({
  id: Type.Number(),
});

type GetProductParams = Static<typeof GetProductParams>;

const Product = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  description: Type.String(),
  image: Type.String(),
  price: Type.Number(),
});

const Products = Type.Array(Product);

type Product = Static<typeof Product>;

const productsRoutes: FastifyPluginAsync = async (app) => {
  app.get<{
    Reply: Product[];
  }>(
    '',
    {
      schema: {
        response: {
          200: Products,
        },
      },
    },
    async () => {
      app.log.info('Getting products');
      await app.waiter.wait(5, 6);
      return app.db.getProducts();
    }
  );

  app.get<{
    Params: GetProductParams;
    Reply: Product;
  }>(
    '/:id',
    {
      schema: {
        params: GetProductParams,
        response: {
          200: Product,
        },
      },
    },
    async (request) => {
      app.log.info(`Getting product ${request.params.id}`);
      await app.waiter.wait(1, 2);
      const product = app.db.getProduct(request.params.id);
      if (!product) throw errorCodes.FST_ERR_NOT_FOUND;

      return product;
    }
  );
};

export default productsRoutes;
