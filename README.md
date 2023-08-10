# ammatti

## Requirements

- Deno 1.36

## Modes

- dev - Run `deno task develop` to open browser with devtools to develop your resume
- generate - Run `deno task generate` to generate and save resume to pdf file

## New template

Template has to contain few required files:

- `template.html` - simple html into which content will be injected
- `render.tsx` - module exporting `render` function which will return content

## Developer information

- Consider making it a Electron app?
- Handle svg
- Add hmr in dev mode somehow?
