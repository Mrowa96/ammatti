import { equal } from "assert";
import { defineData } from "./defineData.ts";
import type { ResumeData } from "./types.ts";

Deno.test("defineData should return the same object", () => {
  const data = {};

  equal(defineData(data as ResumeData), data);
});
