import { TemplateBuilder } from './src/TemplateBuilder.js';
import { DevelopStrategy, Preview } from './src/Preview/index.js';

const builder = new TemplateBuilder('test');

const { html, css } = await builder.build();

const preview = new Preview({ html, css });

preview.setStrategy(new DevelopStrategy());
preview.run();