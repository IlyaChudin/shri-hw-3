const axios = require("axios");
const { backendOptions } = require("./axiosOptions");

async function getSettings() {
  const response = await axios.get("/conf", backendOptions);
  const { repoName, buildCommand, mainBranch, period } = response.data.data;
  return {
    repoName,
    buildCommand,
    mainBranch,
    period
  };
}

async function saveSettings({ repoName, buildCommand, mainBranch, period }) {
  await axios.post("/conf", { repoName, buildCommand, mainBranch, period }, backendOptions);
}

async function deleteSettings() {
  await axios.delete("/conf", backendOptions);
}

async function getAllBuilds(offset, limit) {
  const response = await axios.get("/build/list", {
    ...backendOptions,
    params: {
      offset: offset || 0,
      limit: limit || 25
    }
  });
  return response.data.data;
}

async function getBuildDetails(buildId) {
  const response = await axios.get("/build/details", { ...backendOptions, params: { buildId } });
  return response.data.data;
}

async function getBuildLog(buildId) {
  const response = await axios.get("/build/log", { ...backendOptions, params: { buildId } });
  return response.data;
}

async function requestBuild({ commitMessage, commitHash, branchName, authorName }) {
  const response = await axios.post(
    "/build/request",
    { commitMessage, commitHash, branchName, authorName },
    backendOptions
  );
  return response.data.data;
}

module.exports = {
  getSettings,
  saveSettings,
  deleteSettings,
  getAllBuilds,
  getBuildDetails,
  getBuildLog,
  requestBuild
};
