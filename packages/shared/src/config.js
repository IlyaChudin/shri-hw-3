const path = require("path");
const { _, config, ...rest } = require("minimist")(process.argv.slice(2));

// eslint-disable-next-line global-require,import/no-dynamic-require
module.exports = { ...(config ? require(path.resolve(process.cwd(), config)) : {}), ...rest };
