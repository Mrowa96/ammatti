# ammatti

## Requirements

Check package.json to see supported node.js and npm versions

## Modes

- dev - Run `npm run dev` to open browser with devtools to develop your resume
- generate - Run `npm run generate` to generate and save resume to pdf file

## Developer information

- `tsconfig.json` is used only for templates for now
- The reason why there is no TypeScript support for internal code is that tooling is quite complicated. `ts-node` is not supported anymore. It can be replaced by `swc` but this creates another layer with potential issues like. problems with dynamic imports. One possible way how to tackle this issue will be to switch to Deno.
