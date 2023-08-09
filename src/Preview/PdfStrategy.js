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
    const pdf = await page.pdf();
    const resumeFilePath = getAbsolutePath('../resume.pdf');

    // TODO Check why this path is wrong
    await writeFile(resumeFilePath, pdf);
    await browser.close();

    console.info(`resume.pdf saved in ${resumeFilePath}`);
  }
}
