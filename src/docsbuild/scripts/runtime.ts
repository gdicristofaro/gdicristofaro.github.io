import Handlebars from "handlebars/runtime";
import { registerHelpers } from "./helpers";

/**
 * Browser-side Handlebars environment: the runtime only, with no compiler.
 *
 * `.hbs` imports are precompiled at build time by the Vite plugin, which
 * rewrites each one into a `fromSpec(...)` call against this environment, so
 * the site bundle never carries the ~100 kB parser/compiler.
 */
const hbs = Handlebars.create();
registerHelpers(hbs);

/** Turns a precompiled template spec into a render function. */
export function fromSpec<T>(
  spec: TemplateSpecification,
): (context: T) => string {
  return hbs.template<T>(spec);
}
