/* eslint-disable global-require,import/no-dynamic-require */
const path = require("path");
const { _, config, ...rest } = require("minimist")(process.argv.slice(2));

module.exports = defaultConfig => ({
  ...defaultConfig,
  ...(config ? require(path.resolve(process.cwd(), config)) : {}),
  ...rest
});
