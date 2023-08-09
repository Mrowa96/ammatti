/** @implements {import('./Preview.js').PreviewStrategy} */
export class DevelopStrategy {
  initialiseConfig = {
    headless: false,
    devtools: true,
  };

  async run() {}
}
