## Project generator

Based on this sprint:
https://l2c.northcoders.com/courses/fun/callback-heaven#sectionId=projectGenerator,step=intro

I wanted to practice all the different ways to do async code. I wrote the tests with async await, and I planned to write the solution with both callbacks and promises.

Requires _node_ and _git_

### How to run the project generator

1. Clone the repo

2. Install dependencies

```
npm i
```

3. Run the project generator by importing it into a script
   e.g.

```js
const makeProjectWithPromises = require("../src/make-project-with-promises");

makeProjectWithPromises("/my/favourite/file/path");
```

This will initialise a project in the specified directory with the following:

- An index.js
- A spec folder
- An index.test.js
- A package.json set up with the basic dependencies and scripts
- A README.md file
- An eslint config file
- A .gitignore file
- A git repository initialised

### How to run the tests

```
npm test promises
```

_In future: npm test callbacks_
