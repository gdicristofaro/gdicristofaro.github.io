import { promises as fsPromises } from "fs";
import { once } from "events";
import path from "path";
import { fileURLToPath } from "url";
import { createInterface, type Interface } from "readline/promises";
import { dump as dumpYaml } from "js-yaml";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import type { JobDesc } from "../models/jobdesc";

// Full path to the current file
const __filename = fileURLToPath(import.meta.url);

const DEFAULT_OUTPUT = "./jobdesc.yaml";

/** Thrown when stdin closes while a prompt is still waiting for an answer. */
class AbortedError extends Error {}

/**
 * True for both our own abort and node's: closing stdin mid-question makes
 * `rl.question` reject with an `AbortError`.
 */
function isAborted(err: unknown): boolean {
  return (
    err instanceof AbortedError ||
    (err instanceof Error && "code" in err && err.code === "ABORT_ERR")
  );
}

// -- formatting ------------------------------------------------------------

/**
 * `dateFound` is a calendar day, so it lives at UTC midnight: the YAML holds a
 * bare `YYYY-MM-DD`, and js-yaml reads that back as exactly this instant.
 */
function dayToUtc(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day));
}

function formatDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Parses `YYYY-MM-DD`, rejecting both bad shapes and impossible days. */
function parseDay(raw: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw.trim());
  if (!match) return null;
  const [year, month, day] = match.slice(1).map(Number);
  const date = dayToUtc(year, month, day);
  // Date.UTC rolls overflow forward (month 13, Feb 31), so compare back.
  return formatDay(date) === raw.trim() ? date : null;
}

