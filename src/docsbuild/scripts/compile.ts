import Handlebars from "handlebars";
import { registerHelpers } from "./helpers";

/**
 * Node-side Handlebars environment: the full library, since the build scripts
 * read `.hbs` files from disk at run time (which is what lets `--watch` pick
 * up template edits without a rebuild).
 *
 * The site bundle deliberately does not import this module — see `runtime.ts`.
 */
const hbs = Handlebars.create();
registerHelpers(hbs);

/** Compiles an HTML template: `{{expressions}}` are HTML-escaped. */
export function compileHtml<T>(source: string): (context: T) => string {
  return hbs.compile<T>(source);
}

/** Compiles a plaintext template, where HTML escaping would be corruption. */
export function compileText<T>(source: string): (context: T) => string {
  return hbs.compile<T>(source, { noEscape: true });
}
