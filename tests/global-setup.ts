import { createServer, type ViteDevServer } from 'vite';
import { TEST_PORT } from './constants';

let server: ViteDevServer | undefined;

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
  // optional chaining: if setup failed (e.g. port 5199 already in use),
  // don't mask the real error with a crash here
  await server?.close();
}
