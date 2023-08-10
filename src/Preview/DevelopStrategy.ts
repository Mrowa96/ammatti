import type { Browser, IPreviewStrategy, Page } from "./types.ts";

const DEVELOP_STYLES = `
  body {
    max-width: 780px;
    margin: 0 auto;
    padding: 30px 50px;
  }
`;

export class DevelopStrategy implements IPreviewStrategy {
  initialiseConfig = {
    headless: false,
    devtools: true,
  };

  async run(page: Page, browser: Browser) {
    await page.addStyleTag({
      content: DEVELOP_STYLES,
    });

    page.on("close", async function onPageClose() {
      await browser.close();
      Deno.exit();
    });

    Deno.addSignalListener("SIGINT", async function onSIGINT() {
      await browser.close();
      Deno.exit();
    });
  }
}
