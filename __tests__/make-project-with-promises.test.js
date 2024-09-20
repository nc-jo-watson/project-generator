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
    await makeProjectWithPromises(testProjectName);

    const files = await fs.readdir(".");

    expect(files).toContain(testProjectName);
  });
  test("When invoked with a path that already exists, the directory is not replaced", async () => {
    await fs.mkdir(testProjectName);
    await fs.writeFile("test/myfile.txt", "", "utf8", () => {});

    await makeProjectWithPromises(testProjectName);

    const files = await fs.readdir(testProjectName);

    expect(files).toContain("myfile.txt");
  });
  describe("Files in root directory", () => {
    test("Initialises project with an index.js file in the root", async () => {
      await makeProjectWithPromises(testProjectName);
      const files = await fs.readdir(testProjectName);

      expect(files).toContain("index.js");
    });
    test("Initialises project with a README.md file in the root", async () => {
      await makeProjectWithPromises(testProjectName);
      const files = await fs.readdir(testProjectName);

      expect(files).toContain("README.md");
    });
    test("Initialises project with an eslint.config.js file in the root", async () => {
      await makeProjectWithPromises(testProjectName);
      const files = await fs.readdir(testProjectName);

      expect(files).toContain("eslint.config.js");
    });
    test("Initialises project with an .gitignore file in the root", async () => {
      await makeProjectWithPromises(testProjectName);
      const files = await fs.readdir(testProjectName);

      expect(files).toContain(".gitignore");
    });
  });
  describe("Subdirectories", () => {
    test("Initialises project with a spec subdirectory", async () => {
      await makeProjectWithPromises(testProjectName);
      const files = await fs.readdir(testProjectName);

      expect(files).toContain("spec");
    });
    test("Initialises project with an __tests__ subdirectory, which contains an index.test.js", async () => {
      await makeProjectWithPromises(testProjectName);
      const files = await fs.readdir(testProjectName);
      expect(files).toContain("__tests__");

      const subDirfiles = await fs.readdir(`${testProjectName}/__tests__`);
      expect(subDirfiles).toContain("index.test.js");
    });
  });
  describe("Initialise as npm project", () => {
    test("Creates a package.json", async () => {
      await makeProjectWithPromises(testProjectName);
      const files = await fs.readdir(testProjectName);
      expect(files).toContain("package.json");
    })
  })
});
