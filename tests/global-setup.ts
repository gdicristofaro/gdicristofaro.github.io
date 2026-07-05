import { createServer, type ViteDevServer } from 'vite';
import { TEST_PORT } from './constants';

let server: ViteDevServer;

// boots the app's Vite dev server (with the project's vite.config.ts)
// once for the whole test run
export async function setup() {
  server = await createServer({
    server: { port: TEST_PORT, strictPort: true },
    logLevel: 'error',
  });
  await server.listen();
}

export async function teardown() {
  await server.close();
}
