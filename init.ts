import { InitDataFileAlreadyExistsCode, UndefinedCode } from "./src/errors.ts";
import { init } from "./src/init.ts";
import { info, warn } from "./src/logger.ts";

let initResult = await init();

if (initResult.code === InitDataFileAlreadyExistsCode) {
  const overwriteDataFile = confirm("File data.ts already exists, do you want to overwrite it?");

  console.log("Overwrite data.ts?", overwriteDataFile);

  if (overwriteDataFile) {
    initResult = await init(true);
  }
}

if (initResult.ok) {
  info("File data.ts was successfully created.");
} else {
  if (initResult.code === InitDataFileAlreadyExistsCode) {
    warn("Terminating, file data.ts already exists.");
  }

  Deno.exit(initResult.code ?? UndefinedCode);
}
