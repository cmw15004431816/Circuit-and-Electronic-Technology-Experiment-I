// Dependencies: puppeteer
// Install dependency:
/////////////////////////////////////////////////////////
//               npm install puppeteer                 //
/////////////////////////////////////////////////////////
// You can also add the `--verbose` flag to check the progress of the installation:
/////////////////////////////////////////////////////////
//          npm install puppeteer --verbose            //
/////////////////////////////////////////////////////////
// If you want to install the dependencies globally, add the `-g` flag:
/////////////////////////////////////////////////////////
//              npm install -g puppeteer               //
/////////////////////////////////////////////////////////
// Use Node.js to run this script: 
/////////////////////////////////////////////////////////
//                  node script.js                     //
/////////////////////////////////////////////////////////

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Path to your HTML file, double click the HTML file, open it in Chrome and copy the path (URL) from Chrome's address bar instead of using the file path directly
    const filePath = 'file:///D:/your/path/to/the/file/example.pdf';

    // Load the page and wait for MathJax to render
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    // Wait for MathJax to complete rendering (specific to MathJax)
    await page.evaluate(() => {
        return MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    });

    // Generate PDF
    await page.pdf({
        path: 'D:/your/path/to/the/file/example.pdf', // Output file path, use the file path, not the URL. Use / instead of \.
        format: 'A4',
        printBackground: true,
        margin: {
            top: '0.4in',    // Top margin
            bottom: '0.4in', // Bottom margin
        },
        // scale: 1.5, // Adjust scale if necessary (default is 1.0)

        // // Add header and footer to display page numbers if you want
        // displayHeaderFooter: true,
        // // Only use one of the following footerTemplate or create your own
        // footerTemplate: `<div style="font-size:10px; text-align:center; width:100%;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`, // Page x of y
        // // footerTemplate: `<div style="font-size:10px; text-align:center; width:100%;"><span class="pageNumber"></span></div>`, // x
        // headerTemplate: '<div></div>',  // Leave empty if no header needed
    });

    console.log('PDF generated: D:/your/path/to/the/file/example.pdf');

    await browser.close();
})();
