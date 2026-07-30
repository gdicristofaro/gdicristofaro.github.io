import * as puppeteer from "puppeteer";
import { promises as fsPromises, watch } from "fs";
import path, { dirname } from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { load as loadYaml } from "js-yaml";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import ResumeComponent from "./src/components/ResumeComponent";
import type { ResumeData } from "./src/model/ResumeData";
import { fileURLToPath } from "url";

// Full path to the current file
const __filename = fileURLToPath(import.meta.url);

// Path to the current file's directory
const __dirname = dirname(__filename);

const DEFAULT_YAML_PATH = "src/model/resume.yaml";
const DEFAULT_OUTPUT_PDF = "public/resume.pdf";
const DEFAULT_OUTPUT_HTML = "src/model/resume.html";

export async function buildHtml(
  yamlPath: string,
): Promise<{ html: string; data: ResumeData }> {
  const [resumeCss, yamlContent] = await Promise.all([
    fsPromises.readFile(
      path.resolve(__dirname, "src/styles/resume.css"),
      "utf-8",
    ),
    fsPromises.readFile(yamlPath, "utf-8"),
  ]);

  const data = loadYaml(yamlContent) as ResumeData;
  const resumeHtml = renderToStaticMarkup(
    React.createElement(ResumeComponent, data),
  );

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${data.name} - Resume</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>${data.defaultFontSize ? `html { font-size: ${data.defaultFontSize} }` : ""}</style>
    <style>${resumeCss}</style>
</head>
<body>
${resumeHtml}
</body>
</html>`;

  return { html, data };
}

async function printPdf(
  html: string,
  outputPath: string,
  marginInches: number,
): Promise<void> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  const pdf = await page.pdf({
    format: "LETTER",
    margin: {
      left: `${marginInches}in`,
      top: `${marginInches}in`,
      right: `${marginInches}in`,
      bottom: `${marginInches}in`,
    },
  });
  await browser.close();

  const parentDir = path.dirname(outputPath);
  await fsPromises.mkdir(parentDir, { recursive: true });
  await fsPromises.writeFile(outputPath, Buffer.from(pdf));
  console.log(`Saved PDF: ${outputPath}`);
}

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
 * Collapsing whitespace also repairs YAML folded-scalar line breaks, which is
 * what keeps hyphenated terms like T-SQL and Node.js intact rather than
 * letting a wrap point swallow the punctuation.
 */
export function clean(value: unknown): string {
  if (value === null || value === undefined) return "";

  let text = String(value).replace(/\*\*/g, "");

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

/** Joins non-empty parts with a pipe so parsers can split the metadata line. */
function metaLine(...parts: string[]): string {
  return parts.filter((part) => part.length > 0).join(" | ");
}

export function resumeToText(resume: ResumeData): string {
  const lines: string[] = [];
  const write = (line = "") => lines.push(line);

  const section = (heading: string) => {
    write();
    write(heading);
  };

  // Header. One field per line, since parsers key off line position here.
  write(clean(resume.name).toUpperCase());
  write(clean(resume.title));
  write(clean(resume.phone));
  write(clean(resume.email));
  write(stripScheme(resume.website));
  write(stripScheme(resume.github));

  section("SUMMARY");
  write(clean(resume.summary));

  if (resume.workExperience?.length) {
    section("PROFESSIONAL EXPERIENCE");
    for (const job of resume.workExperience) {
      write();
      write(clean(job.title));
      write(
        metaLine(clean(job.company), clean(job.location), clean(job.timeSpan)),
      );
      for (const item of job.workItems ?? []) {
        write(`- ${clean(item)}`);
      }
    }
  }

  if (resume.skills?.length) {
    section("TECHNICAL SKILLS");
    for (const group of resume.skills) {
      const items = (group.items ?? []).map(clean).filter(Boolean);
      if (items.length) {
        write(`${clean(group.category)}: ${items.join(", ")}`);
      }
    }
  }

  if (resume.education?.length) {
    section("EDUCATION");
    for (const entry of resume.education) {
      write();
      write(clean(entry.degree));
      const gpa = clean(entry.gpa);
      write(
        metaLine(
          clean(entry.institution),
          clean(entry.location),
          clean(entry.timeSpan),
          gpa ? `GPA ${gpa}` : "",
        ),
      );
      for (const item of entry.items ?? []) {
        write(`- ${clean(item)}`);
      }
    }
  }

  if (resume.achievements?.length) {
    section("ACHIEVEMENTS");
    for (const achievement of resume.achievements) {
      write(`- ${clean(achievement.title)}: ${clean(achievement.description)}`);
    }
  }

  if (resume.projects?.length) {
    section("PROJECTS");
    for (const project of resume.projects) {
      write();
      write(clean(project.name + ":"));
      write(clean(project.description));
      const link = stripScheme(project.link);
      if (link) write(link);
    }
  }

  // Squeeze runs of blank lines, drop the leading one, and end with a newline.
  return `${lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()}\n`;
}

async function buildDefault(outputPdf: string): Promise<void> {
  const yamlPath = path.resolve(__dirname, DEFAULT_YAML_PATH);
  const { html, data } = await buildHtml(yamlPath);
  const margin = typeof data.margin === "number" ? data.margin : 0.5;
  const htmlPath = path.resolve(__dirname, DEFAULT_OUTPUT_HTML);
  await fsPromises.writeFile(htmlPath, html);
  console.log(`Saved HTML: ${htmlPath}`);
  await printPdf(html, path.resolve(__dirname, outputPdf), margin);
}

async function watchDirectory(watchDir: string): Promise<void> {
  const yamlPath = path.resolve(watchDir, "resume.yaml");

  let debounce: ReturnType<typeof setTimeout> | null = null;

  async function build(): Promise<void> {
    console.log(`Building from ${yamlPath}...`);
    try {
      const { html, data } = await buildHtml(yamlPath);
      const margin = typeof data.margin === "number" ? data.margin : 0.5;

      const htmlPath = path.resolve(watchDir, "resume.html");
      await fsPromises.writeFile(htmlPath, html);
      console.log(`Saved HTML: ${htmlPath}`);

      const pdfPath = path.resolve(watchDir, `${data.name} - Resume.pdf`);
      await printPdf(html, pdfPath, margin);

      const txtPath = path.resolve(watchDir, "resume.txt");
      await fsPromises.writeFile(txtPath, resumeToText(data));
      console.log(`Saved Text: ${txtPath}`);
    } catch (err) {
      console.error("Build failed:", err);
    }
  }

  await build();

  console.log(`Watching ${yamlPath} for changes...`);
  watch(yamlPath, () => {
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(() => build(), 150);
  });
}

function runCli(): void {
  const argv = yargs(hideBin(process.argv))
    .scriptName("build-resume")
    .usage("Usage: $0 [-o <output>] [--watch <directory>]")
    .option("o", {
      alias: "output",
      type: "string",
      description: "Output PDF file path (default mode only)",
      default: DEFAULT_OUTPUT_PDF,
    })
    .option("watch", {
      alias: "w",
      type: "string",
      description:
        "Watch directory containing resume.yaml; outputs resume.html and PDF there",
    })
    .help()
    .alias("h", "help")
    .parseSync();

  if (argv.watch) {
    watchDirectory(argv.watch).catch(console.error);
  } else {
    const outputPdf =
      typeof argv.output === "string" ? argv.output : DEFAULT_OUTPUT_PDF;
    buildDefault(outputPdf).finally(() => console.log("done."));
  }
}

// run only when executed directly (npx tsx build-resume.ts), not when
// imported by tests
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  runCli();
}
