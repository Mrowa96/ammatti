# ammatti

## Requirements

Check package.json to see supported node.js and npm versions

## Modes

- dev - Run `npm run dev` to open browser with devtools to develop your resume
- generate - Run `npm run generate` to generate and save resume to pdf file

## New template

Template has to contain few required files:

- `template.html` - simple html into which content will be injected
- `render.tsx` - module exporting `render` function which will return content

## Developer information

- `tsconfig.json` is used only for templates for now
- The reason why there is no TypeScript support for internal code is that tooling is quite complicated.
  `ts-node` is not supported anymore.
  It can be replaced by `swc` but this creates another layer with potential issues like. problems with dynamic imports.
  One possible way how to tackle this issue will be to switch to Deno?.
- Consider making it a Electron app?
- Handle svg
- Try to not write to dist [directory](https://2ality.com/2019/10/eval-via-import.html)
- Add hmr in dev mode somehow?
