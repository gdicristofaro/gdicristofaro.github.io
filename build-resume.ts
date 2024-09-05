import puppeteer from 'puppeteer';
import {promises} from 'fs';
import path from 'path';

async function printPDF(dir: string) {
    const resumecss = await promises.readFile(path.join(dir, "src/styles/resume.css"), 'utf-8');
    const resumehtml = await promises.readFile(path.join(dir, "src/model/resumehtml.html"), 'utf-8');

    const htmlStr = `<html><head><style>${resumecss}</style></head><body>${resumehtml}</body></html>`;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(htmlStr, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'LETTER' });

    const pdfPath = path.join(dir, "resume.pdf");

    await browser.close();
    await promises.appendFile(pdfPath, Buffer.from(pdf));
}

printPDF(__dirname).finally(() => console.log("done."));