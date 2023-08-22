import { InitDataFileAlreadyExists } from "./errors.ts";
import { info, warn } from "./logger.ts";

const dataFileContent = `
import { defineData } from "./src/defineData.ts";

/* Define your data below */
export const data = defineData({
  personalDetails: {
    name: "John Doe",
    email: "john-doe@mail.xyz",
  },
  experiences: [],
  languages: [],
  education: [],
  skills: {
    advanced: [],
    good: [],
    average: [],
  },
  hobbies: [],
});
`;

export async function init() {
  let ok = true;
  let code;

  try {
    await Deno.writeTextFile("./data.ts", dataFileContent, { createNew: true });

    info("File data.ts was successfully created.");
  } catch (error) {
    ok = false;

    if (error instanceof Deno.errors.AlreadyExists) {
      code = InitDataFileAlreadyExists;
      warn("Terminating, file data.ts already exists.");
    }
  }

  return {
    ok,
    code,
  };
}
