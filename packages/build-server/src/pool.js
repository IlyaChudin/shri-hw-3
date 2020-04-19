/* eslint-disable no-param-reassign */
const axios = require("axios");
const { v4 } = require("uuid");
const logger = require("./logger");

const agents = [];

const getAgentInfo = id => agents.find(x => x.id === id);

const getAvailableAgents = () => agents.filter(x => !x.isBusy);

const getBusyAgents = () => agents.filter(x => x.isBusy);

const getAgentForBuild = id => agents.find(x => x.buildId === id);

const getAgentByHostPort = (host, port) => agents.find(x => x.port === port && x.host === host);

const removeAgent = id => {
  const index = agents.findIndex(x => x.id === id);
  if (index >= 0) {
    const { host, port } = agents[index];
    agents.splice(index, 1);
    logger.info(`Агент ${host}:${port} удален из пула агентов.`);
  }
};

const registerAgent = (host, port, agentId) => {
  const agent = getAgentByHostPort(host, port);
  if (agent) {
    if (agent.id === agentId) {
      throw new Error(`Agent ${host}:${port} already registered.`);
    } else {
      removeAgent(agent.id);
    }
  }
  const id = v4();
  agents.push({ id, host, port, isBusy: false });
  logger.info(`Агент ${host}:${port} добавлен в пул агентов с id: ${id}.`);
  return id;
};

const checkAgents = () =>
  Promise.all(
    agents.map(async agent => {
      try {
        const { data } = await axios.get(`http://${agent.host}:${agent.port}/status`);
        agent.isBusy = data.isBusy;
        agent.buildId = data.buildId;
      } catch (e) {
        removeAgent(agent.id);
      }
    })
  );

const freeAgent = id => {
  const agent = getAgentInfo(id);
  if (agent) {
    agent.isBusy = false;
    agent.buildId = undefined;
    logger.info(`Агент ${agent.host}:${agent.port} снова доступен.`);
    return true;
  }
  return false;
};

module.exports = {
  checkAgents,
  registerAgent,
  removeAgent,
  getAvailableAgents,
  getBusyAgents,
  freeAgent,
  getAgentInfo,
  getAgentForBuild
};
