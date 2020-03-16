const axios = require("axios");
const api = require("./backendApi");
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

const settings = {};
let lastCommitHash;
let interval;

async function getCommitInfo(commitHash) {
  const { data } = await instance.get(`/${settings.repoName}/commits/${commitHash}`);
  return {
    commitMessage: data.commit.message,
    commitHash,
    // Описание почему так в README
    branchName: settings.mainBranch,
    authorName: data.commit.author.name
  };
}

async function getCommits(branchName) {
  const { data } = await instance.get(`/${settings.repoName}/commits`, {
    params: { sha: branchName }
  });
  return data;
}

async function getNewCommits() {
  const commits = await getCommits(settings.mainBranch);
  if (commits.length === 0 || lastCommitHash === undefined) {
    return [];
  }
  const hashes = [];
  for (let i = 0; i < commits.length; i += 1) {
    const commit = commits[i];
    if (commit.sha === lastCommitHash) {
      break;
    }
    hashes.push(commit.sha);
  }
  return hashes;
}

async function initLastCommitHash() {
  const commits = await getCommits(settings.mainBranch);
  if (commits.length === 0) {
    lastCommitHash = undefined;
  } else {
    lastCommitHash = commits[0].sha;
  }
  console.log("Last commit hash inited: ", lastCommitHash);
}

function startAutoUpdate() {
  if (interval) {
    clearInterval(interval);
  }
  const period = settings.period * 60000;
  interval = setInterval(async () => {
    try {
      console.log("Update started!");
      const hashes = await getNewCommits();
      for (let i = hashes.length - 1; i >= 0; i -= 1) {
        const hash = hashes[i];
        // eslint-disable-next-line no-await-in-loop
        const commitInfo = await getCommitInfo(hash);
        // eslint-disable-next-line no-await-in-loop
        await api.requestBuild(commitInfo);
        console.log("New commit: ", commitInfo);
      }
      if (hashes.length > 0) {
        [lastCommitHash] = hashes;
        console.log("Last commit hash updated: ", lastCommitHash);
      }
      console.log("Update finished. Build requested for ", hashes);
    } catch (error) {
      console.log(error);
    }
  }, period);
  console.log(`Interval updates started each ${period}ms.`);
}

async function internalInit({ repoName, buildCommand, mainBranch, period }) {
  try {
    const [lastRepoName, lastMainBranch] = [settings.repoName, settings.mainBranch];
    settings.repoName = repoName;
    settings.buildCommand = buildCommand;
    settings.mainBranch = mainBranch;
    settings.period = period;
    console.log("Settings set: ", settings);
    if (settings.repoName !== lastRepoName || settings.mainBranch !== lastMainBranch || lastCommitHash === undefined) {
      await initLastCommitHash();
    }
    startAutoUpdate();
  } catch (error) {
    console.error(error);
  }
}

async function init() {
  try {
    const data = await api.getSettings();
    await internalInit(data);
  } catch (error) {
    console.error(error);
  }
}

async function setSettings({ repoName, buildCommand, mainBranch, period }) {
  const { data } = await instance.get(`/${repoName}`);
  if (!data.id) {
    throw new Error("Repository not found.");
  }
  setTimeout(() => internalInit({ repoName, buildCommand, mainBranch, period }), 0);
}

module.exports = {
  init,
  setSettings,
  getCommitInfo
};
