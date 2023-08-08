import puppeteer from 'puppeteer';
import { TemplateBuilder } from './src/TemplateBuilder.js';

const builder = new TemplateBuilder('test');

const { content, styles } = await builder.build();

const browser = await puppeteer.launch({
  headless: false,
  // args: ['--disable-gpu', '--single-process', '--force-color-profile=srgb', '--no-sandbox'],
});
const page = await browser.newPage();

await page.emulateMediaType('screen');
await page.setContent(content);
await page.addStyleTag({
  content: styles.source,
});

// const pdf = await page.pdf({

// });

// await browser.close();
// await fs.writeFile('./resume.pdf', pdf);
