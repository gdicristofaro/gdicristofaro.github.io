/**
 * `.hbs` imports are rewritten by the handlebars-precompile Vite plugin (see
 * vite-plugin-handlebars.ts) into a ready-to-call render function.
 */
declare module "*.hbs" {
  const template: (context: unknown) => string;
  export default template;
}
