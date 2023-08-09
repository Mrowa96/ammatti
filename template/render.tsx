import { renderToStaticMarkup } from 'react-dom/server';
import { DefaultTemplate } from './DefaultTemplate';
import type { ResumeData } from './types';

export const render = (data: ResumeData) => renderToStaticMarkup(<DefaultTemplate data={data} />);
