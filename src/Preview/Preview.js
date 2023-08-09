import puppeteer from 'puppeteer';

/**
 * @typedef {{
 *   html: string;
 *   css: string;
 * }} PreviewData
 */

/**
 * @typedef {{
 *   headless?: boolean;
 *   devtools?: boolean;
 * }} InitialiseConfig
 */

/**
 * @typedef {{
 *   initialiseConfig: InitialiseConfig;
 *   run(page, browser)
 * }} PreviewStrategy
 */

export class Preview {
  /** @type {PreviewStrategy} strategy */
  #strategy;

  /** @type {PreviewData}  */
  #data;

  /** @param {PreviewData} data */
  constructor(data) {
    this.#data = data;
  }

  /** @param {InitialiseConfig} config */
  async #initialise(config) {
    const browser = await puppeteer.launch({
      headless: !!config.headless ? 'new' : false,
      devtools: config.devtools,
      args: ['--no-default-browser-check'],
      ignoreDefaultArgs: ['--enable-automation'],
      // args: ['--disable-gpu', '--single-process', '--force-color-profile=srgb', '--no-sandbox'],
    });

    const page = await browser.newPage();

    await page.emulateMediaType('screen');
    // We have to manually add style tag, because using addStyleTag method prevents fonts from loading
    await page.setContent(`<style>${this.#data.css}</style>${this.#data.html}`, { waitUntil: 'networkidle2' });

    return { browser, page };
  }

  /** @param {PreviewStrategy} strategy */
  setStrategy(strategy) {
    this.#strategy = strategy;
  }

  async run() {
    const { page, browser } = await this.#initialise(this.#strategy.initialiseConfig);
    await this.#strategy.run(page, browser);
  }
}
