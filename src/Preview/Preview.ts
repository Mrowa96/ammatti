import dir from "dir";
import { join } from "path";
import puppeteer from "puppeteer-core";
import { Browser, detectBrowserPlatform, install, resolveBuildId } from "@puppeteer/browsers";
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
      throw new Error("Deno cache dir cannot be empty.");
    }

    const platform = detectBrowserPlatform();

    if (!platform) {
      throw new Error("Cannot detect platform.");
    }

    const { executablePath } = await install({
      browser: Browser.CHROME,
      buildId: await resolveBuildId(Browser.CHROME, platform, "stable"),
      cacheDir: join(denoCacheDir, "puppeteer"),
    });

    const browser = await puppeteer.launch({
      headless: config.headless ? "new" : false,
      devtools: config.devtools,
      args: ["--no-default-browser-check", "--force-color-profile=srgb"],
      ignoreDefaultArgs: ["--enable-automation"],
      executablePath,
    });

    const page = await browser.newPage();

    await page.emulateMediaType("screen");
    await page.setContent(
      this.#data.html,
      { waitUntil: "networkidle2" },
    );
    await page.addStyleTag({
      content: this.#data.css,
    });

    /**
     * Puppeteer has problem with font rendering in pdf mode.
     * It doesn't wait long enough for fonts to fetch and swap.
     * This is the "clearest" workaround.
     * mMore info about the issue here: https://github.com/puppeteer/puppeteer/issues/422
     */
    await page.waitForFunction("document.fonts.ready");

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
