/* eslint-disable no-await-in-loop,no-param-reassign */
const pool = require("./pool");
const logger = require("../../shared/src/logger");
const backendApi = require("./backendApi");
const agentApi = require("./agentApi");
const { getDataFromAxiosError } = require("../../shared/src/helpers");

const sendBuildResult = async (id, duration, status, log) => {
  try {
    await backendApi.buildFinish(id, duration, status, log);
    logger.info(`Результаты билда ${id} успешно отправлены в хранилище.`);
  } catch (e) {
    logger.error(`Результаты билда ${id} не отправлены в хранилище.`);
  }
};

const startBuild = async (agent, build, repoName, buildCommand) => {
  agent.isBusy = true;
  const { id, commitHash } = build;
  try {
    await agentApi.buildStart(agent, id, commitHash, repoName, buildCommand);
    await backendApi.buildStart(id, new Date());
    logger.info(`Билд ${id} успешно запущен на агенте ${agent.host}:${agent.port}`);
  } catch (e) {
    if (e.response && e.response.data === "Agent is busy") {
      logger.error("ВНИМАНИЕ! ЭТОГО НЕ ДОЛЖНО БЫЛО ПРОИЗОЙТИ! ЧТО-ТО НЕ ТАК С РАСПРЕДЕЛЕНИЕМ АГЕНТОВ!");
    } else {
      logger.error(`Билд ${id} не запущен.`);
      // Удаляем агент из пула, потому что он либо будет работать в холостую, либо не отвечает.
      pool.removeAgent(agent.id);
    }
    return false;
  }
  return true;
};

const handleBuilds = async () => {
  try {
    await pool.checkAgents();
    const availableAgents = pool.getAvailableAgents();
    const { repoName, buildCommand } = await backendApi.getSettings();
    const allBuilds = await backendApi.getAllBuilds(0, 100);
    const waitingBuilds = allBuilds.filter(x => x.status === "Waiting");
    const inProgressBuilds = allBuilds.filter(x => x.status === "InProgress");
    while (waitingBuilds.length) {
      const agent = availableAgents.pop();
      if (agent) {
        const isStarted = await startBuild(agent, waitingBuilds[waitingBuilds.length - 1], repoName, buildCommand);
        if (isStarted) {
          waitingBuilds.pop();
        }
      } else {
        break;
      }
    }
    inProgressBuilds.forEach(build => {
      const agent = pool.getAgentForBuild(build.id);
      if (!agent) {
        sendBuildResult(build.id, 1, false, "Build failed due to agent error.");
        logger.warn(`Запущенный ранее билд ${build.id} помечен неуспешным, т.к. не запущен ни на одном из агентов.`);
      }
    });
    logger.info(`Билдов в очереди: ${waitingBuilds.length}`);
    logger.info(`Свободных агентов: ${pool.getAvailableAgents().length}`);
    logger.info(`Занятых агентов: ${pool.getBusyAgents().length}`);
  } catch (e) {
    if (e.isAxiosError) {
      logger.error(`${e.message}\n${JSON.stringify(getDataFromAxiosError(e), null, 2)}`);
    } else {
      logger.error(e);
    }
  }
};

let intervalId;

const start = interval => {
  intervalId = setInterval(handleBuilds, interval);
};

const stop = () => {
  clearInterval(intervalId);
};

module.exports = {
  sendBuildResult,
  start,
  stop
};
