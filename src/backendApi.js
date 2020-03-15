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

async function requestBuild(params) {
  await instance.post("/build/request", {
    commitMessage: params.commitMessage,
    commitHash: params.commitHash,
    branchName: params.branchName,
    authorName: params.authorName
  });
}

module.exports = {
  getSettings,
  saveSettings,
  getAllBuilds,
  getBuildDetails,
  getBuildLog,
  requestBuild
};
