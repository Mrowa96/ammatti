import { writeFile } from 'fs/promises';
import { getAbsolutePath } from '../utils.js';

/** @implements {import('./Preview.js').PreviewStrategy} */
export class PdfStrategy {
  /** @type {import("./Preview.js").InitialiseConfig} */
  initialiseConfig = {
    headless: true,
  };

  /**
   * @param {import('puppeteer').Page} page
   * @param {import('puppeteer').Browser} browser
   */
  async run(page, browser) {
    const pdf = await page.pdf({
      // TODO Take it somehow from template data
      width: 900,
      height: 1230,
      margin: {
        bottom: 30,
        top: 30,
        left: 50,
        right: 50,
      },
    });
    // TODO Save file with timestamp
    const resumeFilePath = getAbsolutePath('../resume.pdf');

    // TODO Check why this path is wrong
    await writeFile(resumeFilePath, pdf);
    await browser.close();

    console.info(`resume.pdf saved in ${resumeFilePath}`);
  }
}
