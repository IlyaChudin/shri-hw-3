const axios = require("axios");
const https = require("https");
const config = require("./config");

const instance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Authorization: `Bearer ${config.jwtToken}`
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

async function getSettings() {
  const response = await instance.get("/conf");
  const { repoName, buildCommand, mainBranch, period } = response.data.data;
  return {
    repoName,
    buildCommand,
    mainBranch,
    period
  };
}

async function saveSettings(params) {
  await instance.post("/conf", {
    repoName: params.repoName,
    buildCommand: params.buildCommand,
    mainBranch: params.mainBranch,
    period: params.period
  });
}

module.exports = {
  getSettings,
  saveSettings,
};
