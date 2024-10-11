#!/usr/bin/env node

const { input } = require("@inquirer/prompts");
const makeProjectWithPromises = require("./src/make-project-with-promises");

const queryFilePath = {
  type: "input",
  name: "filePath",
  message: "What is the path of your new project?",
  default: "/",
};

async function runProjectGenerator() {
  input(queryFilePath)
    .then((answer) => {
      makeProjectWithPromises(answer);
    })
    .catch((err) => {
      console.log("Error in input!");
    });
}
runProjectGenerator();
