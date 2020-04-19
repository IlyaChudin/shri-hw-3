/* eslint-disable prefer-promise-reject-errors */
import axios from "axios";
import api from "../src/githubApi";
import { githubOptions } from "../src/axiosOptions";

jest.mock("axios");

describe("github api", () => {
  it("should get commit info by repository name and commit hash", async () => {
    const repoName = "IlyaChudin/ci-test";
    const commitHash = "0cab04f6b0894e775e66224469fde0309f8eb284";
    const resData = {
      commitMessage: "test update",
      commitHash,
      authorName: "Ilya Chudin"
    };
    const reqData = {
      commit: {
        message: resData.commitMessage,
        author: {
          name: resData.authorName
        }
      }
    };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: reqData }));

    const result = await api.getCommitInfo(repoName, commitHash);

    expect(result).toEqual(resData);
    expect(axios.get).toHaveBeenCalledWith(`/${repoName}/commits/${commitHash}`, githubOptions);
  });

  it("should get branch commits by repository name and branch name", async () => {
    const repoName = "IlyaChudin/ci-test";
    const branchName = "master";
    const data = [
      { sha: "0cab04f6b0894e775e66224469fde0309f8eb284" },
      { sha: "9b6b76a89019ae14fa4ffcf1637333da5a2d068d" }
    ];
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    const result = await api.getBranchCommits(repoName, branchName);

    expect(result).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(`/${repoName}/commits`, { ...githubOptions, params: { sha: branchName } });
  });

  it("should get repository info", async () => {
    const repoName = "IlyaChudin/ci-test";
    const data = { full_name: repoName };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    const result = await api.getRepositoryInfo(repoName);

    expect(result).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(`/${repoName}`, githubOptions);
  });

  it("should throw not found error when status code 404", async () => {
    const repoName = "IlyaChudin/ci-test";

    axios.get.mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }));

    await expect(api.getRepositoryInfo(repoName)).rejects.toThrow("Repository not found");
  });

  it("should rethrow all other rejects", async () => {
    const repoName = "IlyaChudin/ci-test";

    axios.get.mockImplementationOnce(() => Promise.reject(new Error("error")));

    await expect(api.getRepositoryInfo(repoName)).rejects.toThrow(new Error("error"));
  });
});
