import { init } from "./src/init.ts";

const initResult = await init();

if (initResult.ok === false) {
  Deno.exit(initResult.code);
}
