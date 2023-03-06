import { faker } from '@faker-js/faker';
import fp from 'fastify-plugin';

interface Waiter {
  wait: (min: number, max: number) => Promise<void>;
}

declare module 'fastify' {
  interface FastifyInstance {
    waiter: Waiter;
  }
}

const waiter = fp(async (app) => {
  function randomNumber(min: number, max: number): number {
    return faker.datatype.number({
      min: min * 1000,
      max: max * 1000,
    });
  }

  function wait(min: number, max: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, randomNumber(min, max));
    });
  }

  app.decorate('waiter', { wait });
});

export default waiter;
