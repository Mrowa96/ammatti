import { TemplateBuilder } from "./src/TemplateBuilder.ts";
import { PdfStrategy, Preview } from "./src/Preview/index.ts";

const builder = new TemplateBuilder("DefaultTemplate");

const { html, css } = await builder.build();

const preview = new Preview({ html, css });

preview.setStrategy(new PdfStrategy());

await preview.run();

Deno.exit();