/** Today in the local timezone, as the calendar day the user would name. */
function today(): Date {
  const now = new Date();
  return dayToUtc(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

function parseBoolean(raw: string): boolean | null {
  const value = raw.trim().toLowerCase();
  if (["y", "yes", "true"].includes(value)) return true;
  if (["n", "no", "false"].includes(value)) return false;
  return null;
}

/** Accepts only http(s) URLs; anything else is a typo worth catching here. */
function normalizeUrl(raw: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(raw.trim());
  } catch {
    return null;
  }
  return parsed.protocol === "http:" || parsed.protocol === "https:"
    ? parsed.toString()
    : null;
}

/** Renders a JobDesc as the YAML document written to disk. */
export function toYaml(desc: JobDesc): string {
  const yaml = dumpYaml(
    {
      postingText: desc.postingText,
      postingURL: desc.postingURL,
      companyURL: desc.companyURL,
      dateFound: desc.dateFound,
      hasCoverLetter: desc.hasCoverLetter,
      hasReferences: desc.hasReferences,
      ...(desc.additionalQuestions?.length
        ? { additionalQuestions: desc.additionalQuestions }
        : {}),
    },
    { lineWidth: -1, noRefs: true },
  );

  // js-yaml dumps a Date as a full ISO timestamp; a calendar day reads better
  // bare, and YAML still parses it back into a Date.
  return yaml.replace(/^(dateFound: \d{4}-\d{2}-\d{2})T00:00:00\.000Z$/m, "$1");
}

// -- prompting -------------------------------------------------------------

/** Shared handle on the `npm init`-style question session. */
interface Prompter {
  /** Asks until the answer parses, then returns it. */
  ask<T>(
    label: string,
    parse: (raw: string) => T | null,
    fallback?: { value: T; display: string },
  ): Promise<T>;
  /** Reads every remaining line, so a pasted blob keeps its newlines. */
  readBlock(label: string): Promise<string>;
  close(): void;
}

function createPrompter(): Prompter {
  const rl: Interface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Settles when stdin closes (Ctrl-D). Created once so repeated prompts do
  // not pile up listeners on the interface.
  const closed = once(rl, "close");
  const aborted = closed.then(() => {
    throw new AbortedError("input closed before every field was answered");
  });
  aborted.catch(() => {});

  return {
    async ask(label, parse, fallback) {
      const suffix = fallback ? ` (${fallback.display})` : "";
      for (;;) {
        const raw = await Promise.race([
          rl.question(`${label}${suffix}: `),
          aborted,
        ]);
        if (!raw.trim()) {
          if (fallback) return fallback.value;
          console.error(`  ${label} is required.`);
          continue;
        }
        const parsed = parse(raw);
        if (parsed !== null) return parsed;
        console.error(`  "${raw.trim()}" is not a valid ${label}.`);
      }
    },

    async readBlock(label) {
      process.stdout.write(`${label}:\n`);
      const lines: string[] = [];
      rl.on("line", (line) => lines.push(line));
      await closed;
      return lines.join("\n").trim();
    },

    close() {
      rl.close();
    },
  };
}

/** Prompts for however much of the JobDesc the flags left unset. */
async function promptMissing(
  partial: Partial<JobDesc>,
  prompter: Prompter,
): Promise<JobDesc> {
  const postingURL =
    partial.postingURL ?? (await prompter.ask("posting url", normalizeUrl));

  const companyURL =
    partial.companyURL ?? (await prompter.ask("company url", normalizeUrl));

  const dateFound =
    partial.dateFound ??
    (await prompter.ask("date found", parseDay, {
      value: today(),
      display: formatDay(today()),
    }));

  const hasCoverLetter =
    partial.hasCoverLetter ??
    (await prompter.ask("has cover letter", parseBoolean, {
      value: true,
      display: "yes",
    }));

  const hasReferences =
    partial.hasReferences ??
    (await prompter.ask("has references", parseBoolean, {
      value: true,
      display: "yes",
    }));

  const additionalQuestions =
    partial.additionalQuestions ?? (await promptQuestions(prompter));

  // Last, because a pasted posting ends at Ctrl-D, which also ends stdin.
  const postingText =
    partial.postingText ??
    (await prompter.readBlock(
      "posting text (paste, then Ctrl-D on a blank line)",
    ));

  if (!postingText) {
    throw new Error("posting text is required.");
  }

  return {
    postingText,
    postingURL,
    companyURL,
    dateFound,
    hasCoverLetter,
    hasReferences,
    additionalQuestions,
  };
}

/** Collects the optional application questions one line at a time. */
async function promptQuestions(prompter: Prompter): Promise<string[]> {
  const questions: string[] = [];
  for (;;) {
    const answer = await prompter.ask<string>(
      `additional question ${questions.length + 1}`,
      (raw) => raw.trim(),
      { value: "", display: "blank to finish" },
    );
    if (!answer) return questions;
    questions.push(answer);
  }
}

// -- cli -------------------------------------------------------------------

function parseArgs(args: string[]) {
  return yargs(args)
    .scriptName("jobapp-new")
    .usage("Usage: $0 [-o <output yaml>] [field flags]")
    .option("output", {
      alias: "o",
      type: "string",
      description: "Output YAML file path",
      default: DEFAULT_OUTPUT,
    })
    .option("posting-text", {
      type: "string",
      description: "Full text of the job posting",
    })
    .option("posting-text-file", {
      type: "string",
      description: "Read the posting text from this file instead",
    })
    .option("posting-url", {
      type: "string",
      description: "URL of the job posting",
    })
    .option("company-url", {
      type: "string",
      description: "URL of the company",
    })
    .option("date-found", {
      type: "string",
      description: "Date the posting was found, YYYY-MM-DD (default: today)",
    })
    .option("cover-letter", {
      type: "boolean",
      description: "Whether the application includes a cover letter",
    })
    .option("references", {
      type: "boolean",
      description: "Whether the application includes references",
    })
    .option("question", {
      alias: "q",
      type: "string",
      array: true,
      description: "An additional application question (repeatable)",
    })
    .option("yes", {
      alias: "y",
      type: "boolean",
      default: false,
      description: "Skip prompts and take the defaults where one exists",
    })
    .option("force", {
      alias: "f",
      type: "boolean",
      default: false,
      description: "Overwrite the output file if it already exists",
    })
    .conflicts("posting-text", "posting-text-file")
    .help()
    .alias("h", "help")
    .parseSync();
}

type Args = ReturnType<typeof parseArgs>;

/** Turns the flags that were actually passed into a partial JobDesc. */
async function fromFlags(argv: Args): Promise<Partial<JobDesc>> {
  const partial: Partial<JobDesc> = {};

  if (argv.postingTextFile) {
    partial.postingText = (
      await fsPromises.readFile(argv.postingTextFile, "utf-8")
    ).trim();
  } else if (argv.postingText !== undefined) {
    partial.postingText = argv.postingText.trim();
  }

  for (const [key, flag, raw] of [
    ["postingURL", "--posting-url", argv.postingUrl],
    ["companyURL", "--company-url", argv.companyUrl],
  ] as const) {
    if (raw === undefined) continue;
    const url = normalizeUrl(raw);
    if (!url) throw new Error(`${flag} is not a valid URL: ${raw}`);
    partial[key] = url;
  }

  if (argv.dateFound !== undefined) {
    const date = parseDay(argv.dateFound);
    if (!date) {
      throw new Error(`--date-found must be YYYY-MM-DD: ${argv.dateFound}`);
    }
    partial.dateFound = date;
  }

  if (argv.coverLetter !== undefined) {
    partial.hasCoverLetter = argv.coverLetter;
  }
  if (argv.references !== undefined) {
    partial.hasReferences = argv.references;
  }
  if (argv.question !== undefined) {
    partial.additionalQuestions = argv.question
      .map((q) => q.trim())
      .filter(Boolean);
  }

  return partial;
}

/** Fills the gaps with defaults, for `--yes` and non-interactive runs. */
function applyDefaults(partial: Partial<JobDesc>): JobDesc {
  const missing = (
    [
      ["postingText", "--posting-text or --posting-text-file"],
      ["postingURL", "--posting-url"],
      ["companyURL", "--company-url"],
    ] as const
  )
    .filter(([key]) => !partial[key])
    .map(([, flag]) => flag);

  if (missing.length) {
    throw new Error(`no prompting available; missing ${missing.join(", ")}`);
  }

  return {
    postingText: partial.postingText!,
    postingURL: partial.postingURL!,
    companyURL: partial.companyURL!,
    dateFound: partial.dateFound ?? today(),
    hasCoverLetter: partial.hasCoverLetter ?? true,
    hasReferences: partial.hasReferences ?? true,
    additionalQuestions: partial.additionalQuestions ?? [],
  };
}

/** True when the flags covered every field, leaving nothing to prompt for. */
function isComplete(partial: Partial<JobDesc>): boolean {
  const fields: (keyof JobDesc)[] = [
    "postingText",
    "postingURL",
    "companyURL",
    "dateFound",
    "hasCoverLetter",
    "hasReferences",
    "additionalQuestions",
  ];
  return fields.every((field) => partial[field] !== undefined);
}

async function runCli(): Promise<void> {
  const argv = parseArgs(hideBin(process.argv));
  const outputPath = path.resolve(argv.output);
  const partial = await fromFlags(argv);

  const exists = await fsPromises
    .access(outputPath)
    .then(() => true)
    .catch(() => false);
  if (exists && !argv.force) {
    throw new Error(`${outputPath} already exists; pass --force to overwrite`);
  }

  // Prompt only when there is a terminal to prompt at, and something to ask.
  const interactive = process.stdin.isTTY && !argv.yes;
  let desc: JobDesc;
  if (isComplete(partial) || !interactive) {
    desc = applyDefaults(partial);
  } else {
    const prompter = createPrompter();
    try {
      desc = await promptMissing(partial, prompter);
    } finally {
      prompter.close();
    }
  }

  await fsPromises.mkdir(path.dirname(outputPath), { recursive: true });
  await fsPromises.writeFile(outputPath, toYaml(desc));
  console.log(`Saved job description: ${outputPath}`);
}

// run only when executed directly (npx tsx jobapp-new.ts), not when imported
// by tests
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  runCli().catch((err: unknown) => {
    if (isAborted(err)) {
      console.error("\nAborted; nothing written.");
    } else {
      console.error(err instanceof Error ? err.message : err);
    }
    process.exitCode = 1;
  });
}
