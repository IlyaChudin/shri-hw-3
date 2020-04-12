const axios = require("axios");
const { githubOptions } = require("./axiosOptions");

async function getCommitInfo(repoName, commitHash) {
  const { data } = await axios.get(`/${repoName}/commits/${commitHash}`, githubOptions);
  return {
    commitMessage: data.commit.message,
    commitHash,
    authorName: data.commit.author.name
  };
}

async function getBranchCommits(repoName, branchName) {
  const { data } = await axios.get(`/${repoName}/commits`, {
    ...githubOptions,
    params: { sha: branchName }
  });
  return data;
}

async function getRepositoryInfo(repoName) {
  try {
    const { data } = await axios.get(`/${repoName}`, githubOptions);
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
