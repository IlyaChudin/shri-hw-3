interface Config {
  port: string | number;
  apiUrl: string;
  jwtToken: string | undefined;
}

const config: Config = {
  port: process.env.PORT || 4000,
  apiUrl: "https://hw.shri.yandex/api/",
  jwtToken: process.env.SHRI_API_KEY
};

export default config;
