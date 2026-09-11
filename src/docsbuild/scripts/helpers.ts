/**
 * Helpers shared by every consumer of the resume templates.
 *
 * They are registered onto a caller-supplied environment rather than the
 * global one, because the two consumers load different Handlebars builds:
 * the Node scripts compile templates from source with the full library
 * (see `compile.ts`), while the site bundle only carries the runtime and
 * executes templates precompiled by the Vite plugin (see `runtime.ts`).
 */
type HandlebarsEnv = typeof import("handlebars");

const toText = (value: unknown): string =>
  value === null || value === undefined ? "" : String(value);

/** Unicode punctuation that ATS parsers mangle, mapped to ASCII equivalents. */
const PUNCTUATION_MAP: ReadonlyMap<string, string> = new Map([
  ["\u2014", " - "], // em dash
  ["\u2013", "-"], // en dash
  ["\u2018", "'"], // left single quote
  ["\u2019", "'"], // right single quote
  ["\u201C", '"'], // left double quote
  ["\u201D", '"'], // right double quote
  ["\u2022", "-"], // bullet
  ["\u00A0", " "], // non-breaking space
  ["\u2026", "..."], // ellipsis
]);

/**
 * Strips markdown bold, folds Unicode punctuation to ASCII, drops any
 * remaining non-ASCII bytes, and collapses whitespace to single spaces.
 *
 * Squeezing whitespace also repairs YAML folded-scalar line breaks, which is
 * what keeps hyphenated terms like T-SQL and Node.js intact rather than
 * letting a wrap point swallow the punctuation.
 */
export function clean(value: unknown): string {
  let text = toText(value).replace(/\*\*/g, "");

  for (const [from, to] of PUNCTUATION_MAP) {
    text = text.split(from).join(to);
  }

  return (
    text
      .normalize("NFKD")
      // eslint-disable-next-line no-control-regex
      .replace(/[^\x00-\x7F]/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );
}

/** Drops the protocol and leading www so URLs read cleanly as plaintext. */
export function stripScheme(url: unknown): string {
  return clean(url)
    .replace(/^https?:\/\/(www\.)?/i, "")
    .replace(/\/+$/, "");
}

export function registerHelpers(hbs: HandlebarsEnv): void {
  // --- HTML -----------------------------------------------------------------

  /** Renders `**bold**` runs as spans, escaping everything around them. */
  hbs.registerHelper("md", (value: unknown) => {
    const trimmed = toText(value).trim();
    const html = trimmed
      .split(/(\*\*[^*]+\*\*)/g)
      .map((part) =>
        part.startsWith("**") && part.endsWith("**")
          ? `<span class="font-bold">${hbs.escapeExpression(part.slice(2, -2))}</span>`
          : hbs.escapeExpression(part),
      )
      .join("");
    return new hbs.SafeString(html);
  });

  hbs.registerHelper(
    "telHref",
    (phone: unknown) => `tel:+${toText(phone).replace(/\D/g, "")}`,
  );

  /** Contact-line display form of a URL: no protocol, no leading www. */
  hbs.registerHelper("displayUrl", (url: unknown) =>
    toText(url).replace(/^https?:\/\/(www\.)?/, ""),
  );

  /** Project-link display form, which keeps the dot after a bare `www`. */
  hbs.registerHelper("projectUrl", (url: unknown) =>
    toText(url).replaceAll(/^https?:\/\/(www)?/gi, ""),
  );

  // --- plaintext ------------------------------------------------------------

  hbs.registerHelper("clean", clean);

  hbs.registerHelper("upper", (value: unknown) => clean(value).toUpperCase());

  hbs.registerHelper("stripScheme", stripScheme);

  /** `GPA 3.9`, or "" when there is no value to label. */
  hbs.registerHelper("prefixed", (label: unknown, value: unknown) => {
    const text = clean(value);
    return text ? `${toText(label)} ${text}` : "";
  });

  /** Joins non-empty parts with a pipe so parsers can split the metadata line. */
  hbs.registerHelper("metaLine", (...args: unknown[]) =>
    args
      .slice(0, -1) // trailing Handlebars options object
      .map(toText)
      .filter((part) => part.length > 0)
      .join(" | "),
  );

  /** Cleans and comma-joins a list, dropping entries that clean to "". */
  hbs.registerHelper("cleanJoin", (list: unknown) =>
    (Array.isArray(list) ? list : []).map(clean).filter(Boolean).join(", "),
  );

  // --- logic ----------------------------------------------------------------

  hbs.registerHelper(
    "defaultTo",
    (value: unknown, fallback: unknown) => value ?? fallback,
  );

  hbs.registerHelper(
    "subtract",
    (a: unknown, b: unknown) => Number(a) - Number(b),
  );

  hbs.registerHelper("eq", (a: unknown, b: unknown) => a === b);

  hbs.registerHelper(
    "includes",
    (list: unknown, value: unknown) =>
      Array.isArray(list) && list.includes(value),
  );
}
