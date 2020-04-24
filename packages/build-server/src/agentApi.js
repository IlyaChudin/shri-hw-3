const rax = require("retry-axios");
const axios = require("axios");
const raxOptions = require("../../shared/src/raxOptions");

rax.attach();

module.exports = {
  buildStart: async (agent, id, commitHash, repoName, buildCommand) => {
    await axios.post(
      `http://${agent.host}:${agent.port}/build`,
      { id, commitHash, repoName, buildCommand },
      raxOptions
    );
  }
};
