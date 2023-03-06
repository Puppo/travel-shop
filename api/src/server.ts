import autoLoad from '@fastify/autoload';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';

export const server = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(autoLoad, {
  dir: `${__dirname}/plugins`,
});

server.register(autoLoad, {
  dir: `${__dirname}/routes`,
  dirNameRoutePrefix: true,
  options: {
    prefix: '/api',
  },
});
