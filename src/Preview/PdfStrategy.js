import { writeFile } from 'fs/promises';
import { getDirname } from '../utils.js';

export class PdfStrategy {
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
