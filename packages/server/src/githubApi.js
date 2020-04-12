const axios = require("axios");
const { gitHubToken } = require("./config");

const axiosOptions = {
  baseURL: "https://api.github.com/repos"
};
if (gitHubToken) {
  axiosOptions.headers = {
    Authorization: `token ${gitHubToken}`
  };
}
const instance = axios.create(axiosOptions);

async function getCommitInfo(repoName, commitHash) {
  const { data } = await instance.get(`/${repoName}/commits/${commitHash}`);
  return {
    commitMessage: data.commit.message,
    commitHash,
    authorName: data.commit.author.name
  };
}

async function getBranchCommits(repoName, branchName) {
  const { data } = await instance.get(`/${repoName}/commits`, {
    params: { sha: branchName }
  });
  return data;
}

async function getRepositoryInfo(repoName) {
  try {
    const { data } = await instance.get(`/${repoName}`);
    return data;
  } catch (e) {
    if (e.response && e.response.status === 404) {
      throw new Error("Repository not found");
    } else {
      throw e;
    }
  }
}

module.exports = {
  getCommitInfo,
  getBranchCommits,
  getRepositoryInfo
};
