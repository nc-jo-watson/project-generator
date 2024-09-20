const makeProjectWithCallbacks = require("../src/make-project-with-callbacks");
const fs = require("fs/promises");

describe("makeProjectWithCallbacks", () => {
  test("When invoked a path argument, creates a new index.js file in the root", async () => {
    await makeProjectWithCallbacks("__tests__/test-dir");

    const rootFiles = await fs.readdir("__tests__/test-dir");
    expect(rootFiles).toContain("index.js");
  });
});
