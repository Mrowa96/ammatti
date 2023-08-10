import { renderToStaticMarkup } from "react-dom/server";
import { DefaultTemplate } from "./DefaultTemplate.tsx";
import type { ResumeData } from "./types.ts";

export function render(data: ResumeData) {
  return renderToStaticMarkup(<DefaultTemplate data={data} />);
}
