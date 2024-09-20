const fs = require("fs/promises");
const { exec } = require("node:child_process");
const makeProjectWithCallbacks = async (projectName) => {
  return fs
    .mkdir(projectName, { recursive: true })
    .then(() => {
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
    .catch((err) => console.log(err));
};

module.exports = makeProjectWithCallbacks;
