import { promises } from 'fs';
import path from 'path';
import { marked } from 'marked';

async function writeHtml(dir: string) {
    const resumecss = await promises.readFile(path.join(dir, "src/styles/resume.css"), 'utf-8');
    const headeredcss = await promises.readFile(path.join(dir, "src/model/headered.css"), 'utf-8');
    const headered = await promises.readFile(path.join(dir, "src/model/headered.html"), 'utf-8');
    

    const headerContentPath = process.argv[process.argv.length - 2];
    const headeredTitle = process.argv[process.argv.length - 3];
    const outputFile = process.argv[process.argv.length - 1];

    console.log(`writing headered file with title: ${headeredTitle} from content path: ${headerContentPath} to output file: ${outputFile}`);
    const headeredContent = await promises.readFile(headerContentPath, 'utf-8');


    let renderer = new marked.Renderer();

    (renderer as any).list = (body: any, ordered: any, level: any) => {
        const text = body.items.map((item: any) => renderer.listitem(item)).join("\n");
        return `<ul class='list-disc pl-5'>${text}</ul>`;
    };


    const headeredHtml = await marked.parse(headeredContent, { renderer });

    const metaTitle = `Greg DiCristofaro - ${htmlEntities(headeredTitle)}`;

    const replacedHeadered = headered
        .replaceAll("\{\{title\}\}", htmlEntities(headeredTitle))
        .replaceAll("\{\{content\}\}", headeredHtml);

    const htmlStr = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${metaTitle}</title>
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

function htmlEntities(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

writeHtml(__dirname).finally(() => console.log("done."));