const fs = require("fs/promises");
const makeProjectWithCallbacks = async (projectName) => {
  return fs.mkdir(projectName).catch((err) => console.log(err));
};

module.exports = makeProjectWithCallbacks;
