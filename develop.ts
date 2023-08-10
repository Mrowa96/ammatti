import { TemplateBuilder } from "./src/TemplateBuilder.ts";
import { DevelopStrategy, Preview } from "./src/Preview/index.ts";

const builder = new TemplateBuilder("DefaultTemplate");

const { html, css } = await builder.build();

const preview = new Preview({ html, css });

preview.setStrategy(new DevelopStrategy());

await preview.run();
