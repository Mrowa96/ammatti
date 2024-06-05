import type { Browser, IPreviewStrategy, Page } from "./types.ts";

export class DevelopStrategy implements IPreviewStrategy {
  initialiseConfig = {
    headless: false,
    devtools: true,
  };

  run(page: Page, browser: Browser) {
    page.on("close", async function onPageClose() {
      await browser.close();
      Deno.exit();
    });

    Deno.addSignalListener("SIGINT", async function onSIGINT() {
      await browser.close();
      Deno.exit();
    });

    return Promise.resolve()
  }
}
