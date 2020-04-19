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
  },
  githubOptions: {
    baseURL: "https://api.github.com/repos",
    ...(config.gitHubToken
      ? {
          headers: {
            Authorization: `token ${config.gitHubToken}`
          }
        }
      : {})
  }
};
