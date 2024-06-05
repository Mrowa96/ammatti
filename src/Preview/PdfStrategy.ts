import { resolve } from "path";
import { info } from "../logger.ts";
import type { Browser, IPreviewStrategy, Page } from "./types.ts";

export class PdfStrategy implements IPreviewStrategy {
  initialiseConfig = {
    headless: true,
  };

  async run(page: Page, browser: Browser) {
    const bodyNode = await page.$('body');
    const boundingBox = await bodyNode?.boundingBox()

    if (!boundingBox) {
      throw new Error('Cannot detect page dimensions, something is wrong.')
    }

    const pdf = await page.pdf({
      width: boundingBox.width,
      height: Math.ceil(boundingBox.height),
    });

    // TODO Save file with timestamp as an option
    const resumeFilePath = resolve("resume.pdf");

    await Deno.writeFile(resumeFilePath, pdf);
    await browser.close();

    info(`resume.pdf saved in ${resumeFilePath}`);
  }
}
