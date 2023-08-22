import { equal } from "assert";
import { describe, it } from "testing/bdd";
import { defineData } from "./defineData.ts";
import type { ResumeData } from "./types.ts";

describe("defineData", () => {
  it("should return the same object", () => {
    const data = {};

    equal(defineData(data as ResumeData), data);
  });
});
