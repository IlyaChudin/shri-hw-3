const logger = require("../../shared/src/logger");
const serverApi = require("./serverApi");

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

const startBuild = (id, repoName, buildCommand, commitHash) => {
  const timeout = Math.round(Math.random() * 60000);
  isBusy = true;
  buildId = id;
  logger.info(`Билд ${id} запущен. ${timeout}`);
  // TODO Заменить на реальный билд
  setTimeout(() => {
    const status = Boolean(Math.round(Math.random()));
    const log = `${repoName} ${buildCommand} ${commitHash}`;
    logger.info(`Билд ${id} завершен. Статус: ${status}.`);
    sendResult(id, timeout, status, log);
    isBusy = false;
    buildId = undefined;
  }, timeout);
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
