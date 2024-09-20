const fs = require("fs/promises");
const makeProjectWithCallbacks = async (projectName) => {
  return fs
    .mkdir(projectName)
    .then(() => {
      return fs.writeFile(`${projectName}/index.js`, "// new index.js");
    })
    .catch((err) => console.log(err));
};

module.exports = makeProjectWithCallbacks;
