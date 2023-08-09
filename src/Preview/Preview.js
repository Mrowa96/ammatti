import puppeteer from 'puppeteer';

/**
 * @typedef {{
 *   html: string;
 *   css: string;
 * }} PreviewData
 */

export class Preview {
  // TODO Type it somehow
  #strategy;

  /** @type {PreviewData}  */
  #data;

  /** @param {PreviewData} data */
  constructor(data) {
    this.#data = data;
  }

  async #initialise() {
    const browser = await puppeteer.launch({
      headless: 'new',
      // args: ['--disable-gpu', '--single-process', '--force-color-profile=srgb', '--no-sandbox'],
    });

    const page = await browser.newPage();

    await page.emulateMediaType('screen');
    await page.setContent(this.#data.html);
    await page.addStyleTag({
      content: this.#data.css,
    });

    return { browser, page };
  }

  // TODO Type it somehow
  setStrategy(strategy) {
    this.#strategy = strategy;
  }

  async run() {
    const { page, browser } = await this.#initialise();
    await this.#strategy.run(page, browser);
  }
}
