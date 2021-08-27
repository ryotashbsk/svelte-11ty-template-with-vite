const { config } = require('../config');
const rimraf = require('rimraf');

rimraf(`./${config.outputPath}/manifest.json`, () => {
  const yellow = '\u001b[33m';
  var reset = '\u001b[0m';
  console.log(`${yellow}rimraf ${config.outputPath}/manifest.json ${reset}`);
});
