import axios, { AxiosResponse } from "axios";
import api, { ApiResponse } from "../src/backendApi";
import { backendOptions } from "../src/axiosOptions";
import {
  BuildList,
  BuildModel,
  BuildRequestResultModel,
  ConfigurationInput,
  ConfigurationModel,
  QueueBuildInput
} from "../../types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("backend api", () => {
  it("should successfully get settings", async () => {
    const expected = {} as ConfigurationModel;
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          data: expected
        } as ApiResponse<ConfigurationModel>
      } as AxiosResponse<ApiResponse<ConfigurationModel>>)
    );

    const result = await api.getSettings();

    expect(result).toBe(expected);
    expect(mockedAxios.get).toHaveBeenCalledWith("/conf", backendOptions);
  });

  it("should successfully save settings", async () => {
    const data = {} as ConfigurationInput;
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve());

    await api.saveSettings(data);

    expect(mockedAxios.post).toHaveBeenCalledWith("/conf", data, backendOptions);
  });

  it("should get builds list", async () => {
    const expected = [] as BuildList;
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          data: expected
        } as ApiResponse<BuildList>
      } as AxiosResponse<ApiResponse<BuildList>>)
    );

    const result = await api.getAllBuilds();

    expect(result).toBe(expected);
    expect(axios.get).toHaveBeenCalledWith("/build/list", {
      ...backendOptions,
      params: { offset: undefined, limit: undefined }
    });
  });

  it("should get builds list with limit and offset params", async () => {
    const offset = 3;
    const limit = 5;
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          data: [] as BuildList
        } as ApiResponse<BuildList>
      } as AxiosResponse<ApiResponse<BuildList>>)
    );

    await api.getAllBuilds(offset, limit);

    expect(mockedAxios.get).toHaveBeenCalledWith("/build/list", { ...backendOptions, params: { offset, limit } });
  });

  it("should get build details", async () => {
    const buildId = "01d78ffb-dae2-4bb9-9457-233fc8700c7e";
    const expected = {
      id: buildId
    } as BuildModel;
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          data: expected
        } as ApiResponse<BuildModel>
      } as AxiosResponse<ApiResponse<BuildModel>>)
    );

    const result = await api.getBuildDetails(buildId);

    expect(result).toBe(expected);
    expect(mockedAxios.get).toHaveBeenCalledWith("/build/details", { ...backendOptions, params: { buildId } });
  });

  it("should get build log", async () => {
    const buildId = "01d78ffb-dae2-4bb9-9457-233fc8700c7e";
    const expected = "log";
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: expected } as AxiosResponse<string>));

    const result = await api.getBuildLog(buildId);

    expect(result).toBe(expected);
    expect(mockedAxios.get).toHaveBeenCalledWith("/build/log", { ...backendOptions, params: { buildId } });
  });

  it("should request build for commit", async () => {
    const reqData = {} as QueueBuildInput;
    const expected = {} as BuildRequestResultModel;
    mockedAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          data: expected
        } as ApiResponse<BuildRequestResultModel>
      } as AxiosResponse<ApiResponse<BuildRequestResultModel>>)
    );

    const result = await api.requestBuild(reqData);

    expect(result).toBe(expected);
    expect(mockedAxios.post).toHaveBeenCalledWith("/build/request", reqData, backendOptions);
  });
});
