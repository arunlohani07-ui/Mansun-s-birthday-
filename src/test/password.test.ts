import { describe, expect, it } from "vitest";
import { checkPassword } from "@/lib/content";

describe("password", () => {
  it("accepts dash format", () => expect(checkPassword("2083-02-11")).toBe(true));
  it("accepts slash format", () => expect(checkPassword("2083/02/11")).toBe(true));
  it("rejects wrong date", () => expect(checkPassword("2083-02-12")).toBe(false));
  it("rejects empty", () => expect(checkPassword("")).toBe(false));
});
