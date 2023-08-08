import { renderToStaticMarkup } from 'react-dom/server';
import { DefaultTemplate } from './DefaultTemplate.jsx';

export const render = () => renderToStaticMarkup(<DefaultTemplate />);
