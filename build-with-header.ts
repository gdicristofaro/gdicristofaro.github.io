import { promises } from 'fs';
import path from 'path';

async function writeHtml(dir: string) {
    const resumecss = await promises.readFile(path.join(dir, "src/styles/resume.css"), 'utf-8');
    const headeredcss = await promises.readFile(path.join(dir, "src/model/headered.css"), 'utf-8');
    const headered = await promises.readFile(path.join(dir, "src/model/headered.html"), 'utf-8');
    

    const headerContentPath = process.argv[process.argv.length - 2];
    const headeredTitle = process.argv[process.argv.length - 3];
    const outputFile = process.argv[process.argv.length - 1]

    console.log(`writing headered file with title: ${headeredTitle} from content path: ${headerContentPath} to output file: ${outputFile}`);
    const headeredContent = await promises.readFile(headerContentPath, 'utf-8');

    const replacedHeadered = headered
        .replaceAll("\{\{title\}\}", headeredTitle)
        .replaceAll("\{\{content\}\}", headeredContent);

    const htmlStr = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Greg DiCristofaro - Resume</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>

                ${resumecss}

                ${headeredcss}
                
            </style>
        </head>
        <body>
        ${replacedHeadered}
        </body>
        </html>`;   

    await promises.writeFile(outputFile, htmlStr)
}

writeHtml(__dirname).finally(() => console.log("done."));