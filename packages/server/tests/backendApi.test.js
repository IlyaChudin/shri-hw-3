import axios from "axios";
import api from "../src/backendApi";
import { backendOptions } from "../src/axiosOptions";

jest.mock("axios");

describe("backend api", () => {
  it("should successfully get settings", async () => {
    const data = {
      repoName: "IlyaChudin/ci-test",
      buildCommand: "npm run test",
      mainBranch: "master",
      period: "10"
    };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { data } }));

    const result = await api.getSettings();

    expect(result).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith("/conf", backendOptions);
  });

  it("should successfully save settings", async () => {
    const data = {
      repoName: "IlyaChudin/ci-test",
      buildCommand: "npm run test",
      mainBranch: "master",
      period: "10"
    };
    axios.post.mockImplementationOnce(() => Promise.resolve());

    await api.saveSettings(data);

    expect(axios.post).toHaveBeenCalledWith("/conf", data, backendOptions);
  });

  it("should get builds list", async () => {
    const data = [
      {
        id: "01d78ffb-dae2-4bb9-9457-233fc8700c7e",
        configurationId: "952b0cf1-948a-4f95-b6ce-ee225d36c24c",
        buildNumber: 36,
        commitMessage: "test update",
        commitHash: "0cab04f6b0894e775e66224469fde0309f8eb284",
        branchName: "master",
        authorName: "Ilya Chudin",
        status: "Success",
        start: "2020-04-04T08:32:53.442",
        duration: 2375
      },
      {
        id: "5fcb37f6-82b6-411b-b003-386a084cc377",
        configurationId: "952b0cf1-948a-4f95-b6ce-ee225d36c24c",
        buildNumber: 35,
        commitMessage: "need test",
        commitHash: "66e50bf",
        branchName: "master",
        authorName: "Ilya Chudin",
        status: "Success",
        start: "2020-04-04T08:32:53.443",
        duration: 2387
      }
    ];
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { data } }));

    const result = await api.getAllBuilds();

    expect(result).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith("/build/list", { ...backendOptions, params: { offset: 0, limit: 25 } });
  });

  it("should get builds list with limit and offset params", async () => {
    const offset = 3;
    const limit = 5;
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));

    await api.getAllBuilds(offset, limit);

    expect(axios.get).toHaveBeenCalledWith("/build/list", { ...backendOptions, params: { offset, limit } });
  });

  it("should get build details", async () => {
    const buildId = "01d78ffb-dae2-4bb9-9457-233fc8700c7e";
    const data = {
      id: buildId,
      configurationId: "952b0cf1-948a-4f95-b6ce-ee225d36c24c",
      buildNumber: 36,
      commitMessage: "test update",
      commitHash: "0cab04f6b0894e775e66224469fde0309f8eb284",
      branchName: "master",
      authorName: "Ilya Chudin",
      status: "Success",
      start: "2020-04-04T08:32:53.442",
      duration: 2375
    };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { data } }));

    const result = await api.getBuildDetails(buildId);

    expect(result).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith("/build/details", { ...backendOptions, params: { buildId } });
  });

  it("should get build log", async () => {
    const buildId = "01d78ffb-dae2-4bb9-9457-233fc8700c7e";
    const data = "log";
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    const result = await api.getBuildLog(buildId);

    expect(result).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith("/build/log", { ...backendOptions, params: { buildId } });
  });

  it("should request build for commit", async () => {
    const reqData = {
      commitMessage: "test update",
      commitHash: "0cab04f6b0894e775e66224469fde0309f8eb284",
      branchName: "master",
      authorName: "Ilya Chudin"
    };
    const resData = {
      id: "f7981650-50c6-4eb2-a357-f112910a3eb7",
      buildNumber: 37,
      status: "Waiting"
    };
    axios.post.mockImplementationOnce(() => Promise.resolve({ data: { data: resData } }));

    const result = await api.requestBuild(reqData);

    expect(result).toEqual(resData);
    expect(axios.post).toHaveBeenCalledWith("/build/request", reqData, backendOptions);
  });
});
