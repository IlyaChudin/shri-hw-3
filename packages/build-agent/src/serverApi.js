const rax = require("retry-axios");
const axios = require("axios");
const { port, serverHost, serverPort } = require("./config");
const raxOptions = require("../../shared/src/raxOptions");

const instance = axios.create(raxOptions);
rax.attach(instance);

module.exports = {
  notifyAgent: async agentId => {
    const { data } = await axios.post(`http://${serverHost}:${serverPort}/notify-agent`, { port, agentId });
    return data;
  },
  sendResult: async (id, agentId, duration, status, log) => {
    await instance.post(
      `http://${serverHost}:${serverPort}/notify-build-result`,
      { id, agentId, duration, status, log },
      raxOptions
    );
  }
};
