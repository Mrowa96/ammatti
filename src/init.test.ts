import { assertSpyCallArg, resolvesNext, stub } from "testing/mock";
import { describe, it } from "testing/bdd";
import { equal } from "assert";
import { init } from "./init.ts";
import { InitDataFileAlreadyExistsCode } from "./errors.ts";

describe("init", () => {
  it("should create data.ts file and return success", async () => {
    const writeTextFileStub = stub(Deno, "writeTextFile", resolvesNext([undefined]));

    const initResults = await init();

    equal(initResults, { ok: true, code: undefined });
    assertSpyCallArg(writeTextFileStub, 0, 0, "./data.ts");
    assertSpyCallArg(writeTextFileStub, 0, 2, { createNew: true });

    writeTextFileStub.restore();
  });

  it("should handle throwed error and return fail", async () => {
    const writeTextFileStub = stub(Deno, "writeTextFile", () => {
      throw Deno.errors.AlreadyExists;
    });

    const initResults = await init();

    equal(initResults, { ok: false, code: InitDataFileAlreadyExistsCode });

    writeTextFileStub.restore();
  });

  it("should override file and return success", async () => {
    const writeTextFileStub = stub(Deno, "writeTextFile", resolvesNext([undefined]));

    const initResults = await init(true);

    equal(initResults, { ok: true, code: undefined });
    assertSpyCallArg(writeTextFileStub, 0, 2, { createNew: false });

    writeTextFileStub.restore();
  });
});
