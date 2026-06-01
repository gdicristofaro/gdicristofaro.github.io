import * as puppeteer from "puppeteer";
import { promises as fsPromises } from "fs";
import path from "path";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const DEFAULT_PAGE_MARGIN = 0.5;
const DEFAULT_INPUT_HTML = "src/model/resumehtml.html";
const DEFAULT_OUTPUT_PDF = "public/resume.pdf";

async function printPDF(inputPath: string, outputPath: string, marginInches: number) {
  const resolvedInputPath = path.isAbsolute(inputPath)
    ? inputPath
    : path.resolve(__dirname, inputPath);
  const resolvedOutputPath = path.isAbsolute(outputPath)
    ? outputPath
    : path.resolve(__dirname, outputPath);

  const resumecss = await fsPromises.readFile(
    path.resolve(__dirname, "src/styles/resume.css"),
    "utf-8",
  );
  const resumehtml = await fsPromises.readFile(resolvedInputPath, "utf-8");

  const htmlStr = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Greg DiCristofaro - Resume</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>${resumecss}</style>
        </head>
        <body>
        ${resumehtml}
        </body>
        </html>`;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(htmlStr, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({
    format: "LETTER",
    margin: {
      left: `${marginInches}in`,
      top: `${marginInches}in`,
      right: `${marginInches}in`,
      bottom: `${marginInches}in`,
    },
  });

  const parentDir = path.dirname(resolvedOutputPath);
  console.log(`Creating directory ${parentDir} if it does not exist...`);
  await fsPromises.mkdir(parentDir, { recursive: true });
  console.log(`Writing PDF to ${resolvedOutputPath}...`);
  await fsPromises.writeFile(resolvedOutputPath, Buffer.from(pdf));
  await browser.close();
}

const argv = yargs(hideBin(process.argv))
  .scriptName("build-resume")
  .usage("Usage: $0 -i <input> -o <output> -m <margin>")
  .option("i", {
    alias: "input",
    type: "string",
    description: "Input resume HTML file",
    default: DEFAULT_INPUT_HTML,
    demandOption: false,
  })
  .option("o", {
    alias: "output",
    type: "string",
    description: "Output PDF file path",
    default: DEFAULT_OUTPUT_PDF,
    demandOption: false,
  })
  .option("m", {
    alias: "margin",
    type: "number",
    description: "Page margin in inches",
    default: DEFAULT_PAGE_MARGIN,
    demandOption: false,
  })
  .help()
  .alias("h", "help")
  .parseSync();

const inputPath = typeof argv.input === "string" ? argv.input : DEFAULT_INPUT_HTML;
const outputPath = typeof argv.output === "string" ? argv.output : DEFAULT_OUTPUT_PDF;
const margin = typeof argv.margin === "number" && argv.margin >= 0 ? argv.margin : DEFAULT_PAGE_MARGIN;

printPDF(inputPath, outputPath, margin).finally(() => console.log("done."));
