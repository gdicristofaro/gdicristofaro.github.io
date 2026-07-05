import { AxePuppeteer } from '@axe-core/puppeteer';
import puppeteer, { type Browser, type Page } from 'puppeteer';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import pages from '../src/model/PageInfo';
import { BASE_URL } from './constants';

// WCAG 2.2 level AA and everything it builds on
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const VIEWPORTS = [
  { name: 'mobile', width: 400, height: 800 },
  { name: 'desktop', width: 1200, height: 800 },
] as const;

// the palette resolves via color-scheme/light-dark(), so contrast rules
// must be checked under both OS preferences
const SCHEMES = ['light', 'dark'] as const;

const emulateScheme = (scheme: (typeof SCHEMES)[number]) =>
  page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: scheme },
  ]);

let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

const expectNoViolations = async () => {
  const { violations } = await new AxePuppeteer(page)
    .withTags(WCAG_TAGS)
    .analyze();
  const report = violations
    .map(
      (v) =>
        `${v.id} (${v.impact}): ${v.help}\n` +
        v.nodes.map((n) => `    ${n.target.join(' ')}`).join('\n'),
    )
    .join('\n');
  expect(violations, report).toEqual([]);
};

for (const scheme of SCHEMES) {
  for (const viewport of VIEWPORTS) {
    describe(`WCAG A/AA via axe - ${scheme}, ${viewport.name} (${viewport.width}px)`, () => {
      beforeAll(async () => {
        await emulateScheme(scheme);
        await page.setViewport({
          width: viewport.width,
          height: viewport.height,
        });
      });

      for (const { name, href } of Object.values(pages)) {
        it(`${name} page has no violations`, async () => {
          await page.goto(`${BASE_URL}${href}`, { waitUntil: 'networkidle0' });
          await expectNoViolations();
        });
      }
    });
  }
}

describe('WCAG A/AA via axe - mobile nav drawer open', () => {
  for (const scheme of SCHEMES) {
    it(`has no violations with the drawer open (${scheme})`, async () => {
      await emulateScheme(scheme);
      await page.setViewport({ width: 400, height: 800 });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
      await page.click('nav button[popovertarget]');
      await page.waitForFunction(() => {
        const drawer = document.querySelector('#site-nav-drawer')!;
        return (
          drawer.matches(':popover-open') &&
          drawer.getBoundingClientRect().x === 0
        );
      });
      await expectNoViolations();
    });
  }
});
