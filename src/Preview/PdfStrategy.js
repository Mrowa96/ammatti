import { writeFile } from 'fs/promises';
import { getDirname } from '../utils.js';

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

    await writeFile(getDirname('../../resume.pdf'), pdf);
    await browser.close();
  }
}
