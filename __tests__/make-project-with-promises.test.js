const makeProjectWithPromises = require("../src/make-project-with-promises");
const fs = require("fs/promises");

describe("makeProjectWithCallbacks", () => {
  beforeEach(async () => {
    testProjectName = "test";
    await fs
      .rmdir(`./${testProjectName}`, { recursive: true, force: true })
      .catch(() => {});
  });

  test("When invoked with a path that does not exist, the directory is created", async () => {
    await makeProjectWithCallbacks(testProjectName);

    const files = await fs.readdir(".");

    expect(files).toContain(testProjectName);
  });
  test("When invoked with a path that already exists, the directory is not replaced", async () => {
    await fs.mkdir(testProjectName);
    await fs.writeFile("test/myfile.txt", "", "utf8", () => {});

    await makeProjectWithCallbacks(testProjectName);

    const files = await fs.readdir(testProjectName);

    expect(files).toContain("myfile.txt");
  });
  test("Initialises project with an index.js file in the root", async () => {
    await makeProjectWithCallbacks(testProjectName);
    const files = await fs.readdir(testProjectName);

    expect(files).toContain("index.js");
  });
});
