import axios from "axios";
import { githubOptions } from "./axiosOptions";
import { ReposListCommitsResponseDataItem, ReposListCommitsResponseData } from "./gihupApiTypes";

const getCommitInfo = async (repoName: string, commitHash: string): Promise<ReposListCommitsResponseDataItem> => {
  const response = await axios.get<ReposListCommitsResponseDataItem>(
    `/${repoName}/commits/${commitHash}`,
    githubOptions
  );
  return response.data;
};

const getBranchCommits = async (repoName: string, branchName: string): Promise<ReposListCommitsResponseData> => {
  const response = await axios.get<ReposListCommitsResponseData>(`/${repoName}/commits`, {
    ...githubOptions,
    params: { sha: branchName }
  });
  return response.data;
};

const getRepositoryInfo = async (repoName: string): Promise<void> => {
  try {
    await axios.get(`/${repoName}`, githubOptions);
  } catch (e) {
    if (e.response && e.response.status === 404) {
      throw new Error("Repository not found");
    } else {
      throw e;
    }
  }
};

export default {
  getCommitInfo,
  getBranchCommits,
  getRepositoryInfo
};
