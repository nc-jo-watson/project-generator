const fs = require("fs/promises");
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

const makeProjectWithCallbacks = async (projectName, initGit = false) => {
  console.log(`🤖 Generating project in directory '${projectName}'`);
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
      return fs.readdir(projectName);
    })
    .then((files) => {
      console.log(`Created 🗂️ ${files.join(", ")}`);
      if (files.includes(".git") && initGit) {
        initGit = false;
        console.log("git already initialised... skipping");
      }
      return exec(`sh ${__dirname}/../project-init.sh ${projectName} ${initGit}`);
    })
    .then(() => {
      console.log("✨ Project generated! ✨");
    });
};

module.exports = makeProjectWithCallbacks;
