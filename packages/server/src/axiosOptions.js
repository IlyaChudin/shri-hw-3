const https = require("https");
const config = require("./config");

module.exports = {
  backendOptions: {
    baseURL: config.apiUrl,
    headers: {
      Authorization: `Bearer ${config.jwtToken}`
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  }
};
