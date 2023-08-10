import { resolve } from "path";
import { build as viteBuild } from "vite";
import vitePluginReact from "@vitejs/plugin-react";

const CONTENT_OUTLET_KEY = "<!-- CONTENT_OUTLET_KEY -->";

export class TemplateBuilder {
  #name;

  constructor(name: string) {
    this.#name = name;
  }

  async build() {
    const buildOutput = await viteBuild({
      root: resolve(`templates/${this.#name}`),
      build: {
        outDir: resolve("template_dist"),
        ssr: resolve(`templates/${this.#name}/render.tsx`),
        cssCodeSplit: false,
        emptyOutDir: true,
        rollupOptions: {
          external: [
            "react/jsx-runtime",
            "react-dom/server",
          ],
        },
      },
      // logLevel: 'silent',
      // @ts-ignore: https://github.com/vitejs/vite-plugin-react/issues/104
      plugins: [vitePluginReact()],
    });

    const { render } = await import(resolve("template_dist/render.mjs"));
    const { data: resumeData } = await import(resolve("data.js"));

    const decoder = new TextDecoder("utf-8");
    const htmlTemplate = decoder.decode(
      await Deno.readFile(resolve(`templates/${this.#name}/template.html`)),
    );

    const html = htmlTemplate.replace(CONTENT_OUTLET_KEY, render(resumeData));
    // TODO Add additional checks
    const css = buildOutput.output.filter(({ name }) => name === "style.css").at(0)
      .source;

    return {
      html,
      css,
    };
  }
}
