const fs = require("fs/promises");
const makeProjectWithCallbacks = async (projectName) => {
  return fs
    .mkdir(projectName)
    .then(() => {
      return Promise.all([
        fs.writeFile(`${projectName}/index.js`, "// new index.js"),
        fs.writeFile(`${projectName}/README.md`, "## New Project"),
        fs.writeFile(`${projectName}/eslint.config.js`, ""),
        fs.writeFile(`${projectName}/.gitignore`, "node_modules"),
      ]);
    })
    .catch((err) => console.log(err));
};

module.exports = makeProjectWithCallbacks;
