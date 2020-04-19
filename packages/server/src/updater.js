const backendApi = require("./backendApi");
const githubApi = require("./githubApi");

const settings = {
  repoName: undefined,
  buildCommand: undefined,
  mainBranch: undefined,
  period: undefined
};
let lastCommitHash;
let interval;

async function getNewHashes() {
  const commits = await githubApi.getBranchCommits(settings.repoName, settings.mainBranch);
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
  const commits = await githubApi.getBranchCommits(settings.repoName, settings.mainBranch);
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
    let lastHash;
    try {
      console.log("Update started!");
      const hashes = await getNewHashes();
      for (let i = hashes.length - 1; i >= 0; i -= 1) {
        const hash = hashes[i];
        // eslint-disable-next-line no-await-in-loop
        const commitInfo = await githubApi.getCommitInfo(settings.repoName, hash);
        commitInfo.branchName = settings.mainBranch;
        // eslint-disable-next-line no-await-in-loop
        await backendApi.requestBuild(commitInfo);
        console.log("New commit: ", commitInfo);
        lastHash = hash;
      }
      console.log("Update finished. Build requested for ", hashes);
    } catch (error) {
      console.error(error.stack);
      console.error(error.message);
    } finally {
      if (lastHash) {
        lastCommitHash = lastHash;
        console.log("Last commit hash updated: ", lastCommitHash);
      }
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
    console.log("Auto updater start failed!");
    console.error(error.stack);
    console.error(error.message);
  }
}

async function init() {
  try {
    const data = await backendApi.getSettings();
    await internalInit(data);
  } catch (error) {
    console.error(error.stack);
    console.error(error.message);
  }
}

async function setSettings({ repoName, buildCommand, mainBranch, period }) {
  setTimeout(() => internalInit({ repoName, buildCommand, mainBranch, period }), 0);
}

module.exports = {
  init,
  setSettings,
  getSettings: () => settings
};
