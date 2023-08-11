import { renderToStaticMarkup } from "react-dom/server";
import { DefaultTemplate } from "./DefaultTemplate.tsx";
import type { ResumeData } from "../../src/types.ts";

export function render(data: ResumeData) {
  return renderToStaticMarkup(<DefaultTemplate data={data} />);
}
