const fs = require("fs");
function makeProjectWithCallbacks(path) {
  fs.writeFile(path + "/index.js", "", "utf8", () => {});
}

module.exports = makeProjectWithCallbacks;
