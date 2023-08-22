import { InitDataFileAlreadyExistsCode, UndefinedCode } from "./errors.ts";

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

type InitReturn = { ok: true; code: undefined } | { ok: false; code: number };

export async function init(overwriteDataFile?: boolean): Promise<InitReturn> {
  try {
    await Deno.writeTextFile("./data.ts", dataFileContent, { createNew: !overwriteDataFile });

    return {
      ok: true,
      code: undefined,
    };
  } catch (error) {
    let code = UndefinedCode;

    if (error instanceof Deno.errors.AlreadyExists) {
      code = InitDataFileAlreadyExistsCode;
    }

    return {
      ok: false,
      code,
    };
  }
}
