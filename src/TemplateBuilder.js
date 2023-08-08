import path from 'path';
import { build as viteBuild } from 'vite';
import { getDirname } from './utils.js';
import react from '@vitejs/plugin-react';

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
  /** @param {string} name */
  #name;

  /** @param {string} name */
  constructor(name) {
    this.#name = name;
  }

  async build() {
    const buildOutput = await viteBuild({
      root: path.resolve(getDirname(), '../template'),
      build: {
        ssr: path.resolve(getDirname(), '../template/index.jsx'),
        cssCodeSplit: false,
      },
      plugins: [react()],
    });

    const { render } = await import(path.resolve(getDirname(), '../template/dist/index.js'));

    const content = HTML_TENPLATE.replace(CONTENT_OUTLET_KEY, render());
    const styles = buildOutput.output.filter(({ name }) => name === 'style.css').at(0);

    return {
      content,
      styles,
    };
  }
}
