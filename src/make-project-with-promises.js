const fs = require("fs/promises");
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

const makeProjectWithCallbacks = async (projectName, initGit = false) => {
  return fs
    .mkdir(projectName, { recursive: true })
    .then(() => {
      return fs.readdir(projectName);
    })
    .then((files) => {
      const exists = files.filter((file) => {
        return [
          ".gitignore",
          "README.md",
          "__tests__",
          "eslint.config.js",
          "index.js",
          "node_modules",
          "package-lock.json",
          "package.json",
          "spec",
        ].includes(file);
      });
      if (exists.length)
        return Promise.reject(
          new Error(`File(s) already exist: ${exists.join(", ")}`)
        );

      return Promise.all([
        fs.writeFile(`${projectName}/index.js`, "// new index.js"),
        fs.writeFile(`${projectName}/README.md`, "## New Project"),
        fs.writeFile(`${projectName}/eslint.config.js`, ""),
        fs.writeFile(`${projectName}/.gitignore`, "node_modules"),
        fs.mkdir(`${projectName}/spec`),
        fs.mkdir(`${projectName}/__tests__`),
      ]);
    })
    .then(() => {
      return fs.writeFile(`${projectName}/__tests__/index.test.js`, "");
    })
    .then(() => {
      return fs.readdir(testProjectName);
    })
    .then((files) => {
      if (files.includes(".git") && initGit) {
        initGit = false;
        console.log("git already initialised... skipping");
      }
      return exec(`sh project-init.sh ${projectName} ${initGit}`);
    });
};

module.exports = makeProjectWithCallbacks;
