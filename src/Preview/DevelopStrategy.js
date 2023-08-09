const DEVELOP_STYLES = `
  body {
    max-width: 780px;
    margin: 0 auto;
    padding: 30px 50px;
  }
`;

/** @implements {import('./Preview.js').PreviewStrategy} */
export class DevelopStrategy {
  initialiseConfig = {
    headless: false,
    devtools: true,
  };

  /** @param {import('puppeteer').Page} page */
  async run(page) {
    page.addStyleTag({
      content: DEVELOP_STYLES,
    });
  }
}
