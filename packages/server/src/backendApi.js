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

async function saveSettings({ repoName, buildCommand, mainBranch, period }) {
  await instance.post("/conf", { repoName, buildCommand, mainBranch, period });
}

async function getAllBuilds(offset, limit) {
  const response = await instance.get("/build/list", {
    params: {
      offset: offset || 0,
      limit: limit || 25
    }
  });
  return response.data.data;
}

async function getBuildDetails(buildId) {
  const response = await instance.get("/build/details", { params: { buildId } });
  return response.data.data;
}

async function getBuildLog(buildId) {
  const response = await instance.get("/build/log", { params: { buildId } });
  return response.data;
}

async function requestBuild({ commitMessage, commitHash, branchName, authorName }) {
  const response = await instance.post("/build/request", { commitMessage, commitHash, branchName, authorName });
  return response.data.data;
}

module.exports = {
  getSettings,
  saveSettings,
  getAllBuilds,
  getBuildDetails,
  getBuildLog,
  requestBuild
};
