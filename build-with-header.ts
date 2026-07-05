import { promises as fsPromises } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Full path to the current file
const __filename = fileURLToPath(import.meta.url);

// Path to the current file's directory
const __dirname = dirname(__filename);

function htmlEntities(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// renders a standalone HTML page: the resume letterhead, a section heading
// with the given title, and the markdown content below it
export async function buildHeaderedHtml(
  title: string,
  markdown: string,
): Promise<string> {
  const [resumeCss, headeredCss, template] = await Promise.all([
    fsPromises.readFile(
      path.resolve(__dirname, "src/styles/resume.css"),
      "utf-8",
    ),
    fsPromises.readFile(
      path.resolve(__dirname, "src/model/headered.css"),
      "utf-8",
    ),
    fsPromises.readFile(
      path.resolve(__dirname, "src/model/headered.html"),
      "utf-8",
    ),
  ]);

  const content = await marked.parse(markdown);
  const safeTitle = htmlEntities(title);

  const body = template
    .replaceAll("{{title}}", safeTitle)
    .replaceAll("{{content}}", content);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Greg DiCristofaro - ${safeTitle}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>${resumeCss}</style>
    <style>${headeredCss}</style>
</head>
<body>
${body}
</body>
</html>`;
}

async function runCli(): Promise<void> {
  const argv = yargs(hideBin(process.argv))
    .scriptName("build-with-header")
    .usage("Usage: $0 -t <title> -c <markdown file> -o <output html file>")
    .option("title", {
      alias: "t",
      type: "string",
      demandOption: true,
      description: "Page section heading (also used in the document title)",
    })
    .option("content", {
      alias: "c",
      type: "string",
      demandOption: true,
      description: "Path to the markdown content file",
    })
    .option("output", {
      alias: "o",
      type: "string",
      demandOption: true,
      description: "Output HTML file path",
    })
    .help()
    .alias("h", "help")
    .parseSync();

  console.log(
    `writing headered file with title: ${argv.title} from content path: ${argv.content} to output file: ${argv.output}`,
  );
  const markdown = await fsPromises.readFile(argv.content, "utf-8");
  const html = await buildHeaderedHtml(argv.title, markdown);
  await fsPromises.mkdir(path.dirname(path.resolve(argv.output)), {
    recursive: true,
  });
  await fsPromises.writeFile(argv.output, html);
  console.log(`Saved headered HTML: ${argv.output}`);
}

// run only when executed directly (npx tsx build-with-header.ts), not when
// imported by tests
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  runCli().finally(() => console.log("done."));
}
