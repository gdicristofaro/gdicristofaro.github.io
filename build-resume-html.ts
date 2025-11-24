import { promises } from 'fs';
import path from 'path';

async function writeHtml(dir: string) {
    const resumecss = await promises.readFile(path.join(dir, "src/styles/resume.css"), 'utf-8');
    const resumehtml = await promises.readFile(path.join(dir, "src/model/resumehtml.html"), 'utf-8');

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

    await promises.writeFile(path.join(dir, "resume.html"), htmlStr)
}

writeHtml(__dirname).finally(() => console.log("done."));