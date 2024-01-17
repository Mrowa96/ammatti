# ammatti

## Requirements

- Deno 1.39

## How to use?

1. Run `deno task init`. It will create `data.ts` file where you will have to fill out. File `data.ts` won't be commited
   to repository. It won't be also overwritten by calling init task again unless explicit confirmation.
2. Run app in one of two modes:
   - `dev` - Run `deno task develop` to open browser with devtools to develop your resume.
   - `generate` - Run `deno task generate` to generate and save resume to pdf file.

## New template

Template has to contain few required files:

- `template.html` - simple html into which content will be injected
- `render.tsx` - module exporting `render` function which will return content

## Ideas

- Consider making it a Electron app?
- Handle svg
- Add hmr in dev mode somehow?
