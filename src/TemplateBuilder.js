import fs from 'fs/promises';
import { build as viteBuild } from 'vite';
import react from '@vitejs/plugin-react';
import { getAbsolutePath } from './utils.js';

const CONTENT_OUTLET_KEY = '<!-- CONTENT_OUTLET_KEY -->';

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
      root: getAbsolutePath(`../templates/${this.#name}`),
      build: {
        outDir: getAbsolutePath('../template_dist'),
        ssr: getAbsolutePath(`../templates/${this.#name}/render.tsx`),
        cssCodeSplit: false,
        emptyOutDir: true,
      },
      // logLevel: 'silent',
      plugins: [react()],
    });

    const { render } = await import(getAbsolutePath('../template_dist/render.js'));
    const { data: resumeData } = await import(getAbsolutePath('../data.js'));
    const htmlTemplate = await fs.readFile(getAbsolutePath(`../templates/${this.#name}/template.html`), {
      encoding: 'utf8',
    });

    const html = htmlTemplate.replace(CONTENT_OUTLET_KEY, render(resumeData));
    // TODO Add additional checks
    const css = buildOutput.output.filter(({ name }) => name === 'style.css').at(0).source;

    return {
      html,
      css,
    };
  }
}
