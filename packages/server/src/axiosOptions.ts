import https from "https";
import { AxiosRequestConfig } from "axios";
import config from "./config";

export const backendOptions: AxiosRequestConfig = {
  baseURL: config.apiUrl,
  headers: {
    Authorization: `Bearer ${config.jwtToken}`
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
};

export const githubOptions: AxiosRequestConfig = {
  baseURL: "https://api.github.com/repos",
  ...(config.gitHubToken
    ? {
        headers: {
          Authorization: `token ${config.gitHubToken}`
        }
      }
    : {})
};
