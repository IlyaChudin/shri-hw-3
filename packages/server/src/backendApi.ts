import axios from "axios";
import {
  BuildModel,
  BuildList,
  ConfigurationInput,
  ConfigurationModel,
  QueueBuildInput,
  BuildRequestResultModel
} from "@shri-ci/types";
import { backendOptions } from "./axiosOptions";

interface ApiResponse<T> {
  data: T;
}

const getSettings = async (): Promise<ConfigurationModel> => {
  const response = await axios.get<ApiResponse<ConfigurationModel>>("/conf", backendOptions);
  return response.data.data;
};

const saveSettings = async (settings: ConfigurationInput): Promise<void> => {
  await axios.post("/conf", settings, backendOptions);
};

const deleteSettings = async (): Promise<void> => {
  await axios.delete("/conf", backendOptions);
};

const getAllBuilds = async (offset?: number, limit?: number): Promise<BuildList> => {
  const response = await axios.get<ApiResponse<BuildList>>("/build/list", {
    ...backendOptions,
    params: { limit, offset }
  });
  return response.data.data;
};

const getBuildDetails = async (buildId: string): Promise<BuildModel> => {
  const response = await axios.get<ApiResponse<BuildModel>>("/build/details", {
    ...backendOptions,
    params: { buildId }
  });
  return response.data.data;
};

const getBuildLog = async (buildId: string): Promise<string> => {
  const response = await axios.get<string>("/build/log", { ...backendOptions, params: { buildId } });
  return response.data;
};

const requestBuild = async (request: QueueBuildInput): Promise<BuildRequestResultModel> => {
  const response = await axios.post<ApiResponse<BuildRequestResultModel>>("/build/request", request, backendOptions);
  return response.data.data;
};

export default {
  getSettings,
  saveSettings,
  deleteSettings,
  getAllBuilds,
  getBuildDetails,
  getBuildLog,
  requestBuild
};
