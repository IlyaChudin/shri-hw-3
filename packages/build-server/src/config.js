const config = require("../../shared/src/config");

module.exports = config({
  port: 3001,
  apiBaseUrl: "https://hw.shri.yandex/api/",
  updateInterval: 30000
});
