import { InitDataFileAlreadyExists } from "./errors.ts";

const dataFileContent = `
import { defineData } from "./src/defineData.ts";

export const data = defineData({ /* Define data here */ });
`;

export async function init() {
  let ok = true;
  let code;

  try {
    await Deno.writeTextFile("./data.ts", dataFileContent, { createNew: true });
  } catch (error) {
    ok = false;

    if (error instanceof Deno.errors.AlreadyExists) {
      code = InitDataFileAlreadyExists;
      console.warn("Terminating, file data.ts already exists");
    }
  }

  return {
    ok,
    code,
  };
}
