module.exports = {
  port: process.env.PORT || 3000,
  apiUrl: "https://hw.shri.yandex/api/",
  jwtToken: process.env.SHRI_API_KEY,
  gitHubToken: process.env.GITHUB_TOKEN,
  cacheSize: 256 * 1024 * 1024,
  cacheMaxAge: 1000 * 60 * 60
};
