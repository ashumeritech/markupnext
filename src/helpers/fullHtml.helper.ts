export const getFullHtmlContent = (htmlCode: string, cssCode: string, jsCode: string, headTag: string, title: string, forFileDownload: boolean) => {
    let fullHtmlContent = '';

    if (htmlCode.length) {
        fullHtmlContent =
            `<!DOCTYPE html>
        <html lang="en">
        <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${title}</title>
                ${headTag.length ? headTag : ''}

                ${cssCode.length ? (forFileDownload ? '<link rel="stylesheet" href="./style.css" />' : `<style>
                ${cssCode}
                </style>`) : ''}
        </head>
        <body>
            ${htmlCode}
        </body>
        ${jsCode.length ? `<script>${jsCode}</script>` : ''}
        </html>`;
    }

    return fullHtmlContent;
}