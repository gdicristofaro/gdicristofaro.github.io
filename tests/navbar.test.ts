import puppeteer, { type Browser, type Page } from 'puppeteer';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { BASE_URL } from './constants';

let browser: Browser;
let page: Page;

const drawerIsOpen = () =>
  page.$eval('#site-nav-drawer', (el) => el.matches(':popover-open'));

const waitForDrawer = (open: boolean) =>
  page.waitForFunction(
    (expected) => {
      const drawer = document.querySelector('#site-nav-drawer')!;
      if (drawer.matches(':popover-open') !== expected) return false;
      // the open state flips before the slide-in transition finishes, so
      // also wait for the panel to land on-screen before clicking into it
      return !expected || drawer.getBoundingClientRect().x === 0;
    },
    {},
    open,
  );

// visibleOnly excludes display:none links — needed when scoping to <nav>
// on desktop, since the closed drawer's links also live inside it
const currentPageLinks = (scope: string, visibleOnly = false) =>
  page.$$eval(
    `${scope} a[aria-current="page"]`,
    (els, visible) =>
      els
        .filter((el) => !visible || (el as HTMLElement).offsetParent !== null)
        .map((el) => el.textContent?.trim()),
    visibleOnly,
  );

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

describe('mobile nav (400px)', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 400, height: 800 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
  });

  it('renders a single main nav landmark', async () => {
    const count = await page.$$eval(
      'nav[aria-label="Main"]',
      (els) => els.length,
    );
    expect(count).toBe(1);
  });

  it('shows the hamburger button', async () => {
    const visible = await page.$eval(
      'nav button[popovertarget]',
      (el) => getComputedStyle(el).display !== 'none',
    );
    expect(visible).toBe(true);
  });

  it('starts with the drawer closed', async () => {
    expect(await drawerIsOpen()).toBe(false);
  });

  it('opens the drawer with the hamburger button', async () => {
    await page.click('nav button[popovertarget]');
    await waitForDrawer(true);
    expect(await drawerIsOpen()).toBe(true);
  });

  it('keeps the drawer open while tabbing through it', async () => {
    await page.keyboard.press('Tab');
    expect(await drawerIsOpen()).toBe(true);
  });

  it('closes the drawer with Escape', async () => {
    await page.keyboard.press('Escape');
    await waitForDrawer(false);
    expect(await drawerIsOpen()).toBe(false);
  });

  it('marks the current page with aria-current in the drawer', async () => {
    expect(await currentPageLinks('#site-nav-drawer')).toEqual(['Home']);
  });

  it('navigates and closes the drawer when a page link is clicked', async () => {
    await page.click('nav button[popovertarget]');
    await waitForDrawer(true);
    await page.click('#site-nav-drawer ul li:nth-child(2) a');
    await page.waitForFunction(() => location.pathname === '/projects');
    await waitForDrawer(false);
    // pathname updates synchronously but React commits aria-current a tick
    // later, so wait on the DOM state rather than sampling it immediately
    await page.waitForFunction(
      () =>
        document
          .querySelector('#site-nav-drawer a[aria-current="page"]')
          ?.textContent?.trim() === 'Projects',
    );
    expect(await currentPageLinks('#site-nav-drawer')).toEqual(['Projects']);
  });

  it('closes the drawer when the current page link is clicked', async () => {
    await page.click('nav button[popovertarget]');
    await waitForDrawer(true);
    await page.click('#site-nav-drawer a[aria-current="page"]');
    await waitForDrawer(false);
    expect(await page.evaluate(() => location.pathname)).toBe('/projects');
  });

  it('moves keyboard focus into the drawer when it opens', async () => {
    await page.click('nav button[popovertarget]');
    await waitForDrawer(true);
    const focusInDrawer = await page.evaluate(
      () => document.activeElement?.closest('#site-nav-drawer') !== null,
    );
    expect(focusInDrawer).toBe(true);
    await page.keyboard.press('Escape');
    await waitForDrawer(false);
  });
});

describe('desktop nav (1200px)', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
  });

  it('hides the hamburger button', async () => {
    const hidden = await page.$eval(
      'nav button[popovertarget]',
      (el) => getComputedStyle(el).display === 'none',
    );
    expect(hidden).toBe(true);
  });

  it('shows the page links in the bar', async () => {
    const links = await page.$$eval('nav ul a', (els) =>
      els
        .filter((el) => (el as HTMLElement).offsetParent !== null)
        .map((el) => el.textContent?.trim()),
    );
    expect(links).toEqual(['Home', 'Projects', 'Résumé']);
  });

  it('marks the current page with aria-current', async () => {
    expect(await currentPageLinks('nav', true)).toEqual(['Home']);
  });

  it('has exactly one h1 (the one in the header)', async () => {
    const count = await page.$$eval('h1', (els) => els.length);
    expect(count).toBe(1);
  });

  it('marks the current page for trailing-slash URLs', async () => {
    await page.goto(`${BASE_URL}/projects/`, { waitUntil: 'networkidle0' });
    expect(await currentPageLinks('nav', true)).toEqual(['Projects']);
  });
});

describe('page structure and titles', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
  });

  it('exposes the page content as a main landmark', async () => {
    const mainCount = await page.$$eval('main#main-content', (els) => els.length);
    expect(mainCount).toBe(1);
  });

  it('focuses the skip link on the first Tab and reveals it', async () => {
    await page.keyboard.press('Tab');
    const skip = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      return {
        href: el?.getAttribute('href'),
        visible: !!el && el.offsetParent !== null,
      };
    });
    expect(skip.href).toBe('#main-content');
    expect(skip.visible).toBe(true);
  });

  it('updates document.title on navigation', async () => {
    expect(await page.title()).toBe('Greg DiCristofaro');
    await page.click('nav ul a[href="/projects"]');
    await page.waitForFunction(
      () => document.title === 'Greg DiCristofaro - Projects',
    );
    expect(await page.title()).toBe('Greg DiCristofaro - Projects');
  });
});
