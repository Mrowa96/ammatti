import { equal } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { defineData } from "./defineData.ts";
import type { ResumeData } from "./types.ts";

describe("defineData", () => {
  it("should return the same object", () => {
    const data = {};

    equal(defineData(data as ResumeData), data);
  });
});
