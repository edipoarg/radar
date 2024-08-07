import { describe, expect, it } from "vitest";
import { parseTSVToJSON } from "../parse-tsv.cjs";
import parsedCases from "./casos-parseados.json";

describe("fetchTSV", () => {
  it("parses TSV to JSON as expected", async () => {
    const result = await parseTSVToJSON("services/__test__/sheet.tsv");
    expect(JSON.stringify(result, null, 4)).toEqual(
      JSON.stringify(parsedCases, null, 4),
    );
  });
});
