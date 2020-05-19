import { Agent } from "https";
import axios from "axios";
import { BuildList } from "@shri-ci/types";
import config from "./config";

export interface ApiResponse<T> {
  data: T;
}

const getAllBuilds = async (offset?: number, limit?: number): Promise<BuildList> => {
  const response = await axios.get<ApiResponse<BuildList>>("/build/list", {
    baseURL: config.apiUrl,
    headers: {
      Authorization: `Bearer ${config.jwtToken}`
    },
    httpsAgent: new Agent({
      rejectUnauthorized: false
    }),
    params: { limit, offset }
  });
  return response.data.data;
};

export default {
  getAllBuilds
};
