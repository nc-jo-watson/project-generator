const fs = require("fs/promises");

const removeExistingProject = async () => {
  await fs
    .rm(`./${testProjectName}`, { recursive: true, force: true })
    .catch(() => {});
};

module.exports = { removeExistingProject };
