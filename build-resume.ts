import * as puppeteer from "puppeteer";
import { promises as fsPromises, watch } from "fs";
import path, { dirname } from "path";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { load as loadYaml } from 'js-yaml';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import ResumeComponent from './src/components/ResumeComponent';
import type { ResumeData } from './src/model/ResumeData';
import { fileURLToPath } from "url";

// Full path to the current file
const __filename = fileURLToPath(import.meta.url);

// Path to the current file's directory
const __dirname = dirname(__filename);

const DEFAULT_YAML_PATH = "src/model/resume.yaml";
const DEFAULT_OUTPUT_PDF = "public/resume.pdf";
const DEFAULT_OUTPUT_HTML = "src/model/resume.html";

async function buildHtml(yamlPath: string): Promise<{ html: string; data: ResumeData }> {
  const [resumeCss, yamlContent] = await Promise.all([
    fsPromises.readFile(path.resolve(__dirname, "src/styles/resume.css"), "utf-8"),
    fsPromises.readFile(yamlPath, "utf-8"),
  ]);

  const data = loadYaml(yamlContent) as ResumeData;
  const resumeHtml = renderToStaticMarkup(React.createElement(ResumeComponent, data));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${data.name} - Resume</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>${data.defaultFontSize ? `html { font-size: ${data.defaultFontSize} }` : ''}</style>
    <style>${resumeCss}</style>
</head>
<body>
${resumeHtml}
</body>
</html>`;

  return { html, data };
}

async function printPdf(html: string, outputPath: string, marginInches: number): Promise<void> {
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

async function buildDefault(outputPdf: string): Promise<void> {
  const yamlPath = path.resolve(__dirname, DEFAULT_YAML_PATH);
  const { html, data } = await buildHtml(yamlPath);
  const margin = typeof data.margin === 'number' ? data.margin : 0.5;
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
      const margin = typeof data.margin === 'number' ? data.margin : 0.5;

      const htmlPath = path.resolve(watchDir, "resume.html");
      await fsPromises.writeFile(htmlPath, html);
      console.log(`Saved HTML: ${htmlPath}`);

      const pdfPath = path.resolve(watchDir, `${data.name} - Resume.pdf`);
      await printPdf(html, pdfPath, margin);
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
    description: "Watch directory containing resume.yaml; outputs resume.html and PDF there",
  })
  .help()
  .alias("h", "help")
  .parseSync();

if (argv.watch) {
  watchDirectory(argv.watch).catch(console.error);
} else {
  const outputPdf = typeof argv.output === "string" ? argv.output : DEFAULT_OUTPUT_PDF;
  buildDefault(outputPdf).finally(() => console.log("done."));
}
