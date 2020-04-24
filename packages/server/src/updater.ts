/* eslint-disable no-await-in-loop */
import { Configuration, RequestBuild } from "@shri-ci/types";
import backendApi from "./backendApi";
import githubApi from "./githubApi";

let internalSettings: Configuration = { buildCommand: "", mainBranch: "", period: 0, repoName: "" };
let lastCommitHash: string | undefined;
let interval: NodeJS.Timeout;

const getNewHashes = async (): Promise<string[]> => {
  const commits = await githubApi.getBranchCommits(internalSettings.repoName, internalSettings.mainBranch);
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
};

const initLastCommitHash = async (): Promise<void> => {
  const commits = await githubApi.getBranchCommits(internalSettings.repoName, internalSettings.mainBranch);
  if (commits.length === 0) {
    lastCommitHash = undefined;
  } else {
    lastCommitHash = commits[0].sha;
  }
  console.log("Last commit hash inited: ", lastCommitHash);
};

const startAutoUpdate = (): void => {
  if (interval) {
    clearInterval(interval);
  }
  const period = internalSettings.period * 60000;
  interval = setInterval(async () => {
    let lastHash;
    try {
      console.log("Update started!");
      const hashes = await getNewHashes();
      for (let i = hashes.length - 1; i >= 0; i -= 1) {
        const hash = hashes[i];
        const commitInfo = await githubApi.getCommitInfo(internalSettings.repoName, hash);
        const requestBuild: RequestBuild = { ...commitInfo, branchName: internalSettings.mainBranch };
        await backendApi.requestBuild(requestBuild);
        console.log("New build: ", requestBuild);
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
};

const internalInit = async (settings: Configuration): Promise<void> => {
  try {
    const [lastRepoName, lastMainBranch] = [internalSettings.repoName, internalSettings.mainBranch];
    internalSettings = settings;
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
};

const init = async (): Promise<void> => {
  try {
    const data = await backendApi.getSettings();
    await internalInit(data);
  } catch (error) {
    console.error(error.stack);
    console.error(error.message);
  }
};

const setSettings = (settings: Configuration): void => {
  setTimeout(() => internalInit(settings), 0);
};

export default {
  init,
  setSettings,
  getSettings: (): Configuration => internalSettings
};
