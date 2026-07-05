import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';
import { buildHeaderedHtml } from '../build-with-header';
import { buildHtml } from '../build-resume';

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));

// the standalone pages only load the Tailwind Play CDN, which defines no
// --color-* custom properties, so every var() the document references must
// be defined within the document itself or it silently loses styling
const undefinedCssVars = (html: string): string[] => {
  const defined = new Set(
    [...html.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]),
  );
  const referenced = [...html.matchAll(/var\(\s*(--[\w-]+)/g)].map(
    (m) => m[1],
  );
  return [...new Set(referenced.filter((v) => !defined.has(v)))];
};

describe('build-resume', () => {
  it('renders resume.yaml into a standalone HTML document', async () => {
    const { html, data } = await buildHtml(
      path.resolve(repoRoot, 'src/model/resume.yaml'),
    );
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain(`<title>${data.name} - Resume</title>`);
    expect(html).toContain('resume-container');
    expect(data.name.length).toBeGreaterThan(0);
  });

  it('defines every CSS variable the document references', async () => {
    const { html } = await buildHtml(
      path.resolve(repoRoot, 'src/model/resume.yaml'),
    );
    expect(undefinedCssVars(html)).toEqual([]);
  });
});

describe('build-with-header', () => {
  const markdown = [
    'Intro paragraph with a [useful link](https://example.com).',
    '',
    '- first item',
    '- second item',
  ].join('\n');

  it('renders markdown content under the letterhead', async () => {
    const html = await buildHeaderedHtml('Cover Letter', markdown);
    expect(html).toContain('<title>Greg DiCristofaro - Cover Letter</title>');
    // letterhead from the template
    expect(html).toContain('resume-container');
    expect(html).toContain('gregdicristofaro@gmail.com');
    // markdown rendered to HTML
    expect(html).toContain('href="https://example.com"');
    expect(html).toMatch(/<li>\s*first item\s*<\/li>/);
    // template placeholders all replaced
    expect(html).not.toContain('{{title}}');
    expect(html).not.toContain('{{content}}');
  });

  it('escapes HTML in the title', async () => {
    const html = await buildHeaderedHtml('Q&A <notes>', 'text');
    expect(html).toContain('Q&amp;A &lt;notes&gt;');
    expect(html).not.toContain('<notes>');
  });

  it('defines every CSS variable the document references', async () => {
    const html = await buildHeaderedHtml('Title', markdown);
    expect(undefinedCssVars(html)).toEqual([]);
  });
});
