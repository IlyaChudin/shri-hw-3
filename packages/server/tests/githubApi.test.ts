/* eslint-disable prefer-promise-reject-errors */
import axios from "axios";
import api from "../src/githubApi";
import { githubOptions } from "../src/axiosOptions";
import { ReposListCommitsResponseDataItem, ReposListCommitsResponseData } from "../src/gihupApiTypes";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("github api", () => {
  it("should get commit info by repository name and commit hash", async () => {
    const repoName = "IlyaChudin/ci-test";
    const commitHash = "0cab04f6b0894e775e66224469fde0309f8eb284";
    const expected = {} as ReposListCommitsResponseDataItem;
    expected.sha = commitHash;
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: expected }));

    const result = await api.getCommitInfo(repoName, commitHash);

    expect(result).toEqual(expected);
    expect(mockedAxios.get).toHaveBeenCalledWith(`/${repoName}/commits/${commitHash}`, githubOptions);
  });

  it("should get branch commits by repository name and branch name", async () => {
    const repoName = "IlyaChudin/ci-test";
    const branchName = "master";
    const expected: ReposListCommitsResponseData = [{} as ReposListCommitsResponseDataItem];
    expected[0].sha = "0cab04f6b0894e775e66224469fde0309f8eb284";
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: expected }));

    const result = await api.getBranchCommits(repoName, branchName);

    expect(result).toEqual(expected);
    expect(mockedAxios.get).toHaveBeenCalledWith(`/${repoName}/commits`, {
      ...githubOptions,
      params: { sha: branchName }
    });
  });

  it("should get repository info", async () => {
    const repoName = "IlyaChudin/ci-test";
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve());

    await api.getRepositoryInfo(repoName);

    expect(mockedAxios.get).toHaveBeenCalledWith(`/${repoName}`, githubOptions);
  });

  it("should throw not found error when status code 404", async () => {
    const repoName = "IlyaChudin/ci-test";

    mockedAxios.get.mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }));

    await expect(api.getRepositoryInfo(repoName)).rejects.toThrow("Repository not found");
  });

  it("should rethrow all other rejects", async () => {
    const repoName = "IlyaChudin/ci-test";

    mockedAxios.get.mockImplementationOnce(() => Promise.reject(new Error("error")));

    await expect(api.getRepositoryInfo(repoName)).rejects.toThrow(new Error("error"));
  });
});
