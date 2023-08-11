# ammatti

## Requirements

- Deno 1.36

## Preparing data

Before generating resume, data has to be prepared by using `defineData` function in `data.ts` file. This is solution for
now, later on it will be probably possible to configure it. `data.ts` won't be commited to repository.

## Modes

- `dev` - Run `deno task develop` to open browser with devtools to develop your resume
- `generate` - Run `deno task generate` to generate and save resume to pdf file

## New template

Template has to contain few required files:

- `template.html` - simple html into which content will be injected
- `render.tsx` - module exporting `render` function which will return content

## Ideas

- Consider making it a Electron app?
- Handle svg
- Add hmr in dev mode somehow?
