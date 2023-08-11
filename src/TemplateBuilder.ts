import { resolve } from "path";
import { build as viteBuild } from "vite";
import vitePluginReact from "@vitejs/plugin-react";
import type { BuilderResult } from "./Preview/types.ts";

type BuildResult = Awaited<ReturnType<typeof viteBuild>>;

export class TemplateBuilder {
  #name;

  constructor(name: string) {
    this.#name = name;
  }

  async build(): Promise<BuilderResult> {
    const buildResult = await viteBuild({
      root: resolve(`templates/${this.#name}`),
      build: {
        ssr: resolve(`templates/${this.#name}/render.tsx`),
        cssCodeSplit: false,
        write: false,
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

    const { data: resumeData } = await import(resolve("data.ts"));
    const html = await this.#prepareHtml(buildResult, resumeData);
    const css = this.#prepareCss(buildResult);

    return {
      html,
      css,
    };
  }

  async #prepareHtml(buildResult: BuildResult, resumeData: unknown) {
    if (!("output" in buildResult)) {
      throw new Error("Build result have to be an object with 'output' property as an array.");
    }

    const renderChunk = buildResult.output.find(({ name }) => name === "render");

    if (!renderChunk || !("code" in renderChunk)) {
      throw new Error("renderChunk has to have 'code' property.");
    }

    // More details about this approach here https://2ality.com/2019/10/eval-via-import.html
    const { render } = await import("data:text/javascript;charset=utf-8," + renderChunk.code);
    const htmlTemplate = await Deno.readTextFile(resolve(`templates/${this.#name}/template.html`));
    const html = htmlTemplate.replace("<!-- CONTENT_OUTLET_KEY -->", render(resumeData));

    return html;
  }

  #prepareCss(buildResult: BuildResult) {
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
