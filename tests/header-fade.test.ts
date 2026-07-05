import puppeteer, { type Browser, type Page } from "puppeteer";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { BASE_URL } from "./constants";

let browser: Browser;
let page: Page;
// scroll offsets where the fading element's exit range starts/ends and
// where the sticky nav bar reaches the viewport top, measured at load
let fadeStart: number;
let fadeHeight: number;
let navStickY: number;

// scrolls to y and waits two frames so the scroll-driven animation
// has applied before styles are sampled
const scrollTo = async (y: number) => {
  await page.evaluate(
    (top) => window.scrollTo({ top, behavior: "instant" }),
    y,
  );
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
};

const headerOpacity = () =>
  page.$eval(".scroll-exit-fade", (el) =>
    parseFloat(getComputedStyle(el).opacity),
  );

const navBarTop = () =>
  page.$eval("nav", (el) => el.getBoundingClientRect().top);

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  ({ fadeStart, fadeHeight, navStickY } = await page.evaluate(() => {
    const fadeRect = document
      .querySelector(".scroll-exit-fade")!
      .getBoundingClientRect();
    const navRect = document.querySelector("nav")!.getBoundingClientRect();
    return {
      fadeStart: fadeRect.top + window.scrollY,
      fadeHeight: fadeRect.height,
      navStickY: navRect.top + window.scrollY,
    };
  }));
});

afterAll(async () => {
  await browser.close();
});

describe("header scroll fade", () => {
  it("runs in a browser that supports scroll-driven animations", async () => {
    const supported = await page.evaluate(() =>
      CSS.supports("animation-timeline: view()"),
    );
    expect(supported).toBe(true);
  });

  it("is fully opaque at the top of the page", async () => {
    await scrollTo(0);
    expect(await headerOpacity()).toBe(1);
  });

  it("fades proportionally to scroll progress", async () => {
    await scrollTo(Math.round(fadeStart + fadeHeight * 0.5));
    expect(await headerOpacity()).toBeCloseTo(0.5, 1);
  });

  it("is transparent by the time the nav bar reaches the top", async () => {
    await scrollTo(navStickY);
    expect(await navBarTop()).toBe(0);
    expect(await headerOpacity()).toBeLessThanOrEqual(0.01);
  });

  it("stays transparent when scrolled further", async () => {
    await scrollTo(navStickY * 2);
    expect(await headerOpacity()).toBeLessThanOrEqual(0.01);
  });
});

describe("nav bar name and icons fade-in (opposite of the header)", () => {
  // only elements that are rendered at the current viewport width:
  // animations do not run inside display:none subtrees, so hidden
  // breakpoint variants keep a stale opacity and must not be asserted on
  const fadeInStyles = () =>
    page.$$eval(".scroll-exit-fade-in", (els) =>
      els
        .filter((el) => (el as HTMLElement).offsetParent !== null)
        .map((el) => {
          const style = getComputedStyle(el);
          return {
            opacity: parseFloat(style.opacity),
            visibility: style.visibility,
          };
        }),
    );

  it("is invisible and unfocusable at the top of the page", async () => {
    await scrollTo(0);
    const styles = await fadeInStyles();
    // desktop NameLink plus the icon group (the mobile NameLink is
    // display:none at this width)
    expect(styles).toHaveLength(2);
    for (const s of styles) {
      expect(s.opacity).toBe(0);
      expect(s.visibility).toBe("hidden");
    }
  });

  it("stays invisible through 80% of the scroll range", async () => {
    for (const frac of [0.5, 0.75]) {
      await scrollTo(Math.round(fadeStart + fadeHeight * frac));
      for (const s of await fadeInStyles()) {
        expect(s.opacity).toBe(0);
        expect(s.visibility).toBe("hidden");
      }
    }
  });

  it("fades in over the last fifth of the scroll range", async () => {
    // 90% is the midpoint of the 80%-100% ramp
    await scrollTo(Math.round(fadeStart + fadeHeight * 0.9));
    for (const s of await fadeInStyles()) {
      expect(s.opacity).toBeCloseTo(0.5, 1);
      expect(s.visibility).toBe("visible");
    }
  });

  it("is fully opaque when the nav bar reaches the top", async () => {
    await scrollTo(navStickY);
    for (const s of await fadeInStyles()) {
      expect(s.opacity).toBe(1);
    }
  });

  it("also fades the centered name link at mobile widths", async () => {
    await page.setViewport({ width: 400, height: 800 });
    // the header wraps differently at this width, so remeasure the range;
    // 90% is the midpoint of the 80%-100% fade-in ramp
    const rampMid = await page.evaluate(() => {
      const rect = document
        .querySelector(".scroll-exit-fade")!
        .getBoundingClientRect();
      return Math.round(rect.top + window.scrollY + rect.height * 0.9);
    });
    await scrollTo(rampMid);
    const styles = await fadeInStyles();
    // just the centered NameLink; the icons live in the drawer on mobile
    expect(styles).toHaveLength(1);
    expect(styles[0].opacity).toBeCloseTo(0.5, 1);
  });
});
