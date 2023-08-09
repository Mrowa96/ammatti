import { build as viteBuild } from 'vite';
import react from '@vitejs/plugin-react';
import { getDirname } from './utils.js';

const CONTENT_OUTLET_KEY = '/* CONTENT_OUTLET_KEY */';
const HTML_TENPLATE = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Resume</title>
    </head>
    <body>
        ${CONTENT_OUTLET_KEY}
    </body>
</html>
`;

export class TemplateBuilder {
  // TODO Handle multiple templates by name
  /** @param {string} name */
  #name;

  /** @param {string} name */
  constructor(name) {
    this.#name = name;
  }

  async build() {
    const buildOutput = await viteBuild({
      root: getDirname('../template'),
      build: {
        ssr: getDirname('../template/index.jsx'),
        cssCodeSplit: false,
      },
      logLevel: 'silent',
      plugins: [react()],
    });

    const { render } = await import(getDirname('../template/dist/index.js'));

    const html = HTML_TENPLATE.replace(CONTENT_OUTLET_KEY, render());
    // TODO Add additional checks
    const css = buildOutput.output.filter(({ name }) => name === 'style.css').at(0).source;

    return {
      html,
      css,
    };
  }
}
