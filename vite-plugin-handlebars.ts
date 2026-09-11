// default import: handlebars is CommonJS, so named imports don't survive the
// ESM wrapper Vite bundles this config with
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import type { Plugin } from 'vite';

const RUNTIME_MODULE = fileURLToPath(
  new URL('./src/docsbuild/scripts/runtime.ts', import.meta.url),
);

/**
 * Compiles `.hbs` imports to template specs at build time, so the browser only
 * needs the Handlebars runtime rather than the full parser and compiler.
 *
 * The Node build scripts don't go through this plugin: they read the same
 * templates from disk and compile them with `docsbuild/scripts/compile.ts`.
 */
export default function handlebarsPrecompile(): Plugin {
  return {
    name: 'handlebars-precompile',
    // `?raw` and other query suffixes keep Vite's own handling
    transform(source, id) {
      if (!id.endsWith('.hbs')) return null;

      return {
        code: [
          `import { fromSpec } from ${JSON.stringify(RUNTIME_MODULE)};`,
          `export default fromSpec(${Handlebars.precompile(source)});`,
        ].join('\n'),
        map: null,
      };
    },
  };
}
