const fs = require("fs/promises");
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

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
    .then(() => {
      return exec(`sh project-init.sh ${projectName}`);
    })
    .catch((err) => console.log(err));
};

module.exports = makeProjectWithCallbacks;
