const logger = require("../../shared/src/logger");
const serverApi = require("./serverApi");
const { execInTempPath } = require("./utils");

let isBusy = false;
let buildId;
let agentId;

const notifyServer = async () => {
  try {
    agentId = await serverApi.notifyAgent(agentId);
    logger.info(`Агент зарегистрирован на билд-сервере c id: ${agentId}.`);
  } catch (e) {
    if (e.response && typeof e.response.data === "string" && e.response.data.includes("already registered")) {
      logger.info("Агент уже зарегистрирован на билд-сервере.");
    } else {
      agentId = undefined;
      logger.error("Агент не может зарегистрироваться на билд-сервере.");
    }
  }
};

const sendResult = async (id, duration, status, log) => {
  try {
    await serverApi.sendResult(id, agentId, duration, status, log);
    logger.info(`Результаты билда ${id} успешно отправлены на билд-сервер.`);
  } catch (e) {
    logger.error(`Отправка результатов билда ${id} завершилась неудачей.`);
  }
};

const startBuild = async (id, repoName, buildCommand, commitHash) => {
  isBusy = true;
  buildId = id;
  const start = Date.now();
  let result;
  logger.info(`Билд ${id} запущен.`);
  try {
    const command = [
      `git clone https://github.com/${repoName}.git .`,
      `git -c advice.detachedHead=false checkout ${commitHash}`,
      buildCommand
    ].join(" && ");
    result = await execInTempPath(command);
  } catch (e) {
    result = { code: 1, log: e.message };
  } finally {
    const { code, log } = result;
    const status = code === 0;
    logger.info(`Билд ${id} завершен. Статус: ${status}.`);
    sendResult(id, Date.now() - start, status, log);
    isBusy = false;
    buildId = undefined;
  }
};

let intervalId;

const start = interval => {
  notifyServer();
  intervalId = setInterval(() => {
    if (!isBusy) {
      notifyServer();
    }
  }, interval);
};

const stop = () => {
  clearInterval(intervalId);
};

module.exports = {
  start,
  stop,
  startBuild,
  isBusy: () => isBusy,
  buildId: () => buildId,
  agentId: () => agentId
};
