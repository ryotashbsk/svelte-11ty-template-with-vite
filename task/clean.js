const { config } = require('../config');
const rimraf = require('rimraf');
const manifest = `${config.outputPath}/manifest.json`;

rimraf(manifest, () => {
  const yellow = '\u001b[33m';
  var reset = '\u001b[0m';
  console.log(`${yellow}rimraf ${manifest} ${reset}`);
});
