import dir from "dir";
import { join } from "path";
import puppeteer from "puppeteer-core";
import { Browser, install } from "@puppeteer/browsers";
import type { BuilderResult, InitialiseConfig, IPreviewStrategy } from "./types.ts";

export class Preview {
  #strategy?: IPreviewStrategy;

  #data;

  constructor(data: BuilderResult) {
    this.#data = data;
  }

  async #initialise(config: InitialiseConfig) {
    const denoCacheDir = dir("cache");

    if (!denoCacheDir) {
      throw new Error("Deno cache dir cannot be empty");
    }

    const { executablePath } = await install({
      browser: Browser.CHROME,
      // TODO Use dynamic version
      buildId: "113.0.5672.0",
      // buildId: await resolveBuildId({
      //   browser: 'chrome',
      //   platform: 'mac_arm',
      //   tag: 'stable'
      // }),
      cacheDir: join(denoCacheDir, "puppeteer"),
    });

    const browser = await puppeteer.launch({
      headless: config.headless ? "new" : false,
      devtools: config.devtools,
      args: ["--no-default-browser-check"],
      ignoreDefaultArgs: ["--enable-automation"],
      executablePath,
      // args: ['--disable-gpu', '--single-process', '--force-color-profile=srgb', '--no-sandbox'],
    });

    const page = await browser.newPage();

    await page.emulateMediaType("screen");
    // We have to manually add style tag, because using addStyleTag method prevents fonts from loading
    await page.setContent(
      `<style>${this.#data.css}</style>${this.#data.html}`,
      { waitUntil: "networkidle2" },
    );

    return { browser, page };
  }

  setStrategy(strategy: IPreviewStrategy) {
    this.#strategy = strategy;
  }

  async run() {
    if (!this.#strategy) {
      throw new Error("Preview strategy has to be defined before executing 'run' method");
    }

    const { page, browser } = await this.#initialise(
      this.#strategy.initialiseConfig,
    );
    await this.#strategy.run(page, browser);
  }
}
