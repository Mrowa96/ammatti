import { resolve } from "path";
import { info } from "../logger.ts";
import type { Browser, IPreviewStrategy, Page } from "./types.ts";

export class PdfStrategy implements IPreviewStrategy {
  initialiseConfig = {
    headless: true,
  };

  async run(page: Page, browser: Browser) {
    const pdf = await page.pdf({
      // TODO Take it somehow from template data
      width: 900,
      height: 1290,
      margin: {
        bottom: 30,
        top: 30,
        left: 50,
        right: 50,
      },
    });
    // TODO Save file with timestamp
    const resumeFilePath = resolve("resume.pdf");

    await Deno.writeFile(resumeFilePath, pdf);
    await browser.close();

    info(`resume.pdf saved in ${resumeFilePath}`);
  }
}
