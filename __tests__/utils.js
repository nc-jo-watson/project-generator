const fs = require("fs/promises");

const removeExistingProject = async () => {
  await fs
    .rmdir(`./${testProjectName}`, { recursive: true, force: true })
    .catch(() => {});
};

module.exports = { removeExistingProject };
