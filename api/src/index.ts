import { server } from './server';

async function main() {
  const address = await server.listen({
    port: 3000,
  });
  console.log(`Server listening at ${address}`);
}

main();
