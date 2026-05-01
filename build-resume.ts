import * as puppeteer from 'puppeteer';
import { promises } from 'fs';
import path from 'path';

async function printPDF(dir: string, outputPath?: string) {
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

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(htmlStr, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'LETTER', margin: { left: '.5in', top: '.5in', right: '.5in', bottom: '.5in' } });

    const pdfPath = outputPath || path.join(dir, "public/resume.pdf");

    await browser.close();
    await promises.writeFile(pdfPath, Buffer.from(pdf));
}

const customPath = process.argv[2];
printPDF(__dirname, customPath).finally(() => console.log("done."));