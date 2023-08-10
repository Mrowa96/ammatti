import type { Browser, Page } from "puppeteer-core";

export type InitialiseConfig = {
  headless?: boolean;
  devtools?: boolean;
};

export interface IPreviewStrategy {
  initialiseConfig: InitialiseConfig;
  run(page: Page, browser: Browser): Promise<void>;
}

export type { Browser, Page };
