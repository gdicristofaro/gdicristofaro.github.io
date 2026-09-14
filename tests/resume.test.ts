import { promises as fs } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer, { type Browser, type Page } from 'puppeteer';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { BASE_URL } from './constants';

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (relative: string) =>
  fs.readFile(path.join(repoRoot, relative), 'utf-8');

const SOURCE = 'src/model/resume.html';
const CSS = 'src/model/resume.css';
const BODY = 'src/model/resume.body.html';
const PDF = 'public/resume.pdf';

/** The do-not-edit line vite-plugin-resume puts at the top of each split file. */
const BANNER = /^.*Generated from resume\.html.*\r?\n/;

const withoutBanner = (contents: string) =>
  contents.replace(BANNER, '').trim();

let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: 'light' },
  ]);
  await page.goto(`${BASE_URL}/resume`, { waitUntil: 'networkidle0' });
});

afterAll(async () => {
  await browser.close();
});

// the dev server booted in global-setup runs vite-plugin-resume, so these
// files existing at all is what proves the split step ran
describe('split resume assets', () => {
  it('writes a stylesheet carrying the resume rules', async () => {
    const css = await read(CSS);
    expect(css).toMatch(BANNER);
    expect(css).toContain('.resume-container');
    expect(css).toContain('--highlight-color-light');
    expect(css).toContain('.print-border-none');
  });

  it('leaves the page-scoped rules out of the stylesheet', async () => {
    const css = await read(CSS);
    // the root font size is sized for a printed sheet, not for the site
    expect(css).not.toMatch(/html\s*\{[^}]*font-size/);
  });

  it('writes body markup with no document scaffolding', async () => {
    const body = await read(BODY);
    expect(body).toMatch(BANNER);
    expect(withoutBanner(body).startsWith('<div class="resume-container"')).toBe(
      true,
    );
    for (const tag of ['html', 'head', 'body', 'style', 'script']) {
      // the boundary matters: the letterhead is a <header>, not a <head>
      expect(body).not.toMatch(new RegExp(`<${tag}[\\s>]`));
    }
  });

  it('cuts both files out of resume.html unchanged', async () => {
    const [source, css, body] = await Promise.all([
      read(SOURCE),
      read(CSS),
      read(BODY),
    ]);
    expect(source).toContain(withoutBanner(css));
    expect(source).toContain(withoutBanner(body));
  });
});

describe('resume.pdf', () => {
  it('is a non-empty PDF', async () => {
    const pdf = await fs.readFile(path.join(repoRoot, PDF));
    expect(pdf.subarray(0, 5).toString('latin1')).toBe('%PDF-');
    expect(pdf.subarray(-1024).toString('latin1')).toContain('%%EOF');
    // a one-page resume lands around 100 kB; well under 20 kB means the
    // render lost its fonts or its content
    expect(pdf.byteLength).toBeGreaterThan(20_000);
  });

  it('is served at the path the download card links to', async () => {
    const href = await page.$eval('a[href$="resume.pdf"]', (el) => el.href);
    expect(new URL(href).pathname).toBe('/resume.pdf');

    const response = await fetch(href);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/pdf');
  });
});

describe('rendered resume page', () => {
  it('injects the resume markup', async () => {
    const headings = await page.$$eval(
      '.resume-container h2',
      (els) => els.map((el) => el.textContent?.trim()),
    );
    expect(headings).toEqual([
      'Summary',
      'Experience',
      'Education',
      'Skills',
      'Achievements',
      'Projects',
    ]);
  });

  it('applies the split stylesheet', async () => {
    const styles = await page.$eval('.resume-container', (el) => {
      const link = el.querySelector('.column-container a')!;
      return {
        fontFamily: getComputedStyle(el).fontFamily,
        linkColor: getComputedStyle(link).color,
      };
    });
    expect(styles.fontFamily).toContain('Segoe UI');
    // --highlight-color-light, #00798f
    expect(styles.linkColor).toBe('rgb(0, 121, 143)');
  });

  it('serves the stylesheet rather than inlining it in the page', async () => {
    const inlineScopedStyles = await page.$$eval(
      'style[data-style-scope]',
      (els) => els.length,
    );
    expect(inlineScopedStyles).toBe(0);
  });

  it('builds the Tailwind classes the generated markup uses', async () => {
    const layout = await page.$eval('.column-container', (el) => ({
      display: getComputedStyle(el).display,
      leftColumnWidth: getComputedStyle(el.querySelector('.left-column')!).width,
    }));
    expect(layout.display).toBe('flex');
    // sm:w-1/3 of the 1024px max-width container, not an unstyled full row
    expect(parseFloat(layout.leftColumnWidth)).toBeLessThan(800);
  });

  it('keeps the print font size off the site', async () => {
    const rootFontSize = await page.evaluate(
      () => getComputedStyle(document.documentElement).fontSize,
    );
    expect(rootFontSize).toBe('16px');
  });
});
