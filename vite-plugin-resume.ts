import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from 'vite';

const MODEL_DIR = fileURLToPath(new URL('./src/model/', import.meta.url));

/** The standalone document jobappbuild renders, also used for the PDF. */
const SOURCE = path.join(MODEL_DIR, 'resume.html');
const CSS_OUT = path.join(MODEL_DIR, 'resume.css');
const BODY_OUT = path.join(MODEL_DIR, 'resume.body.html');

// jobappbuild labels each <style> block with the scope it applies to. Only the
// resume-scoped one belongs in the site bundle: the page-scoped block sets a
// root font size meant for a printed sheet.
const RESUME_STYLE = /<style data-style-scope="resume">([\s\S]*?)<\/style>/;
const RESUME_BODY = /<body>([\s\S]*)<\/body>/;

const BANNER = 'Generated from resume.html by vite-plugin-resume. Do not edit.';

function extract(document: string, pattern: RegExp, what: string): string {
  const match = pattern.exec(document);
  if (!match) {
    throw new Error(
      `src/model/resume.html has no ${what}; rebuild it with \`npm run build-resume\``,
    );
  }
  return match[1];
}

/** Writes only on a real change, so the dev watcher doesn't loop on itself. */
async function writeIfChanged(filePath: string, contents: string): Promise<boolean> {
  const current = await fs.readFile(filePath, 'utf-8').catch(() => null);
  if (current === contents) return false;
  await fs.writeFile(filePath, contents);
  return true;
}

async function split(): Promise<boolean> {
  const document = await fs.readFile(SOURCE, 'utf-8').catch(() => {
    throw new Error(
      `src/model/resume.html is missing; build it with \`npm run build-resume\``,
    );
  });

  const css = extract(document, RESUME_STYLE, 'resume-scoped style block');
  const body = extract(document, RESUME_BODY, 'body');

  const written = await Promise.all([
    writeIfChanged(CSS_OUT, `/* ${BANNER} */\n${css.trim()}\n`),
    writeIfChanged(BODY_OUT, `<!-- ${BANNER} -->\n${body.trim()}\n`),
  ]);
  return written.some(Boolean);
}

/**
 * Splits the generated resume document into the two pieces the site imports:
 * `resume.css` goes through the normal CSS pipeline into the stylesheet, and
 * `resume.body.html` is the markup the resume route injects.
 *
 * Splitting at build time rather than in the component keeps the resume's
 * styles out of the JS bundle and out of a runtime `<style>` tag.
 */
export default function resumeSplit(): Plugin {
  return {
    name: 'resume-split',

    // before module resolution, so both imports exist by the time they're read
    async buildStart() {
      await split();
    },

    configureServer(server) {
      server.watcher.add(SOURCE);
      server.watcher.on('change', (file) => {
        if (path.resolve(file) !== SOURCE) return;
        // the generated files are watched too, so HMR follows from the write
        split()
          .then((changed) => {
            if (changed) server.config.logger.info('resume.html split again');
          })
          .catch((err: unknown) => {
            server.config.logger.error(
              `resume-split: ${err instanceof Error ? err.message : String(err)}`,
            );
          });
      });
    },
  };
}
