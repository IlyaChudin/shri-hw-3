const rax = require("retry-axios");
const logger = require("./logger");
const { getDataFromAxiosError } = require("./helpers");

module.exports = {
  raxConfig: {
    httpMethodsToRetry: ["GET", "POST"],
    onRetryAttempt: e => {
      const cfg = rax.getConfig(e);
      const data = getDataFromAxiosError(e);
      logger.warn(`Retry attempt #${cfg.currentRetryAttempt}\n${JSON.stringify(data, null, 2)}`);
    }
  }
};
