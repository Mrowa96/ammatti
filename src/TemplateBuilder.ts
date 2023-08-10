import { resolve } from "path";
import { build as viteBuild } from "vite";
import vitePluginReact from "@vitejs/plugin-react";
import type { BuilderResult } from "./Preview/types.ts";

export class TemplateBuilder {
  #name;

  constructor(name: string) {
    this.#name = name;
  }

  async build(): Promise<BuilderResult> {
    const buildResult = await viteBuild({
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
      logLevel: "warn",
      // @ts-ignore: https://github.com/vitejs/vite-plugin-react/issues/104
      plugins: [vitePluginReact()],
    });

    const { data: resumeData } = await import(resolve("data.js"));
    const html = await this.#prepareHtml(resumeData);
    const css = this.#prepareCss(buildResult);

    return {
      html,
      css,
    };
  }

  async #prepareHtml(resumeData: unknown) {
    const { render } = await import(resolve("template_dist/render.mjs"));

    const decoder = new TextDecoder("utf-8");
    const htmlTemplate = decoder.decode(
      await Deno.readFile(resolve(`templates/${this.#name}/template.html`)),
    );

    const html = htmlTemplate.replace("<!-- CONTENT_OUTLET_KEY -->", render(resumeData));

    return html;
  }

  #prepareCss(buildResult: Awaited<ReturnType<typeof viteBuild>>) {
    if (!("output" in buildResult)) {
      throw new Error("Build result have to be an object with 'output' property as an array.");
    }

    const styleChunk = buildResult.output.find(({ name }) => name === "style.css");

    if (!styleChunk || !("source" in styleChunk) || typeof styleChunk.source !== "string") {
      throw new Error("styleChunk has to have 'source' string property.");
    }

    const css = styleChunk.source;

    return css;
  }
}
