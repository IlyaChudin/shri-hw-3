const rax = require("retry-axios");
const axios = require("axios");
const axiosOptions = require("./axiosOptions");
const raxOptions = require("../../shared/src/raxOptions");

rax.attach();

const options = {
  ...axiosOptions,
  ...raxOptions
};

async function getSettings() {
  const response = await axios.get("/conf", options);
  return response.data.data;
}

async function getAllBuilds(offset, limit) {
  const response = await axios.get("/build/list", {
    ...options,
    params: {
      offset: offset || 0,
      limit: limit || 25
    }
  });
  return response.data.data;
}

async function buildStart(buildId, dateTime) {
  const response = await axios.post("/build/start", { buildId, dateTime }, options);
  return response.data.data;
}

async function buildFinish(buildId, duration, success, buildLog) {
  const response = await axios.post("/build/finish", { buildId, duration, success, buildLog }, options);
  return response.data.data;
}

module.exports = {
  getSettings,
  getAllBuilds,
  buildStart,
  buildFinish
};
