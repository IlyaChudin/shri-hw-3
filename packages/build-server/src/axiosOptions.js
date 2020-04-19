const https = require("https");
const { apiBaseUrl, apiToken } = require("./config");

module.exports = {
  baseURL: apiBaseUrl,
  headers: {
    Authorization: `Bearer ${apiToken}`
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
};
