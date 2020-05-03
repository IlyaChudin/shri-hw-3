interface Config {
  port: string | number;
  apiUrl: string;
  jwtToken: string | undefined;
  gitHubToken: string | undefined;
  cacheSize: number;
  cacheMaxAge: number;
  nodeEnv: string;
}

const config: Config = {
  port: process.env.PORT || 3000,
  apiUrl: "https://hw.shri.yandex/api/",
  jwtToken: process.env.SHRI_API_KEY,
  gitHubToken: process.env.GITHUB_TOKEN,
  cacheSize: 256 * 1024 * 1024,
  cacheMaxAge: 1000 * 60 * 60,
  nodeEnv: process.env.NODE_ENV || "production"
};

export default config;
