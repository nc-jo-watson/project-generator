const makeProjectWithPromises = require("../src/make-project-with-promises");
const fs = require("fs/promises");
const { removeExistingProject } = require("./utils");

describe("makeProjectWithPromises", () => {
  beforeAll(() => {
    testProjectName = "test";
  });
  describe("Create directory", () => {
    beforeEach(async () => {
      await removeExistingProject();
    });

    test("When invoked with a path that does not exist, the directory is created", async () => {
      await makeProjectWithPromises(testProjectName);

      const files = await fs.readdir(".");

      expect(files).toContain(testProjectName);
    });
    test("When invoked with a path that already exists, the directory is not replaced", async () => {
      await fs.mkdir(testProjectName);
      await fs.writeFile("test/myfile.txt", "", "utf8");

      await makeProjectWithPromises(testProjectName);

      const files = await fs.readdir(testProjectName);

      expect(files).toContain("myfile.txt");
    });
  });

  describe("Project contents", () => {
    beforeEach(async () => {
      await removeExistingProject();
      await makeProjectWithPromises(testProjectName);
      files = await fs.readdir(testProjectName);
    });
    describe("Files in root directory", () => {
      test("Initialises project with an index.js file in the root", async () => {
        expect(files).toContain("index.js");
      });
      test("Initialises project with a README.md file in the root", async () => {
        expect(files).toContain("README.md");
      });
      test("Initialises project with an eslint.config.js file in the root", async () => {
        expect(files).toContain("eslint.config.js");
      });
      test("Initialises project with an .gitignore file in the root", async () => {
        expect(files).toContain(".gitignore");
      });
    });
    describe("Subdirectories", () => {
      test("Initialises project with a spec subdirectory", async () => {
        expect(files).toContain("spec");
      });
      test("Initialises project with an __tests__ subdirectory, which contains an index.test.js", async () => {
        expect(files).toContain("__tests__");

        const subDirfiles = await fs.readdir(`${testProjectName}/__tests__`);
        expect(subDirfiles).toContain("index.test.js");
      });
    });
    describe("Initialise as npm project", () => {
      test("Creates a package.json", async () => {
        expect(files).toContain("package.json");
      });
      test("jest is specified as a dev devependency", async () => {
        const packageJson = await fs.readFile(
          `${testProjectName}/package.json`,
          "utf-8"
        );
        expect(JSON.parse(packageJson).devDependencies).toHaveProperty("jest");
      });
    });
    describe("Initialise git repo", () => {
      test("If initGit is true, a git repo is initialised", async () => {
        await removeExistingProject();

        await makeProjectWithPromises(testProjectName, true);
        const files = await fs.readdir(testProjectName);
        expect(files).toContain(".git");
      });
      test("If initGit is false (default), a git repo is not initialised", async () => {
        expect(files).not.toContain(".git");
      });
    });
  });
});
